from langchain import embeddings
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores.pinecone import Pinecone
from langchain.chains.summarize import load_summarize_chain
from langchain.document_loaders import PyPDFLoader
import os
import pinecone
from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI
from transformers import GPT2TokenizerFast
from langchain.text_splitter import TokenTextSplitter
from dotenv import load_dotenv
import langchain
import io
import urllib.request
import PyPDF2
langchain.debug


load_dotenv()

# Load PDF File

PDFURL=os.getenv('PDFURL')
#pdf_file = "./doc.pdf"
# URL = PDFURL
# req = urllib.request.Request(URL, headers={'User-Agent' : "Magic Browser"})
# remote_file = urllib.request.urlopen(req).read()
# remote_file_bytes = io.BytesIO(remote_file)
# pdfdoc_remote = PyPDF2.PdfFileReader(remote_file_bytes)
loader = PyPDFLoader(PDFURL)
pages = loader.load_and_split()

# Strip unwanted padding
for page in pages:
    del page.lc_kwargs
    page.page_content=("".join((page.page_content.split('\xa0'))))


tokenizer = GPT2TokenizerFast.from_pretrained("gpt2")

total_count = 0
for page in pages:
    token_count = len(tokenizer.encode(page.page_content))
    print(f"Page {page.metadata['page']} has {token_count} tokens.")
    total_count += token_count


print('Total token count: ', total_count)


pinecone_api_key = os.environ["PINECONE_API_KEY"]
pinecone_env =os.environ["PINECONE_ENV"]
pinecone_index = "summarize1"

pinecone.init(api_key=pinecone_api_key, environment=pinecone_env)

index = pinecone.Index(pinecone_index)

print('Deleting pinecone index!')

index.delete(deleteAll='true')

print('Pinecone index deleted!')

embeddings = OpenAIEmbeddings()
vectordb = Pinecone.from_documents(pages, embeddings, index_name=pinecone_index)

print('Pinecone vector created!')

llm = ChatOpenAI(model='gpt-3.5-turbo-16k', temperature=0.7)

prompt_template = """Write a long summary with subtitles.
Remember the date of publication if exist for the nex prompt.
The output should be a markdown format. Text context information is bellow:


{text}


"""

prompt_template_combined = """Write a blog with one main title, subtitles and large subtitle if required, provide any contact info if exist.
Do no use Summary or Contact as main title. The output should be a markdown format.
Mention only one date of publication for the whole blog. Text context information is bellow:


{text}


"""

PROMPT = PromptTemplate(template=prompt_template,
                        input_variables=["text"])

PROMPT_COMBINED = PromptTemplate(template=prompt_template_combined,
                        input_variables=["text"])

chain = load_summarize_chain(
    llm,
    chain_type="map_reduce",
    map_prompt=PROMPT,
    combine_prompt=PROMPT_COMBINED)

print('Chain created!')

search = vectordb.similarity_search(" ")
print(search)

print('Vectordb similarity search done!')

summary = chain({"input_documents": search}, return_only_outputs=True)

print('Summary chain completed')

# print(summary['output_text'])

total_blog_count = len(summary['output_text'])

print(total_blog_count)

if total_blog_count < 2000:
    print('Not enough for a markdown')
else:
    f = open("blog.mdx", "w")
    f.write(summary['output_text'])
    f.close()

index.delete(deleteAll='true')

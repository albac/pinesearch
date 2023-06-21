from dotenv import load_dotenv
from langchain.chains.summarize import load_summarize_chain
from langchain.chat_models import ChatOpenAI
from langchain.document_loaders import PyPDFLoader
from langchain.embeddings import OpenAIEmbeddings
from langchain.prompts import PromptTemplate
from langchain.vectorstores.pinecone import Pinecone
from transformers import GPT2TokenizerFast
import langchain
import os
import pinecone
import boto3
from botocore.exceptions import NoCredentialsError

langchain.debug
load_dotenv()

os.environ["TOKENIZERS_PARALLELISM"] = "false"


def load_and_process_pdf():
    PDFURL = os.getenv('PDFURL')
    loader = PyPDFLoader(PDFURL)
    pages = loader.load_and_split()

    for page in pages:
        del page.lc_kwargs
        page.page_content = ("".join((page.page_content.split('\xa0'))))
    return pages


def count_tokens(pages):
    tokenizer = GPT2TokenizerFast.from_pretrained("gpt2")
    total_count = 0
    for page in pages:
        token_count = len(tokenizer.encode(page.page_content))
        print(f"Page {page.metadata['page']} has {token_count} tokens.")
        total_count += token_count

    print('Total token count: ', total_count)


def init_pinecone():
    pinecone_api_key = os.environ["PINECONE_API_KEY"]
    pinecone_env = os.environ["PINECONE_ENV"]
    pinecone_index = "summarize1"

    pinecone.init(api_key=pinecone_api_key, environment=pinecone_env)

    index = pinecone.Index(pinecone_index)




def create_pinecone_vector(pages, index_name):
    embeddings = OpenAIEmbeddings()
    vectordb = Pinecone.from_documents(
        pages,
        embeddings,
        index_name=index_name
        )

    print('Pinecone vector created!')

    return vectordb


def create_chain(llm, PROMPT, PROMPT_COMBINED):
    chain = load_summarize_chain(
        llm,
        chain_type="map_reduce",
        map_prompt=PROMPT,
        combine_prompt=PROMPT_COMBINED)

    print('Chain created!')
    return chain


def run_chain(chain, vectordb):
    search = vectordb.similarity_search(" ")
    print(search)
    print('Vectordb similarity search done!')

    summary = chain({"input_documents": search}, return_only_outputs=True)

    print('Summary chain completed')
    return summary

def upload_to_s3(bucket_name, key, file_name):
    # Create an S3 client
    s3 = boto3.client('s3')

    try:
        # Upload file to S3 bucket
        s3.upload_file(file_name, bucket_name, key)
        print('File uploaded successfully')
    except Exception as e:
        print(f'An error occurred while uploading file to S3: {str(e)}')


def write_output(summary):
    total_blog_count = len(summary['output_text'])

    print(total_blog_count)

    if total_blog_count < 2000:
        print('Not enough for a markdown')
    else:
        f = open("blog.mdx", "w")
        f.write(summary['output_text'])
        f.close()


if __name__ == "__main__":
    try:
        pages = load_and_process_pdf()
        count_tokens(pages)
        init_pinecone()
        vectordb = create_pinecone_vector(pages, "summarize1")

        llm = ChatOpenAI(model='gpt-3.5-turbo-16k', temperature=0)

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

        PROMPT = PromptTemplate(template=prompt_template, input_variables=["text"])
        PROMPT_COMBINED = PromptTemplate(template=prompt_template_combined, input_variables=["text"])

        chain = create_chain(llm, PROMPT, PROMPT_COMBINED)
        summary = run_chain(chain, vectordb)
        write_output(summary)
        bucket_name = 'pineblogs'
        key = 'public/blog.mdx'
        file_name = 'blog.mdx'
        upload_to_s3(bucket_name, key, file_name)
        # bucket_name = 'pineblogs'
        # key = 'public/test2.txt'
        # file_name = 'test2.txt'
        # upload_to_s3(bucket_name, key, file_name)
        index = pinecone.Index("summarize1")
        index.delete(deleteAll='true')

    except Exception as e:
        print(f"An error occurred: {str(e)}")

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
import logging
from langchain.text_splitter import RecursiveCharacterTextSplitter

logger = logging.getLogger("uvicorn")
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())


langchain.debug
# load_dotenv()

os.environ["TOKENIZERS_PARALLELISM"] = "false"

# Configuración del logger
# logging.basicConfig(filename='app.log', filemode='w', format='%(name)s - %(levelname)s - %(message)s')
# logger = logging.getLogger(__name__)

def load_and_process_pdf():
    PDFURL = os.getenv('PDFURL')
    loader = PyPDFLoader(PDFURL)
    pages = loader.load_and_split()

    for page in pages:
        del page.lc_kwargs
        page.page_content = ("".join((page.page_content.split('\xa0'))))
    return pages

def load_and_process_pdf_extra(PDFURL):

    loader = PyPDFLoader(PDFURL)
    data = loader.load()
    if not data:
        raise Exception("No data loaded from PDF")

    for doc in data:
        doc.page_content = remove_header_footer(doc.page_content)
    logger.info(f'You have {len(data)} document(s) in your data')
    logger.info(f'There are {len(data[0].page_content)} characters in your document')
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    texts = text_splitter.split_documents(data)
    logger.info(f'Now you have {len(texts)} documents')  
    return texts



def count_tokens(pages):
    tokenizer = GPT2TokenizerFast.from_pretrained("gpt2")
    total_count = 0
    for page in pages:
        token_count = len(tokenizer.encode(page.page_content))
        logger.info(f"Page {page.metadata['page']} has {token_count} tokens.")
        total_count += token_count

    logger.info('Total token count: ', total_count)


def init_pinecone():
    pinecone_api_key = os.environ["PINECONE_API_KEY"]
    pinecone_env = os.environ["PINECONE_ENVIRONMENT"]
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

    logger.info('Pinecone vector created!')

    return vectordb

def create_pinecone_vector_extra(texts, index_name):
    embeddings = OpenAIEmbeddings()
    vectordb = Pinecone.from_texts([t.page_content for t in texts], embeddings, index_name=index_name)

    logger.info('Pinecone vector created!')

    return vectordb


def create_chain(llm, PROMPT, PROMPT_COMBINED):
    chain = load_summarize_chain(
        llm,
        chain_type="map_reduce",
        map_prompt=PROMPT,
        combine_prompt=PROMPT_COMBINED)

    logger.info('Chain created!')
    return chain


def run_chain(chain, vectordb):
    search = vectordb.similarity_search(" ",k=6)
    logger.info(search)
    logger.info('Vectordb similarity search done!')

    summary = chain({"input_documents": search}, return_only_outputs=True)

    logger.info('Summary chain completed')
    return summary

def upload_to_s3(bucket_name, key, file_name):
    # Create an S3 client
    s3 = boto3.client('s3')

    try:
        # Upload file to S3 bucket
        s3.upload_file(file_name, bucket_name, key)
        logger.info('File uploaded successfully')
    except Exception as e:
        logger.info(f'An error occurred while uploading file to S3: {str(e)}')


def write_output(summary):
    total_blog_count = len(summary['output_text'])

    logger.info(total_blog_count)

    if total_blog_count < 2000:
        logger.info('Not enough for a markdown')
    else:
        f = open("blog4.mdx", "w")
        f.write(summary['output_text'])
        f.close()

def remove_header_footer(text):
    lines = text.split('\n')
    if len(lines) > 2:  # Ensure there are header and footer to remove
        return '\n'.join(lines[1:-1])
    return text  # Return original text if it's too short


# if __name__ == "__main__":

def get_blog_output(texts, prompt_template, prompt_template_combined):
    try:

        init_pinecone()
        vectordb = create_pinecone_vector_extra(texts, "summarize1")

        llm = ChatOpenAI(model='gpt-3.5-turbo-16k', temperature=0,verbose=True)

        PROMPT = PromptTemplate(template=prompt_template, input_variables=["text"])
        PROMPT_COMBINED = PromptTemplate(template=prompt_template_combined, input_variables=["text"])

        chain = create_chain(llm, PROMPT, PROMPT_COMBINED)
        summary = run_chain(chain, vectordb)
        write_output(summary)
        bucket_name = 'pineblogs101145-dev'
        key = 'public/blog4.mdx'
        file_name = 'blog4.mdx'
        upload_to_s3(bucket_name, key, file_name)
        # bucket_name = 'pineblogs'
        # key = 'public/test2.txt'
        # file_name = 'test2.txt'
        # upload_to_s3(bucket_name, key, file_name)
        index = pinecone.Index("summarize1")
        index.delete(deleteAll='true')
        # if pinecone_index in pinecone.list_indexes():
        #     pinecone.delete_index(pinecone_index)

    except Exception as e:
        logger.info(f"An error occurred: {str(e)}")

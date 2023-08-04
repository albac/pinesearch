import os
import boto3
import tempfile
import logging
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Pinecone
import pinecone
from langchain.document_loaders import DirectoryLoader

# Set up logging
logging.basicConfig(level=logging.INFO)

class PineconeIndexer:
    def __init__(self, bucket_name, folder_name, pinecone_index):
        self.bucket_name = bucket_name
        self.folder_name = folder_name
        self.pinecone_index = pinecone_index
        self.s3 = boto3.client('s3')

        pinecone.init(
            api_key=os.environ["PINECONE_API_KEY"],
            environment=os.environ["PINECONE_ENVIRONMENT"]
        )

        self.index = pinecone.Index(pinecone_index)
        logging.info(self.index)
        self.index.delete(deleteAll="true")

    def download_files(self):
        # Create a temporary folder to store the downloaded files
        temp_dir = tempfile.mkdtemp(dir='/tmp')
        # Download .mdx files to the temporary folder
        response = self.s3.list_objects_v2(Bucket=self.bucket_name, Prefix=self.folder_name)
        for obj in response['Contents']:
            if obj['Key'].endswith('.md'):  # Only download .mdx files
                filename = os.path.join(temp_dir, obj['Key'].split('/')[-1])
                self.s3.download_file(self.bucket_name, obj['Key'], filename)
                logging.info(f"Downloaded file: {filename}")
        return temp_dir

    def load_documents(self, temp_dir):
        # Load documents from the temporary folder
        loader =  DirectoryLoader(temp_dir, glob="**/*.md")
        documents = loader.load()
        logging.info(f"Number of documents loaded: {len(documents)}")
        return documents

    def split_documents(self, documents):
        # Split documents into smaller chunks
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
        return text_splitter.split_documents(documents)

    def generate_embeddings(self, docs):
        # Generate OpenAI embeddings for the documents
        embeddings = OpenAIEmbeddings()
        # Create a Pinecone index with the documents and their embeddings
        index = Pinecone.from_documents(docs, embeddings, index_name=self.pinecone_index)
        logging.info("Document upload to Pinecone successful")
        return index

    def clean_up(self, temp_dir):
        # Delete the temporary folder and downloaded files
        for file_name in os.listdir(temp_dir):
            file_path = os.path.join(temp_dir, file_name)
            os.remove(file_path)
        os.rmdir(temp_dir)
        logging.info("Temporary file deletion successful")

    def run(self):
        temp_dir = self.download_files()
        documents = self.load_documents(temp_dir)
        docs = self.split_documents(documents)
        self.generate_embeddings(docs)
        self.clean_up(temp_dir)


# Usage
indexer = PineconeIndexer('pineblogs101145-dev', 'public/mdx/', 'answers1')
indexer.run()


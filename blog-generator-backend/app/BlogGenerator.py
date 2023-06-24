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
import logging
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.llms import OpenAI
import re
from datetime import datetime

logger = logging.getLogger()
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())

langchain.debug

os.environ["TOKENIZERS_PARALLELISM"] = "false"


class BlogGenerator:
    def __init__(self, pdf_url, prompt_template, prompt_template_combined, prompt_template_summary, pinecone_index, bucket_name):
        self.pdf_url = pdf_url
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")  # Obtener el timestamp actual
        no_url = self.pdf_url.split("/")[-1]
        filestring = ''.join(e for e in no_url if e.isalnum())
        self.filename = filestring[-10:] + "_" + timestamp
        self.prompt_template = prompt_template
        self.prompt_template_combined = prompt_template_combined
        self.prompt_template_summary = prompt_template_summary
        self.pinecone_index = pinecone_index
        self.bucket_name = bucket_name
        self.llm = ChatOpenAI(model='gpt-3.5-turbo-16k', temperature=0, verbose=True)

    def get_fields(self):
        return {
            "pdf_url": self.pdf_url,
            "prompt_template": self.prompt_template,
            "prompt_template_combined": self.prompt_template_combined,
            "prompt_template_summary": self.prompt_template_summary,
            "pinecone_index": self.pinecone_index,
            "bucket_name": self.bucket_name
        }
            
    def load_and_process_pdf(self):
        loader = PyPDFLoader(self.pdf_url)
        pages = loader.load_and_split()

        for page in pages:
            del page.lc_kwargs
            page.page_content = "".join(page.page_content.split("\xa0"))
        return pages

    def load_and_process_pdf_extra(self):
        loader = PyPDFLoader(self.pdf_url)
        data = loader.load()
        if not data:
            raise Exception("No data loaded from PDF")

        for doc in data:
            doc.page_content = self.remove_header_footer(doc.page_content)
        logger.info(f"You have {len(data)} document(s) in your data")
        logger.info(f"There are {len(data[0].page_content)} characters in your document")
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        texts = text_splitter.split_documents(data)
        logger.info(f"Now you have {len(texts)} documents")
        return texts

    def count_tokens(self, pages):
        tokenizer = GPT2TokenizerFast.from_pretrained("gpt2")
        total_count = 0
        for page in pages:
            token_count = len(tokenizer.encode(page.page_content))
            logger.info(f"Page {page.metadata['page']} has {token_count} tokens.")
            total_count += token_count

        logger.info("Total token count: ", total_count)

    def init_pinecone(self):
        pinecone_api_key = os.environ["PINECONE_API_KEY"]
        pinecone_env = os.environ["PINECONE_ENVIRONMENT"]

        pinecone.init(api_key=pinecone_api_key, environment=pinecone_env)

        index = pinecone.Index(self.pinecone_index)

    def create_pinecone_vector(self, pages):
        embeddings = OpenAIEmbeddings()
        vectordb = Pinecone.from_documents(pages, embeddings, index_name=self.pinecone_index)

        logger.info("Pinecone vector created!")

        return vectordb

    def create_pinecone_vector_extra(self, texts):
        embeddings = OpenAIEmbeddings()
        vectordb = Pinecone.from_texts([t.page_content for t in texts], embeddings, index_name=self.pinecone_index)

        logger.info("Pinecone vector created!")

        return vectordb

    def create_chain(self, llm, prompt, prompt_combined):
        chain = load_summarize_chain(
            llm,
            chain_type="map_reduce",
            map_prompt=prompt,
            combine_prompt=prompt_combined,
        )

        logger.info("Chain created!")
        return chain

    def run_chain(self, chain, vectordb):
        search = vectordb.similarity_search(" ", k=6)
        logger.info(search)
        logger.info("Vectordb similarity search done!")

        summary = chain({"input_documents": search}, return_only_outputs=True)

        logger.info("Summary chain completed")
        return summary

    def upload_to_s3(self, key, file_name, metadata):
        # Create an S3 client
        s3 = boto3.client("s3")

        try:
            base_dir = '/tmp'
            filelocation = os.path.join(base_dir, file_name)
            # Upload file to S3 bucket
            s3.upload_file(
                    filelocation, self.bucket_name, key, ExtraArgs={"Metadata": metadata})
            logger.info("File uploaded successfully")
        except Exception as e:
            logger.info(f"An error occurred while uploading file to S3: {str(e)}")

    def write_output(self, summary, file_name):
        total_blog_count = len(summary["output_text"])

        logger.info(total_blog_count)

        base_dir = '/tmp'
        filelocation = os.path.join(base_dir, file_name)

        if total_blog_count < 2000:
            logger.info("Not enough for a markdown")
        else:
            f = open(filelocation, "w")
            f.write(summary["output_text"])
            f.close()

    def remove_header_footer(self, text):
        lines = text.split("\n")
        if len(lines) > 2:  # Ensure there are header and footer to remove
            return "\n".join(lines[1:-1])
        return text  # Return original text if it's too short

    def get_blog_output(self, texts):
        response = {}

        response['status'] = 'started'
        response['message'] = 'Blog creation process starting ..'

        try:
            self.init_pinecone()

            index = pinecone.Index(self.pinecone_index)
            logger.info(index)
            index.delete(deleteAll="true")

            vectordb = self.create_pinecone_vector_extra(texts)
            PROMPT = PromptTemplate(template=self.prompt_template, input_variables=["text"])
            PROMPT_COMBINED = PromptTemplate(template=self.prompt_template_combined, input_variables=["text"])
            chain = self.create_chain(self.llm, PROMPT, PROMPT_COMBINED)
            summary = self.run_chain(chain, vectordb)
            openai = OpenAI(model_name="text-davinci-003", temperature=0)
            prompt_template = PromptTemplate(input_variables=["text"], template=self.prompt_template_summary)
            summary_2 = openai(prompt_template.format(text=summary["output_text"]))

            self.write_output(summary, self.filename + ".md")
            patron = r"Title: (.+)"
            coincidencia = re.search(patron, summary_2)
            titulo = ""
            if coincidencia:
                titulo = coincidencia.group(1)
                logger.info(titulo)
            header_cleaned = summary_2.replace("\n", " ")

            metadata = {"titulo": titulo, "url": self.pdf_url, "resumen": header_cleaned}
            cleaned_metadata = {k: v.encode("ascii", "ignore").decode("ascii") for k, v in metadata.items()}
            key = "public/mdx/" + self.filename + ".md"
            file_name = self.filename + ".md"
            self.upload_to_s3(key, file_name, cleaned_metadata)

            index = pinecone.Index(self.pinecone_index)
            logger.info(index)
            index.delete(deleteAll="true")

            response['status'] = 'completed'
            response['message'] = 'Blog creation completed!'

        except Exception as e:
            response['message'] = f"An error occurred: {str(e)}"
            response['status'] = 'failed'
            logger.info(response['message'])

        return response

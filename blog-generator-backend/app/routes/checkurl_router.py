import logging
from ..blog_generator import get_blog_output, load_and_process_pdf_extra, write_output, upload_to_s3, init_pinecone, create_pinecone_vector_extra
import requests
from fastapi import APIRouter
from pydantic import BaseModel
from time import sleep
import os
import json
from googleapiclient.discovery import build
from datetime import datetime, timedelta
from langchain.document_loaders import PyPDFLoader
from transformers import GPT2TokenizerFast

logger = logging.getLogger()
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())


router = APIRouter()

GOOGLE_API_KEY = os.environ['GOOGLE_API_KEY']

SEARCH_ENGINE_ID = os.environ['SEARCH_ENGINE_ID']


class Item(BaseModel):
    query: str


def get_search_items(query, num_results=10):

    # Calculate the date range for the past day
    end_date = datetime.now()
    start_date = end_date - timedelta(days=600)

    service = build(
        "customsearch", "v1",
        developerKey=GOOGLE_API_KEY)

    try:
        res = service.cse().list(
            q=query,
            cx=SEARCH_ENGINE_ID,
            fileType='pdf',
            num=num_results,
            sort=f'date:r:{start_date.strftime("%Y%m%d")}:{end_date.strftime("%Y%m%d")}'
        ).execute()
    except Exception as e:
        logger.info(f'Google search failed. Error: {e}')
        return False

    print('Response: ', res)

    items = res.get('items', [])

    return items


def count_tokens(pages):
    tokenizer = GPT2TokenizerFast.from_pretrained("gpt2")
    total_count = 0
    for page in pages:
        token_count = len(tokenizer.encode(page.page_content))
        logger.info(f"Page {page.metadata['page']} has {token_count} tokens.")
        total_count += token_count

    logger.info(f"Total token count: {total_count}")
    return total_count


def validate_url(url):

    try:
        loader = PyPDFLoader(url)
    except Exception as e:
        logger.info(f'Failed message. Error: {e}!')
        return False

    try:
        pages = loader.load_and_split()
    except Exception as e:
        logger.info(f'split failed {e}')
        return False

    total_count = count_tokens(pages)
    logger.info(f'Total count: {total_count}')
    if total_count < 20000:
        logger.info('Not enought tokens for a blog')
        return False
    return True


@router.post("/")
async def create_item(event: Item):

    query = event.query

    items = get_search_items(query)

    result = {}

    if items:

        url_links = []
        for item in items:
            pdf_url = item['link']
            sleep(300/1000)
            try:
                response = requests.head(pdf_url)
            except Exception as e:
                logger.info(f"Can not load PDF. Error: {e}")
                continue

            content_length = response.headers.get("Content-Length")

            if content_length:
                file_size = int(content_length)
                logger.info(f"The size of the PDF file is {file_size} bytes.")
            else:
                logger.info('Content Length not found ')
                continue

            if file_size < 10000:
                logger.info('File is too small')
                continue

            validate = validate_url(pdf_url)

            if validate:
                url_links.append(pdf_url)
            else:
                continue

        result['url_links'] = url_links

    else:
        result['message'] = 'Not results for google search'

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(result)
    }

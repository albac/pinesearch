import logging
from ..blog_generator import get_blog_output, load_and_process_pdf_extra, write_output, upload_to_s3, init_pinecone, create_pinecone_vector_extra
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Union
import pinecone

logger = logging.getLogger()
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())


PROMPT_TEMPLATE = """Write a long summary with subtitles.
Remember the date of publication if exist for the nex prompt.
The output should be a markdown format. Text context information is bellow:


{text}


"""

PROMPT_TEMPLATE_COMBINED = """Write a blog with one main title, subtitles and large subtitle if required, provide any contact info if exist.
Do no use Summary or Contact as main title. The output should be a markdown format.
Mention only one date of publication for the whole blog. Text context information is bellow:


{text}


"""

router = APIRouter()

INDEX_NAME = "summarize1"


class Item(BaseModel):
    pdfurl: str
    filename: str
    bucket_name: str
    prompt_template: Union[str, None] = None
    prompt_template_combined: Union[str, None] = None


@router.post("/")
async def create_item(item: Item):

    filename = item.filename

    texts = load_and_process_pdf_extra(item.pdfurl)

    if not texts:
        return {'message': 'URL PDF failed to load!!'}

    init_pinecone()

    try:
        vectordb = create_pinecone_vector_extra(texts, INDEX_NAME)
    except Exception as e:
        logger.info('Error creating vector: ', e)
        return {'response': 'vector failed!!'}

    try:
        summary = get_blog_output(
            vectordb,
            PROMPT_TEMPLATE,
            PROMPT_TEMPLATE_COMBINED)

    except Exception as e:
        logger.info(f"An error occurred: {str(e)}")
        return {'response': 'summary failed!!'}

    try:
        write_output(summary, filename)
        logger.info('Write summary locally successful!')
    except Exception as e:
        logger.info('Can not write summary locally. Error: ', e)
        return {'message': 'Error: Can not write output locally'}

    try:
        upload_to_s3(filename, item.bucket_name)
        logger.info('File uploaded to s3!')
    except Exception as e:
        logger.info('Failed to write to s3. Error: ', e)
        return {'message': 'Error, failed to upload to s3, see logs.'}

    index = pinecone.Index(INDEX_NAME)
    index.delete(deleteAll='true')

    return {'message': 'Blog creating completed'}

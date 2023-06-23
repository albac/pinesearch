import logging
from .BlogGenerator import BlogGenerator
from fastapi import APIRouter
from pydantic import BaseModel

logger = logging.getLogger()
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())


# PROMPT_TEMPLATE = """Write a long summary with subtitles.
# Remember the date of publication if exist for the nex prompt.
# The output should be a markdown format. Text context information is bellow:
#
#
# {text}
#
#
# """
#
# PROMPT_TEMPLATE_COMBINED = """Write a blog with one main title, subtitles and large subtitle if required, provide any contact info if exist.
# Do no use Summary or Contact as main title. The output should be a markdown format.
# Mention only one date of publication for the whole blog. Text context information is bellow:
#
#
# {text}
#
#
# """

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

prompt_template_summary = """Write a summary of the following article while preserving the first line as the article's title.
The output should have the following structure: 'Title' followed by a line break, then the obtained title, followed by another line break, and finally, a concise summary of no more than 200 characters. Ensure that the summary ends with a complete idea. The 'Title' part should be preceded by the word 'Title,' followed by a line break, the obtained title, another line break, and the concise summary. Text context information is bellow:
{text}
"""


router = APIRouter()

INDEX_NAME = "summarize1"


class PDFData(BaseModel):
    pdf_url: str
    pinecone_index: str
    bucket_name: str


@router.post("/")
async def generate_blog(pdf_data: PDFData):
    bg = BlogGenerator(
        pdf_data.pdf_url,
        prompt_template,
        prompt_template_combined,
        prompt_template_summary,
        pdf_data.pinecone_index,
        pdf_data.bucket_name
    )

    # texts = bg.load_and_process_pdf()
    texts = bg.load_and_process_pdf_extra()
    response = bg.get_blog_output(texts)

    return response

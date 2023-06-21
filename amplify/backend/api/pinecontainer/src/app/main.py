from typing import Union
from langchain.document_loaders import PyPDFLoader
from fastapi import BackgroundTasks, FastAPI
from pydantic import BaseModel
import logging
from blog_generator import get_blog_output, load_and_process_pdf_extra

logger = logging.getLogger("uvicorn")
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


class Item(BaseModel):
    pdfurl: str
    prompt_template: Union[str, None] = None
    prompt_template_combined: Union[str, None] = None


app = FastAPI()


def blog_creation(texts):

    get_blog_output(
            texts,
            PROMPT_TEMPLATE,
            PROMPT_TEMPLATE_COMBINED)

    # total_blog_count = len(output_text)

    # print(total_blog_count)

    # if total_blog_count < 2000:
    #    print('Not enough for a markdown')
    # else:
        # f = open("blog.mdx", "w")
        # f.write(summary['output_text'])
        # f.close()
    #    print('blog_output: ', output_text)


@app.post("/items/")
async def create_item(item: Item, background_tasks: BackgroundTasks):

    response = {}

    texts = load_and_process_pdf_extra(item.pdfurl)

    if not texts:
        return response['message failed!!']


    background_tasks.add_task(blog_creation, texts)

    return {'message': 'Blog creating started'}

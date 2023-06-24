from fastapi import FastAPI
from pydantic import BaseModel
from BlogGenerator import BlogGenerator

app = FastAPI()

class PDFData(BaseModel):
    pdf_url: str
    prompt_template: str
    prompt_template_combined: str
    prompt_template_summary: str
    pinecone_index: str
    bucket_name: str

@app.get("/blog_generator_fields")
def get_blog_generator_fields(pdf_data: PDFData):
    bg = BlogGenerator(
        pdf_data.pdf_url,
        pdf_data.prompt_template,
        pdf_data.prompt_template_combined,
        pdf_data.prompt_template_summary,
        pdf_data.pinecone_index,
        pdf_data.bucket_name
    )
    fields = bg.get_fields()
    return fields

@app.post("/generate_blog")
async def generate_blog(pdf_data: PDFData):
    bg = BlogGenerator(
        pdf_data.pdf_url,
        pdf_data.prompt_template,
        pdf_data.prompt_template_combined,
        pdf_data.prompt_template_summary,
        pdf_data.pinecone_index,
        pdf_data.bucket_name
    )

    texts = bg.load_and_process_pdf()
    bg.get_blog_output(texts)

    return {"message": "Blog generated successfully"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8501)


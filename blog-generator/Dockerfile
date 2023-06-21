FROM python:3.8

MAINTAINER "albac"

ENV PINECONE_API_KEY XXX
ENV PINECONE_ENVIRONMENT us-west4-gcp-free
ENV OPENAI_API_KEY XXX
ENV PDF_URL XXX

WORKDIR /usr/src/app

# Copy and install dependencies first to reuse cache more often
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY blog_generator.py .

ENTRYPOINT ["python", "blog_generator.py"]

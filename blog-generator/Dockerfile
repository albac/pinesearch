FROM python:3.8

MAINTAINER "albac"

ENV PINECONE_API_KEY xxxxxxxx
ENV PINECONE_ENVIRONMENT us-west4-gcp-free
ENV OPENAI_API_KEY xxxxxxx
ENV PDF_URL XXXXX

WORKDIR /usr/src/app

# Copy and install dependencies first to reuse cache more often
COPY requirements.txt .


CMD python3 blog-generator


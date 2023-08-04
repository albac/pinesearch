FROM public.ecr.aws/lambda/python:3.10

ENV PINECONE_API_KEY XXX
ENV PINECONE_ENVIRONMENT us-west4-gcp-free
ENV OPENAI_API_KEY XXX
ENV PDF_URL XXX
ENV API_PINESEARCH_GRAPHQLAPIIDOUTPUT XXXXX
ENV API_PINESEARCH_POSTTABLE_ARN XXXX
ENV API_PINESEARCH_POSTTABLE_NAME XXXX
ENV STORAGE_PINEBLOGS_BUCKETNAME XXXXX
ENV PROMPT_TEMPlATE XXXXX
ENV PROMPT_TEMPLATE_COMBINED XXXXX
ENV LOG_LEVEL debug
ENV GOOGLE_API_KEY XXXXXX
ENV SEARCH_ENGINE_ID XXXXX

RUN yum install -y python-devel openssl-devel libffi-devel gcc-c++ \
                        gcc \
                        libc-dev

RUN pip install -U setuptools pip
COPY ./requirements.txt ./requirements.txt
RUN pip install -r ./requirements.txt

COPY ./app ./app

CMD ["app.app.handler"]

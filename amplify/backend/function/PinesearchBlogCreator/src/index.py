import json
import boto3
import os
from langchain.document_loaders import PyPDFLoader


def handler(event, context):
    print('received event:')
    print(event)

    print('received event:')
    print(json.dumps(event))

    body = json.loads(event['body'])

    print('BODY: ', json.dumps(body))

    pdf_url = body['pdfURL']

    print(pdf_url)

    loader = PyPDFLoader(pdf_url)
    pages = loader.load_and_split()

    results = {}

    results['PageOne'] = pages[0]

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(results)
    }

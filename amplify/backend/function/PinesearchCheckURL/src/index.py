import json
import boto3
import os
from googleapiclient.discovery import build
from datetime import datetime, timedelta
from time import sleep
import requests


ssm = boto3.client('ssm')

## test

GOOGLE_API_KEY = os.environ['GOOGLE_API_KEY']
GOOGLE_API_KEY_VALUE = ssm.get_parameter(
    Name=GOOGLE_API_KEY,
    WithDecryption=True
)['Parameter']['Value']

SEARCH_ENGINE_ID = os.environ['SEARCH_ENGINE_ID']


def get_search_items(query, num_results=10):

    # Calculate the date range for the past day
    end_date = datetime.now()
    start_date = end_date - timedelta(days=300)

    service = build(
        "customsearch", "v1",
        developerKey=GOOGLE_API_KEY_VALUE)

    try:
        res = service.cse().list(
            q=query,
            cx=SEARCH_ENGINE_ID,
            fileType='pdf',
            num=num_results,
            sort=f'date:r:{start_date.strftime("%Y%m%d")}:{end_date.strftime("%Y%m%d")}'
        ).execute()
    except Exception:
        print('Google search failed')
        return False

    print('Response: ', res)

    items = res.get('items', [])

    return items


def handler(event, context):
    print('received event:')
    print(json.dumps(event))

    body = json.loads(event['body'])

    print('BODY: ', json.dumps(body))

    query = body['query']

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
                print('Error', e)
                continue
            url_links.append(pdf_url)

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

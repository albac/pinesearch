
import json
import uuid
import urllib.parse
import boto3
import logging
import os
import time
from datetime import datetime


s3 = boto3.client('s3')
logger = logging.getLogger()
logger.setLevel(logging.INFO)
dynamodb = boto3.resource('dynamodb')
TABLE = 'Post-5d4z66ql5rbmzpdsinuz3tiezy-dev'


def handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))

    # Get the object from the event and show its content type
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(
            event['Records'][0]['s3']['object']['key'], encoding='utf-8')
    try:
        response = s3.head_object(Bucket=bucket, Key=key)
        logger.info('Response: {}'.format(response))
        print(json.dumps(response['Metadata']))

    except Exception as e:
        print(e)
        print('Error getting object {} from bucket {}. Make sure they exist and your bucket is in the same region as this function.'.format(key, bucket))
        raise e

    # url = response['Metadata']['url']
    filename = '%s' % os.path.basename(key)
    s3url = os.path.splitext(filename)[0]

    # get current datetime
    today = datetime.now()
    print('Today Datetime:', today)

    # Get current ISO 8601 datetime in string format
    iso_date = today.isoformat()
    print('ISO DateTime:', iso_date)

    ts = time.time()

    ts_string = str(ts).split('.')

    summary_str = str(response['Metadata']['resumen']).split(':')

    item = {}

    item['title'] = response['Metadata']['titulo']
    item['summary'] = summary_str[1]
    item['s3url'] = s3url
    item['createdAt'] = iso_date
    item['updatedAt'] = iso_date
    item['_lastChangedAt'] = ts_string[0]
    item['_version'] = 1
    item['__typename'] = 'Post'
    item['id'] = str(uuid.uuid4())

    # table name
    table = dynamodb.Table(TABLE)

    # inserting values into table
    response = table.put_item(
       Item=item
    )

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps('Hello from your new Amplify Python lambda!')
    }


import json
import uuid
import urllib.parse
import boto3
import logging
import os
import time
from datetime import datetime, timezone


s3 = boto3.client('s3')
logger = logging.getLogger()
logger.setLevel(logging.INFO)
dynamodb_client = boto3.client('dynamodb')
TABLE = 'Post-5d4z66ql5rbmzpdsinuz3tiezy-dev'


def isoformat_js(dt: datetime):
    return (
        dt.astimezone(timezone.utc)
        .isoformat(timespec="milliseconds")
        .replace("+00:00", "Z")
    )


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

    filename = '%s' % os.path.basename(key)
    s3url = os.path.splitext(filename)[0]

    ts = time.time()

    ts_number = str(ts).replace('.', '')

    summary_str = str(response['Metadata']['resumen']).split(':')

    iso_date = str(isoformat_js(datetime(2014, 7, 24, 0, 19, 37, 439000)))

    print('ISO DateTime:', iso_date)

    str_id = str(uuid.uuid4())

    item = {
        'id': {'S': str_id},
        'createdAt': {'S': iso_date},
        's3url': {'S': s3url},
        'summary': {'S': summary_str[1]},
        'title': {'S': response['Metadata']['titulo']},
        'updatedAt': {'S': iso_date},
        '_lastChangedAt': {'N': ts_number},
        '_version': {'N': '1'},
        '__typename': {'S': 'Post'}
    }

    # inserting values into table
    response = dynamodb_client.put_item(
       TableName=TABLE,
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

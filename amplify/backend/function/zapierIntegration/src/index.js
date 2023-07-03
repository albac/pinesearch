/* Amplify Params - DO NOT EDIT
  API_PINESEARCH_GRAPHQLAPIIDOUTPUT
  API_PINESEARCH_POSTTABLE_ARN
  API_PINESEARCH_POSTTABLE_NAME
  ENV
  REGION
  STORAGE_PINEBLOGS_BUCKETNAME
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

import { default as fetch, Request } from "node-fetch";

const discordEventId = process.env.ZAPER_ACTION_DISCORD_ID ?? "";

const zapier_key = process.env.ZAPIER_API_KEY ?? "";

// console.log(`DISCORD: ${discordEventId}`);

const ZAPIER_ENDPOINT = `https://nla.zapier.com/api/v1/dynamic/exposed/${discordEventId}/execute/`;

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  for (const record of event.Records) {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log("DynamoDB Record: %j", record.dynamodb);
  }

  const title = record.dynamodb.NewImage.title.S;

  const name_mdx = record.dynamodb.NewImage.s3url.S;

  const url = `https://www.pinesearch.io/blog/${name_mdx}`;

  const options = {
    method: "POST",
    headers: {
      "x-api-key": zapier_key
    },
    body: JSON.stringify({
      instructions: `Send a message to the discord channel to Checkout the latest blog post titled: ${title}, access it here: ${url}`
    })
  };

  const request = new Request(ZAPIER_ENDPOINT, options);

  try {
    // discord - zapier
    const response = await fetch(request);
    const body = await response.json();
    console.log("result: ", body);
    if (body.errors) statusCode = 400;
  } catch (error) {
    statusCode = 400;
    body = {
      errors: [
        {
          status: response.status,
          message: error.message,
          stack: error.stack
        }
      ]
    };
  }

  return {
    statusCode,
    body: JSON.stringify(body)
  };
};

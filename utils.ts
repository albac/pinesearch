import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { BufferWindowMemory } from "langchain/memory";
import { OpenAI } from "langchain/llms/openai";
import { loadQAStuffChain } from "langchain/chains";
import { Document } from "langchain/document";
import { timeout, indexName } from "./pinecone-config";
import { Storage, Amplify } from "aws-amplify";
// Amplify.Logger.LOG_LEVEL = "DEBUG";
import awsconfig from "@/aws-exports";

Amplify.configure({ ...awsconfig, ssr: true });

import { Credentials } from "@aws-amplify/core";

import S3 from "aws-sdk/clients/s3";

import { S3Customizations } from "aws-sdk/lib/services/s3";

export const createPineconeIndex = async (client: any, vectorDimension: any) => {
  // Initiate index existence check
  //console.log(`Checking ${indexName}...`);

  // Get existing indexes
  const existingIndexes = await client.listIndexes();

  // if index doesn't exist create it
  if (!existingIndexes.includes(indexName)) {
    //console.log(`Creating ${indexName}...`);

    await client.createIndex({
      createRequest: {
        name: indexName,
        dimension: vectorDimension,
        metric: "cosine"
      }
    });

    // wait for initialization, using a dummy timeout method
    await new Promise((resolve) => setTimeout(resolve, timeout));
  } else {
    //console.log(`${indexName} already exists`);
  }
};

export const updatePinecone = async (client: any, docs: any) => {
  // retrieve pinecone index
  const index = client.Index(indexName);

  // process all docs to be added to the index
  for (const doc of docs) {
    //console.log(`Processing document: ${doc.metadata.source}`);

    const txtPath = doc.metadata.source;
    const text = doc.pageContent;

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000
    });

    // split text into chunks
    const chunks = await textSplitter.createDocuments([text]);

    //console.log(`Text split into ${chunks.length} chunks`);

    // create openAI embeddings for documents
    const embeddingsArrays = await new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY
    }).embedDocuments(chunks.map((chunk) => chunk.pageContent.replace(/\n/g, " ")));

    // create and upsert vectors in bactches of 100
    // 100 seems to  be the recommended batch size
    const batchSize = 100;
    let batch: Array<any> = [];

    for (let idx = 0; idx < chunks.length; idx++) {
      const chunk = chunks[idx];

      const vector = {
        id: `${txtPath}_${idx}`,
        values: embeddingsArrays[idx],
        metadata: {
          ...chunk.metadata,
          loc: JSON.stringify(chunk.metadata.loc),
          pageContent: chunk.pageContent,
          txtPath: txtPath
        }
      };

      batch = [...batch, vector];

      // when batch size is full or it's the last item, upsert the vectors
      if (batch.length === batchSize || idx === chunks.length - 1) {
        await index.upsert({
          upsertRequest: {
            vectors: batch
          }
        });

        // empty the batch
        batch = [];
      }
    }
  }
};

export const queryPineconeVectorStoreAndQueryLLM = async (client: any, question: any) => {
  const extractS3KeyFromSource = (source: string) => {
    const fileName = source.split("/").pop();
    return `public/mdx/${fileName}`;
  };

  const fetchTituloFromS3 = async (s3Key: string) => {
    const credentials = await Credentials.get();
    const s3 = new S3({
      apiVersion: "2006-03-01",
      params: { Bucket: awsconfig.aws_user_files_s3_bucket },
      signatureVersion: "v4",
      region: awsconfig.aws_user_files_s3_bucket_region,
      credentials: credentials
    });

    const params = {
      Bucket: awsconfig.aws_user_files_s3_bucket,
      Key: s3Key
    };

    try {
      const metaData = await s3.headObject(params).promise();
      return metaData.Metadata?.titulo || null;
    } catch (error) {
      console.log("Error fetching metadata for", s3Key, error);
      return null;
    }
  };

  //console.log(`This is the QUESTION!!: ${question}`);

  const index = client.Index(indexName);

  // Creating an embedding for the query
  const queryEmbedding = await new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY
  }).embedQuery(question);
  // Query Pinecone
  const queryResponse = await index.query({
    queryRequest: {
      topK: 5,
      vector: queryEmbedding,
      includeMetadata: true,
      includeValues: true
    }
  });
  const matchesFound = queryResponse.matches.length;

  const matches = queryResponse.matches;
  // console.log(matches);
  const matchedDocsMetadata = matches.map((match: any) => match.metadata);

  // Update each matched document with titulo from S3
  for (const doc of matchedDocsMetadata) {
    const s3Key = extractS3KeyFromSource(doc.source);
    const titulo = await fetchTituloFromS3(s3Key);
    if (titulo) {
      doc.title = titulo;
    }
  }

  // console.dir(matchedDocsMetadata[0]);

  // console.log(`Total ${matchesFound} matches found...`);

  const memory = new BufferWindowMemory({ k: 3 });
  // const model = "gpt-4"
  const { OpenAI } = require("langchain/llms/openai");

  if (matchesFound) {
    const llm = new OpenAI({
      //modelName: model,
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0,
      maxTokens: 200,
      memory: memory
    });
    const chain = loadQAStuffChain(llm);

    // Extract the content of the matches
    const concatenatedPageContent = queryResponse.matches
      .map((match: any) => match.metadata.text)
      .join(" ");

    // console.log(`Concatenated: ${concatenatedPageContent}`);

    const result = await chain.call({
      input_documents: [new Document({ pageContent: concatenatedPageContent })],
      question
    });

    // console.log(`Result: ${result}`);

    return {
      resultString: result.text,
      resultArray: matchedDocsMetadata
    };
  }

  return {
    resultString: null,
    resultArray: []
  };
};

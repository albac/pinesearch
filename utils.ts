import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { OpenAI } from 'langchain/llms/openai'
import { loadQAStuffChain } from 'langchain/chains'
import { Document } from 'langchain/document'
import { timeout, indexName } from './pinecone-config'

export const createPineconeIndex = async (
    client: any,
    vectorDimension: any
) => {
    // Initiate index existence check
    console.log(`Checking ${indexName}...`)
    
    // Get existing indexes
    const existingIndexes = await client.listIndexes()

    // if index doesn't exist create it
    if (!existingIndexes.includes(indexName)) {
        console.log(`Creating ${indexName}...`)

        await client.createIndex({
            createRequest: {
                name: indexName,
                dimension: vectorDimension,
                metric: 'cosine'
            }
        })

        // wait for initialization, using a dummy timeout method
        await new Promise((resolve) => setTimeout(resolve, timeout))
    } else {
        console.log(`${indexName} already exists`)
    }
}

export const updatePinecone = async (client: any, docs: any) => {
    // retrieve pinecone index
    const index = client.Index(indexName)

    // process all docs to be added to the index
    for (const doc of docs) {
        console.log(`Processing document: ${doc.metadata.source}`)

        const txtPath = doc.metadata.source
        const text = doc.pageContent

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000
        })

        // split text into chunks
        const chunks = await textSplitter.createDocuments([text])

        console.log(`Text split into ${chunks.length} chunks`)

        // create openAI embeddings for documents
        const embeddingsArrays = await new OpenAIEmbeddings().embedDocuments(
            chunks.map((chunk) => chunk.pageContent.replace(/\n/g, " "))
        )

        // create and upsert vectors in bactches of 100
        // 100 seems to  be the recommended batch size
        const batchSize = 100
        let batch: Array<any> = []

        for (let idx = 0; idx < chunks.length; idx++) {
            const chunk = chunks[idx]
            
            const vector = {
                id: `${txtPath}_${idx}`,
                values: embeddingsArrays[idx],
                metadata: {
                    ...chunk.metadata,
                    loc: JSON.stringify(chunk.metadata.loc),
                    pageContent: chunk.pageContent,
                    txtPath: txtPath
                }
            }

            batch = [...batch, vector]

            // when batch size is full or it's the last item, upsert the vectors
            if (batch.length === batchSize || idx === chunks.length - 1) {
                await index.upsert({
                    upsertRequest: {
                        vectors: batch
                    }
                })

                // empty the batch
                batch = []
            }
        }
    }
}

export const queryPineconeVectorStoreAndQueryLLM = async (
    client: any,
    question: any
) => {
    console.log('Querying Pinecone vector store...')
    console.log(question)
    // retrieve the index
    const index = client.Index(indexName)
    console.log('0')
    // create query embedding
    const queryEmbedding = await new OpenAIEmbeddings().embedQuery(question)
    console.log('1')
    // query pinecone
    const queryResponse = await index.query({
        queryRequest: {
            topK: 10,
            vector: queryEmbedding,
            includeMetadata: true,
            includeValues: true
        }
    })
    console.log('2')
    const matchesFound = queryResponse.matches.length

    console.log(`Found ${matchesFound} matches...`)

    if (matchesFound) {
        const llm = new OpenAI({})
        const chain = loadQAStuffChain(llm)

        // extract and concatenate page content from matched documents
        const concatenatedPageContent = queryResponse.matches
            .map((match: any) => match.metadata.pageContent)
            .join(" ")

        const result = await chain.call({
            input_documents: [new Document({ pageContent: concatenatedPageContent })],
            question
        })

        return result.text
    }
}
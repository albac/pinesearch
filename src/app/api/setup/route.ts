import { NextResponse } from 'next/server'
import { PineconeClient } from '@pinecone-database/pinecone'
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory'
import { createPineconeIndex, updatePinecone } from '../../../../utils'

export async function POST() {
    // TODO: Where do we want to load documents in from?
    // right now we just have directory in the root of the project
    const loader = new DirectoryLoader('./documents', {
        ".mdx": (path) => new TextLoader(path)
    })

    const docs = await loader.load()
    const vectorDimensions = 1536

    const client = new PineconeClient()

    await client.init({
        apiKey: process.env.PINECONE_API_KEY || '',
        environment: process.env.PINECONE_ENVIRONMENT || ''
    })

    const shouldUpdate = process.env.UPDATE_PINECONE

    try {
        await createPineconeIndex(client, vectorDimensions)

        if (shouldUpdate) {
            console.log(`Updating pinecone index...`)
            await updatePinecone(client, docs)
        }
    } catch (e) {
        const typedError = e as Error
        console.log(`Error in setup route - ${typedError.message}`)
    }

    return NextResponse.json({
        data: `Successfully created index and loaded data into pinecone`
    })
}
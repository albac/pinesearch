import { NextResponse } from 'next/server'
import { PineconeClient } from '@pinecone-database/pinecone'
import { queryPineconeVectorStoreAndQueryLLM } from '../../../../utils'

export async function POST(req: Request) {
    const body = await req.json()
    console.log('body: ', body)
    const client = new PineconeClient()

    await client.init({
        apiKey: process.env.PINECONE_API_KEY || '',
        environment: process.env.PINECONE_ENVIRONMENT || ''
    })

    try {
        const text = await queryPineconeVectorStoreAndQueryLLM(client, body.question)
        return NextResponse.json({ data: text })
    } catch (e) {
        console.log('here in error?')
        const typedError = e as Error
        console.log(`Error querying pinecone - ${typedError.message}`)
        return NextResponse.json({ error: typedError.message }, { status: 404 })
    }
}
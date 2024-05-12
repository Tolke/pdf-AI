import { NextRequest } from 'next/server';
import { LangChainStream, StreamingTextResponse } from "ai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { CallbackManager } from "@langchain/core/callbacks/manager";
import { VectorDBQAChain } from "langchain/chains";

export async function POST(req: NextRequest) {
    const { messages } = await req.json();
    const query = messages[messages.length - 1].content;
    const { stream, handlers } = LangChainStream();

    // initialize Pinecone
    const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);
    const vectorStore = await PineconeStore.fromExistingIndex(new OpenAIEmbeddings(), {
        pineconeIndex: index,
        namespace: 'users/user_2gCJu86Fob9SD02Ccd3yNwdlXN0/1715526260940-Tony_Robbins.pdf'
    });

    // Open AI model
    const model = new OpenAI({
        modelName: "gpt-3.5-turbo",
        streaming: true,
        callbackManager: CallbackManager.fromHandlers(handlers)
    })

    // Langchain Vector
    const chain = VectorDBQAChain.fromLLM(model, vectorStore, { k: 3, returnSourceDocuments: true });

    // Call chains
    chain.call({ query }).catch(console.error);

    return new StreamingTextResponse(stream)
}
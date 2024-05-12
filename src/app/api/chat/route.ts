import { NextRequest } from 'next/server';
import { LangChainStream, StreamingTextResponse } from "ai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { CallbackManager } from "@langchain/core/callbacks/manager";
import { VectorDBQAChain } from "langchain/chains";
import { Role } from "@prisma/client";
import prismaDb from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    const { userId } = auth();
    if (!userId) {
        return new Response("Unauthorized", { status: 401 });
    }
    const { messages, fileKey, documentId } = await req.json();
    const query = messages[messages.length - 1].content;
    const { stream, handlers } = LangChainStream();

    await saveMessage(documentId, "user", query, userId)

    // initialize Pinecone
    const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);
    const vectorStore = await PineconeStore.fromExistingIndex(new OpenAIEmbeddings(), {
        pineconeIndex: index,
        namespace: fileKey
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
    chain.call({ query }).then(async (res) => {
        if (res) {
            await saveMessage(documentId, "assistant", res.text, userId)
        }
    }).catch(console.error);

    return new StreamingTextResponse(stream)
}

async function saveMessage(documentId: string, role: Role, content: string, userId: string) {
    const document = await prismaDb.document.update({
        where: { id: documentId, userId },
        data: {
            messages: {
                create: {
                    role,
                    content
                }
            }
        }
    });
}
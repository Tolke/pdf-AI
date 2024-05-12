"use server";

import { auth } from "@clerk/nextjs/server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Document } from "@langchain/core/documents";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { convertToPlainObj } from "@/lib/utils";

export const embedPDFtoPinecone = async (fileKey: string) => {
    const { userId = '' } = auth();

    if (!userId) {
        throw new Error("User not authenticated")
    }

    if (!fileKey) {
        throw new Error("File key is required");
    }


    const fileUrl = `https://${ process.env.NEXT_PUBLIC_S3_BUCKET_NAME }.s3.${ process.env.NEXT_PUBLIC_S3_BUCKET_REGION }.amazonaws.com/${ fileKey }`;
    let pdfFile = await fetch(fileUrl);


    // Step 1. Split text in chunks
    const blob = new Blob([await pdfFile.arrayBuffer()], { type: 'application/pdf' });
    const loader = new PDFLoader(blob);
    const docs = await loader.load();

    // Trim metadata in the document
    const trimmedDocs = docs.map((doc) => {
        const { metadata, ...rest } = doc;

        delete metadata.pdf;

        return new Document({ pageContent: rest.pageContent, metadata });
    });

    // Step 2. Split documents into smaller chunks
    const splitter = new CharacterTextSplitter({ separator: " ", chunkSize: 750, chunkOverlap: 50 });
    const splitDocs = await splitter.splitDocuments(trimmedDocs);

    // Step 3. Upload chunks to Pinecone
    const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

    await PineconeStore.fromDocuments(splitDocs, new OpenAIEmbeddings(), { pineconeIndex: index, namespace: fileKey });

    return splitDocs.map(convertToPlainObj);
}

export const deletePineconeIndex = async (fileKey: string) => {
    const { userId = '' } = auth();

    if (!userId) {
        throw new Error("User not authenticated")
    }

    if (!fileKey) {
        throw new Error("File key is required");
    }

    const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

    const vectorStore = await PineconeStore.fromExistingIndex(new OpenAIEmbeddings(), {
        pineconeIndex: index,
        namespace: fileKey
    });

    await vectorStore.delete({ deleteAll: true });
}
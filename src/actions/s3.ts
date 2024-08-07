"use server";

import { currentUser } from "@clerk/nextjs/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const generatePreSignedUrl = async (fileName: string, fileType: string | null) => {
    // @ts-ignore
    const { id: userId = '' } = await currentUser();

    if (!userId) {
        throw new Error("User not authenticated")
    }

    if (!fileName || !fileType) {
        throw new Error("File name and file type are required");
    }

    if (!userId) {
        throw new Error("User not authenticated")
    }

    const fileKey = `users/${ userId }/${ Date.now() }-${ fileName }`;
    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: fileKey,
        ContentType: fileType,
    });

    // Initialize the S3 client
    const client = new S3Client({
        region: process.env.NEXT_PUBLIC_S3_BUCKET_REGION!,
        credentials: {
            accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
            secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY_ID!,
        }
    });
    const putUrl = await getSignedUrl(client, putObjectCommand, { expiresIn: 60 });

    return { putUrl, fileKey };
}

export const deleteS3File = async (fileKey: string) => {
    const client = new S3Client({
        region: process.env.NEXT_PUBLIC_S3_BUCKET_REGION!,
        credentials: {
            accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
            secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY_ID!,
        }
    });

    if (!fileKey) {
        throw new Error("File key is required");
    }

    await client.send(new DeleteObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: fileKey,
    }));
}
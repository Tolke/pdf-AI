"use server";

import { currentUser } from "@clerk/nextjs/server";
import prismaDb from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createDocument = async (fileName: string, fileSize: number, fileKey: string) => {
    const user = await currentUser();

    if (!user || !user.id) {
        throw new Error("User not authenticated")
    }

    const document = await prismaDb.document.create({
        data: {
            userId: user.id,
            userName: user.firstName ?? '',
            fileName,
            fileSize,
            fileKey,
        }
    });

    revalidatePath('/documents');

    return { document };
}

export const getDocument = async (documentId: string) => {
    const user = await currentUser();

    if (!user || !user.id) {
        throw new Error("User not authenticated")
    }

    const document = await prismaDb.document.findUnique({
        where: {
            id: documentId,
            userId: user.id
        },
        include: {
            messages: {
                orderBy: { createdAt: "asc" }
            }
        }
    });

    return { document };
}

export const updateDocument = async (documentId: string, formData: FormData) => {
    const user = await currentUser();

    if (!user || !user.id) {
        throw new Error("User not authenticated")
    }

    const fileName = formData.get('fileName') as string;

    await prismaDb.document.update({
        where: { id: documentId, userId: user.id },
        data: { fileName }
    });

    revalidatePath('/documents');
}

export const deleteDocument = async (documentId: string) => {
    const user = await currentUser();

    if (!user || !user.id) {
        throw new Error("User not authenticated")
    }

    await prismaDb.document.delete({ where: { id: documentId, userId: user.id } });

    revalidatePath('/documents');
}
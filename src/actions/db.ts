"use server";

import { currentUser } from "@clerk/nextjs/server";
import prismaDb from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createDocument = async (fileName: string, fileSize: number, fileKey: string) => {
    const user = await currentUser();

    if (!user || user.id || !user.firstName) {
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

    return document;
}

export const getDocument = async (id: string) => {
    const user = await currentUser();

    if (!user || !user.id) {
        throw new Error("User not authenticated")
    }

    const document = await prismaDb.document.findUnique({ where: { id, userId: user.id } });

    return { document };
}
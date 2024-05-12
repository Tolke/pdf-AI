import React from "react";
import PDFViewer from "@/components/PDFViewer";
import Chat from "@/components/Chat";
import { redirect } from "next/navigation";
import { getDocument } from "@/actions/db";

interface Props {
    params: {
        id: string;
    }
}

const ChatPage = async ({ params: { id } }: Props) => {
    const { document } = await getDocument(id);

    if (!document) {
        redirect("/documents")
    }

    const s3Url = `https://${ process.env.NEXT_PUBLIC_S3_BUCKET_NAME }.s3.${ process.env.NEXT_PUBLIC_S3_BUCKET_REGION }.amazonaws.com/${ document.fileKey }`;

    return (
        <div className="flex">
            <PDFViewer url={ s3Url }/>
            <Chat document={ document }/>
        </div>
    )

}

export default ChatPage;
"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, UploadCloud, X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { generatePreSignedUrl } from "@/actions/s3";
import { checkFileSize, checkFileType, getPDFFileNameFromUrl, showToast } from "@/lib/utils";
import { PROXY_IO } from "@/constants";
import { embedPDFtoPinecone } from "@/actions/pinecone";
import { createDocument } from "@/actions/db";
import { useRouter } from "next/navigation";

const UploadPDF = () => {
    const [file, setFile] = useState<File | null>(null);
    const [url, setUrl] = useState<string>("");
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const onDrop = useCallback((acceptedFiles: File[]) => {
        try {
            const pdfFile = acceptedFiles[0];

            if (!pdfFile) {
                showToast("Please upload only PDF file.")
                return;
            }
            checkFileType(pdfFile.type);
            checkFileSize(pdfFile.size, 10);
            setFile(pdfFile);
            setUrl("");
            setIsButtonEnabled(true);
        } catch (error: any) {
            showToast(error.message);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: { "application/pdf": [".pdf"] }, multiple: false, onDrop,
    });

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
        setFile(null);
        setIsButtonEnabled(e.target.value !== "");
    };

    const handleRemoveFile = () => {
        setFile(null);
        setIsButtonEnabled(false);
    };

    const resetForm = () => {
        setFile(null);
        setUrl("");
        setIsButtonEnabled(false);
    };

    const handleOpenDialog = () => {
        setOpen(!open);
        resetForm();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let fileS3Key = "";

        try {
            setIsLoading(true);
            // Handle form submission here.
            if (file) {
                await processPdf(file, file.name, file.size, file.type);
            } else if (url) {
                const fileName = getPDFFileNameFromUrl(url);
                const proxyUrl = `${ PROXY_IO }/?${ url }`;
                const response = await fetch(proxyUrl);
                const fileSize = Number(response.headers.get("Content-Length"));
                const fileType = response.headers.get("Content-Type") ?? '';

                checkFileSize(fileSize, 10);
                checkFileType(fileType);

                const blob = await response.blob();
                await processPdf(blob, fileName, fileSize, fileType);
            }

            // Upload Embed PDF to Pinecone
            const docs = await embedPDFtoPinecone(fileS3Key);
            console.log("Embedded PDF to Pinecone: ", docs);
        } catch (error: any) {
            showToast(error.message);
        } finally {
            resetForm();
            setIsLoading(false);
        }
    };

    const processPdf = async (file: File | Blob, fileName: string, fileSize: number, fileType: string) => {
        const { putUrl, fileKey } = await generatePreSignedUrl(fileName, fileType);

        await uploadPDFtoS3(file, putUrl);
        await embedPDFtoPinecone(fileKey);

        // create document in the database
        // @ts-ignore
        const { document } = await createDocument(fileName, fileSize, fileKey);

        // redirect to the document page
        if (document) {
            router.push(`/documents/${ document.id }`);
        }


    }

    const uploadPDFtoS3 = async (file: File | Blob, putUrl: string) => {
        const uploadResponse = await fetch(putUrl, {
            method: "PUT", body: file, headers: { "Content-Type": "application/pdf" },
        });

        console.log("Upload response: ", uploadResponse);
    }


    return (<Dialog open={ open } onOpenChange={ handleOpenDialog }>
        <DialogTrigger asChild>
            <Button variant="orange">
                <Upload className="w-4 h-4 mr-2" style={ { strokeWidth: "3" } }/>
                Upload
            </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Upload a document</DialogTitle>
            </DialogHeader>

            <form onSubmit={ handleSubmit } className="space-y-6">
                <div className="bg-white rounded-xl">
                    <div className="border-dashed border-2 rounded-md bg-gray-50 h-36 w-full">
                        { file ? (<div className="h-full flex justify-center items-center text-black/70">
                  <span className="overflow-hidden whitespace-nowrap text-ellipsis text-sm max-w-[200px]">
                    { file?.name }
                  </span>
                            <button
                                className="ml-1 cursor-pointer"
                                onClick={ handleRemoveFile }
                            >
                                <X className="w-4 h-4"/>
                            </button>
                        </div>) : (<div
                            { ...getRootProps() }
                            className="h-full flex flex-col justify-center items-center cursor-pointer"
                        >
                            <input name="file" { ...getInputProps() } />
                            <UploadCloud className="w-10 h-10 text-[#ff612f]"/>
                            <p className="mt-2 text-sm text-slate-400">
                                Drag and drop a PDF file here or click
                            </p>
                        </div>) }
                    </div>
                </div>

                <div className="flex items-center">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink mx-4 uppercase text-gray-600 text-xs">
                    or
                    </span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="url">Import from URL</Label>
                    <Input
                        id="url"
                        name="url"
                        value={ url }
                        onChange={ handleUrlChange }
                        className="font-light"
                        placeholder="https://cdn.openai.com/papers/gpt-4.pdf"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button type="submit" variant="orange" disabled={ !isButtonEnabled || isLoading }>
                        { !isLoading ? "Upload" :
                            <Loader2 className="h-5 w-5 text-white/80 animate-spin" style={ { strokeWidth: "3" } }/> }

                    </Button>
                    <DialogTrigger asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogTrigger>
                </div>
            </form>
        </DialogContent>
    </Dialog>)
};

export default UploadPDF;

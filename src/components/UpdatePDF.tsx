"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Pencil } from "lucide-react";
import React, { useState } from "react";
import { Document } from "@prisma/client";
import { updateDocument } from "@/actions/db";

interface Props {
    document: Document
}

const UpdatePDF = ({ document }: Props) => {
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [documentName, setDocumentName] = useState<string>('');

    const handleOpenDialog = () => {
        setOpen(!open);
        setDocumentName(document.fileName);
    };

    const handlerDocumentName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDocumentName(e.target.value);
        setIsButtonEnabled(e.target.value !== '');
    }

    const updateDocumentWithId = updateDocument.bind(null, document.id);

    return (<Dialog open={ open } onOpenChange={ handleOpenDialog }>
        <DialogTrigger asChild>
            <Pencil className="w-4 h-4 cursor-pointer" style={ { strokeWidth: "3" } }/>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={ (e) => e.preventDefault() }>
            <DialogHeader>
                <DialogTitle>Update document</DialogTitle>
            </DialogHeader>

            <form action={updateDocumentWithId} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="url">Name</Label>
                    <Input
                        id="documentName"
                        name="fileName"
                        value={ documentName }
                        onChange={ handlerDocumentName }
                        className="font-light"
                        placeholder=""
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button type="submit" variant="orange" disabled={ !isButtonEnabled || isLoading }>
                        { !isLoading ? "Update" :
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

export default UpdatePDF;

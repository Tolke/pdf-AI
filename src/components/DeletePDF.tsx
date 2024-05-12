"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Document } from "@prisma/client";
import SubmitButton from "@/components/SubmitButton";

interface Props {
    document: Document
}

const DeletePDF = ({ document }: Props) => {
    const [open, setOpen] = useState(false);


    return (<Dialog open={ open } onOpenChange={ setOpen }>
        <DialogTrigger asChild>
            <Trash2 className="w-4 h-4 cursor-pointer" style={ { strokeWidth: "3" } }/>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Delete document</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col mb-2">
                <span className="text-sm mb-4">
                    Do you want to delete the following document?
                </span>
                <span className="text-sm font-semibold border-black border-l-2 px-2 whitespace-nowrap w-20">
                    { document.fileName }
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <SubmitButton isButtonEnabled={ true } title="Delete"/>
                <DialogTrigger asChild>
                    <Button variant="secondary">Cancel</Button>
                </DialogTrigger>
            </div>

        </DialogContent>
    </Dialog>)
};

export default DeletePDF;

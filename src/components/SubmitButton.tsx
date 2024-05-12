"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom"

interface Props {
    isButtonEnabled: boolean;
    title: string;
}

const SubmitButton = ({ isButtonEnabled, title }: Props) => {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" variant="orange" disabled={ !isButtonEnabled || pending }>
            { !pending ? `${ title }` :
                <Loader2 className="h-5 w-5 text-white/80 animate-spin" style={ { strokeWidth: "3" } }/> }
        </Button>
    );
};

export default SubmitButton;

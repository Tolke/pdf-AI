import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "react-toastify"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getPDFFileNameFromUrl(url: string) {
    const fileUrl = _getUrl(url);
    const fileName = fileUrl.pathname.split("/").pop();
    const extension = fileName?.split(".").pop();

    if (extension !== "pdf") {
        throw new Error("Invalid file extension")
    }

    return decodeURIComponent(<string>fileName);
}

export function checkFileSize(size: number, maxSize: number) {
    const maxSizeInBytes = maxSize * 1024 * 1024;

    if (size > maxSizeInBytes) {
        throw new Error(`Max file size: ${maxSize}Mb`)
    }

    return true;
}

export function checkFileType(fileType: string | null) {
    const validTypes = ["application/pdf"];

    if (!fileType || !validTypes.includes(fileType)) {
        throw new Error("Invalid file type")
    }

    return true;
}

export function showToast(message: string) {
    toast.error(message, { position: 'top-right' })

}

function _getUrl(url: string | URL) {
    try {
        return new URL(url)
    } catch (error) {
        throw new Error("Invalid URL")
    }
}
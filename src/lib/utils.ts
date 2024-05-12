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
        throw new Error(`Max file size: ${ maxSize }Mb`)
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

export function serialize(obj: any) {
    return Object.keys(obj).map(key => `${ key }=${ obj[key] }`).join("&")
}

export function convertToPlainObj(obj: any) {
    return JSON.parse(JSON.stringify(obj));
}

export function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function _getUrl(url: string | URL) {
    try {
        return new URL(url)
    } catch (error) {
        throw new Error("Invalid URL")
    }
}
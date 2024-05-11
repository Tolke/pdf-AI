import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import React from "react";
import { ClerkProvider } from '@clerk/nextjs'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
    subsets: ["latin"],
    display: "swap",
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    style: "normal"
});

export const metadata: Metadata = {
    title: "PDF Wisdom",
    description: "Chat with any PDF document",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <ClerkProvider>
            <html lang="es">
                <body className={ poppins.className }>
                <div className="bg-[#faf9f6]">{ children }</div>
                <ToastContainer />
                </body>
            </html>
        </ClerkProvider>
    );
}

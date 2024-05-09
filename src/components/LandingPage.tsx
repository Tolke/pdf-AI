"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { BookOpenCheck } from "lucide-react";
import { SiFacebook, SiTwitter, SiYoutube } from "@icons-pack/react-simple-icons";
import TypewriterComponent from "typewriter-effect";

const LandingPage = () => {
    return (
        <>
            {/* Hero */ }
            <section className="bg-[#062427]">
                <div className="section-container flex flex-col text-white md:flex-row items-center">
                    {/* Left */ }
                    <div className="flex flex-col mb-32 space-y-12 text-center md:w-1/2 md:text-left">
                        <h1 className="max-w-md text-4xl md:text-5xl md:leading-tight">Chat with any PDF document</h1>

                        <div className="text-3xl font-light text-orange-400">
                            <TypewriterComponent
                                options={ {
                                    strings: [
                                        "Books",
                                        "Scientific papers",
                                        "Financial reports",
                                        "User manuals",
                                        "Legal documents"
                                    ],
                                    autoStart: true,
                                    loop: true
                                } }
                            />
                        </div>

                        <p className="max-w-md md:max-w-sm text-white/80 font-light leading-7">
                            From legal agreements to financial reports, PDF Wisdom brings your documents to life. You
                            can ask questions, get summaries, find information, and more.
                        </p>

                        <div>
                            <div className="flex justify-center md:justify-start">
                                <Button variant="orange">Get started for free</Button>
                            </div>

                            <div className="flex justify-start mt-6">
                                <img className="h-6 w-6  my-auto object-cover rounded-full ring-2 ring-green-950"
                                       src="/user_1.jpeg" alt=""/>
                                <img className="h-6 w-6  my-auto object-cover rounded-full ring-2 ring-green-950"
                                       src="/user_2.jpeg" alt=""/>
                                <img className="h-6 w-6  my-auto object-cover rounded-full ring-2 ring-green-950"
                                       src="/user_3.jpeg" alt=""/>
                                <img className="h-6 w-6  my-auto object-cover rounded-full ring-2 ring-green-950"
                                       src="/user_4.jpeg" alt=""/>
                                <img className="h-6 w-6  my-auto object-cover rounded-full ring-2 ring-green-950"
                                       src="/user_5.jpeg" alt=""/>
                                <p className="ml-2 my-auto text-sm text-slate-400">Loved by 100,000+ happy users</p>
                            </div>
                        </div>
                    </div>

                    {/* Right */ }
                    <div className="md:w-1/2">
                        <img src="/hero.svg" alt=""/>
                    </div>
                </div>
            </section>

            {/* Features */ }
            <section className="section-container">
                <h1 className="text-center text-4xl font-semibold mb-5 sm:mb-10">
                    How it works
                </h1>
                <div className="text-black grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
                    {/* Feature 1 */ }
                    <div className="rounded-b-xl px-5 pb-5 pt-3 shadow-lg">
                        <div className="flex-col">
                            <div className="flex items-center justify-center">
                                <img src="/feature_1.svg" alt="feature 1"/>
                            </div>
                            <p className="text-xl font-medium">Upload documents</p>
                            <span className="block text-sm text-gray-500 mt-3">
                                Easily upload the PDF documents you'd like to chat with.
                            </span>
                        </div>
                    </div>

                    {/* Feature 2 */ }
                    <div className="rounded-b-xl px-5 pb-5 pt-3 shadow-lg">
                        <div className="flex-col">
                            <div className="flex items-center justify-center">
                                <img src="/feature_2.svg" alt="feature 1"/>
                            </div>
                            <p className="text-xl font-medium">Instant answers</p>
                            <span className="block text-sm text-gray-500 mt-3">
                                Ask questions, extract information, and summarize documents with AI.
                            </span>
                        </div>
                    </div>

                    {/* Feature 3 */ }
                    <div className="rounded-b-xl px-5 pb-5 pt-3 shadow-lg">
                        <div className="flex-col">
                            <div className="flex items-center justify-center">
                                <img src="/feature_3.svg" alt="feature 1"/>
                            </div>
                            <p className="text-xl font-medium">Sources included</p>
                            <span className="block text-sm text-gray-500 mt-3">
                                Every response is backed by sources extracted from the uploaded document.
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */ }
            <section className="section-container text-center">
                <h1 className="font-semibold text-4xl">Get started</h1>
                <p className="mt-6 mb-6 text-gray-500">
                    Upload a document and start chatting with it today.
                </p>

                <div className="w-full max-w-sm mx-auto px-4">
                    <Button variant="orange">Sign up now</Button>
                </div>
            </section>

            {/* Footer */ }
            <footer className="bg-[#f8f5ee] py-10">
                <div className="mx-auto max-w-7xl px-8 md:px-6">
                    {/* Row 1 */ }
                    <div className="md:flex md:justify-between">
                        {/* Logo */ }
                        <div className="flex items-start mb-6">
                            <BookOpenCheck className="w-8 h-8 mr-3"/>
                            <span className="text-xl font-medium">PDF Wisdom</span>
                        </div>

                        {/* Links */ }
                        <div className="grid grid-cols-2 gap-x-20">
                            <div>
                                <h2 className="mb-4 text-sm font-medium">Universidad</h2>
                                <div className="flex flex-col text-sm text-gray-400 space-y-2">
                                    <a className="hover:underline" href="#">UNIR</a>
                                </div>
                            </div>

                            <div>
                                <h2 className="mb-4 text-sm font-medium">Cursos & Masters</h2>
                                <div className="flex flex-col text-sm text-gray-400 space-y-2">
                                    <a className="hover:underline" href="#">Ad. Grado de Informática</a>
                                </div>
                                <div className="flex flex-col text-sm text-gray-400 space-y-2">
                                    <a className="hover:underline" href="#">M. Computación Cuántica</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="my-6 border-gray-300 lg:my-8"/>

                    {/* Row 2 */ }
                    <div className="text-sm tex-gray-500 sm:flex sm:items-center sm:justify-between">
                        <span>Copyright &copy; 2024, All Rights Reserved</span>
                        <div className="flex text-2xl space-x-6 sm:justify-center">
                            <a href="#">
                                <SiTwitter className="w-5 h"/>
                            </a>
                            <a href="#">
                                <SiFacebook className="w-5 h"/>
                            </a>
                            <a href="#">
                                <SiYoutube className="w-5 h"/>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default LandingPage;
import React from "react";
import { Input } from "@/components/ui/input";
import { Bot, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Chat = () => {
    const messages = [
        { role: "user", content: "Hello" },
        { role: "assistant", content: "Hi, how can I help you?" },
        { role: "user", content: "I need help with my account" },
        { role: "assistant", content: "Sure, what do you need help with?" },
    ];

    return (
        <div className="w-1/2 h-[calc(100vh-60px)] overflow-scroll bg-white">
            <div className="h-full flex flex-col justify-between">
                {/* Chat messages */ }
                <div className="overflow-auto bg-white">
                    <div className="flex flex-col">
                        { messages.map((message, index) => (
                            <div
                                key={ index }
                                className={ cn("p-6 w-full flex items-start gap-x-8", message.role === "user" ? "bg-white" : "bg-[#faf9f6]") }
                            >
                                <div className="w-4">
                                    { message.role === "user" ? (
                                        <User className="bg-[#ff612f] text-white rounded-sm p-1"/>) : (
                                        <Bot className="bg-[#062427] text-white rounded-sm p-1"/>) }
                                </div>
                                <div className="text-sm font-light overflow-hidden leading-7">{ message.content }</div>
                            </div>
                        )) }
                    </div>
                </div>


                {/* Chat input */ }
                <div className="bg-[#faf9f6]">
                    <form className="m-4 p-2 flex items-center justify-between rounded-md border-[#e5e3da] border bg-white">
                        <Input
                            className="border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                            placeholder="Enter your question"
                        />
                        <Button variant="orange">
                            <Send className="w-4 h-4"/>
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chat;
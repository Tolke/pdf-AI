import {Button} from "@/components/ui/button";

export const LandingPage = () => {
    return (
        <section className="bg-[#062427]">
            <div className="section-container flex flex-col text-white md:flex-row items-center">
                {/* Left */}
                <div className="flex flex-col mb-32 space-y-12 text-center md:w-1/2 md:text-left">
                    <h1 className="max-w-md text-4xl md:text-5xl md:leading-tight">Chat with any PDF document</h1>

                    <p className="max-w-md md:max-w-sm text-white/80 font-light leading-7">
                        From legal agreements to financial reports, PDF.ai brings your documents to life. You can ask questions, get summaries, find information, and more.
                    </p>

                    <div>
                        <div className="flex justify-center md:justify-start">
                            <Button>Get Started for free</Button>
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

                {/* Right */}
                <div className="md:w-1/2">
                    <img src="/hero.svg" alt=""/>
                </div>
            </div>
        </section>
    );
};
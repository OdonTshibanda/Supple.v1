import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { BsInstagram, BsFacebook, BsYoutube, BsTwitterX, BsWhatsapp } from "react-icons/bs";

export default function ContactSection() {
    return (
    <>
        <Navbar/>
        <form className="flex flex-col items-center text-sm my-20">
            <p className="text-lg text-[#CA2851] font-medium pb-2">Contact Us</p>
            <h1 className="text-4xl font-semibold text-slate-700 pb-4">Get in touch with us</h1>
            <p className="text-sm text-gray-500 text-center pb-10">Any Questions ? You can contact us.</p>
            
            <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
                <div className="w-full">
                    <label className="text-black/70" htmlFor="name">Your Name</label>
                    <input className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-[#CA2851]" type="text" required />
                </div>
                <div className="w-full">
                    <label className="text-black/70" htmlFor="name">Your Email</label>
                    <input className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-[#CA2851]" type="email" required />
                </div>
            </div>
        
            <div className="mt-6 w-[350px] md:w-[700px]">
                <label className="text-black/70" htmlFor="name">Message</label>
                <textarea className="w-full mt-2 p-2 h-40 border border-gray-500/30 rounded resize-none outline-none focus:border-[#CA2851]" required></textarea>
            </div>
        
            <button type="submit" className="mt-5 bg-[#CA2851] text-white h-12 w-56 px-4 rounded active:scale-95 transition">Send Message</button>
        </form>
        <div className="flex justify-center flex-col gap-10 text-[#1111]">
            <span className="text-center underline text-[#111111]">follow us</span>
            <div className="flex justify-center gap-15">
                <BsFacebook className="text-[#111111]"/>
                <BsInstagram className="text-[#111111]"/>
                <BsTwitterX className="text-[#111111]"/>
                <BsYoutube className="text-[#111111]"/>
                <BsWhatsapp className="text-[#111111]"/>
            </div>
            <span className="text-center text-[#111111]">supple@rst.io</span>
        </div>
        <Footer/>
    </>
    );
};
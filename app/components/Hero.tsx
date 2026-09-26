"use client"
import Link from "next/link"
import { useState } from "react"
import Navbar from "./Navbar"
export default function Hero() {
const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
       
    <div className="section1">
    <Navbar/>
    
    <section className="mt-10 flex items-center flex-col justify-center"> 
        <span className="my-5 font-mono text-[#E5E5E5]">WHERE FLAVOR MEETS ELEGANCE</span>
        <h2 className="text-4xl md:text-7xl/20 text-center max-w-4xl mt-2 text-slate-50 bg-clip-text leading-tight px-4">
          Crafted for unforgettable dining moments
        </h2>
        <p className="text-slate-50 text-sm md:text-base/7 text-center max-w-162.5 mt-3 px-4">
          Experience carefully curated menus, fresh local ingredients and impeccable service in a space made for every celebration.
        </p>

        <div className='flex gap-3 mt-7'>
          <button className="flex items-center gap-2 bg-[#CA2851] hover:bg-[#CA2430] text-slate-50 text-xs md:text-base px-8 py-4 rounded-full transition cursor-pointer">
            <span>book a table</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.166 10h11.667m0 0L9.999 4.167M15.833 10l-5.834 5.834" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

           
        </div>

        <div className="flex flex-wrap items-center justify-center p-1.5 my-10 rounded-full border border-indigo-900 text-xs">
          <div className="flex items-center">
            <img className="size-7 rounded-full border border-indigo-900" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50" alt="userImage1" />
            <img className="size-7 rounded-full border border-indigo-900 -translate-x-2" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50" alt="userImage2" />
            <img className="size-7 rounded-full border border-indigo-900 -translate-x-4" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop" alt="userImage3" />
          </div>
          <p className="-translate-x-2 text-xs text-slate-200">Over 15k reviews </p>
        </div>
      </section>
      </div>
    </>
  )
}
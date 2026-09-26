"use client";

import Link from "next/link"
import { useEffect, useState } from "react"
import { BsPerson } from "react-icons/bs"
import { usePathname, useRouter } from "next/navigation"
import { getCurrentUser, logout, type User } from "../lib/api"
import { getAccessToken, getRefreshToken } from "../lib/api/token"


export default function Navbar (){
    const [mobileOpen, setMobileOpen] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    const pathname = usePathname()
    const router = useRouter()
    const isHome = pathname === '/'

    useEffect(() => {
      let active = true

      if (!getAccessToken() && !getRefreshToken()) return

      getCurrentUser()
        .then(({ user: currentUser }) => {
          if (active) setUser(currentUser)
        })
        .catch(() => {
          if (active) setUser(null)
        })

      return () => { active = false }
    }, [])

    async function handleLogout() {
      setUser(null)
      setMobileOpen(false)
      await logout()
      router.replace('/')
    }
     
    return(
        <>
        <section>
                <nav 
                  className={`flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 md:py-4 w-full 
                    ${
                    !isHome? "text-[#111111] sticky py-12 top-0 bg-[#FFFF] z-50 border border-b border-gray-200":
                     "text-[#FAFAFA]"
                     }
                    
                    `} 
                   >


                  <Link className={`supple text-2xl ${!isHome?"text-[#CA2851]": ""}`} href={'/'}>
                    Supple
                   </Link>
                  <div id="menu" className={`${mobileOpen ? 'max-md:w-full' : 'max-md:w-0'} max-md:absolute max-md:top-0 max-md:z-10 max-md:left-0 max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-full max-md:bg-black/50 max-md:backdrop-blur max-md:flex-col max-md:justify-center flex items-center gap-8 text-sm`}>
                    <Link href={'/about'} onClick={() => setMobileOpen(false)} className="hover:text-gray-300">About</Link>
                    <Link href={'/foods'} onClick={() => setMobileOpen(false)} className="hover:text-gray-300">Foods</Link>
                    <Link href={'/contact'} onClick={() => setMobileOpen(false)} className="hover:text-gray-300">Contact</Link>
                    <Link href={'/faqs'} onClick={() => setMobileOpen(false)} className="hover:text-gray-300">Faqs</Link>


                    {user ? <>
                      <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="hover:text-gray-300 md:hidden">My account</Link>
                      <button onClick={handleLogout} className="hover:text-gray-300 md:hidden">Sign out</button>
                    </> : <Link href="/auth/signin" onClick={() => setMobileOpen(false)} className="hover:text-gray-300 md:hidden">Sign in</Link>}
        
                    <button id="close-menu" onClick={() => setMobileOpen(false)} className="md:hidden bg-gray-900 hover:bg-gray-800 text-white p-2 rounded-md aspect-square font-medium transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </div>

                  {user ? <div className="hidden md:flex items-center gap-4 text-sm">
                    <Link href="/dashboard" className="hover:text-[#CA2851]">{user.name}</Link>
                    <button onClick={handleLogout} className="rounded-full bg-[#CA2851] px-5 py-2.5 text-white transition hover:bg-[#CA2430]">Sign out</button>
                  </div> : <Link href="/auth/signin" className="hidden md:flex items-center gap-3 rounded-full bg-[#CA2851] px-6 py-2.5 text-sm text-white transition hover:bg-[#CA2430]">
                    Sign in <BsPerson />
                  </Link>}
        
                  <button id="open-menu" onClick={() => setMobileOpen(true)}
                    className="md:hidden bg-gray-900 hover:bg-gray-800 text-white p-2 rounded-md aspect-square font-medium transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" />
                    </svg>
                  </button>
                </nav>
            </section></>
    )
}

"use client"
import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
export default function About(){

    const [state, setState] =  useState("login")

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <>
            <Navbar />
            <main className="mx-auto max-w-5xl px-6 pb-20 pt-28 text-zinc-900">
                <section className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#CA2851]">About Supple</p>
                    <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">A table made for good moments</h1>
                    <p className="mt-5 text-base leading-8 text-zinc-600">Supple began with a simple idea: thoughtful food, warm hospitality, and a space where every gathering feels worth remembering.</p>
                </section>

                <section className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
                    <div className="rounded-xl bg-[#FAFAFA] p-6">
                        <p className="text-2xl font-semibold text-[#CA2851]">01</p>
                        <h2 className="mt-4 text-lg font-semibold">Fresh by nature</h2>
                        <p className="mt-2 text-sm leading-6 text-zinc-600">We choose seasonal ingredients and let their character lead the plate.</p>
                    </div>

                    <div className="rounded-xl bg-[#FAFAFA] border border-[#CA2851] p-6">
                        <p className="text-2xl font-semibold text-[#CA2851]">02</p>
                        <h2 className="mt-4 text-lg font-semibold">Made with care</h2>
                        <p className="mt-2 text-sm leading-6 text-zinc-600">Our kitchen brings familiar flavors together with a precise, modern touch.</p>
                        </div>
                    <div className="rounded-xl bg-[#FAFAFA] p-6"><p className="text-2xl font-semibold text-[#CA2851]">03</p><h2 className="mt-4 text-lg font-semibold">Always welcoming</h2><p className="mt-2 text-sm leading-6 text-zinc-600">From the first hello to the last bite, our team is here to make you comfortable.</p></div>
                </section>

                 
            </main>
            <Footer/>
        </>
    )
}
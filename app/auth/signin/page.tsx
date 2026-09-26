"use client"

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation"; 
import { BsMoon, BsSun } from "react-icons/bs";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(event.currentTarget);
    try {
      await login(String(form.get("email")).trim(), String(form.get("password")));
      router.push("/dashboard");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen px-6 pt-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex justify-between">
          <Link href="/" className="supple text-3xl text-[#CA2851]">Supple</Link>
          <BsSun className="cursor-pointer"/>
        </div>
      </div>
      <section className="mx-auto flex max-w-md flex-col justify-center pt-10">
        <h1 className="text-4xl font-semibold">Sign in</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-600">Sign in to view your saved orders and upcoming table bookings.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm">Email address
            <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className="mt-2 h-12 w-full rounded-lg border border-gray-500 px-4 text-white outline-none placeholder:text-zinc-500 focus:border-[#CA2851]" required />
          </label>
          <label className="block text-sm">Password
            <input name="password" type="password" autoComplete="current-password" placeholder="Enter your password" className="mt-2 h-12 w-full rounded-lg border border-gray-400 px-4 text-white outline-none placeholder:text-zinc-500 focus:border-[#CA2851]" required />
          </label>
          <div className="flex justify-end"><Link href="/auth/forgot" className="text-sm text-[#CA2851]">Forgot password?</Link></div>
          {error && <p className="text-sm text-red-300" role="alert">{error}</p>}
          <button type="submit" disabled={loading} className="h-12 w-full rounded-lg bg-[#CA2851] font-medium text-[#FAFAFA] transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Signing in..." : "Sign in"}</button>
        </form>
        <p className="mt-8 text-center text-sm text-zinc-400">Do not have an account? <Link href="/signup" className="text-[#CA2851]">Create one</Link></p>
      </section>
    </main>
  );
}

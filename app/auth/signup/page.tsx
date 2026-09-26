"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation"; 

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    try {
      await register(name, email, password);
      await login(email, password);
      router.push("/dashboard");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to create your account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen px-6 py-10 text-[#171717]">

      <div className="mx-auto flex max-w-5xl items-center justify-between">

        <Link href="/" className="supple text-3xl text-[#CA2851]">Supple</Link>
         
        </div>

      <section className="mx-auto max-w-md pt-2">

        <h1 className="text-4xl font-semibold text-zinc-900">Create your account</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-500">Save your details and make every visit to Supple easier.</p>
        
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">

          <label className="block text-sm text-zinc-700">Full name
            <input name="name" type="text" placeholder="Your name" className="mt-2 h-12 w-full rounded-lg border border-zinc-200 bg-white px-4 outline-none focus:border-[#CA2851]" required />
          </label>
          <label className="block text-sm text-zinc-700">Email address
            <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className="mt-2 h-12 w-full rounded-lg border border-zinc-200 bg-white px-4 outline-none focus:border-[#CA2851]" required />
          </label>
          <label className="block text-sm text-zinc-700">Password<input name="password" type="password" minLength={8} autoComplete="new-password" placeholder="Create a password" className="mt-2 h-12 w-full rounded-lg border border-zinc-200 bg-white px-4 outline-none focus:border-[#CA2851]" required /></label>
          <label className="flex items-start gap-2 text-xs leading-5 text-zinc-500"><input type="checkbox" className="mt-1 accent-[#CA2851]" required /> I agree to receive order updates and important account emails.</label>

          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
          <button type="submit" disabled={loading} className="rounded-sm text-center text-[#FAFAFA] py-3 bg-[#CA2851] w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Creating account..." : "Create account"}
          </button>

          <span className="text-sm flex justify-center gap-2">Already have an account? <Link href="/auth/signin" className="text-[#CA2851] font-semibold">Sign in</Link></span>
           
        </form>
      </section>
    </main>
  );
}

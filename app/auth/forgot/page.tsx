"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { requestPasswordReset } from "../../lib/api";

export default function ForgotPage() {
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    try {
      await requestPasswordReset(String(form.get("email") ?? "").trim());
      setSent(true);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to request a password reset.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen px-6 py-10 text-[#171717]">

      <div className="mx-auto max-w-5xl">
        <Link href="/" className="supple text-3xl text-[#CA2851]">Supple</Link>
      </div>

      <section className="mx-auto flex max-w-md flex-col justify-center py-2">
        <div className="mb-6 flex size-12 items-center justify-center rounded-full bg-[#f8dce3] text-xl text-[#CA2851]">?
          
        </div>
        <h1 className="text-4xl font-semibold text-zinc-900">Reset your password</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-500">Enter the email connected to your account and we will send you a reset link.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm text-zinc-700">Email address
            <input name="email" type="email" placeholder="you@example.com" className="mt-2 h-12 w-full rounded-lg border border-zinc-200 bg-white px-4 outline-none transition focus:border-[#CA2851]" required />
          </label>
          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
          {sent && <p className="text-sm text-green-700" role="status">If an account exists for this address, a password reset link has been sent.</p>}
          <button type="submit" disabled={loading} className="h-12 w-full rounded-lg bg-[#CA2851] font-medium text-white transition hover:bg-[#b42147] disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Sending..." : "Send reset link"}</button>
        </form>
        <Link href="/auth/signin" className="mt-8 text-center text-sm text-[#CA2851] hover:underline">Return to login</Link>
      </section>
    </main>
  );
}

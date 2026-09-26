"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { resetPassword } from "../../lib/api";

export default function ResetPasswordForm({ uid, token }: { uid: string; token: string }) {
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirmation = String(form.get("confirmation") ?? "");
    if (password !== confirmation) {
      setError("The passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(uid, token, password);
      setComplete(true);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to reset your password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen px-6 py-10 text-[#171717]">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="supple text-3xl text-[#CA2851]">Supple</Link>
      </div>
      <section className="mx-auto flex max-w-md flex-col justify-center py-20">
        <h1 className="text-4xl font-semibold text-zinc-900">Choose a new password</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-500">Your new password must be at least 8 characters long.</p>
        {complete ? (
          <div className="mt-8 space-y-5">
            <p className="text-sm text-green-700" role="status">Your password has been changed.</p>
            <Link href="/signin" className="block text-center text-sm text-[#CA2851] hover:underline">Continue to sign in</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block text-sm text-zinc-700">New password
              <input name="password" type="password" minLength={8} autoComplete="new-password" className="mt-2 h-12 w-full rounded-lg border border-zinc-200 bg-white px-4 outline-none transition focus:border-[#CA2851]" required />
            </label>
            <label className="block text-sm text-zinc-700">Confirm new password
              <input name="confirmation" type="password" minLength={8} autoComplete="new-password" className="mt-2 h-12 w-full rounded-lg border border-zinc-200 bg-white px-4 outline-none transition focus:border-[#CA2851]" required />
            </label>
            {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
            <button type="submit" disabled={loading} className="h-12 w-full rounded-lg bg-[#CA2851] font-medium text-white transition hover:bg-[#b42147] disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? "Updating password..." : "Update password"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}

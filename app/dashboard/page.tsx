"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { getCurrentUser, getOrders, isUnauthenticatedError, type Order, type User } from "../lib/api";
import Footer from "../components/Footer";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getCurrentUser(), getOrders()])
      .then(([userResponse, ordersResponse]) => {
        setUser(userResponse.user);
        setOrders(ordersResponse.orders);
      })
      .catch((requestError) => {
        if (isUnauthenticatedError(requestError)) {
          router.replace("/signin");
        } else {
          setError(requestError instanceof Error ? requestError.message : "Unable to load orders.");
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <main className="min-h-screen bg-[#fffdfc] text-[#171717]">
      <Navbar />
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:px-16 lg:px-24">
        <div className="flex flex-col justify-between gap-5 border-b border-zinc-200 pb-8 sm:flex-row sm:items-end">
          <div><p className="text-sm font-medium uppercase tracking-[0.2em] text-[#CA2851]">Customer dashboard</p><h1 className="mt-2 text-4xl font-semibold text-zinc-900">Good evening{user?.name ? `, ${user.name}` : ""}</h1><p className="mt-2 text-sm text-zinc-500">Here is the latest activity on your Supple account.</p></div>
          <Link href="/" className="text-sm font-medium text-[#CA2851] hover:underline">Explore the menu</Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-[#f8dce3] p-5"><p className="text-sm text-zinc-600">Total orders</p><p className="mt-2 text-3xl font-semibold">{orders.length}</p></div>
          <div className="rounded-xl bg-[#f4eee9] p-5"><p className="text-sm text-zinc-600">This month</p><p className="mt-2 text-3xl font-semibold">{orders.reduce((total, order) => total + Number(order.total.replace(/[^0-9.-]/g, "")), 0).toLocaleString("en-US", { style: "currency", currency: "USD" })}</p></div>
          <div className="rounded-xl bg-[#171717] p-5 text-white"><p className="text-sm text-zinc-400">Next reservation</p><p className="mt-2 text-xl font-semibold">No reservation yet</p><Link href="/contact" className="mt-3 inline-block text-sm text-[#ffb2c2] hover:underline">Book a table</Link></div>
        </div>

        <div className="mt-12 flex items-center justify-between"><h2 className="text-2xl font-semibold">Your orders</h2><button className="text-sm text-zinc-500 hover:text-[#CA2851]">View all</button></div>
        {loading && <p className="mt-5 text-sm text-zinc-500">Loading your orders...</p>}
        {error && <p className="mt-5 text-sm text-red-600" role="alert">{error}</p>}
        {!loading && !error && <div className="mt-5 overflow-hidden rounded-xl border border-zinc-200 bg-white">
          <div className="hidden grid-cols-[1fr_1.4fr_1fr_1fr] gap-4 border-b border-zinc-100 bg-zinc-50 px-5 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500 md:grid"><span>Order</span><span>Items</span><span>Date</span><span>Status</span></div>
          {orders.length === 0 && <p className="px-5 py-8 text-sm text-zinc-500">You do not have any orders yet.</p>}
          {orders.map((order) => <div key={order.id} className="grid gap-3 border-b border-zinc-100 px-5 py-5 last:border-0 md:grid-cols-[1fr_1.4fr_1fr_1fr] md:items-center md:gap-4"><div><p className="font-medium">{order.id}</p><p className="text-sm text-zinc-500">{order.total}</p></div><p className="text-sm text-zinc-600">{order.items}</p><p className="text-sm text-zinc-500">{order.date}</p><span className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${order.status === "Preparing" ? "bg-[#f8dce3] text-[#a21e42]" : "bg-green-50 text-green-700"}`}>{order.status}</span></div>)}
        </div>}
      </section>
      <Footer/>
    </main>
  );
}

"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Food from "../../assets/food.png";
import Food1 from "../../assets/food1.png";
import Food2 from "../../assets/food2.png";
import Food3 from "../../assets/food3.png";
import Food4 from "../../assets/food4.png";
import Food5 from "../../assets/food5.png";
import Food6 from "../../assets/food6.jpg";
import Food7 from "../../assets/food7.png";
import { createOrder, isUnauthenticatedError, type CartItem } from "../lib/api";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";

type MenuItem = {
  name: string;
  description: string;
  price: number;
  image: StaticImageData;
};

const menu: MenuItem[] = [
  { name: "Italiano pizza", description: "Tomato, basil, mozzarella", price: 35, image: Food },
  { name: "Espano pizza", description: "Roasted peppers, herbs, olive", price: 39, image: Food1 },
  { name: "Hummus", description: "Silky chickpea dip, warm pita", price: 23, image: Food2 },
  { name: "Chicken", description: "Charred chicken, garden herbs", price: 44, image: Food3 },
  { name: "Hamburger", description: "House patty, aged cheddar", price: 13, image: Food4 },
  { name: "Sandwich", description: "Fresh greens, toasted sourdough", price: 19, image: Food5 },
  { name: "Pizza", description: "Our slow-fermented signature", price: 38, image: Food6 },
  { name: "Hummus bowl", description: "Hummus, grains, seasonal vegetables", price: 23, image: Food7 },
];

export default function FoodsPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const cartTotal = cart.reduce((total, item) => {
    const menuItem = menu.find((entry) => entry.name === item.name);
    return total + (menuItem?.price ?? 0) * item.quantity;
  }, 0);

  function addToCart(name: string) {
    setMessage("");
    setCart((current) => {
      const existing = current.find((item) => item.name === name);
      if (existing) return current.map((item) => item.name === name ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { name, quantity: 1 }];
    });
  }

  function updateQuantity(name: string, change: number) {
    setCart((current) => current.flatMap((item) => {
      if (item.name !== name) return [item];
      const quantity = item.quantity + change;
      return quantity > 0 ? [{ ...item, quantity }] : [];
    }));
  }

  async function checkout() {
    setMessage("");
    setSubmitting(true);
    try {
      const order = await createOrder(cart);
      setCart([]);
      setMessage(`Order ${order.id} confirmed for ${order.total}.`);
    } catch (error) {
      if (isUnauthenticatedError(error)) {
        router.push("/signin");
      } else {
        setMessage(error instanceof Error ? error.message : "Unable to place order.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fffdfc] text-zinc-900">
      <Navbar />
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-28 md:px-16 lg:px-24">
        <div className="max-w-2xl"><p className="text-sm font-medium uppercase tracking-[0.2em] text-[#CA2851]">Supple menu</p><h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Choose something delicious</h1><p className="mt-4 text-base leading-7 text-zinc-500">Freshly prepared favorites for a relaxed meal at home or around our table.</p></div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
            {menu.map((item) => <article key={item.name} className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4"><div className="flex h-52 items-center justify-center rounded-xl bg-[#fff4f5]"><Image src={item.image} alt={item.name} className="h-44 w-44 object-contain transition duration-300 group-hover:scale-105" /></div><div className="px-1 pt-5"><div className="flex items-start justify-between gap-3"><h2 className="font-semibold">{item.name}</h2><span className="font-medium text-[#CA2851]">${item.price}</span></div><p className="mt-2 text-sm text-zinc-500">{item.description}</p><button onClick={() => addToCart(item.name)} className="mt-5 h-10 w-full rounded-lg bg-[#CA2851] text-sm font-medium text-white transition hover:bg-[#b42147]">Add to order</button></div></article>)}
          </div>

          <aside className="sticky top-24 rounded-2xl border border-zinc-200 bg-white p-6"><div className="flex items-center justify-between"><h2 className="text-xl font-semibold">Your order</h2><span className="text-sm text-zinc-500">{cart.reduce((total, item) => total + item.quantity, 0)} items</span></div>{cart.length === 0 ? <p className="py-10 text-sm leading-6 text-zinc-500">Your cart is empty. Add a dish to get started.</p> : <div className="mt-6 space-y-4">{cart.map((item) => <div key={item.name} className="flex items-center justify-between gap-3"><div><p className="text-sm font-medium">{item.name}</p><p className="text-xs text-zinc-500">${(menu.find((entry) => entry.name === item.name)?.price ?? 0) * item.quantity}</p></div><div className="flex items-center gap-2"><button aria-label={`Remove one ${item.name}`} onClick={() => updateQuantity(item.name, -1)} className="size-7 rounded-full border border-zinc-200 text-zinc-600 hover:border-[#CA2851]">-</button><span className="w-4 text-center text-sm">{item.quantity}</span><button aria-label={`Add one ${item.name}`} onClick={() => updateQuantity(item.name, 1)} className="size-7 rounded-full border border-zinc-200 text-zinc-600 hover:border-[#CA2851]">+</button></div></div>)}</div>}<div className="mt-6 border-t border-zinc-100 pt-5"><div className="flex justify-between font-semibold"><span>Total</span><span>${cartTotal.toFixed(2)}</span></div><button onClick={checkout} disabled={cart.length === 0 || submitting} className="mt-5 h-12 w-full rounded-lg bg-[#CA2851] font-medium text-white transition hover:bg-[#b42147] disabled:cursor-not-allowed disabled:opacity-40">{submitting ? "Placing order..." : "Place order"}</button>{message && <p className="mt-4 text-sm text-[#CA2851]" role="status">{message}</p>}<Link href="/dashboard" className="mt-4 block text-center text-sm text-zinc-500 hover:text-[#CA2851]">View my orders</Link></div></aside>
        </div>
      </section>
      <Footer/>
    </main>
  );
}

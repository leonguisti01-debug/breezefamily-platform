"use client";

import { useState } from "react";

export default function ScavengerHuntPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // Connect to Supabase later
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Entry submitted successfully!");
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-lime-500/20 via-black to-black" />

        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center rounded-full border border-[#8DFF00]/40 bg-[#8DFF00]/10 px-4 py-2 text-sm text-[#8DFF00] mb-6">
            BREEZE FAMILY PRESENTS
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6">
            SCAVENGER HUNT
            <span className="block text-[#8DFF00]">OLYMPICS</span>
          </h1>

          <p className="max-w-2xl mx-auto text-zinc-300 text-lg">
            Complete challenges, solve clues, earn points and battle your way
            to the top of the leaderboard.
          </p>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h3 className="text-xl font-bold mb-3 text-[#8DFF00]">
              Team Up
            </h3>
            <p className="text-zinc-400">
              Enter as an individual or create your own team.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h3 className="text-xl font-bold mb-3 text-[#8DFF00]">
              Find Clues
            </h3>
            <p className="text-zinc-400">
              Solve riddles and uncover hidden locations.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h3 className="text-xl font-bold mb-3 text-[#8DFF00]">
              Win Prizes
            </h3>
            <p className="text-zinc-400">
              Compete for prizes, trophies and ultimate bragging rights.
            </p>
          </div>
        </div>
      </section>

      {/* ENTRY FORM */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="rounded-3xl border border-[#8DFF00]/20 bg-zinc-900 p-8">
          <h2 className="text-3xl font-bold mb-2">
            Enter The Competition
          </h2>

          <p className="text-zinc-400 mb-8">
            Complete the form below to secure your spot.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              required
              type="text"
              placeholder="Full Name"
              className="w-full rounded-xl bg-black border border-zinc-700 px-4 py-3 outline-none focus:border-[#8DFF00]"
            />

            <input
              required
              type="tel"
              placeholder="Cellphone Number"
              className="w-full rounded-xl bg-black border border-zinc-700 px-4 py-3 outline-none focus:border-[#8DFF00]"
            />

            <input
              required
              type="email"
              placeholder="Email Address"
              className="w-full rounded-xl bg-black border border-zinc-700 px-4 py-3 outline-none focus:border-[#8DFF00]"
            />

            <input
              type="text"
              placeholder="Team Name (Optional)"
              className="w-full rounded-xl bg-black border border-zinc-700 px-4 py-3 outline-none focus:border-[#8DFF00]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8DFF00] text-black font-bold py-4 rounded-xl hover:opacity-90 transition"
            >
              {loading ? "Submitting..." : "ENTER NOW"}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 py-8 text-center text-zinc-500">
        Powered by The Breeze Family
      </footer>
    </main>
  );
}
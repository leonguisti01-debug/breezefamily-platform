"use client";

import Link from "next/link";

export default function TopButtons() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">

        <div className="flex items-center justify-between rounded-2xl border border-green-400/20 bg-black/50 backdrop-blur-xl px-5 md:px-8 py-4 shadow-[0_0_40px_rgba(0,255,120,0.08)]">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-4">

            {/* LOGO */}
            <img
              src="/breeze-logo.png"
              alt="Breeze Family"
              className="w-12 h-12 object-contain drop-shadow-[0_0_20px_rgba(0,255,120,0.45)]"
            />

            {/* BRAND */}
            <Link
              href="/"
              className="text-lg md:text-2xl font-black uppercase tracking-[3px] text-white"
            >
              Breeze Family
            </Link>

          </div>

          {/* NAVIGATION */}
          <nav className="flex items-center gap-3 md:gap-5 flex-wrap justify-end">

            <Link
              href="/"
              className="text-sm md:text-base font-bold uppercase text-white/80 hover:text-green-300 transition duration-300"
            >
              Home
            </Link>

            <Link
              href="/kids-edition"
              className="text-sm md:text-base font-bold uppercase text-white/80 hover:text-green-300 transition duration-300"
            >
              Kids Edition
            </Link>

            <Link
              href="/season-2-finale"
              className="text-sm md:text-base font-bold uppercase text-white/80 hover:text-green-300 transition duration-300"
            >
              Top 10
            </Link>

            <Link
              href="/fan-favorite-judge"
              className="text-sm md:text-base font-bold uppercase text-white/80 hover:text-green-300 transition duration-300"
            >
              Judges
            </Link>

            {/* ADMIN LOGIN */}
            <Link
              href="/admin-login"
              className="px-4 py-2 rounded-xl border border-green-400/20 bg-green-500/10 text-xs md:text-sm font-black uppercase text-green-300 hover:bg-green-300 hover:text-black transition duration-300"
            >
              Admin Login
            </Link>

          </nav>

        </div>

      </div>

    </header>
  );
}
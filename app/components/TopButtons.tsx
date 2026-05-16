"use client";

import Link from "next/link";

export default function TopButtons() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">

        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl px-5 md:px-8 py-4">

          {/* LOGO */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-black uppercase tracking-[3px] text-white"
          >
            Breeze Family
          </Link>

          {/* NAVIGATION */}
          <nav className="flex items-center gap-3 md:gap-5">

            <Link
              href="/kids-edition"
              className="text-sm md:text-base font-bold uppercase text-white/80 hover:text-green-300 transition duration-300"
            >
              Kids Edition
            </Link>

            <Link
              href="/season-2-finale"
              className="text-sm md:text-base font-bold uppercase text-white/80 hover:text-cyan-300 transition duration-300"
            >
              Top 10
            </Link>

            <Link
              href="/fan-favorite-judge"
              className="text-sm md:text-base font-bold uppercase text-white/80 hover:text-pink-300 transition duration-300"
            >
              Judges
            </Link>

            {/* ADMIN */}
            <Link
              href="/admin"
              className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-xs md:text-sm font-black uppercase text-white hover:bg-white hover:text-black transition duration-300"
            >
              Admin Login
            </Link>

          </nav>

        </div>

      </div>

    </header>
  );
}
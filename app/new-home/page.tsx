"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* BACKGROUND GLOWS */}
      <div className="absolute top-[-300px] left-[-300px] w-[700px] h-[700px] bg-green-500/20 blur-[220px] rounded-full" />

      <div className="absolute bottom-[-300px] right-[-300px] w-[700px] h-[700px] bg-lime-400/10 blur-[220px] rounded-full" />

      {/* GRID OVERLAY */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* HUGE BACKGROUND TEXT */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-[140px] md:text-[280px] font-black uppercase text-white/[0.03] leading-none pointer-events-none select-none">

        BREEZE

      </div>

      {/* NAVBAR */}
      <header className="relative z-50 px-6 pt-6">

        <div className="max-w-7xl mx-auto flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl px-6 py-5">

          {/* LOGO */}
          <div className="flex items-center">

            <img
              src="/breeze-logo-new.png"
              alt="Breeze Family"
              className="h-16 md:h-24 w-auto object-contain drop-shadow-[0_0_40px_rgba(120,255,120,0.18)]"
            />

          </div>

          {/* LINKS */}
          <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-[3px] text-white/70">

            <Link href="/top-10">

              <span className="hover:text-green-300 transition duration-300 cursor-pointer">

                Top 10

              </span>

            </Link>

            <Link href="/kids">

              <span className="hover:text-green-300 transition duration-300 cursor-pointer">

                Kids Edition

              </span>

            </Link>

            <Link href="/merch">

              <span className="hover:text-green-300 transition duration-300 cursor-pointer">

                Merch

              </span>

            </Link>

          </nav>

        </div>

      </header>

      {/* HERO */}
      <section className="relative z-20 px-6 pt-24 md:pt-32 pb-28">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT SIDE */}
          <div>

            {/* LIVE BADGE */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-green-400/20 bg-green-500/10 backdrop-blur-md"
            >

              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

              <p className="uppercase tracking-[4px] text-green-300 text-sm font-bold">

                LIVE NOW

              </p>

            </motion.div>

            {/* MAIN TITLE */}
            <motion.h1
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mt-10 text-6xl md:text-8xl xl:text-[120px] font-black uppercase leading-[0.88]"
            >

              THE

              <br />

              <span className="bg-gradient-to-r from-green-300 via-white to-lime-300 text-transparent bg-clip-text">

                FUTURE

              </span>

              <br />

              OF TALENT

            </motion.h1>

            {/* SUBTEXT */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 max-w-2xl text-lg md:text-2xl text-white/70 leading-relaxed"
            >

              South Africa’s next-generation creator platform
              for performers, entertainers and digital stars.

            </motion.p>

            {/* CTA BUTTONS */}
            <div className="mt-10 flex flex-wrap gap-5">

              <Link href="/kids-edition/register">

                <button className="px-10 py-5 rounded-2xl bg-gradient-to-r from-green-300 to-lime-400 text-black font-black uppercase tracking-[2px] shadow-[0_0_40px_rgba(120,255,120,0.35)] hover:scale-[1.03] transition duration-300">

                  Enter Competition

                </button>

              </Link>

              <Link href="/top-10">

                <button className="px-10 py-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md font-black uppercase tracking-[2px] hover:border-green-400/30 transition duration-300">

                  Watch Leaderboard

                </button>

              </Link>

            </div>

            {/* STATS */}
            <div className="mt-16 grid grid-cols-3 gap-5 max-w-2xl">

              {[
                {
                  number: "4M+",
                  label: "Views",
                },
                {
                  number: "120K+",
                  label: "Votes",
                },
                {
                  number: "500+",
                  label: "Entries",
                },
              ].map((item) => (

                <div
                  key={item.label}
                  className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
                >

                  <h3 className="text-3xl md:text-5xl font-black text-green-300">
                    {item.number}
                  </h3>

                  <p className="mt-2 uppercase tracking-[3px] text-xs text-white/50">
                    {item.label}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="relative h-[700px] hidden lg:block">

            {/* MAIN CARD */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
              }}
              className="absolute top-0 right-0 w-[420px] rounded-[40px] overflow-hidden border border-green-400/20 bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(120,255,120,0.08)]"
            >

              <img
                src="/hero-main.jpg"
                alt="Breeze Family"
                className="w-full h-[500px] object-cover"
              />

              <div className="p-8">

                <p className="uppercase tracking-[4px] text-green-300 text-sm">
                  Trending Now
                </p>

                <h2 className="mt-4 text-4xl font-black uppercase leading-tight">

                  South Africa’s
                  <br />
                  Next Stars

                </h2>

              </div>

            </motion.div>

            {/* FLOATING CARD */}
            <motion.div
              animate={{
                y: [0, 18, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="absolute bottom-10 left-0 w-[260px] rounded-3xl overflow-hidden border border-white/10 bg-black/70 backdrop-blur-2xl"
            >

              <img
                src="/contestant1.jpg"
                alt="Contestant"
                className="w-full h-[220px] object-cover"
              />

              <div className="p-5">

                <p className="uppercase tracking-[3px] text-green-300 text-xs">
                  Featured Contestant
                </p>

                <h3 className="mt-3 text-2xl font-black uppercase">
                  Kids Edition
                </h3>

              </div>

            </motion.div>

            {/* STATUS PANEL */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute top-32 left-0 px-8 py-6 rounded-3xl border border-green-400/20 bg-green-500/10 backdrop-blur-xl"
            >

              <p className="uppercase tracking-[4px] text-xs text-green-300">
                Live Voting
              </p>

              <h3 className="mt-3 text-5xl font-black">
                OPEN
              </h3>

            </motion.div>

          </div>

        </div>

      </section>

      {/* FEATURED PANELS */}
      <section className="relative z-20 px-6 pb-24">

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

          {/* TOP 10 */}
          <Link href="/top-10">

            <div className="group rounded-[40px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl hover:border-green-400/30 transition duration-500 cursor-pointer">

              <div className="h-[320px] overflow-hidden">

                <img
                  src="/top10.jpg"
                  alt="Top 10"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />

              </div>

              <div className="p-8">

                <p className="uppercase tracking-[4px] text-green-300 text-sm">
                  Competition
                </p>

                <h2 className="mt-4 text-4xl font-black uppercase">
                  Top 10
                </h2>

              </div>

            </div>

          </Link>

          {/* KIDS */}
          <Link href="/kids">

            <div className="group rounded-[40px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl hover:border-green-400/30 transition duration-500 cursor-pointer">

              <div className="h-[320px] overflow-hidden">

                <img
                  src="/kids.jpg"
                  alt="Kids"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />

              </div>

              <div className="p-8">

                <p className="uppercase tracking-[4px] text-green-300 text-sm">
                  Youth Talent
                </p>

                <h2 className="mt-4 text-4xl font-black uppercase">
                  Kids Edition
                </h2>

              </div>

            </div>

          </Link>

          {/* MERCH */}
          <Link href="/merch">

            <div className="group rounded-[40px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl hover:border-green-400/30 transition duration-500 cursor-pointer">

              <div className="h-[320px] overflow-hidden">

                <img
                  src="/merch.jpg"
                  alt="Merch"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />

              </div>

              <div className="p-8">

                <p className="uppercase tracking-[4px] text-green-300 text-sm">
                  Official Store
                </p>

                <h2 className="mt-4 text-4xl font-black uppercase">
                  Merch Drop
                </h2>

              </div>

            </div>

          </Link>

        </div>

      </section>

      {/* SPOTIFY */}
      <section className="relative z-20 px-6 pb-28">

        <div className="max-w-6xl mx-auto rounded-[40px] overflow-hidden border border-green-400/20 bg-black/40 backdrop-blur-2xl p-8 md:p-14">

          <div className="text-center">

            <p className="uppercase tracking-[4px] text-green-300 text-sm">
              Official Playlist
            </p>

            <h2 className="mt-4 text-4xl md:text-7xl font-black uppercase">
              Breeze Vibes
            </h2>

          </div>

          <div className="mt-10">

            <iframe
              style={{
                borderRadius: "28px",
              }}
              src="https://open.spotify.com/embed/playlist/0I4lpBmuPerde7sYpVgLX2?utm_source=generator"
              width="100%"
              height="400"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="relative z-20 border-t border-white/10 bg-black/40 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="uppercase tracking-[4px] text-white/40 text-sm">
            Breeze Family Entertainment
          </p>

          <p className="text-white/30 text-sm">
            © 2026 Breeze Family. All Rights Reserved.
          </p>

        </div>

      </footer>

    </main>
  );
}
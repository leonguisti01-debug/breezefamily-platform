"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* BACKGROUND */}
      <div className="absolute top-[-300px] left-[-300px] w-[700px] h-[700px] bg-green-500/20 blur-[220px] rounded-full" />

      <div className="absolute bottom-[-300px] right-[-300px] w-[700px] h-[700px] bg-lime-400/10 blur-[220px] rounded-full" />

      {/* GRID */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* NAVBAR */}
      <header className="relative z-50 px-4 pt-4">

        <div className="max-w-[1400px] mx-auto h-[72px] rounded-[6px] border border-white/10 bg-black/90 backdrop-blur-2xl flex items-center justify-between px-6">

          {/* LEFT */}
          <div className="flex items-center gap-12">

            {/* LOGO */}
            <Link href="/new-home">

              <img
                src="/breeze-logo-new.png"
                alt="Breeze Family"
                className="h-12 w-auto object-contain"
              />

            </Link>

            {/* NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-10">

              {/* HOME */}
              <Link href="/new-home">

                <div className="relative group">

                  <span className="text-white text-xs uppercase tracking-[2px] font-bold">

                    Home

                  </span>

                  {/* ACTIVE LINE */}
                  <div className="absolute left-0 -bottom-[22px] w-full h-[2px] bg-gradient-to-r from-green-300 to-lime-400 rounded-full" />

                </div>

              </Link>

              {/* TIKTOK STARS */}
              <Link href="/tiktok-stars">

                <div className="relative group">

                  <span className="text-white/80 hover:text-white text-xs uppercase tracking-[2px] font-bold transition duration-300">

                    TikTok Stars

                  </span>

                </div>

              </Link>

              {/* MERCH */}
              <Link href="/merch">

                <div className="relative group">

                  <span className="text-white/80 hover:text-white text-xs uppercase tracking-[2px] font-bold transition duration-300">

                    My Merch

                  </span>

                </div>

              </Link>

              {/* HIGHLIGHTS */}
              <Link href="/highlights">

                <div className="relative group">

                  <span className="text-white/80 hover:text-white text-xs uppercase tracking-[2px] font-bold transition duration-300">

                    Highlights

                  </span>

                </div>

              </Link>

              {/* ABOUT */}
              <Link href="/about">

                <div className="relative group">

                  <span className="text-white/80 hover:text-white text-xs uppercase tracking-[2px] font-bold transition duration-300">

                    About

                  </span>

                </div>

              </Link>

              {/* CONTACT */}
              <Link href="/contact">

                <div className="relative group">

                  <span className="text-white/80 hover:text-white text-xs uppercase tracking-[2px] font-bold transition duration-300">

                    Contact

                  </span>

                </div>

              </Link>

            </nav>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-5">

            {/* TIKTOK */}
            <a
              href="https://www.tiktok.com/@itskentbreeze?_r=1&_t=ZS-96PJ9wohRtE"
              target="_blank"
              className="opacity-80 hover:opacity-100 transition duration-300"
            >

              <img
                src="/tiktok-icon.png"
                alt="TikTok"
                className="w-5 h-5 object-contain"
              />

            </a>

            {/* INSTAGRAM */}
            <a
              href="https://instagram.com"
              target="_blank"
              className="opacity-80 hover:opacity-100 transition duration-300"
            >

              <img
                src="/instagram-icon.png"
                alt="Instagram"
                className="w-5 h-5 object-contain"
              />

            </a>

            {/* YOUTUBE */}
            <a
              href="https://youtube.com"
              target="_blank"
              className="opacity-80 hover:opacity-100 transition duration-300"
            >

              <img
                src="/youtube-icon.png"
                alt="YouTube"
                className="w-5 h-5 object-contain"
              />

            </a>

            {/* WHATSAPP */}
            <a
              href="https://whatsapp.com/channel/0029VbD9d4P9sBI9ue1ekp2z"
              target="_blank"
              className="opacity-80 hover:opacity-100 transition duration-300"
            >

              <img
                src="/whatsapp-icon.png"
                alt="WhatsApp"
                className="w-5 h-5 object-contain"
              />

            </a>

            {/* BUTTON */}
            <Link href="/admin-login">

              <button className="ml-4 px-8 h-[46px] rounded-full border border-green-400/40 bg-black text-white text-xs uppercase tracking-[2px] font-black hover:border-green-300 hover:shadow-[0_0_30px_rgba(120,255,120,0.25)] transition duration-300">

                Register / Login →

              </button>

            </Link>

          </div>

        </div>

      </header>

      {/* HERO */}
      <section className="relative z-20 px-6 pt-28 md:pt-36 pb-28">

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

            {/* HEADING */}
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

            {/* TEXT */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 max-w-2xl text-lg md:text-2xl text-white/70 leading-relaxed"
            >

              South Africa’s next-generation creator platform
              for performers, entertainers and digital stars.

            </motion.p>

            {/* BUTTONS */}
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

            {/* KIDS POSTER CARD */}
            <motion.div
              animate={{
                y: [0, 12, 0],
                rotate: [-8, -10, -8],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
              }}
              className="absolute top-[240px] left-[20px] w-[240px] rounded-[30px] overflow-hidden border border-green-400/20 bg-black/80 backdrop-blur-2xl shadow-[0_0_60px_rgba(120,255,120,0.12)]"
            >

              <img
                src="/kids-poster.jpg"
                alt="Kids Talent Show"
                className="w-full h-[340px] object-cover"
              />

              <div className="p-5">

                <p className="uppercase tracking-[3px] text-green-300 text-xs">
                  Breeze Family
                </p>

                <h3 className="mt-3 text-2xl font-black uppercase leading-tight">

                  Kids
                  <br />
                  Talent Show

                </h3>

                <p className="mt-3 text-white/60 text-sm">
                  Entries officially open.
                </p>

              </div>

            </motion.div>

          </div>

        </div>

      </section>

    </main>
  );
}
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

                  <div className="absolute left-0 -bottom-[22px] w-full h-[2px] bg-gradient-to-r from-green-300 to-lime-400 rounded-full" />

                </div>

              </Link>

              {/* TIKTOK STARS */}
              <Link href="/tiktok-stars">

                <span className="text-white/80 hover:text-white text-xs uppercase tracking-[2px] font-bold transition duration-300">
                  TikTok Stars
                </span>

              </Link>

              {/* MERCH */}
              <Link href="/merch">

                <span className="text-white/80 hover:text-white text-xs uppercase tracking-[2px] font-bold transition duration-300">
                  My Merch
                </span>

              </Link>

              {/* HIGHLIGHTS */}
              <Link href="/highlights">

                <span className="text-white/80 hover:text-white text-xs uppercase tracking-[2px] font-bold transition duration-300">
                  Highlights
                </span>

              </Link>

              {/* ABOUT */}
              <Link href="/about">

                <span className="text-white/80 hover:text-white text-xs uppercase tracking-[2px] font-bold transition duration-300">
                  About
                </span>

              </Link>

              {/* CONTACT */}
              <Link href="/contact">

                <span className="text-white/80 hover:text-white text-xs uppercase tracking-[2px] font-bold transition duration-300">
                  Contact
                </span>

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
              href="https://www.instagram.com/itskentbreezy?igsh=MWI3eGF0YWdiZjk5OQ=="
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

            {/* HEADING */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mt-10"
            >

              <h1
                className="uppercase italic font-black"
                style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  fontSize: "clamp(72px, 9vw, 150px)",
                  letterSpacing: "0.06em",
                  lineHeight: "0.88",
                }}
              >

                <span className="block text-white">
                  A NEW
                </span>

                <span className="block mt-2 bg-gradient-to-r from-green-300 via-white to-lime-300 text-transparent bg-clip-text">
                  BREEZE
                </span>

                <span className="block mt-2 text-white">
                  ERA
                </span>

              </h1>

            </motion.div>

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
          <div className="relative h-[860px] hidden lg:block">

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
              className="absolute top-[220px] left-[-20px] w-[320px] rounded-[30px] overflow-hidden border border-green-400/20 bg-black/80 backdrop-blur-2xl shadow-[0_0_60px_rgba(120,255,120,0.12)]"
            >

              <img
                src="/kids-poster.jpg"
                alt="Kids Talent Show"
                className="w-full h-[440px] object-cover"
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

            {/* MERCH CARD */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [6, 8, 6],
              }}
              transition={{
                repeat: Infinity,
                duration: 7,
              }}
              className="absolute bottom-[-20px] right-[-40px] w-[300px] rounded-[30px] overflow-hidden border border-green-400/20 bg-black/80 backdrop-blur-2xl shadow-[0_0_60px_rgba(120,255,120,0.12)]"
            >

              <img
                src="/merch-card.jpg"
                alt="Breeze Merch"
                className="w-full h-[420px] object-cover"
              />

              <div className="p-5">

                <p className="uppercase tracking-[3px] text-green-300 text-xs">
                  Official Store
                </p>

                <h3 className="mt-3 text-2xl font-black uppercase leading-tight">

                  Breeze
                  <br />
                  Merch

                </h3>

                <p className="mt-3 text-white/60 text-sm">
                  Apparel, caps, bags and accessories.
                </p>

              </div>

            </motion.div>

          </div>

        </div>

      </section>

      {/* SOCIAL SECTION */}
      <section className="relative z-20 px-6 pb-32">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="flex items-end justify-between mb-12">

            <div>

              <p className="uppercase tracking-[4px] text-green-300 text-sm">
                Creator Feed
              </p>

              <h2
                className="mt-4 uppercase italic font-black"
                style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  fontSize: "clamp(42px, 5vw, 90px)",
                  letterSpacing: "0.04em",
                  lineHeight: "0.9",
                }}
              >

                Latest Content

              </h2>

            </div>

            <a
              href="https://www.tiktok.com/@itskentbreeze"
              target="_blank"
              className="hidden md:flex px-6 py-3 rounded-full border border-green-400/20 bg-white/5 backdrop-blur-xl text-sm uppercase tracking-[2px] hover:border-green-300 transition duration-300"
            >

              View TikTok →

            </a>

          </div>

          {/* CONTENT GRID */}
          <div className="grid xl:grid-cols-[1fr_340px] gap-10 items-start">

            {/* VIDEOS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* VIDEO 1 */}
              <div className="rounded-[28px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl">

                <div className="aspect-[9/16] bg-black max-h-[520px]">

                  <iframe
                    src="https://www.tiktok.com/embed/v2/7615236380767325461"
                    className="w-full h-full"
                    allowFullScreen
                  />

                </div>

              </div>

              {/* VIDEO 2 */}
              <div className="rounded-[28px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl">

                <div className="aspect-[9/16] bg-black max-h-[520px]">

                  <iframe
                    src="https://www.tiktok.com/embed/v2/7536618269583674630"
                    className="w-full h-full"
                    allowFullScreen
                  />

                </div>

              </div>

              {/* VIDEO 3 */}
              <div className="rounded-[28px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl">

                <div className="aspect-[9/16] bg-black max-h-[520px]">

                  <iframe
                    src="https://www.tiktok.com/embed/v2/7626772857565007124"
                    className="w-full h-full"
                    allowFullScreen
                  />

                </div>

              </div>

            </div>

            {/* SPOTIFY PANEL */}
            <div className="rounded-[32px] border border-green-400/20 bg-white/5 backdrop-blur-2xl p-6 sticky top-10">

              <p className="uppercase tracking-[4px] text-green-300 text-xs">
                Breeze Vibes
              </p>

              <h3
                className="mt-4 uppercase italic font-black"
                style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  fontSize: "48px",
                  letterSpacing: "0.04em",
                  lineHeight: "0.9",
                }}
              >

                Spotify
                <br />
                Playlist

              </h3>

              <p className="mt-4 text-white/60 text-sm leading-relaxed">
                Official sounds powering the Breeze movement.
              </p>

              <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">

                <iframe
                  style={{
                    borderRadius: "24px",
                  }}
                  src="https://open.spotify.com/embed/playlist/0I4lpBmuPerde7sYpVgLX2?utm_source=generator"
                  width="100%"
                  height="380"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const BREEZE_GREEN = "#8DFF00";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* BACKGROUND */}
      <div
        className="absolute top-[-300px] left-[-300px] w-[700px] h-[700px] blur-[220px] rounded-full"
        style={{
          background: `${BREEZE_GREEN}30`,
        }}
      />

      <div
        className="absolute bottom-[-300px] right-[-300px] w-[700px] h-[700px] blur-[220px] rounded-full"
        style={{
          background: `${BREEZE_GREEN}20`,
        }}
      />

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
      <header className="relative z-50 px-3 md:px-4 pt-3">

        <div className="max-w-[1260px] mx-auto h-[56px] rounded-[10px] border border-white/10 bg-black/90 backdrop-blur-2xl flex items-center justify-between px-4 md:px-6">

          {/* LEFT */}
          <div className="flex items-center gap-6 md:gap-10">

            {/* LOGO */}
            <Link href="/new-home">

              <img
                src="/breeze-logo-new.png"
                alt="Breeze Family"
                className="h-8 md:h-9 w-auto object-contain"
              />

            </Link>

            {/* NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-8">

              <Link href="/new-home">

                <div className="relative group">

                  <span className="text-white text-[11px] uppercase tracking-[2px] font-bold">
                    Home
                  </span>

                  <div
                    className="absolute left-0 -bottom-[18px] w-full h-[2px] rounded-full"
                    style={{
                      background: BREEZE_GREEN,
                    }}
                  />

                </div>

              </Link>

              <Link href="/tiktok-stars">
                <span className="text-white/80 hover:text-white text-[11px] uppercase tracking-[2px] font-bold transition duration-300">
                  TikTok Stars
                </span>
              </Link>

              <Link href="/merch">
                <span className="text-white/80 hover:text-white text-[11px] uppercase tracking-[2px] font-bold transition duration-300">
                  My Merch
                </span>
              </Link>

              <Link href="/highlights">
                <span className="text-white/80 hover:text-white text-[11px] uppercase tracking-[2px] font-bold transition duration-300">
                  Highlights
                </span>
              </Link>

              <Link href="/about">
                <span className="text-white/80 hover:text-white text-[11px] uppercase tracking-[2px] font-bold transition duration-300">
                  About
                </span>
              </Link>

              <Link href="/contact">
                <span className="text-white/80 hover:text-white text-[11px] uppercase tracking-[2px] font-bold transition duration-300">
                  Contact
                </span>
              </Link>

            </nav>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 md:gap-4">

            <a
              href="https://www.tiktok.com/@itskentbreeze?_r=1&_t=ZS-96PJ9wohRtE"
              target="_blank"
              className="opacity-80 hover:opacity-100 transition duration-300"
            >
              <img
                src="/tiktok-icon.png"
                alt="TikTok"
                className="w-4 h-4 object-contain"
              />
            </a>

            <a
              href="https://www.instagram.com/itskentbreezy?igsh=MWI3eGF0YWdiZjk5OQ=="
              target="_blank"
              className="opacity-80 hover:opacity-100 transition duration-300"
            >
              <img
                src="/instagram-icon.png"
                alt="Instagram"
                className="w-4 h-4 object-contain"
              />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              className="opacity-80 hover:opacity-100 transition duration-300"
            >
              <img
                src="/youtube-icon.png"
                alt="YouTube"
                className="w-4 h-4 object-contain"
              />
            </a>

            <a
              href="https://whatsapp.com/channel/0029VbD9d4P9sBI9ue1ekp2z"
              target="_blank"
              className="opacity-80 hover:opacity-100 transition duration-300"
            >
              <img
                src="/whatsapp-icon.png"
                alt="WhatsApp"
                className="w-4 h-4 object-contain"
              />
            </a>

          </div>

        </div>

      </header>

      {/* HERO */}
      <section className="relative z-20 px-4 md:px-6 pt-14 md:pt-24 pb-20">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* LEFT SIDE */}
          <div className="relative z-20">

            {/* SMALL TOP TEXT */}
            <p
              className="uppercase font-black"
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "clamp(13px, 1vw, 16px)",
                letterSpacing: "0.12em",
                marginBottom: "16px",
                color: BREEZE_GREEN,
              }}
            >

              A NEW CHAPTER. A BIGGER MOVEMENT.

            </p>

            {/* MAIN HEADING */}
            <div className="leading-none">

              <h1
                className="uppercase italic font-black text-white"
                style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  fontSize: "clamp(78px, 10vw, 160px)",
                  lineHeight: "0.82",
                  letterSpacing: "0.12em",
                }}
              >

                <span className="block">
                  A NEW
                </span>

                <span
                  className="block mt-2"
                  style={{
                    color: BREEZE_GREEN,
                  }}
                >
                  BREEZE
                </span>

                <span className="block mt-2">
                  ERA
                </span>

              </h1>

            </div>

            {/* SLOGAN */}
            <p
              className="text-white/80"
              style={{
                marginTop: "24px",
                fontSize: "clamp(18px, 1.4vw, 26px)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
              }}
            >

              Faith. Family. Loyalty.

            </p>

          </div>

          {/* RIGHT SIDE */}
          <div className="relative h-[620px] md:h-[760px] mt-10 lg:mt-0">

            {/* MAIN CARD */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
              }}
              className="absolute top-0 right-0 w-[240px] md:w-[380px] rounded-[34px] overflow-hidden border bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(141,255,0,0.08)]"
              style={{
                borderColor: `${BREEZE_GREEN}40`,
              }}
            >

              <img
                src="/hero-main.jpg"
                alt="Breeze Family"
                className="w-full h-[300px] md:h-[460px] object-cover"
              />

            </motion.div>

            {/* KIDS CARD */}
            <motion.div
              animate={{
                y: [0, 12, 0],
                rotate: [-8, -10, -8],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
              }}
              className="absolute top-[150px] left-0 md:left-[-10px] w-[200px] md:w-[290px] rounded-[28px] overflow-hidden border bg-black/80 backdrop-blur-2xl shadow-[0_0_60px_rgba(141,255,0,0.12)]"
              style={{
                borderColor: `${BREEZE_GREEN}40`,
              }}
            >

              <img
                src="/kids-poster.jpg"
                alt="Kids Talent Show"
                className="w-full h-[280px] md:h-[410px] object-cover"
              />

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
              className="absolute bottom-[20px] right-0 md:right-[-30px] w-[200px] md:w-[270px] rounded-[28px] overflow-hidden border bg-black/80 backdrop-blur-2xl shadow-[0_0_60px_rgba(141,255,0,0.12)]"
              style={{
                borderColor: `${BREEZE_GREEN}40`,
              }}
            >

              <img
                src="/merch-card.jpg"
                alt="Breeze Merch"
                className="w-full h-[280px] md:h-[390px] object-cover"
              />

            </motion.div>

          </div>

        </div>

      </section>

      {/* SOCIAL SECTION */}
      <section className="relative z-20 px-4 md:px-6 pb-24">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="mb-10">

            <p
              className="uppercase tracking-[4px] text-sm"
              style={{
                color: BREEZE_GREEN,
              }}
            >
              Creator Feed
            </p>

            <h2
              className="mt-4 uppercase italic font-black"
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "clamp(38px, 7vw, 80px)",
                letterSpacing: "0.08em",
                lineHeight: "0.9",
              }}
            >

              Latest Content

            </h2>

          </div>

          {/* CONTENT STRIP */}
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">

            {/* VIDEO 1 */}
            <a
              href="https://www.tiktok.com/@itskentbreeze/video/7615236380767325461"
              target="_blank"
              className="group min-w-[210px] md:min-w-[250px] snap-start"
            >

              <div className="relative rounded-[28px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl">

                <img
                  src="/tiktok-1.jpg"
                  alt="TikTok Video"
                  className="w-full h-[340px] md:h-[440px] object-cover group-hover:scale-[1.03] transition duration-500"
                />

              </div>

            </a>

            {/* VIDEO 2 */}
            <a
              href="https://www.tiktok.com/@itskentbreeze/video/7536618269583674630"
              target="_blank"
              className="group min-w-[210px] md:min-w-[250px] snap-start"
            >

              <div className="relative rounded-[28px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl">

                <img
                  src="/tiktok-2.jpg"
                  alt="TikTok Video"
                  className="w-full h-[340px] md:h-[440px] object-cover group-hover:scale-[1.03] transition duration-500"
                />

              </div>

            </a>

            {/* VIDEO 3 */}
            <a
              href="https://www.tiktok.com/@itskentbreeze/video/7626772857565007124"
              target="_blank"
              className="group min-w-[210px] md:min-w-[250px] snap-start"
            >

              <div className="relative rounded-[28px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl">

                <img
                  src="/tiktok-3.jpg"
                  alt="TikTok Video"
                  className="w-full h-[340px] md:h-[440px] object-cover group-hover:scale-[1.03] transition duration-500"
                />

              </div>

            </a>

            {/* SPOTIFY */}
<div
  className="min-w-[210px] md:min-w-[250px] rounded-[28px] border bg-white/5 backdrop-blur-2xl p-4 snap-start"
  style={{
    borderColor: `${BREEZE_GREEN}40`,
  }}
>

  {/* HEADER */}
  <div className="flex items-center justify-between mb-4">

    <div>

      <p
        className="uppercase tracking-[4px] text-[10px] md:text-xs"
        style={{
          color: BREEZE_GREEN,
        }}
      >
        Breeze Vibes
      </p>

      <h3
        className="mt-2 uppercase italic font-black"
        style={{
          fontFamily: "Bebas Neue, sans-serif",
          fontSize: "clamp(22px, 4vw, 34px)",
          letterSpacing: "0.08em",
          lineHeight: "0.9",
        }}
      >

        Spotify

      </h3>

    </div>

    <img
      src="/spotify-icon.png"
      alt="Spotify"
      className="w-6 h-6 object-contain"
    />

  </div>

  {/* EMBED */}
  <iframe
    style={{
      borderRadius: "18px",
    }}
    src="https://open.spotify.com/embed/playlist/0I4lpBmuPerde7sYpVgLX2?utm_source=generator"
    width="100%"
    height="440"
    frameBorder="0"
    allowFullScreen
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
  />

</div>

          </div>

        </div>

      </section>

    </main>
  );
}
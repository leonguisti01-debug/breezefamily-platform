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

        <div className="max-w-[1400px] mx-auto h-[62px] rounded-[10px] border border-white/10 bg-black/90 backdrop-blur-2xl flex items-center justify-between px-4 md:px-6">

          {/* LEFT */}
          <div className="flex items-center gap-6 md:gap-12">

            {/* LOGO */}
            <Link href="/new-home">

              <img
                src="/breeze-logo-new.png"
                alt="Breeze Family"
                className="h-9 md:h-10 w-auto object-contain"
              />

            </Link>

            {/* NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-10">

              <Link href="/new-home">

                <div className="relative group">

                  <span className="text-white text-xs uppercase tracking-[2px] font-bold">
                    Home
                  </span>

                  <div
                    className="absolute left-0 -bottom-[20px] w-full h-[2px] rounded-full"
                    style={{
                      background: BREEZE_GREEN,
                    }}
                  />

                </div>

              </Link>

              <Link href="/tiktok-stars">
                <span className="text-white/80 hover:text-white text-xs uppercase tracking-[2px] font-bold transition duration-300">
                  TikTok Stars
                </span>
              </Link>

              <Link href="/merch">
                <span className="text-white/80 hover:text-white text-xs uppercase tracking-[2px] font-bold transition duration-300">
                  My Merch
                </span>
              </Link>

              <Link href="/highlights">
                <span className="text-white/80 hover:text-white text-xs uppercase tracking-[2px] font-bold transition duration-300">
                  Highlights
                </span>
              </Link>

              <Link href="/about">
                <span className="text-white/80 hover:text-white text-xs uppercase tracking-[2px] font-bold transition duration-300">
                  About
                </span>
              </Link>

              <Link href="/contact">
                <span className="text-white/80 hover:text-white text-xs uppercase tracking-[2px] font-bold transition duration-300">
                  Contact
                </span>
              </Link>

            </nav>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 md:gap-5">

            <a
              href="https://www.tiktok.com/@itskentbreeze?_r=1&_t=ZS-96PJ9wohRtE"
              target="_blank"
              className="opacity-80 hover:opacity-100 transition duration-300"
            >
              <img
                src="/tiktok-icon.png"
                alt="TikTok"
                className="w-4 h-4 md:w-5 md:h-5 object-contain"
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
                className="w-4 h-4 md:w-5 md:h-5 object-contain"
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
                className="w-4 h-4 md:w-5 md:h-5 object-contain"
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
                className="w-4 h-4 md:w-5 md:h-5 object-contain"
              />
            </a>

          </div>

        </div>

      </header>

      {/* HERO */}
      <section className="relative z-20 px-4 md:px-6 pt-16 md:pt-28 pb-20 md:pb-28">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* LEFT SIDE */}
          <div className="relative z-20">

            {/* SMALL TOP TEXT */}
            <p
              className="uppercase font-black"
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "clamp(14px, 1vw, 18px)",
                letterSpacing: "0.12em",
                marginBottom: "18px",
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
                  fontSize: "clamp(90px, 11vw, 180px)",
                  lineHeight: "0.82",
                  letterSpacing: "0.09em",
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
                marginTop: "26px",
                fontSize: "clamp(20px, 1.5vw, 30px)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
              }}
            >

              Faith. Family. Loyalty.

            </p>

          </div>

          {/* RIGHT SIDE */}
          <div className="relative h-[680px] md:h-[860px] mt-10 lg:mt-0">

            {/* MAIN CARD */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
              }}
              className="absolute top-0 right-0 w-[260px] md:w-[420px] rounded-[40px] overflow-hidden border bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(141,255,0,0.08)]"
              style={{
                borderColor: `${BREEZE_GREEN}40`,
              }}
            >

              <img
                src="/hero-main.jpg"
                alt="Breeze Family"
                className="w-full h-[320px] md:h-[500px] object-cover"
              />

              <div className="p-5 md:p-8">

                <p
                  className="uppercase tracking-[4px] text-xs md:text-sm"
                  style={{
                    color: BREEZE_GREEN,
                  }}
                >
                  Trending Now
                </p>

                <h2 className="mt-3 md:mt-4 text-2xl md:text-4xl font-black uppercase leading-tight">

                  South Africa’s
                  <br />
                  Next Stars

                </h2>

              </div>

            </motion.div>

          </div>

        </div>

      </section>

    </main>
  );
}
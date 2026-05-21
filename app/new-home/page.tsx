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

                  <div className="absolute left-0 -bottom-[20px] w-full h-[2px] bg-gradient-to-r from-green-300 to-lime-400 rounded-full" />

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
    className="uppercase text-green-300 font-black"
    style={{
      fontFamily: "Bebas Neue, sans-serif",
      fontSize: "clamp(14px, 1vw, 18px)",
      letterSpacing: "0.12em",
      marginBottom: "18px",
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
        letterSpacing: "-0.03em",
      }}
    >

      <span className="block">
        A NEW
      </span>

      <span className="block text-[#8DFF00] mt-2">
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
              className="absolute top-0 right-0 w-[260px] md:w-[420px] rounded-[40px] overflow-hidden border border-green-400/20 bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(120,255,120,0.08)]"
            >

              <img
                src="/hero-main.jpg"
                alt="Breeze Family"
                className="w-full h-[320px] md:h-[500px] object-cover"
              />

              <div className="p-5 md:p-8">

                <p className="uppercase tracking-[4px] text-green-300 text-xs md:text-sm">
                  Trending Now
                </p>

                <h2 className="mt-3 md:mt-4 text-2xl md:text-4xl font-black uppercase leading-tight">

                  South Africa’s
                  <br />
                  Next Stars

                </h2>

              </div>

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
              className="absolute top-[160px] left-0 md:left-[-20px] w-[220px] md:w-[320px] rounded-[30px] overflow-hidden border border-green-400/20 bg-black/80 backdrop-blur-2xl shadow-[0_0_60px_rgba(120,255,120,0.12)]"
            >

              <img
                src="/kids-poster.jpg"
                alt="Kids Talent Show"
                className="w-full h-[300px] md:h-[440px] object-cover"
              />

              <div className="p-4 md:p-5">

                <p className="uppercase tracking-[3px] text-green-300 text-[10px] md:text-xs">
                  Breeze Family
                </p>

                <h3 className="mt-2 md:mt-3 text-xl md:text-2xl font-black uppercase leading-tight">

                  Kids
                  <br />
                  Talent Show

                </h3>

                <p className="mt-2 md:mt-3 text-white/60 text-xs md:text-sm">
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
              className="absolute bottom-[20px] right-0 md:right-[-40px] w-[220px] md:w-[300px] rounded-[30px] overflow-hidden border border-green-400/20 bg-black/80 backdrop-blur-2xl shadow-[0_0_60px_rgba(120,255,120,0.12)]"
            >

              <img
                src="/merch-card.jpg"
                alt="Breeze Merch"
                className="w-full h-[300px] md:h-[420px] object-cover"
              />

              <div className="p-4 md:p-5">

                <p className="uppercase tracking-[3px] text-green-300 text-[10px] md:text-xs">
                  Official Store
                </p>

                <h3 className="mt-2 md:mt-3 text-xl md:text-2xl font-black uppercase leading-tight">

                  Breeze
                  <br />
                  Merch

                </h3>

                <p className="mt-2 md:mt-3 text-white/60 text-xs md:text-sm">
                  Apparel, caps, bags and accessories.
                </p>

              </div>

            </motion.div>

          </div>

        </div>

      </section>

      {/* SOCIAL SECTION */}
      <section className="relative z-20 px-4 md:px-6 pb-24 md:pb-32">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="flex items-end justify-between mb-10 md:mb-12">

            <div>

              <p className="uppercase tracking-[4px] text-green-300 text-sm">
                Creator Feed
              </p>

              <h2
                className="mt-4 uppercase italic font-black"
                style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  fontSize: "clamp(42px, 8vw, 90px)",
                  letterSpacing: "0.04em",
                  lineHeight: "0.9",
                }}
              >

                Latest Content

              </h2>

            </div>

          </div>

          {/* CONTENT STRIP */}
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">

            {/* VIDEO 1 */}
            <a
              href="https://www.tiktok.com/@itskentbreeze/video/7615236380767325461"
              target="_blank"
              className="group min-w-[220px] md:min-w-[280px] snap-start"
            >

              <div className="relative rounded-[32px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl">

                <img
                  src="/tiktok-1.jpg"
                  alt="TikTok Video"
                  className="w-full h-[380px] md:h-[500px] object-cover group-hover:scale-[1.03] transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              </div>

            </a>

            {/* VIDEO 2 */}
            <a
              href="https://www.tiktok.com/@itskentbreeze/video/7536618269583674630"
              target="_blank"
              className="group min-w-[220px] md:min-w-[280px] snap-start"
            >

              <div className="relative rounded-[32px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl">

                <img
                  src="/tiktok-2.jpg"
                  alt="TikTok Video"
                  className="w-full h-[380px] md:h-[500px] object-cover group-hover:scale-[1.03] transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              </div>

            </a>

            {/* VIDEO 3 */}
            <a
              href="https://www.tiktok.com/@itskentbreeze/video/7626772857565007124"
              target="_blank"
              className="group min-w-[220px] md:min-w-[280px] snap-start"
            >

              <div className="relative rounded-[32px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl">

                <img
                  src="/tiktok-3.jpg"
                  alt="TikTok Video"
                  className="w-full h-[380px] md:h-[500px] object-cover group-hover:scale-[1.03] transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              </div>

            </a>

            {/* SPOTIFY */}
            <div className="min-w-[260px] md:min-w-[340px] rounded-[32px] border border-green-400/20 bg-white/5 backdrop-blur-2xl p-5 md:p-6 snap-start">

              <div className="flex items-center justify-between mb-5">

                <div>

                  <p className="uppercase tracking-[4px] text-green-300 text-[10px] md:text-xs">
                    Breeze Vibes
                  </p>

                  <h3
                    className="mt-2 uppercase italic font-black"
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: "clamp(28px, 5vw, 42px)",
                      letterSpacing: "0.04em",
                      lineHeight: "0.9",
                    }}
                  >

                    Spotify

                  </h3>

                </div>

                <img
                  src="/spotify-icon.png"
                  alt="Spotify"
                  className="w-7 h-7 md:w-8 md:h-8 object-contain"
                />

              </div>

              <iframe
                style={{
                  borderRadius: "20px",
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

      </section>

    </main>
  );
}
"use client";

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
              href="https://www.tiktok.com/@itskentbreezy/video/7615236380767325461"
              target="_blank"
              rel="noopener noreferrer"
              className="group min-w-[210px] md:min-w-[250px] snap-start"
            >

              <div className="relative rounded-[28px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl">

                <img
                  src="/tiktok-1.jpg"
                  alt="TikTok Video"
                  className="w-full h-[340px] md:h-[440px] object-cover group-hover:scale-[1.05] transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center">

                  <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center animate-pulse">

                    <div className="ml-1 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-white" />

                  </div>

                </div>

              </div>

            </a>

            {/* VIDEO 2 */}
            <a
              href="https://www.tiktok.com/@itskentbreezy/video/7536618269583674630"
              target="_blank"
              rel="noopener noreferrer"
              className="group min-w-[210px] md:min-w-[250px] snap-start"
            >

              <div className="relative rounded-[28px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl">

                <img
                  src="/tiktok-2.jpg"
                  alt="TikTok Video"
                  className="w-full h-[340px] md:h-[440px] object-cover group-hover:scale-[1.05] transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center">

                  <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center animate-pulse">

                    <div className="ml-1 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-white" />

                  </div>

                </div>

              </div>

            </a>

            {/* VIDEO 3 */}
            <a
              href="https://www.tiktok.com/@itskentbreezy/video/7626772857565007124"
              target="_blank"
              rel="noopener noreferrer"
              className="group min-w-[210px] md:min-w-[250px] snap-start"
            >

              <div className="relative rounded-[28px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl">

                <img
                  src="/tiktok-3.jpg"
                  alt="TikTok Video"
                  className="w-full h-[340px] md:h-[440px] object-cover group-hover:scale-[1.05] transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center">

                  <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center animate-pulse">

                    <div className="ml-1 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-white" />

                  </div>

                </div>

              </div>

            </a>

            {/* SPOTIFY */}
            <div className="group min-w-[210px] md:min-w-[250px] snap-start">

              <div
                className="rounded-[28px] overflow-hidden border bg-white/5 backdrop-blur-2xl p-4"
                style={{
                  borderColor: `${BREEZE_GREEN}40`,
                }}
              >

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

                <iframe
                  style={{
                    borderRadius: "18px",
                  }}
                  src="https://open.spotify.com/embed/playlist/0I4lpBmuPerde7sYpVgLX2?utm_source=generator&theme=0"
                  width="100%"
                  height="520"
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
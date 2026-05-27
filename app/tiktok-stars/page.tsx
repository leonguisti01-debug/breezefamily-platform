"use client";

import { motion } from "framer-motion";

export default function TikTokStarsPage() {

  return (
    <main className="min-h-screen bg-[#050816] text-white overflow-hidden relative">

      {/* BACKGROUND LIGHTS */}
      <div className="absolute top-[-200px] left-[-120px] w-[500px] h-[500px] bg-pink-500/20 blur-[180px] rounded-full pointer-events-none" />

      <div className="absolute top-[120px] right-[-100px] w-[450px] h-[450px] bg-cyan-500/20 blur-[180px] rounded-full pointer-events-none" />

      <div className="absolute bottom-[-200px] left-[20%] w-[500px] h-[500px] bg-purple-500/20 blur-[200px] rounded-full pointer-events-none" />

      {/* HERO */}
      <section className="relative z-20 min-h-screen flex items-center px-5 py-14">

        <div className="max-w-7xl mx-auto w-full">

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* LEFT */}
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
            >

              <p className="uppercase tracking-[5px] text-[11px] text-cyan-400 font-black">

                South Africa's Biggest Kids Talent Search

              </p>

              <h1
                className="
                  mt-5
                  uppercase
                  font-black
                  italic
                  leading-[0.9]
                "
                style={{
                  fontFamily:
                    "Bebas Neue, sans-serif",
                  fontSize:
                    "clamp(64px, 10vw, 150px)",
                }}
              >

                BE THE NEXT

                <span className="block text-cyan-400">

                  TIKTOK

                </span>

                <span className="block text-pink-500">

                  STAR

                </span>

              </h1>

              <h2 className="mt-6 text-xl md:text-3xl font-black uppercase">

                Sing. Dance. Perform. Shine.

              </h2>

              <p className="mt-4 text-white/70 max-w-xl leading-relaxed text-sm md:text-lg">

                The Ultimate Kids Talent Search for Ages 2–17.
                Upload your performance, grow your audience,
                and stand a chance to become South Africa’s
                next digital superstar.

              </p>

              {/* FEATURES */}
              <div className="mt-8 space-y-3">

                {[
                  "Open to all young talent in South Africa",
                  "Upload your audition online",
                  "Win massive prizes",
                  "Be seen live on TikTok",
                ].map((item, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >

                    <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-[10px] font-black">

                      ✓

                    </div>

                    <p className="text-sm md:text-base text-white/80">

                      {item}

                    </p>

                  </div>

                ))}

              </div>

              {/* BUTTONS */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">

                <a
                  href="/kids-edition/register"
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    bg-gradient-to-r
                    from-pink-500
                    to-pink-600
                    px-8
                    py-5
                    uppercase
                    font-black
                    tracking-[3px]
                    text-sm
                    text-center
                    shadow-[0_0_35px_rgba(236,72,153,0.6)]
                    transition
                    hover:scale-[1.02]
                  "
                >

                  ENTER NOW

                </a>

                <a
                  href="/kids-edition/entries"
                  className="
                    rounded-2xl
                    border
                    border-white/15
                    bg-white/5
                    backdrop-blur-xl
                    px-8
                    py-5
                    uppercase
                    font-black
                    tracking-[3px]
                    text-sm
                    text-center
                    hover:bg-white/10
                    transition
                  "
                >

                  VIEW ENTRIES

                </a>

              </div>

              <p className="mt-6 text-white/40 text-sm">

                Entries open from 1 June – 30 September 2026

              </p>

            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
              }}
              className="relative"
            >

              {/* GLOW */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-cyan-500/10 to-purple-500/20 blur-[120px] rounded-full scale-110" />

              {/* IMAGE */}
              <div
                className="
                  relative
                  rounded-[40px]
                  overflow-hidden
                  border
                  border-white/10
                  shadow-[0_0_60px_rgba(0,255,255,0.15)]
                "
              >

                <img
                  src="/kids-edition-poster.jpg"
                  alt="TikTok Stars"
                  className="
                    w-full
                    h-auto
                    object-cover
                  "
                />

              </div>

            </motion.div>

          </div>

        </div>

      </section>

      {/* LOWER SECTION */}
      <section className="relative z-20 px-5 pb-24">

        <div className="max-w-7xl mx-auto">

          <div
            className="
              rounded-[40px]
              border
              border-white/10
              bg-white/5
              backdrop-blur-2xl
              p-8
            "
          >

            <div className="flex items-center justify-between flex-wrap gap-4">

              <div>

                <p className="uppercase tracking-[4px] text-[10px] text-cyan-400">

                  Competition Status

                </p>

                <h2
                  className="
                    mt-3
                    uppercase
                    italic
                    font-black
                  "
                  style={{
                    fontFamily:
                      "Bebas Neue, sans-serif",
                    fontSize:
                      "clamp(42px, 7vw, 90px)",
                    lineHeight:
                      "0.9",
                  }}
                >

                  SEASON 2
                  <span className="block text-pink-500">

                    KIDS EDITION

                  </span>

                </h2>

              </div>

              <div
                className="
                  rounded-2xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-pink-500
                  px-6
                  py-5
                  text-center
                  min-w-[180px]
                "
              >

                <p className="uppercase text-[10px] tracking-[3px] font-black">

                  Starting Prize

                </p>

                <h3
                  className="mt-2 font-black"
                  style={{
                    fontSize:
                      "clamp(36px, 6vw, 60px)",
                  }}
                >

                  R35K

                </h3>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
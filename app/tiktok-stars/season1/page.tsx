"use client";

import { motion } from "framer-motion";

export default function TikTokStarsSeason1Page() {

  return (
    <main className="min-h-screen bg-[#050816] text-white overflow-hidden relative">

      {/* BACKGROUND LIGHTS */}
      <div className="absolute top-[-200px] left-[-120px] w-[500px] h-[500px] bg-cyan-500/20 blur-[180px] rounded-full pointer-events-none" />

      <div className="absolute top-[120px] right-[-100px] w-[450px] h-[450px] bg-pink-500/20 blur-[180px] rounded-full pointer-events-none" />

      <div className="absolute bottom-[-200px] left-[20%] w-[500px] h-[500px] bg-purple-500/20 blur-[200px] rounded-full pointer-events-none" />

      {/* HERO */}
      <section className="relative z-20 px-5 pt-32 pb-20">

        <div className="max-w-7xl mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <p className="uppercase tracking-[5px] text-[11px] text-cyan-400 font-black">

              TikTok Stars Archive

            </p>

            <h1
              className="
                mt-6
                uppercase
                italic
                font-black
                leading-[0.9]
              "
              style={{
                fontFamily:
                  "Bebas Neue, sans-serif",
                fontSize:
                  "clamp(70px, 10vw, 180px)",
              }}
            >

              SEASON 1

            </h1>

            <p className="mt-6 max-w-3xl mx-auto text-white/70 leading-relaxed text-sm md:text-lg">

              Celebrating the unforgettable stars, standout performances
              and biggest moments from the very first season of
              TikTok Stars South Africa.

            </p>

          </motion.div>

        </div>

      </section>

      {/* WINNERS */}
      <section className="relative z-20 px-5 pb-28">

        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* RUNNER UP 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="
                relative
                overflow-hidden
                rounded-[36px]
                border
                border-white/10
                bg-white/5
                backdrop-blur-2xl
              "
            >

              <div className="relative h-[420px] md:h-[480px] overflow-hidden">

                <img
                  src="/season1-runnerup1.jpg"
                  alt="Runner Up"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute top-5 left-5 rounded-full bg-white/10 backdrop-blur-xl px-5 py-2 uppercase tracking-[3px] text-xs font-black">

                  Runner Up

                </div>

              </div>

              <div className="p-7">

                <h2
                  className="
                    uppercase
                    italic
                    font-black
                    leading-none
                  "
                  style={{
                    fontFamily:
                      "Bebas Neue, sans-serif",
                    fontSize:
                      "clamp(42px, 5vw, 70px)",
                  }}
                >

                  SECOND
                  <span className="block text-cyan-400">

                    PLACE

                  </span>

                </h2>

                <p className="mt-4 text-white/70 text-sm md:text-base leading-relaxed">

                  One of the breakout stars of Season 1,
                  bringing unforgettable energy and talent
                  to the TikTok Stars stage.

                </p>

              </div>

            </motion.div>

            {/* WINNER */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="
                relative
                overflow-hidden
                rounded-[36px]
                border
                border-pink-500/30
                bg-gradient-to-b
                from-pink-500/10
                to-black
                lg:scale-105
                shadow-[0_0_80px_rgba(236,72,153,0.25)]
              "
            >

              <div className="relative h-[500px] md:h-[560px] overflow-hidden">

                <img
                  src="/season1-winner.jpg"
                  alt="Winner"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute top-5 left-5 rounded-full bg-pink-500 text-white px-5 py-2 uppercase tracking-[3px] text-xs font-black shadow-[0_0_30px_rgba(236,72,153,0.5)]">

                  WINNER

                </div>

              </div>

              <div className="p-8">

                <h2
                  className="
                    uppercase
                    italic
                    font-black
                    leading-none
                  "
                  style={{
                    fontFamily:
                      "Bebas Neue, sans-serif",
                    fontSize:
                      "clamp(56px, 6vw, 90px)",
                  }}
                >

                  SEASON 1
                  <span className="block text-pink-500">

                    CHAMPION

                  </span>

                </h2>

                <p className="mt-5 text-white/75 text-sm md:text-base leading-relaxed">

                  Crowned the official winner of TikTok Stars Season 1.
                  A true standout performer who captured the hearts
                  of fans across South Africa.

                </p>

              </div>

            </motion.div>

            {/* RUNNER UP 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="
                relative
                overflow-hidden
                rounded-[36px]
                border
                border-white/10
                bg-white/5
                backdrop-blur-2xl
              "
            >

              <div className="relative h-[420px] md:h-[480px] overflow-hidden">

                <img
                  src="/season1-runnerup2.jpg"
                  alt="Runner Up"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute top-5 left-5 rounded-full bg-white/10 backdrop-blur-xl px-5 py-2 uppercase tracking-[3px] text-xs font-black">

                  Runner Up

                </div>

              </div>

              <div className="p-7">

                <h2
                  className="
                    uppercase
                    italic
                    font-black
                    leading-none
                  "
                  style={{
                    fontFamily:
                      "Bebas Neue, sans-serif",
                    fontSize:
                      "clamp(42px, 5vw, 70px)",
                  }}
                >

                  THIRD
                  <span className="block text-purple-400">

                    PLACE

                  </span>

                </h2>

                <p className="mt-4 text-white/70 text-sm md:text-base leading-relaxed">

                  A fan favourite from the first season,
                  delivering creativity, confidence and
                  unforgettable performances.

                </p>

              </div>

            </motion.div>

          </div>

        </div>

      </section>

    </main>
  );
}
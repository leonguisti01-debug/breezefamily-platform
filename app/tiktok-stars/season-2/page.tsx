"use client";

import { motion } from "framer-motion";

export default function TikTokStarsSeason2Page() {

  return (
    <main className="min-h-screen bg-[#050816] text-white overflow-hidden relative">

      {/* BACKGROUND LIGHTS */}
      <div className="absolute top-[-200px] left-[-120px] w-[500px] h-[500px] bg-pink-500/20 blur-[180px] rounded-full pointer-events-none" />

      <div className="absolute top-[120px] right-[-100px] w-[450px] h-[450px] bg-cyan-500/20 blur-[180px] rounded-full pointer-events-none" />

      <div className="absolute bottom-[-200px] left-[20%] w-[500px] h-[500px] bg-purple-500/20 blur-[200px] rounded-full pointer-events-none" />

      {/* HERO */}
      <section className="relative z-20 px-5 pt-32 pb-20">

        <div className="max-w-7xl mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <p className="uppercase tracking-[5px] text-[11px] text-pink-500 font-black">

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

              SEASON 2

            </h1>

            <p className="mt-6 max-w-3xl mx-auto text-white/70 leading-relaxed text-sm md:text-lg">

              Bigger performances. Bigger prizes. Bigger moments.
              Season 2 elevated TikTok Stars to a whole new level,
              showcasing South Africa’s brightest young creators.

            </p>

          </motion.div>

        </div>

      </section>

      {/* WINNERS */}
      <section className="relative z-20 px-5 pb-28">

        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* WINNER */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="
                relative
                overflow-hidden
                rounded-[40px]
                border
                border-pink-500/30
                bg-gradient-to-b
                from-pink-500/10
                to-black
                shadow-[0_0_80px_rgba(236,72,153,0.25)]
              "
            >

              <div className="relative h-[520px] md:h-[650px] overflow-hidden">

                <img
                  src="/season2-winner.jpg"
                  alt="Season 2 Winner"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute top-5 left-5 rounded-full bg-pink-500 text-white px-5 py-2 uppercase tracking-[3px] text-xs font-black shadow-[0_0_30px_rgba(236,72,153,0.5)]">

                  WINNER

                </div>

              </div>

              <div className="p-8 md:p-10">

                <p className="uppercase tracking-[4px] text-pink-500 text-[10px] md:text-xs font-black">

                  GRAND PRIZE

                </p>

                <h2
                  className="
                    mt-3
                    uppercase
                    italic
                    font-black
                    leading-none
                  "
                  style={{
                    fontFamily:
                      "Bebas Neue, sans-serif",
                    fontSize:
                      "clamp(60px, 7vw, 110px)",
                  }}
                >

                  R120 000

                </h2>

                <h3
                  className="
                    mt-6
                    uppercase
                    italic
                    font-black
                    leading-none
                  "
                  style={{
                    fontFamily:
                      "Bebas Neue, sans-serif",
                    fontSize:
                      "clamp(42px, 5vw, 72px)",
                  }}
                >

                  SEASON 2
                  <span className="block text-pink-500">

                    CHAMPION

                  </span>

                </h3>

                <p className="mt-5 text-white/75 text-sm md:text-base leading-relaxed">

                  The official TikTok Stars Season 2 winner,
                  taking home the massive R120 000 grand prize
                  after an unforgettable season of performances,
                  creativity and fan support.

                </p>

              </div>

            </motion.div>

            {/* RUNNER UP */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="
                relative
                overflow-hidden
                rounded-[40px]
                border
                border-cyan-400/20
                bg-white/5
                backdrop-blur-2xl
              "
            >

              <div className="relative h-[520px] md:h-[650px] overflow-hidden">

                <img
                  src="/season2-runnerup.jpg"
                  alt="Season 2 Runner Up"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute top-5 left-5 rounded-full bg-cyan-400 text-black px-5 py-2 uppercase tracking-[3px] text-xs font-black shadow-[0_0_30px_rgba(34,211,238,0.4)]">

                  RUNNER UP

                </div>

              </div>

              <div className="p-8 md:p-10">

                <p className="uppercase tracking-[4px] text-cyan-400 text-[10px] md:text-xs font-black">

                  SECOND PLACE

                </p>

                <h2
                  className="
                    mt-3
                    uppercase
                    italic
                    font-black
                    leading-none
                  "
                  style={{
                    fontFamily:
                      "Bebas Neue, sans-serif",
                    fontSize:
                      "clamp(60px, 7vw, 110px)",
                  }}
                >

                  R20 000

                </h2>

                <h3
                  className="
                    mt-6
                    uppercase
                    italic
                    font-black
                    leading-none
                  "
                  style={{
                    fontFamily:
                      "Bebas Neue, sans-serif",
                    fontSize:
                      "clamp(42px, 5vw, 72px)",
                  }}
                >

                  SEASON 2
                  <span className="block text-cyan-400">

                    FINALIST

                  </span>

                </h3>

                <p className="mt-5 text-white/75 text-sm md:text-base leading-relaxed">

                  A standout performer who captivated audiences
                  throughout the competition and secured the
                  Season 2 runner-up position with an incredible
                  performance journey.

                </p>

              </div>

            </motion.div>

          </div>

        </div>

      </section>

    </main>
  );
}
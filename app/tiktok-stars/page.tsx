"use client";

import { motion } from "framer-motion";

const BREEZE_GREEN = "#8DFF00";

export default function TikTokStarsPage() {

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden relative">

      {/* BACKGROUND */}
      <div
        className="fixed top-[-220px] left-[-220px] w-[420px] h-[420px] blur-[160px] rounded-full pointer-events-none"
        style={{
          background: `${BREEZE_GREEN}12`,
        }}
      />

      <div
        className="fixed bottom-[-220px] right-[-220px] w-[420px] h-[420px] blur-[160px] rounded-full pointer-events-none"
        style={{
          background: `${BREEZE_GREEN}08`,
        }}
      />

      {/* HERO */}
      <section className="relative z-20 px-4 pt-10 pb-8">

        <div className="text-center">

          <p
            className="uppercase tracking-[4px] text-[10px]"
            style={{
              color: BREEZE_GREEN,
            }}
          >
            South Africa's Digital Star Platform
          </p>

          <h1
            className="mt-5 uppercase italic font-black"
            style={{
              fontFamily:
                "Bebas Neue, sans-serif",
              fontSize:
                "clamp(54px, 14vw, 120px)",
              lineHeight: "0.82",
              letterSpacing: "0.08em",
            }}
          >

            TIKTOK
            <span
              className="block"
              style={{
                color: BREEZE_GREEN,
              }}
            >
              STARS
            </span>

          </h1>

        </div>

      </section>

      {/* MOBILE CARDS */}
      <section className="relative z-20 px-4 pb-20">

        <div
          className="
            flex
            gap-4
            overflow-x-auto
            snap-x
            snap-mandatory
            no-scrollbar
            pb-4
            pr-[18vw]
          "
        >

          {/* ========================= */}
          {/* KIDS EDITION */}
          {/* ========================= */}

          <motion.div
            whileTap={{
              scale: 0.98,
            }}
            className="snap-center shrink-0 w-[72vw] max-w-[320px]"
          >

            <div
              className="
                rounded-[30px]
                border
                bg-white/5
                backdrop-blur-2xl
                overflow-hidden
                p-5
                min-h-[540px]
                flex
                flex-col
                justify-between
              "
              style={{
                borderColor:
                  `${BREEZE_GREEN}40`,
              }}
            >

              <div>

                <div
                  className="
                    inline-flex
                    rounded-full
                    bg-[#8DFF00]
                    text-black
                    px-4
                    py-2
                    text-[10px]
                    uppercase
                    tracking-[3px]
                    font-black
                  "
                >

                  OPEN NOW

                </div>

                <p
                  className="uppercase tracking-[4px] text-[10px] mt-6"
                  style={{
                    color:
                      BREEZE_GREEN,
                  }}
                >
                  The Next Generation
                </p>

                <h2
                  className="mt-4 uppercase italic font-black"
                  style={{
                    fontFamily:
                      "Bebas Neue, sans-serif",
                    fontSize:
                      "clamp(34px, 8vw, 56px)",
                    lineHeight: "0.9",
                  }}
                >

                  Season 2
                  <span className="block">
                    Kids Edition
                  </span>

                </h2>

                <p className="mt-6 text-white/70 text-sm leading-relaxed">

                  South Africa’s next generation of performers,
                  creators and entertainers are ready to shine.

                </p>

              </div>

              <div className="mt-10 space-y-4">

                <a
                  href="https://www.breezefamily.co.za/kids-edition/entries"
                  target="_blank"
                  rel="noopener noreferrer"
                >

                  <div
                    className="
                      rounded-[20px]
                      border
                      border-white/10
                      bg-white/5
                      py-4
                      text-center
                      uppercase
                      tracking-[3px]
                      text-[10px]
                      font-black
                    "
                  >

                    View Accepted Entries

                  </div>

                </a>

                <a
                  href="https://www.breezefamily.co.za/kids-edition/register"
                  target="_blank"
                  rel="noopener noreferrer"
                >

                  <div
                    className="
                      rounded-[20px]
                      bg-[#8DFF00]
                      text-black
                      py-4
                      text-center
                      uppercase
                      tracking-[3px]
                      text-[10px]
                      font-black
                    "
                  >

                    Enter Kids Edition

                  </div>

                </a>

              </div>

            </div>

          </motion.div>

          {/* ========================= */}
          {/* SEASON 1 */}
          {/* ========================= */}

          <motion.div
            whileTap={{
              scale: 0.98,
            }}
            className="snap-center shrink-0 w-[72vw] max-w-[320px]"
          >

            <div
              className="
                rounded-[30px]
                border
                bg-white/5
                backdrop-blur-2xl
                overflow-hidden
                p-5
                min-h-[540px]
              "
              style={{
                borderColor:
                  `${BREEZE_GREEN}25`,
              }}
            >

              <p
                className="uppercase tracking-[4px] text-[10px]"
                style={{
                  color: BREEZE_GREEN,
                }}
              >
                Original Season
              </p>

              <h2
                className="mt-4 uppercase italic font-black"
                style={{
                  fontFamily:
                    "Bebas Neue, sans-serif",
                  fontSize:
                    "clamp(36px, 9vw, 60px)",
                  lineHeight: "0.9",
                }}
              >

                Season 1

              </h2>

              {/* WINNER */}
              <div className="mt-8 text-center">

                <div
                  className="
                    w-[105px]
                    h-[105px]
                    rounded-full
                    overflow-hidden
                    border-4
                    mx-auto
                  "
                  style={{
                    borderColor:
                      BREEZE_GREEN,
                  }}
                >

                  <img
                    src="/season1-winner.jpg"
                    alt="Winner"
                    loading="lazy"
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                </div>

                <p
                  className="mt-4 uppercase tracking-[4px] text-[10px]"
                  style={{
                    color:
                      BREEZE_GREEN,
                  }}
                >
                  Winner
                </p>

                <h3
                  className="mt-2 uppercase italic font-black"
                  style={{
                    fontFamily:
                      "Bebas Neue, sans-serif",
                    fontSize:
                      "clamp(24px, 7vw, 38px)",
                  }}
                >

                  NAME

                </h3>

              </div>

              {/* RUNNERS */}
              <div className="grid grid-cols-2 gap-3 mt-8">

                <RunnerBubble
                  image="/season1-runnerup1.jpg"
                  name="SETH"
                />

                <RunnerBubble
                  image="/season1-runnerup2.jpg"
                  name="GUMEDE"
                />

              </div>

            </div>

          </motion.div>

          {/* ========================= */}
          {/* SEASON 2 */}
          {/* ========================= */}

          <motion.div
            whileTap={{
              scale: 0.98,
            }}
            className="snap-center shrink-0 w-[72vw] max-w-[320px]"
          >

            <div
              className="
                rounded-[30px]
                border
                bg-white/5
                backdrop-blur-2xl
                overflow-hidden
                p-5
                min-h-[540px]
              "
              style={{
                borderColor:
                  `${BREEZE_GREEN}25`,
              }}
            >

              <p
                className="uppercase tracking-[4px] text-[10px]"
                style={{
                  color: BREEZE_GREEN,
                }}
              >
                Creator Evolution
              </p>

              <h2
                className="mt-4 uppercase italic font-black"
                style={{
                  fontFamily:
                    "Bebas Neue, sans-serif",
                  fontSize:
                    "clamp(36px, 9vw, 60px)",
                  lineHeight: "0.9",
                }}
              >

                Season 2

              </h2>

              {/* WINNER */}
              <div className="mt-8 text-center">

                <div
                  className="
                    w-[105px]
                    h-[105px]
                    rounded-full
                    overflow-hidden
                    border-4
                    mx-auto
                  "
                  style={{
                    borderColor:
                      BREEZE_GREEN,
                  }}
                >

                  <img
                    src="/season2-winner.jpg"
                    alt="Winner"
                    loading="lazy"
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                </div>

                <p
                  className="mt-4 uppercase tracking-[4px] text-[10px]"
                  style={{
                    color:
                      BREEZE_GREEN,
                  }}
                >
                  Winner
                </p>

                <h3
                  className="mt-2 uppercase italic font-black"
                  style={{
                    fontFamily:
                      "Bebas Neue, sans-serif",
                    fontSize:
                      "clamp(24px, 7vw, 38px)",
                  }}
                >

                  CARLETHEIA

                </h3>

              </div>

              {/* SECOND */}
              <div className="mt-10 text-center">

                <div className="w-[90px] h-[90px] rounded-full overflow-hidden border border-white/20 mx-auto">

                  <img
                    src="/season2-runnerup.jpg"
                    alt="Runner Up"
                    loading="lazy"
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                </div>

                <p className="mt-3 uppercase tracking-[3px] text-[10px] text-white/50">

                  Second Place

                </p>

                <h4
                  className="mt-1 uppercase italic font-black"
                  style={{
                    fontFamily:
                      "Bebas Neue, sans-serif",
                    fontSize:
                      "clamp(20px, 6vw, 32px)",
                  }}
                >

                  KUTLWANO

                </h4>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

    </main>
  );
}

function RunnerBubble({
  image,
  name,
}: any) {

  return (

    <div className="text-center">

      <div className="w-[72px] h-[72px] rounded-full overflow-hidden border border-white/20 mx-auto">

        <img
          src={image}
          alt={name}
          loading="lazy"
          className="
            w-full
            h-full
            object-cover
          "
        />

      </div>

      <p className="mt-3 uppercase tracking-[3px] text-[9px] text-white/50">

        Runner Up

      </p>

      <h4
        className="mt-1 uppercase italic font-black"
        style={{
          fontFamily:
            "Bebas Neue, sans-serif",
          fontSize:
            "clamp(18px, 4vw, 24px)",
        }}
      >

        {name}

      </h4>

    </div>

  );
}
"use client";

import { motion } from "framer-motion";

const BREEZE_GREEN = "#8DFF00";

export default function TikTokStarsPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* BACKGROUND */}
      <div
        className="absolute top-[-300px] left-[-300px] w-[700px] h-[700px] blur-[220px] rounded-full"
        style={{
          background: `${BREEZE_GREEN}18`,
        }}
      />

      <div
        className="absolute bottom-[-300px] right-[-300px] w-[700px] h-[700px] blur-[220px] rounded-full"
        style={{
          background: `${BREEZE_GREEN}12`,
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
      <section className="relative z-20 px-4 md:px-6 pt-10 md:pt-14 pb-16">

        <div className="max-w-7xl mx-auto text-center">

          <p
            className="uppercase font-black"
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "clamp(13px, 1vw, 16px)",
              letterSpacing: "0.18em",
              marginBottom: "18px",
              color: BREEZE_GREEN,
            }}
          >

            SOUTH AFRICA'S DIGITAL STAR PLATFORM

          </p>

          <h1
            className="uppercase italic font-black leading-none"
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "clamp(70px, 10vw, 180px)",
              letterSpacing: "0.12em",
              lineHeight: "0.82",
            }}
          >

            <span className="block text-white">
              TIKTOK
            </span>

            <span
              className="block mt-2"
              style={{
                color: BREEZE_GREEN,
              }}
            >
              STARS
            </span>

          </h1>

        </div>

      </section>

      {/* MOBILE SWIPE + DESKTOP GRID */}
      <section className="relative z-20 px-4 md:px-6 pb-28 overflow-hidden">

        <div className="max-w-7xl mx-auto overflow-visible">

          <div className="flex lg:grid lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto overflow-y-visible lg:overflow-visible snap-x snap-mandatory px-1 pb-4 pr-[20vw] no-scrollbar">

            {/* ========================= */}
            {/* SEASON 1 */}
            {/* ========================= */}

            <motion.div
              className="w-[78vw] sm:w-[420px] lg:w-auto snap-center shrink-0"
              whileHover={{
                y: -8,
              }}
              transition={{
                duration: 0.3,
              }}
            >

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[34px]
                  border
                  bg-white/5
                  backdrop-blur-2xl
                  p-8
                  min-h-[760px]
                "
                style={{
                  borderColor: `${BREEZE_GREEN}30`,
                }}
              >

                <div
                  className="absolute top-[-100px] right-[-100px] w-[220px] h-[220px] rounded-full blur-[120px]"
                  style={{
                    background: `${BREEZE_GREEN}12`,
                  }}
                />

                <div className="relative z-10">

                  <p
                    className="uppercase tracking-[5px] text-xs mb-4"
                    style={{
                      color: BREEZE_GREEN,
                    }}
                  >
                    Original Season
                  </p>

                  <h2
                    className="uppercase italic font-black"
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: "clamp(46px, 5vw, 72px)",
                      lineHeight: "0.9",
                      letterSpacing: "0.1em",
                    }}
                  >

                    Season 1

                  </h2>

                </div>

                <div className="relative z-10 mt-12">

                  <div className="text-center">

                    <div
                      className="
                        w-[170px]
                        h-[170px]
                        rounded-full
                        overflow-hidden
                        border-4
                        mx-auto
                      "
                      style={{
                        borderColor: BREEZE_GREEN,
                      }}
                    >

                      <img
                        src="/season1-winner.jpg"
                        alt="Winner"
                        className="w-full h-full object-cover"
                      />

                    </div>

                    <p
                      className="mt-6 uppercase tracking-[4px] text-xs"
                      style={{
                        color: BREEZE_GREEN,
                      }}
                    >
                      Winner
                    </p>

                    <h3
                      className="mt-3 uppercase italic font-black"
                      style={{
                        fontFamily: "Bebas Neue, sans-serif",
                        fontSize: "42px",
                        letterSpacing: "0.08em",
                      }}
                    >

                      NAME

                    </h3>

                  </div>

                  <div className="grid grid-cols-2 gap-5 mt-12">

                    <div className="text-center">

                      <div className="w-[120px] h-[120px] rounded-full overflow-hidden border border-white/20 mx-auto">

                        <img
                          src="/season1-runnerup1.jpg"
                          alt="Runner Up"
                          className="w-full h-full object-cover"
                        />

                      </div>

                      <p className="mt-4 uppercase tracking-[3px] text-[10px] text-white/50">
                        Runner Up
                      </p>

                      <h4
                        className="mt-2 uppercase italic font-black"
                        style={{
                          fontFamily: "Bebas Neue, sans-serif",
                          fontSize: "26px",
                          letterSpacing: "0.08em",
                        }}
                      >

                        SETH

                      </h4>

                    </div>

                    <div className="text-center">

                      <div className="w-[120px] h-[120px] rounded-full overflow-hidden border border-white/20 mx-auto">

                        <img
                          src="/season1-runnerup2.jpg"
                          alt="Runner Up"
                          className="w-full h-full object-cover"
                        />

                      </div>

                      <p className="mt-4 uppercase tracking-[3px] text-[10px] text-white/50">
                        Runner Up
                      </p>

                      <h4
                        className="mt-2 uppercase italic font-black"
                        style={{
                          fontFamily: "Bebas Neue, sans-serif",
                          fontSize: "26px",
                          letterSpacing: "0.08em",
                        }}
                      >

                        GUMEDE

                      </h4>

                    </div>

                  </div>

                </div>

              </div>

            </motion.div>

            {/* ========================= */}
            {/* SEASON 2 */}
            {/* ========================= */}

            <motion.div
              className="w-[78vw] sm:w-[420px] lg:w-auto snap-center shrink-0"
              whileHover={{
                y: -8,
              }}
              transition={{
                duration: 0.3,
              }}
            >

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[34px]
                  border
                  bg-white/5
                  backdrop-blur-2xl
                  p-8
                  min-h-[760px]
                "
                style={{
                  borderColor: `${BREEZE_GREEN}30`,
                }}
              >

                <div
                  className="absolute top-[-100px] right-[-100px] w-[220px] h-[220px] rounded-full blur-[120px]"
                  style={{
                    background: `${BREEZE_GREEN}12`,
                  }}
                />

                <div className="relative z-10">

                  <p
                    className="uppercase tracking-[5px] text-xs mb-4"
                    style={{
                      color: BREEZE_GREEN,
                    }}
                  >
                    Creator Evolution
                  </p>

                  <h2
                    className="uppercase italic font-black"
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: "clamp(46px, 5vw, 72px)",
                      lineHeight: "0.9",
                      letterSpacing: "0.1em",
                    }}
                  >

                    Season 2

                  </h2>

                </div>

                <div className="relative z-10 mt-12">

                  <div className="text-center">

                    <div
                      className="
                        w-[170px]
                        h-[170px]
                        rounded-full
                        overflow-hidden
                        border-4
                        mx-auto
                      "
                      style={{
                        borderColor: BREEZE_GREEN,
                      }}
                    >

                      <img
                        src="/season2-winner.jpg"
                        alt="Winner"
                        className="w-full h-full object-cover"
                      />

                    </div>

                    <p
                      className="mt-6 uppercase tracking-[4px] text-xs"
                      style={{
                        color: BREEZE_GREEN,
                      }}
                    >
                      Winner
                    </p>

                    <h3
                      className="mt-3 uppercase italic font-black"
                      style={{
                        fontFamily: "Bebas Neue, sans-serif",
                        fontSize: "42px",
                        letterSpacing: "0.08em",
                      }}
                    >

                      CARLETHEIA

                    </h3>

                  </div>

                  <div className="mt-14 text-center">

                    <div className="w-[140px] h-[140px] rounded-full overflow-hidden border border-white/20 mx-auto">

                      <img
                        src="/season2-runnerup.jpg"
                        alt="Second Place"
                        className="w-full h-full object-cover"
                      />

                    </div>

                    <p className="mt-5 uppercase tracking-[3px] text-[10px] text-white/50">
                      Second Place
                    </p>

                    <h4
                      className="mt-2 uppercase italic font-black"
                      style={{
                        fontFamily: "Bebas Neue, sans-serif",
                        fontSize: "32px",
                        letterSpacing: "0.08em",
                      }}
                    >

                      KUTLWANO

                    </h4>

                  </div>

                </div>

              </div>

            </motion.div>

            {/* ========================= */}
            {/* SEASON 2, KIDS EDITION */}
            {/* ========================= */}

            <motion.div
              className="w-[78vw] sm:w-[420px] lg:w-auto snap-center shrink-0"
              whileHover={{
                y: -8,
              }}
              transition={{
                duration: 0.3,
              }}
            >

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[34px]
                  border
                  bg-white/5
                  backdrop-blur-2xl
                  p-8
                  min-h-[760px]
                  flex
                  flex-col
                  justify-between
                "
                style={{
                  borderColor: `${BREEZE_GREEN}45`,
                }}
              >

                <div
                  className="absolute top-[-120px] right-[-120px] w-[260px] h-[260px] rounded-full blur-[140px]"
                  style={{
                    background: `${BREEZE_GREEN}25`,
                  }}
                />

                <div
                  className="
                    absolute
                    top-6
                    right-6
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

                <div className="relative z-10">

                  <p
                    className="uppercase tracking-[5px] text-xs mb-4"
                    style={{
                      color: BREEZE_GREEN,
                    }}
                  >
                    The Next Generation
                  </p>

                  <h2
                    className="uppercase italic font-black"
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: "clamp(42px, 5vw, 68px)",
                      lineHeight: "0.9",
                      letterSpacing: "0.1em",
                    }}
                  >

                    Season 3
                    <span className="block">
                      Kids Edition
                    </span>

                  </h2>

                  <p
                    className="text-white/70 mt-8"
                    style={{
                      lineHeight: "1.7",
                      fontSize: "16px",
                    }}
                  >

                    South Africa’s newest generation of performers,
                    entertainers and digital stars are ready to enter
                    the spotlight.

                  </p>

                </div>

                <div className="relative z-10 mt-16 space-y-4">

                  <a
                    href="https://www.breezefamily.co.za/kids-edition/entries"
                    target="_blank"
                    rel="noopener noreferrer"
                  >

                    <div
                      className="
                        rounded-[24px]
                        border
                        border-white/10
                        bg-white/5
                        backdrop-blur-xl
                        text-white
                        px-6
                        py-5
                        uppercase
                        tracking-[4px]
                        text-xs
                        font-black
                        text-center
                        hover:border-[#8DFF00]
                        hover:text-[#8DFF00]
                        transition
                        duration-300
                        cursor-pointer
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
                        rounded-[24px]
                        bg-[#8DFF00]
                        text-black
                        px-6
                        py-5
                        uppercase
                        tracking-[4px]
                        text-xs
                        font-black
                        text-center
                        hover:scale-[1.02]
                        transition
                        duration-300
                        cursor-pointer
                      "
                    >

                      Enter Kids Edition

                    </div>

                  </a>

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </section>

    </main>
  );
}
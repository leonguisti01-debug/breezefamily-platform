"use client";

import { motion } from "framer-motion";

const BREEZE_GREEN = "#8DFF00";

export default function JoinTheFamilyPage() {

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* BACKGROUND */}
      <div
        className="absolute top-[-300px] left-[-300px] w-[700px] h-[700px] blur-[220px] rounded-full"
        style={{
          background:
            `${BREEZE_GREEN}20`,
        }}
      />

      <div
        className="absolute bottom-[-300px] right-[-300px] w-[700px] h-[700px] blur-[220px] rounded-full"
        style={{
          background:
            `${BREEZE_GREEN}15`,
        }}
      />

      {/* GRID */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize:
            "70px 70px",
        }}
      />

      {/* HERO */}
      <section className="relative z-20 px-4 pt-32 pb-20">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

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
              duration: 1,
            }}
          >

            <p
              className="uppercase tracking-[5px] text-xs font-black"
              style={{
                color:
                  BREEZE_GREEN,
              }}
            >

              BECOME PART OF THE MOVEMENT

            </p>

            <h1
              className="mt-6 uppercase italic font-black leading-[0.88]"
              style={{
                fontFamily:
                  "Bebas Neue, sans-serif",
                fontSize:
                  "clamp(70px, 10vw, 170px)",
              }}
            >

              <span className="block text-white">

                JOIN

              </span>

              <span
                className="block"
                style={{
                  color:
                    BREEZE_GREEN,
                }}
              >

                THE FAMILY

              </span>

            </h1>

            <p
              className="mt-8 text-white/75 leading-relaxed max-w-[560px]"
              style={{
                fontSize:
                  "clamp(18px, 1.5vw, 26px)",
              }}
            >

              Create your free Breeze Family account to unlock
              exclusive competitions, live experiences, giveaways,
              merch drops and featured community content.

            </p>

            {/* FEATURES */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5">

              <FeatureCard
                title="Exclusive Giveaways"
                text="Get access to members-only competitions and prizes."
              />

              <FeatureCard
                title="Live Events"
                text="Join TikTok Lives, announcements and exclusive reveals."
              />

              <FeatureCard
                title="Featured Community"
                text="Get your pets, videos and moments showcased online."
              />

              <FeatureCard
                title="Early Access"
                text="Be first in line for merch drops and special launches."
              />

            </div>

          </motion.div>

          {/* RIGHT */}
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
              duration: 1,
              delay: 0.2,
            }}
          >

            <div className="rounded-[40px] border border-[#8DFF00]/30 bg-white/5 backdrop-blur-2xl p-6 md:p-10 shadow-[0_0_60px_rgba(141,255,0,0.08)]">

              <h2
                className="uppercase italic font-black text-center leading-none"
                style={{
                  fontFamily:
                    "Bebas Neue, sans-serif",
                  fontSize:
                    "clamp(50px, 8vw, 90px)",
                }}
              >

                CREATE
                <span
                  className="block"
                  style={{
                    color:
                      BREEZE_GREEN,
                  }}
                >
                  ACCOUNT
                </span>

              </h2>

              <form className="mt-10 space-y-4">

                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-[#8DFF00]"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-[#8DFF00]"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-[#8DFF00]"
                />

                <input
                  type="password"
                  placeholder="Create Password"
                  className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-[#8DFF00]"
                />

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#8DFF00] text-black font-black uppercase tracking-[4px] hover:scale-[1.02] transition shadow-[0_0_40px_rgba(141,255,0,0.35)]"
                >

                  JOIN THE FAMILY

                </button>

              </form>

              <p className="mt-6 text-center text-white/50 text-sm leading-relaxed">

                By creating an account you agree to receive
                updates, giveaways and Breeze Family news.

              </p>

            </div>

          </motion.div>

        </div>

      </section>

    </main>
  );
}

function FeatureCard({
  title,
  text,
}: any) {

  return (

    <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

      <h3
        className="uppercase font-black"
        style={{
          fontFamily:
            "Bebas Neue, sans-serif",
          fontSize:
            "28px",
          color:
            BREEZE_GREEN,
          letterSpacing:
            "0.05em",
        }}
      >

        {title}

      </h3>

      <p className="mt-3 text-white/70 text-sm leading-relaxed">

        {text}

      </p>

    </div>

  );
}
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const BREEZE_GREEN = "#8DFF00";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function HomePage() {

  const [views,
    setViews] =
    useState(0);

  useEffect(() => {

    incrementViews();

  }, []);

  /* VISITS */
  const incrementViews =
    async () => {

      /* GET */
      const {
        data
      } =
        await supabase
          .from(
            "site_stats"
          )
          .select(
            "id, homepage_views"
          )
          .limit(1)
          .single();

      if (!data)
        return;

      const newViews =
        Number(
          data.homepage_views
        ) + 1;

      /* UPDATE */
      await supabase
        .from(
          "site_stats"
        )
        .update({
          homepage_views:
            newViews,
        })
        .eq(
          "id",
          data.id
        );

      setViews(
        newViews
      );
    };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* BACKGROUND */}
      <div
        className="absolute top-[-300px] left-[-300px] w-[700px] h-[700px] blur-[220px] rounded-full"
        style={{
          background:
            `${BREEZE_GREEN}30`,
        }}
      />

      <div
        className="absolute bottom-[-300px] right-[-300px] w-[700px] h-[700px] blur-[220px] rounded-full"
        style={{
          background:
            `${BREEZE_GREEN}20`,
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

      {/* VISIT COUNTER */}
      <section className="relative z-30 px-4 pt-24">

        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
              mx-auto
              w-full
              max-w-[360px]
              rounded-[30px]
              border
              bg-white/5
              backdrop-blur-2xl
              px-6
              py-5
              text-center
              shadow-[0_0_60px_rgba(141,255,0,0.10)]
            "
            style={{
              borderColor:
                `${BREEZE_GREEN}40`,
            }}
          >

            <p
              className="
                uppercase
                tracking-[4px]
                text-[10px]
                font-black
              "
              style={{
                color:
                  BREEZE_GREEN,
              }}
            >

              LIVE FAMILY VISITS

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
                  "clamp(52px, 12vw, 90px)",
                lineHeight:
                  "0.9",
                letterSpacing:
                  "0.05em",
              }}
            >

              {views.toLocaleString()}

            </h2>

          </motion.div>

        </div>

      </section>

      {/* HERO */}
      <section className="relative z-20 px-4 md:px-6 pt-10 md:pt-16 pb-20">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* LEFT SIDE */}
          <div className="relative z-20">

            {/* SMALL TOP TEXT */}
            <p
              className="uppercase font-black"
              style={{
                fontFamily:
                  "Bebas Neue, sans-serif",
                fontSize:
                  "clamp(13px, 1vw, 16px)",
                letterSpacing:
                  "0.12em",
                marginBottom:
                  "16px",
                color:
                  BREEZE_GREEN,
              }}
            >

              A NEW CHAPTER. A BIGGER MOVEMENT.

            </p>

            {/* MAIN HEADING */}
            <div className="leading-none">

              <h1
                className="uppercase italic font-black text-white"
                style={{
                  fontFamily:
                    "Bebas Neue, sans-serif",
                  fontSize:
                    "clamp(78px, 10vw, 160px)",
                  lineHeight:
                    "0.82",
                  letterSpacing:
                    "0.12em",
                }}
              >

                <span className="block">

                  A NEW

                </span>

                <span
                  className="block mt-2"
                  style={{
                    color:
                      BREEZE_GREEN,
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
                marginTop:
                  "24px",
                fontSize:
                  "clamp(18px, 1.4vw, 26px)",
                fontWeight:
                  300,
                letterSpacing:
                  "-0.02em",
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
                repeat:
                  Infinity,
                duration:
                  6,
              }}
              className="absolute top-0 right-0 w-[240px] md:w-[380px] rounded-[34px] overflow-hidden border bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(141,255,0,0.08)]"
              style={{
                borderColor:
                  `${BREEZE_GREEN}40`,
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
                repeat:
                  Infinity,
                duration:
                  6,
              }}
              className="absolute top-[150px] left-0 md:left-[-10px] w-[200px] md:w-[290px] rounded-[28px] overflow-hidden border bg-black/80 backdrop-blur-2xl shadow-[0_0_60px_rgba(141,255,0,0.12)]"
              style={{
                borderColor:
                  `${BREEZE_GREEN}40`,
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
                repeat:
                  Infinity,
                duration:
                  7,
              }}
              className="absolute bottom-[20px] right-0 md:right-[-30px] w-[200px] md:w-[270px] rounded-[28px] overflow-hidden border bg-black/80 backdrop-blur-2xl shadow-[0_0_60px_rgba(141,255,0,0.12)]"
              style={{
                borderColor:
                  `${BREEZE_GREEN}40`,
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

    </main>
  );
}
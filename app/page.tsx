"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

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

  const incrementViews =
    async () => {

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
            `${BREEZE_GREEN}25`,
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
      <section className="relative z-20 overflow-hidden">

        <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-10 md:pt-16">

          {/* MOBILE FIX */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_540px_320px] gap-10 items-start">

            {/* LEFT */}
            <div className="order-2 lg:order-1 text-center lg:text-left">

              <p
                className="
                  uppercase
                  font-black
                  text-[#8DFF00]
                "
                style={{
                  fontFamily:
                    "Bebas Neue, sans-serif",
                  fontSize:
                    "clamp(14px, 1vw, 18px)",
                  letterSpacing:
                    "0.2em",
                }}
              >

                LIVE FAMILY. REAL FUN. PRIZED PETS.

              </p>

              <h1
                className="
                  mt-6
                  uppercase
                  italic
                  font-black
                  leading-[0.88]
                "
                style={{
                  fontFamily:
                    "Bebas Neue, sans-serif",
                  fontSize:
                    "clamp(70px, 9vw, 150px)",
                  letterSpacing:
                    "0.02em",
                }}
              >

                <span className="block text-white">

                  A NEW CHAPTER.

                </span>

                <span
                  className="block mt-2"
                  style={{
                    color:
                      BREEZE_GREEN,
                  }}
                >

                  A BIGGER MOVEMENT.

                </span>

              </h1>

              <p
                className="
                  mt-8
                  text-white/75
                  leading-relaxed
                  max-w-[520px]
                  mx-auto
                  lg:mx-0
                  mb-12
                "
                style={{
                  fontSize:
                    "clamp(18px, 1.4vw, 26px)",
                }}
              >

                From my home to yours, join thousands of fans
                following the journey of my life, my joys
                and everything in between.

              </p>

            </div>

            {/* CENTER IMAGE */}
            <div className="relative flex justify-center order-1 lg:order-2">

              <div className="absolute inset-0 bg-[#8DFF00]/20 blur-[120px] rounded-full scale-75" />

              <motion.img
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  repeat:
                    Infinity,
                  duration:
                    6,
                }}
                src="/hero-pets.png"
                alt="Breeze Family"
                className="
                  relative
                  z-20
                  w-full
                  max-w-[620px]
                  object-contain
                  drop-shadow-[0_0_40px_rgba(141,255,0,0.35)]
                "
              />

            </div>

            {/* RIGHT PANEL */}
            <div className="order-3 flex justify-center lg:justify-end">

              <motion.div
                initial={{
                  opacity: 0,
                  x: 40,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 1,
                }}
                className="
                  w-full
                  max-w-[320px]
                  rounded-[40px]
                  border
                  border-[#8DFF00]/40
                  bg-black/70
                  backdrop-blur-2xl
                  p-8
                  shadow-[0_0_60px_rgba(141,255,0,0.08)]
                "
              >

                <p
                  className="
                    uppercase
                    tracking-[4px]
                    text-xs
                    font-black
                    text-[#8DFF00]
                  "
                >

                  LIVE FAMILY VISITS

                </p>

                <h2
                  className="
                    mt-5
                    italic
                    font-black
                    leading-none
                  "
                  style={{
                    fontFamily:
                      "Bebas Neue, sans-serif",
                    fontSize:
                      "clamp(70px, 8vw, 120px)",
                  }}
                >

                  {views.toLocaleString()}

                </h2>

                <div className="h-px bg-[#8DFF00]/20 my-8" />

                <div className="space-y-8">

                  <div>

                    <h3 className="font-black text-2xl">

                      120K+

                    </h3>

                    <p className="uppercase tracking-[2px] text-white/70 text-xs">

                      FOLLOWERS

                    </p>

                  </div>

                  <div>

                    <h3 className="font-black text-2xl">

                      120K+

                    </h3>

                    <p className="uppercase tracking-[2px] text-white/70 text-xs">

                      VIEWS

                    </p>

                  </div>

                  <div>

                    <h3 className="font-black text-[#8DFF00] text-2xl">

                      PRIZED PETS

                    </h3>

                    <p className="uppercase tracking-[2px] text-white/70 text-xs">

                      & MORE

                    </p>

                  </div>

                  <div>

                    <h3 className="font-black text-[#8DFF00] text-2xl">

                      DAILY UPLOADS

                    </h3>

                    <p className="uppercase tracking-[2px] text-white/70 text-xs">

                      ON TIKTOK

                    </p>

                  </div>

                </div>

              </motion.div>

            </div>

          </div>

        </div>

        
      </section>

      {/* FEATURE CARDS */}
      {/* FEATURE CARDS */}
<section className="relative z-20 px-4 pb-24 mt-12">

        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-5">

            {/* PRIZED PETS */}
            <Link href="/prized-pets">

              <div className="group relative overflow-hidden rounded-[22px] border border-[#8DFF00]/30 bg-black h-[130px] md:h-[190px] cursor-pointer">

                <img
                  src="/prized-pets-card.jpg"
                  alt="Prized Pets"
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                <div className="absolute bottom-3 left-3 md:bottom-5 md:left-5">

                  <h2
                    className="uppercase italic font-black leading-none text-white"
                    style={{
                      fontFamily:
                        "Bebas Neue, sans-serif",
                      fontSize:
                        "clamp(22px, 3vw, 52px)",
                    }}
                  >

                    PRIZED PETS

                  </h2>

                  <p className="uppercase tracking-[2px] text-[#8DFF00] text-[8px] md:text-xs font-bold mt-1">

                    MEET THE FAMILY

                  </p>

                </div>

              </div>

            </Link>

            {/* TIKTOK */}
            <Link href="/tiktok-stars">

              <div className="group relative overflow-hidden rounded-[22px] border border-pink-500/40 bg-black h-[130px] md:h-[190px] cursor-pointer">

                <img
                  src="/tiktok-stars-card.jpg"
                  alt="TikTok Stars"
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                <div className="absolute bottom-3 left-3 md:bottom-5 md:left-5">

                  <h2
                    className="uppercase italic font-black leading-none text-white"
                    style={{
                      fontFamily:
                        "Bebas Neue, sans-serif",
                      fontSize:
                        "clamp(22px, 3vw, 52px)",
                    }}
                  >

                    TIKTOK
                    <span className="block">
                      STARS
                    </span>

                  </h2>

                </div>

              </div>

            </Link>

            {/* MERCH */}
            <Link href="/merch">

              <div className="group relative overflow-hidden rounded-[22px] border border-cyan-500/40 bg-black h-[130px] md:h-[190px] cursor-pointer">

                <img
                  src="/merch-card-home.jpg"
                  alt="Merch"
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                <div className="absolute bottom-3 left-3 md:bottom-5 md:left-5">

                  <h2
                    className="uppercase italic font-black leading-none text-white"
                    style={{
                      fontFamily:
                        "Bebas Neue, sans-serif",
                      fontSize:
                        "clamp(22px, 3vw, 52px)",
                    }}
                  >

                    MERCH

                  </h2>

                </div>

              </div>

            </Link>

            {/* HIGHLIGHTS */}
            <Link href="/highlights">

              <div className="group relative overflow-hidden rounded-[22px] border border-purple-500/40 bg-black h-[130px] md:h-[190px] cursor-pointer">

                <img
                  src="/highlights-card.jpg"
                  alt="Highlights"
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                <div className="absolute bottom-3 left-3 md:bottom-5 md:left-5">

                  <h2
                    className="uppercase italic font-black leading-none text-white"
                    style={{
                      fontFamily:
                        "Bebas Neue, sans-serif",
                      fontSize:
                        "clamp(22px, 3vw, 52px)",
                    }}
                  >

                    HIGHLIGHTS

                  </h2>

                </div>

              </div>

            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

const BREEZE_GREEN = "#8DFF00";

type Contestant = {
  id: number;
  full_name: string | null;
  age: string | null;
  photo_url: string | null;
  talent_category: string | null;
  tiktok_username: string | null;
  mentor: string | null;
  audition_status: string | null;
};

export default function KidsEditionPage() {
  const [contestants, setContestants] =
    useState<Contestant[]>([]);

  useEffect(() => {
    loadContestants();
  }, []);

  async function loadContestants() {
    const { data } = await supabase
      .from("contestants")
      .select("*")
      .eq("audition_status", "through");

    setContestants(data || []);
  }

  const billy =
    contestants.filter(
      (c) =>
        c.mentor?.toLowerCase() ===
        "billy"
    );

  const global =
    contestants.filter(
      (c) =>
        c.mentor?.toLowerCase() ===
        "global"
    );

  const kent =
    contestants.filter(
      (c) =>
        c.mentor?.toLowerCase() ===
        "kent"
    );

  const moi =
    contestants.filter(
      (c) =>
        c.mentor?.toLowerCase() ===
        "moi"
    );

  const makoya =
    contestants.filter(
      (c) =>
        c.mentor?.toLowerCase() ===
        "makoya"
    );

  const terry =
    contestants.filter(
      (c) =>
        c.mentor?.toLowerCase() ===
        "terry"
    );

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

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

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* HERO */}

      <section className="relative z-20 px-4 md:px-6 pt-20 md:pt-28 pb-16">

        <div className="max-w-7xl mx-auto text-center">

          <p
            className="uppercase font-black"
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "clamp(13px,1vw,16px)",
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
              fontSize: "clamp(70px,10vw,180px)",
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

      {/* MENTORS */}

      <section className="relative z-20 px-4 md:px-6 pb-10">

        <div className="max-w-7xl mx-auto text-center">

          <p
            className="uppercase tracking-[5px] text-xs"
            style={{
              color: BREEZE_GREEN,
            }}
          >
            LIVE COMPETITION
          </p>

          <h2
            className="uppercase italic font-black mt-3"
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "clamp(50px,6vw,100px)",
            }}
          >
            THE MENTORS
          </h2>

        </div>

      </section>      {/* TEAM BILLY */}

      {billy.length > 0 && (
        <section className="relative z-20 px-4 md:px-6 pb-16">

          <div className="max-w-7xl mx-auto">

            <h3
              className="uppercase font-black mb-8"
              style={{
                fontFamily:
                  "Bebas Neue, sans-serif",
                fontSize:
                  "clamp(40px,4vw,70px)",
                color:
                  BREEZE_GREEN,
              }}
            >
              Team Billy
            </h3>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">

              {billy.map(
                (contestant) => (

                  <div
                    key={
                      contestant.id
                    }
                    className="rounded-[24px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
                  >

                    <img
                      src={
                        contestant.photo_url ||
                        "/placeholder.jpg"
                      }
                      alt={
                        contestant.full_name ||
                        ""
                      }
                      className="w-full h-72 object-cover"
                    />

                    <div className="p-4">

                      <h4 className="font-black text-xl">
                        {
                          contestant.full_name
                        }
                      </h4>

                      <p className="text-white/60 text-sm">
                        Age:{" "}
                        {
                          contestant.age
                        }
                      </p>

                      <p className="text-white/60 text-sm">
                        {
                          contestant.talent_category
                        }
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </section>
      )}

      {/* TEAM GLOBAL */}

      {global.length > 0 && (
        <section className="relative z-20 px-4 md:px-6 pb-16">

          <div className="max-w-7xl mx-auto">

            <h3
              className="uppercase font-black mb-8"
              style={{
                fontFamily:
                  "Bebas Neue, sans-serif",
                fontSize:
                  "clamp(40px,4vw,70px)",
                color:
                  BREEZE_GREEN,
              }}
            >
              Team Global
            </h3>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">

              {global.map(
                (contestant) => (

                  <div
                    key={
                      contestant.id
                    }
                    className="rounded-[24px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
                  >

                    <img
                      src={
                        contestant.photo_url ||
                        "/placeholder.jpg"
                      }
                      alt={
                        contestant.full_name ||
                        ""
                      }
                      className="w-full h-72 object-cover"
                    />

                    <div className="p-4">

                      <h4 className="font-black text-xl">
                        {
                          contestant.full_name
                        }
                      </h4>

                      <p className="text-white/60 text-sm">
                        Age:{" "}
                        {
                          contestant.age
                        }
                      </p>

                      <p className="text-white/60 text-sm">
                        {
                          contestant.talent_category
                        }
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </section>
      )}

      {/* TEAM KENT */}

      {kent.length > 0 && (
        <section className="relative z-20 px-4 md:px-6 pb-16">

          <div className="max-w-7xl mx-auto">

            <h3
              className="uppercase font-black mb-8"
              style={{
                fontFamily:
                  "Bebas Neue, sans-serif",
                fontSize:
                  "clamp(40px,4vw,70px)",
                color:
                  BREEZE_GREEN,
              }}
            >
              Team Kent
            </h3>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">

              {kent.map(
                (contestant) => (

                  <div
                    key={
                      contestant.id
                    }
                    className="rounded-[24px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
                  >

                    <img
                      src={
                        contestant.photo_url ||
                        "/placeholder.jpg"
                      }
                      alt={
                        contestant.full_name ||
                        ""
                      }
                      className="w-full h-72 object-cover"
                    />

                    <div className="p-4">

                      <h4 className="font-black text-xl">
                        {
                          contestant.full_name
                        }
                      </h4>

                      <p className="text-white/60 text-sm">
                        Age:{" "}
                        {
                          contestant.age
                        }
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </section>
      )}

      {/* TEAM MOI */}

      {moi.length > 0 && (
        <section className="relative z-20 px-4 md:px-6 pb-16">

          <div className="max-w-7xl mx-auto">

            <h3
              className="uppercase font-black mb-8"
              style={{
                fontFamily:
                  "Bebas Neue, sans-serif",
                fontSize:
                  "clamp(40px,4vw,70px)",
                color:
                  BREEZE_GREEN,
              }}
            >
              Team Moi
            </h3>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">

              {moi.map(
                (contestant) => (

                  <div
                    key={
                      contestant.id
                    }
                    className="rounded-[24px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
                  >

                    <img
                      src={
                        contestant.photo_url ||
                        "/placeholder.jpg"
                      }
                      alt={
                        contestant.full_name ||
                        ""
                      }
                      className="w-full h-72 object-cover"
                    />

                    <div className="p-4">

                      <h4 className="font-black text-xl">
                        {
                          contestant.full_name
                        }
                      </h4>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </section>
      )}

      {/* TEAM MAKOYA */}

      {makoya.length > 0 && (
        <section className="relative z-20 px-4 md:px-6 pb-16">

          <div className="max-w-7xl mx-auto">

            <h3
              className="uppercase font-black mb-8"
              style={{
                fontFamily:
                  "Bebas Neue, sans-serif",
                fontSize:
                  "clamp(40px,4vw,70px)",
                color:
                  BREEZE_GREEN,
              }}
            >
              Team Makoya
            </h3>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">

              {makoya.map(
                (contestant) => (

                  <div
                    key={
                      contestant.id
                    }
                    className="rounded-[24px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
                  >

                    <img
                      src={
                        contestant.photo_url ||
                        "/placeholder.jpg"
                      }
                      alt={
                        contestant.full_name ||
                        ""
                      }
                      className="w-full h-72 object-cover"
                    />

                    <div className="p-4">

                      <h4 className="font-black text-xl">
                        {
                          contestant.full_name
                        }
                      </h4>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </section>
      )}

      {/* TEAM TERRY */}

      {terry.length > 0 && (
        <section className="relative z-20 px-4 md:px-6 pb-24">

          <div className="max-w-7xl mx-auto">

            <h3
              className="uppercase font-black mb-8"
              style={{
                fontFamily:
                  "Bebas Neue, sans-serif",
                fontSize:
                  "clamp(40px,4vw,70px)",
                color:
                  BREEZE_GREEN,
              }}
            >
              Team Terry
            </h3>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">

              {terry.map(
                (contestant) => (

                  <div
                    key={
                      contestant.id
                    }
                    className="rounded-[24px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
                  >

                    <img
                      src={
                        contestant.photo_url ||
                        "/placeholder.jpg"
                      }
                      alt={
                        contestant.full_name ||
                        ""
                      }
                      className="w-full h-72 object-cover"
                    />

                    <div className="p-4">

                      <h4 className="font-black text-xl">
                        {
                          contestant.full_name
                        }
                      </h4>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </section>
      )}

    </main>
  );
}
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function TikTokStarsPage() {
  const [contestants, setContestants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContestants();

    /*
     * LIVE UPDATE
     *
     * When Kent judges a contestant, the
     * contestants table changes from waiting
     * to through/out.
     *
     * This listener reloads the public page
     * automatically.
     */

    const channel = supabase
      .channel("kids-contestants-live")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "contestants",
        },
        () => {
          loadContestants();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "contestants",
        },
        () => {
          loadContestants();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadContestants() {
    const { data, error } = await supabase
      .from("contestants")
      .select("*")
      .in("audition_status", [
        "through",
        "waiting",
      ])
      .order("full_name");

    if (error) {
      console.error(
        "Could not load contestants:",
        error
      );

      setLoading(false);
      return;
    }

    setContestants(data || []);
    setLoading(false);
  }

  /*
   * ONLY contestants who are officially
   * THROUGH appear in the public teams.
   */
  function getQualifiedTeamContestants(
    mentor: string
  ) {
    return contestants.filter(
      (contestant) =>
        contestant.audition_status ===
          "through" &&
        contestant.mentor?.toLowerCase() ===
          mentor.toLowerCase()
    );
  }

  /*
   * GOLDEN BUZZER contestants can remain
   * visible independently of the battle
   * results.
   */
  const goldenBuzzers =
    contestants.filter(
      (contestant) =>
        contestant.golden_buzzer
    );

  return (
    <main className="min-h-screen bg-[#050816] text-white overflow-hidden relative">

      {/* =====================================================
          BACKGROUND LIGHTS
      ===================================================== */}

      <div className="absolute top-[-150px] left-[-80px] w-[320px] h-[320px] bg-pink-500/20 blur-[90px] rounded-full pointer-events-none" />

      <div className="absolute top-[100px] right-[-80px] w-[300px] h-[300px] bg-cyan-500/20 blur-[90px] rounded-full pointer-events-none" />

      <div className="absolute bottom-[-150px] left-[20%] w-[350px] h-[350px] bg-purple-500/20 blur-[110px] rounded-full pointer-events-none" />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative z-20 min-h-screen flex items-center px-5">

        <div className="max-w-5xl mx-auto text-center">

          <p className="uppercase tracking-[5px] text-cyan-400 text-xs font-black">
            South Africa's Biggest Kids Talent Search
          </p>

          <h1
            className="mt-6 uppercase italic font-black leading-[0.9]"
            style={{
              fontFamily:
                "Bebas Neue, sans-serif",
              fontSize:
                "clamp(80px,12vw,180px)",
            }}
          >
            TIKTOK STARS

            <span className="block text-pink-500">
              SEASON 2
            </span>

            <span className="block text-cyan-400">
              KIDS EDITION
            </span>
          </h1>

          <div className="mt-8">

            <p className="uppercase tracking-[4px] text-white/60 text-xs">
              Starting Prize
            </p>

            <h2 className="text-7xl font-black text-pink-500">
              R70 000
            </h2>

          </div>

          {/* =================================================
              AUDITIONS
          ================================================= */}

          <div className="mt-10 mb-8 flex justify-center">

            <div className="max-w-3xl rounded-[28px] border border-cyan-400/30 bg-cyan-500/10 backdrop-blur-xl px-10 py-8 text-center">

              <p className="uppercase tracking-[4px] text-cyan-400 text-sm font-black">
                AUDITIONS ARE NOW OPEN
              </p>

              <h3 className="mt-3 text-4xl md:text-5xl font-black uppercase text-white">
                Enter Now!
              </h3>

              <p className="mt-5 text-white/80 leading-relaxed text-lg">
                Entries for{" "}
                <strong>
                  TikTok Stars Season 2 –
                  Kids Edition
                </strong>{" "}
                are officially open again for
                a limited time.
              </p>

              <p className="mt-4 text-white/80 leading-relaxed">
                Complete your audition and
                stand a chance to compete for
                the{" "}
                <strong>
                  R70 000 Grand Prize.
                </strong>
              </p>

              <p className="mt-4 text-white/80 leading-relaxed">
                Think you have what it takes
                to become the next{" "}
                <strong>
                  TikTok Stars Kids Edition
                  Champion?
                </strong>
              </p>

              <p className="mt-6 text-cyan-300 font-black uppercase tracking-wide">
                Don't miss your chance!
              </p>

            </div>

          </div>

          <div className="flex justify-center mt-8">

            <Link
              href="/tiktok-stars/enter"
              className="
                inline-flex
                items-center
                justify-center
                px-16
                py-6
                rounded-3xl
                bg-gradient-to-r
                from-pink-500
                to-cyan-500
                text-white
                font-black
                text-xl
                uppercase
                transition
                hover:scale-105
              "
            >
              Enter Auditions
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          MENTORS
      ===================================================== */}

      <section className="relative z-20 px-5 pb-24">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-10">

            <h2
              className="mt-2 uppercase italic font-black"
              style={{
                fontFamily:
                  "Bebas Neue, sans-serif",
                fontSize:
                  "clamp(48px,6vw,90px)",
              }}
            >
              THE MENTORS
            </h2>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">

            {[
              "Billy",
              "Global",
              "Kent",
              "Moi",
              "Piwe",
              "Terry",
            ].map((mentor) => {

              /*
               * IMPORTANT:
               * Mentor counts now only count
               * contestants who have officially
               * gone THROUGH.
               */

              const teamCount =
                getQualifiedTeamContestants(
                  mentor
                ).length;

              return (
                <div
                  key={mentor}
                  className="
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-cyan-400/40
                  "
                >

                  <div className="bg-black/20">

                    <img
                      src={`/mentors/${mentor.toLowerCase()}-mentor.jpg`}
                      alt={mentor}
                      className="
                        w-full
                        h-[320px]
                        object-contain
                        object-center
                      "
                    />

                  </div>

                  <div className="p-4 text-center">

                    <h3 className="font-black uppercase text-lg">
                      {mentor}
                    </h3>

                    <p className="text-cyan-400 text-sm font-black mt-1">
                      {teamCount} Contestant
                      {teamCount !== 1
                        ? "s"
                        : ""}
                    </p>

                    <p className="text-white/50 text-xs uppercase mt-2">
                      Team Mentor
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* =====================================================
          GOLDEN BUZZER WINNERS
      ===================================================== */}

      <section className="relative z-20 px-5 pb-24">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-10">

            <p className="uppercase tracking-[4px] text-yellow-400 text-xs font-black">
              Top 20 Contestants
            </p>

            <h2
              className="mt-2 uppercase italic font-black text-yellow-300"
              style={{
                fontFamily:
                  "Bebas Neue, sans-serif",
                fontSize:
                  "clamp(48px,6vw,90px)",
              }}
            >
              ⭐ GOLDEN BUZZER WINNERS ⭐
            </h2>

            <p className="mt-4 text-white/70 max-w-3xl mx-auto">
              These contestants impressed the
              judges and earned a Golden Buzzer,
              securing their place in the live
              competition.
            </p>

          </div>

          {goldenBuzzers.length === 0 ? (
            <div className="text-center text-white/30 uppercase font-black">
              Golden Buzzer contestants will
              appear here.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">

              {goldenBuzzers.map(
                (contestant) => (

                  <div
                    key={contestant.id}
                    className="
                      overflow-hidden
                      rounded-[24px]
                      border-2
                      border-yellow-400
                      bg-yellow-500/10
                      shadow-[0_0_25px_rgba(250,204,21,.35)]
                    "
                  >

                    <div className="bg-yellow-400 text-black text-center font-black py-2 uppercase">
                      ⭐ GOLDEN BUZZER
                    </div>

                    <img
                      src={
                        contestant.photo_url
                      }
                      alt={
                        contestant.full_name
                      }
                      className="
                        w-full
                        aspect-[3/4]
                        object-cover
                      "
                    />

                    <div className="p-4 text-center">

                      <h3 className="font-black uppercase text-lg">
                        {
                          contestant.full_name
                        }
                      </h3>

                      <p className="text-white/70">
                        Age{" "}
                        {contestant.age}
                      </p>

                      <p className="text-cyan-400 uppercase text-sm mt-2">
                        {
                          contestant.talent_category
                        }
                      </p>

                      <div className="mt-4 border-t border-yellow-400/30 pt-4">

                        <p className="text-white/50 text-xs uppercase tracking-wider">
                          Awarded By
                        </p>

                        <p className="text-yellow-300 font-black uppercase">
                          {
                            contestant.golden_buzzer_by ||
                            "TBA"
                          }
                        </p>

                        <p className="mt-3 text-white/50 text-xs uppercase tracking-wider">
                          Joined Team
                        </p>

                        <p className="text-cyan-400 font-black uppercase">
                          {
                            contestant.mentor ||
                            "TBA"
                          }
                        </p>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>
          )}

        </div>

      </section>

      {/* =====================================================
          QUALIFIED TEAMS
      ===================================================== */}

      <section className="relative z-20 px-5 pb-24">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-10">

            <p className="uppercase tracking-[4px] text-pink-500 text-xs font-black">
              Qualified Contestants
            </p>

            <h2
              className="mt-2 uppercase italic font-black"
              style={{
                fontFamily:
                  "Bebas Neue, sans-serif",
                fontSize:
                  "clamp(48px,6vw,90px)",
              }}
            >
              THE TEAMS
            </h2>

            <p className="text-white/40 mt-4">
              Contestants appear here once they
              officially make it through.
            </p>

          </div>

          {[
            "Billy",
            "Global",
            "Kent",
            "Moi",
            "Piwe",
            "Terry",
          ].map((mentor) => {

            /*
             * THIS IS THE IMPORTANT PART.
             *
             * Only contestants with:
             *
             * audition_status = "through"
             *
             * appear on the public Teams page.
             */

            const teamContestants =
              getQualifiedTeamContestants(
                mentor
              );

            return (
              <div
                key={mentor}
                className="mb-16"
              >

                <h3 className="text-4xl md:text-5xl font-black uppercase mb-6">

                  Team {mentor}

                  <span className="text-white/30">
                    {" "}
                    •{" "}
                    {teamContestants.length}{" "}
                    Contestant
                    {teamContestants.length !==
                    1
                      ? "s"
                      : ""}
                  </span>

                </h3>

                {teamContestants.length ===
                0 ? (

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/40">
                    No contestants through yet.
                  </div>

                ) : (

                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">

                    {teamContestants.map(
                      (contestant) => (

                        <motion.div
                          key={contestant.id}
                          initial={{
                            opacity: 0,
                            y: 15,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.3,
                          }}
                          className="
                            overflow-hidden
                            rounded-[24px]
                            border
                            border-white/10
                            bg-white/5
                            hover:border-cyan-400/40
                            transition
                          "
                        >

                          <img
                            src={
                              contestant.photo_url
                            }
                            alt={
                              contestant.full_name
                            }
                            className="
                              w-full
                              aspect-[3/4]
                              object-cover
                            "
                          />

                          <div className="p-4">

                            <h4 className="font-black uppercase">
                              {
                                contestant.full_name
                              }
                            </h4>

                            <p className="text-white/60 text-sm">
                              Age{" "}
                              {contestant.age}
                            </p>

                            <p className="text-cyan-400 text-xs uppercase mt-2">
                              {
                                contestant.talent_category
                              }
                            </p>

                          </div>

                        </motion.div>

                      )
                    )}

                  </div>

                )}

              </div>
            );
          })}

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-5 py-10 text-center">

          <h3
            className="uppercase italic font-black"
            style={{
              fontFamily:
                "Bebas Neue, sans-serif",
              fontSize: "48px",
            }}
          >
            TIKTOK STARS
          </h3>

          <p className="mt-2 text-white/60">
            Season 2 – Kids Edition
          </p>

          <p className="mt-6 text-white/40 text-sm">
            © 2026 TikTok Stars Season 2
          </p>

        </div>

      </footer>

    </main>
  );
}
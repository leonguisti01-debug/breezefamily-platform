"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";

const BREEZE_GREEN = "#8DFF00";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function EntriesPage() {

  const [entries, setEntries] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedEntry,
    setSelectedEntry] =
    useState<any>(null);

  useEffect(() => {

    const fetchEntries =
      async () => {

        const {
          data,
          error,
        } = await supabase
          .from("contestants")
          .select("*")
          .eq(
            "status",
            "accepted"
          )
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

        if (
          !error &&
          data
        ) {

          setEntries(data);

        }

        setLoading(false);

      };

    fetchEntries();

  }, []);

  return (

    <main
      className="
        min-h-screen
        bg-black
        text-white
        overflow-hidden
        relative
      "
    >

      {/* BACKGROUND */}

      <div
        className="
          absolute
          top-[-300px]
          left-[-300px]
          w-[700px]
          h-[700px]
          blur-[220px]
          rounded-full
        "
        style={{
          background:
            `${BREEZE_GREEN}18`,
        }}
      />

      <div
        className="
          absolute
          bottom-[-300px]
          right-[-300px]
          w-[700px]
          h-[700px]
          blur-[220px]
          rounded-full
        "
        style={{
          background:
            `${BREEZE_GREEN}12`,
        }}
      />

      <div
        className="
          absolute
          inset-0
          opacity-[0.04]
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize:
            "70px 70px",
        }}
      />

      {/* HERO */}

      <section
        className="
          relative
          z-20
          px-4
          md:px-6
          pt-10
          md:pt-14
          pb-12
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            text-center
          "
        >

          <p
            className="
              uppercase
              tracking-[5px]
              text-xs
            "
            style={{
              color:
                BREEZE_GREEN,
            }}
          >
            TIKTOK STARS
          </p>

          <h1
            className="
              mt-4
              uppercase
              italic
              font-black
            "
            style={{
              fontFamily:
                "Bebas Neue, sans-serif",
              fontSize:
                "clamp(60px, 9vw, 140px)",
              letterSpacing:
                "0.1em",
              lineHeight:
                "0.82",
            }}
          >

            ACCEPTED

            <span
              className="block"
              style={{
                color:
                  BREEZE_GREEN,
              }}
            >
              ENTRIES
            </span>

          </h1>

          <p
            className="
              mt-6
              text-white/70
              max-w-2xl
              mx-auto
            "
          >
            Meet the next
            generation of
            performers,
            creators and
            digital stars.
          </p>

        </div>

      </section>      {/* ENTRIES GRID */}

      <section
        className="
          relative
          z-20
          px-4
          md:px-6
          pb-24
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
          "
        >

          {loading ? (

            <div
              className="
                text-center
                py-32
                text-white/50
                uppercase
                tracking-[4px]
              "
            >
              Loading Entries...
            </div>

          ) : (

            <div
              className="
                grid
                grid-cols-2
                md:grid-cols-4
                xl:grid-cols-6
                gap-3
              "
            >

              {entries.map(
                (
                  entry,
                  index
                ) => (

                  <motion.div
                    key={index}
                    whileHover={{
                      y: -4,
                    }}
                    onClick={() =>
                      setSelectedEntry(
                        entry
                      )
                    }
                    className="
                      cursor-pointer
                    "
                  >

                    <div
                      className="
                        overflow-hidden
                        rounded-[20px]
                        border
                        bg-white/5
                      "
                      style={{
                        borderColor:
                          `${BREEZE_GREEN}25`,
                      }}
                    >

                      <img
                        src={
                          entry.photo_url
                        }
                        alt={
                          entry.full_name
                        }
                        className="
                          w-full
                          h-[220px]
                          object-cover
                        "
                      />

                      <div
                        className="
                          p-3
                        "
                      >

                        <h3
                          className="
                            font-black
                            uppercase
                            text-sm
                            truncate
                          "
                        >
                          {entry.full_name}
                        </h3>

                        <p
                          className="
                            text-xs
                            text-white/60
                          "
                        >
                          Age {entry.age}
                        </p>

                      </div>

                    </div>

                  </motion.div>

                )
              )}

            </div>

          )}

        </div>

      </section>

      {/* MODAL */}

      <AnimatePresence>

        {selectedEntry && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() =>
              setSelectedEntry(
                null
              )
            }
            className="
              fixed
              inset-0
              bg-black/90
              z-50
              flex
              items-center
              justify-center
              p-4
            "
          >

            <motion.div
              initial={{
                scale: 0.9,
              }}
              animate={{
                scale: 1,
              }}
              exit={{
                scale: 0.9,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="
                max-w-2xl
                w-full
                bg-[#111]
                rounded-[30px]
                overflow-hidden
                border
              "
              style={{
                borderColor:
                  `${BREEZE_GREEN}30`,
              }}
            >

              <img
                src={
                  selectedEntry.photo_url
                }
                alt={
                  selectedEntry.full_name
                }
                className="
                  w-full
                  max-h-[70vh]
                  object-cover
                "
              />

              <div
                className="
                  p-6
                "
              >

                <h2
                  className="
                    text-3xl
                    font-black
                    uppercase
                  "
                >
                  {
                    selectedEntry.full_name
                  }
                </h2>

                <p
                  className="
                    mt-2
                    text-white/70
                  "
                >
                  Age {
                    selectedEntry.age
                  }
                </p>

                <p
                  className="
                    mt-2
                  "
                  style={{
                    color:
                      BREEZE_GREEN,
                  }}
                >
                  {
                    selectedEntry.talent_category
                  }
                </p>

                <p
                  className="
                    mt-3
                    text-white/70
                  "
                >
                  {
                    selectedEntry.tiktok_username
                  }
                </p>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </main>

  );

}
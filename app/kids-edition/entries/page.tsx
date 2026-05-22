"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";

const BREEZE_GREEN = "#8DFF00";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function EntriesPage() {

  const [entries, setEntries] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchEntries = async () => {

      const { data, error } = await supabase
        .from("contestants")
        .select("*")
        .eq("status", "accepted")
        .order("created_at", {
          ascending: false,
        });

      if (!error && data) {

        setEntries(data);
      }

      setLoading(false);
    };

    fetchEntries();

  }, []);

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
            className="uppercase tracking-[5px] text-xs"
            style={{
              color: BREEZE_GREEN,
            }}
          >
            TIKTOK STARS
          </p>

          <h1
            className="mt-4 uppercase italic font-black"
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "clamp(70px, 10vw, 160px)",
              letterSpacing: "0.1em",
              lineHeight: "0.82",
            }}
          >

            ACCEPTED
            <span
              className="block"
              style={{
                color: BREEZE_GREEN,
              }}
            >
              ENTRIES
            </span>

          </h1>

          <p
            className="mt-8 text-white/70 max-w-2xl mx-auto"
            style={{
              fontSize: "18px",
              lineHeight: "1.7",
            }}
          >

            Meet the next generation of performers,
            creators and digital stars entering
            the Breeze Family Kids Edition.

          </p>

        </div>

      </section>

      {/* ENTRIES GRID */}
      <section className="relative z-20 px-4 md:px-6 pb-28">

        <div className="max-w-7xl mx-auto">

          {loading ? (

            <div className="text-center py-32 text-white/50 uppercase tracking-[4px]">

              Loading Entries...

            </div>

          ) : (

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {entries.map((entry, index) => (

                <motion.div
                  key={index}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                >

                  <div
                    className="
                      relative
                      overflow-hidden
                      rounded-[30px]
                      border
                      bg-white/5
                      backdrop-blur-2xl
                    "
                    style={{
                      borderColor: `${BREEZE_GREEN}25`,
                    }}
                  >

                    {/* IMAGE */}
                    <div className="relative">

                      <img
                        src={entry.photo_url}
                        alt={entry.full_name}
                        className="w-full h-[360px] object-cover"
                      />

                      {/* OVERLAY */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                      {/* BADGE */}
                      <div
                        className="
                          absolute
                          top-4
                          right-4
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
                        Accepted
                      </div>

                    </div>

                    {/* CONTENT */}
                    <div className="p-6">

                      <p
                        className="uppercase tracking-[4px] text-[10px]"
                        style={{
                          color: BREEZE_GREEN,
                        }}
                      >
                        {entry.talent_category}
                      </p>

                      <h2
                        className="mt-3 uppercase italic font-black"
                        style={{
                          fontFamily: "Bebas Neue, sans-serif",
                          fontSize: "38px",
                          letterSpacing: "0.08em",
                          lineHeight: "0.9",
                        }}
                      >

                        {entry.full_name}

                      </h2>

                      <div className="mt-5 flex items-center justify-between text-sm text-white/60">

                        <span>
                          Age {entry.age}
                        </span>

                        <a
                          href={`https://www.tiktok.com/@${entry.tiktok_username.replace("@", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#8DFF00] transition"
                        >
                          {entry.tiktok_username}
                        </a>

                      </div>

                    </div>

                  </div>

                </motion.div>

              ))}

            </div>

          )}

        </div>

      </section>

    </main>
  );
}
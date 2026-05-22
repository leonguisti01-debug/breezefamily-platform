"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";

const BREEZE_GREEN = "#8DFF00";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function PrizedPetsPage() {

  const [loading, setLoading] = useState(false);

  const [entriesLoading, setEntriesLoading] = useState(true);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  const [entries, setEntries] = useState<any[]>([]);

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [petPhoto, setPetPhoto] = useState<File | null>(null);

  useEffect(() => {

    fetchEntries();

  }, []);

  const fetchEntries = async () => {

    const { data, error } = await supabase
      .from("prized_pets_entries")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (!error && data) {

      setEntries(data);
    }

    setEntriesLoading(false);
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    setSuccess("");

    let photoUrl = "";

    if (petPhoto) {

      const fileName =
        `${Date.now()}-${petPhoto.name}`;

      const {
        error: uploadError
      } = await supabase.storage
        .from("prized-pets")
        .upload(fileName, petPhoto);

      if (uploadError) {

        setError(uploadError.message);

        setLoading(false);

        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("prized-pets")
        .getPublicUrl(fileName);

      photoUrl = publicUrl;
    }

    const { error } =
      await supabase
        .from("prized_pets_entries")
        .insert([
          {
            name,
            phone,
            photo_url: photoUrl,
            created_at:
              new Date().toISOString(),
          },
        ]);

    if (error) {

      setError(error.message);

      setLoading(false);

      return;
    }

    setSuccess(
      "Your pet has officially been entered into Prized Pets!"
    );

    setName("");

    setPhone("");

    setPetPhoto(null);

    setLoading(false);

    fetchEntries();

    setTimeout(() => {

      const gallery =
        document.getElementById(
          "pet-gallery"
        );

      if (gallery) {

        gallery.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

    }, 500);
  };

  return (
    <main className="min-h-screen bg-black text-white relative">

      {/* BACKGROUND */}
      <div
        className="fixed top-[-300px] left-[-300px] w-[700px] h-[700px] blur-[220px] rounded-full pointer-events-none z-0"
        style={{
          background: `${BREEZE_GREEN}18`,
        }}
      />

      <div
        className="fixed bottom-[-300px] right-[-300px] w-[700px] h-[700px] blur-[220px] rounded-full pointer-events-none z-0"
        style={{
          background: `${BREEZE_GREEN}10`,
        }}
      />

      {/* GRID */}
      <div
        className="fixed inset-0 opacity-[0.04] pointer-events-none z-0"
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
            BREEZE FAMILY PRESENTS
          </p>

          <h1
            className="mt-4 uppercase italic font-black"
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "clamp(64px, 12vw, 180px)",
              letterSpacing: "0.1em",
              lineHeight: "0.82",
            }}
          >

            PRIZED
            <span
              className="block"
              style={{
                color: BREEZE_GREEN,
              }}
            >
              PETS
            </span>

          </h1>

          <p
            className="mt-8 text-white/70 max-w-2xl mx-auto px-2"
            style={{
              fontSize: "clamp(15px, 4vw, 18px)",
              lineHeight: "1.7",
            }}
          >

            Enter your pet into the Breeze Family
            Prized Pets competition for a chance
            to win cash prizes and be featured
            across our platforms.

          </p>

        </div>

      </section>

      {/* PRIZES */}
      <section className="relative z-20 px-4 md:px-6">

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

          <div className="bg-white/5 border border-[#8DFF00]/20 backdrop-blur-2xl rounded-[30px] p-6 md:p-8 text-center">

            <p
              className="uppercase tracking-[4px] text-xs"
              style={{
                color: BREEZE_GREEN,
              }}
            >
              First Place
            </p>

            <h2
              className="mt-4 uppercase italic font-black"
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "clamp(52px, 10vw, 72px)",
                lineHeight: "0.9",
              }}
            >
              R500
            </h2>

          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[30px] p-6 md:p-8 text-center">

            <p className="uppercase tracking-[4px] text-xs text-white/60">
              Second Place
            </p>

            <h2
              className="mt-4 uppercase italic font-black"
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "clamp(52px, 10vw, 72px)",
                lineHeight: "0.9",
              }}
            >
              R250
            </h2>

          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[30px] p-6 md:p-8 text-center">

            <p className="uppercase tracking-[4px] text-xs text-white/60">
              Third Place
            </p>

            <h2
              className="mt-4 uppercase italic font-black"
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "clamp(52px, 10vw, 72px)",
                lineHeight: "0.9",
              }}
            >
              R200
            </h2>

          </div>

        </div>

      </section>

      {/* ENTRY FORM */}
      <section className="relative z-20 px-4 md:px-6 pt-16">

        <div className="max-w-3xl mx-auto">

          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[34px] p-5 md:p-12">

            <h2
              className="uppercase italic font-black text-center"
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "clamp(46px, 8vw, 90px)",
                lineHeight: "0.9",
                letterSpacing: "0.08em",
              }}
            >

              ENTER
              <span
                className="block"
                style={{
                  color: BREEZE_GREEN,
                }}
              >
                NOW
              </span>

            </h2>

            {success && (

              <div className="mt-8 p-5 rounded-2xl bg-[#8DFF00]/10 border border-[#8DFF00]/20 text-[#8DFF00]">

                {success}

              </div>
            )}

            {error && (

              <div className="mt-8 p-5 rounded-2xl bg-red-500/10 border border-red-400/20 text-red-300">

                {error}

              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-5"
            >

              <input
                type="text"
                required
                placeholder="Your Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="
                  w-full
                  px-5
                  py-4
                  rounded-2xl
                  bg-black/40
                  border
                  border-white/10
                  text-white
                  placeholder:text-white/35
                  focus:outline-none
                  focus:border-[#8DFF00]
                "
              />

              <input
                type="tel"
                required
                placeholder="Contact Number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                className="
                  w-full
                  px-5
                  py-4
                  rounded-2xl
                  bg-black/40
                  border
                  border-white/10
                  text-white
                  placeholder:text-white/35
                  focus:outline-none
                  focus:border-[#8DFF00]
                "
              />

              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) =>
                  setPetPhoto(
                    e.target.files?.[0] || null
                  )
                }
                className="
                  w-full
                  px-5
                  py-4
                  rounded-2xl
                  bg-black/40
                  border
                  border-white/10
                  text-white
                "
              />

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  py-4
                  rounded-2xl
                  bg-[#8DFF00]
                  text-black
                  font-black
                  text-sm md:text-lg
                  uppercase
                  tracking-[4px]
                  hover:scale-[1.01]
                  transition
                  duration-300
                "
              >

                {loading
                  ? "Submitting..."
                  : "Submit Entry"}

              </button>

            </form>

          </div>

        </div>

      </section>

      {/* ENTRIES GRID */}
      <section
        id="pet-gallery"
        className="relative z-20 px-4 md:px-6 pt-20 pb-[220px]"
      >

        <div className="max-w-7xl mx-auto overflow-visible">

          <div className="text-center mb-10 md:mb-14">

            <p
              className="uppercase tracking-[5px] text-xs"
              style={{
                color: BREEZE_GREEN,
              }}
            >
              LIVE ENTRIES
            </p>

            <h2
              className="mt-4 uppercase italic font-black"
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "clamp(42px, 9vw, 120px)",
                lineHeight: "0.82",
              }}
            >

              PET
              <span
                className="block"
                style={{
                  color: BREEZE_GREEN,
                }}
              >
                GALLERY
              </span>

            </h2>

          </div>

          {entriesLoading ? (

            <div className="text-center py-20 text-white/50 uppercase tracking-[4px]">

              Loading Entries...

            </div>

          ) : (

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5 md:gap-6">

              {entries.map((entry, index) => (

                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >

                  <div className="flex flex-col items-center text-center">

                    {/* PHOTO BUBBLE */}
                    <div
                      className="
                        relative
                        rounded-full
                        overflow-hidden
                        border-2
                        bg-black
                        w-[72px]
                        h-[72px]
                        sm:w-[88px]
                        sm:h-[88px]
                        md:w-[100px]
                        md:h-[100px]
                        flex
                        items-center
                        justify-center
                      "
                      style={{
                        borderColor: `${BREEZE_GREEN}50`,
                      }}
                    >

                      <img
                        src={entry.photo_url}
                        alt={entry.name}
                        loading="lazy"
                        className="
                          w-full
                          h-full
                          object-contain
                          bg-black
                        "
                      />

                    </div>

                    {/* NAME */}
                    <h3
                      className="mt-3 uppercase italic font-black break-words"
                      style={{
                        fontFamily: "Bebas Neue, sans-serif",
                        fontSize: "clamp(12px, 3vw, 18px)",
                        lineHeight: "0.95",
                        letterSpacing: "0.05em",
                        maxWidth: "80px",
                      }}
                    >

                      {entry.name}

                    </h3>

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
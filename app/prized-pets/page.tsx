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

  const [loading, setLoading] =
    useState(false);

  const [entriesLoading,
    setEntriesLoading] =
    useState(true);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const [entries, setEntries] =
    useState<any[]>([]);

  const [winners, setWinners] =
    useState<any[]>([]);

  const [selectedImage,
    setSelectedImage] =
    useState<string | null>(
      null
    );

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [petPhoto,
    setPetPhoto] =
    useState<File | null>(
      null
    );

  useEffect(() => {

    fetchEntries();

    fetchWinners();

  }, []);

  const fetchEntries =
    async () => {

      const { data, error } =
        await supabase
          .from(
            "prized_pets_entries"
          )
          .select("*")
          .order(
            "created_at",
            {
              ascending:
                false,
            }
          );

      if (
        !error &&
        data
      ) {

        setEntries(data);
      }

      setEntriesLoading(
        false
      );
    };

  const fetchWinners =
    async () => {

      const { data } =
        await supabase
          .from(
            "prized_pets_winners"
          )
          .select("*")
          .order(
            "created_at",
            {
              ascending:
                false,
            }
          );

      if (data) {

        setWinners(data);
      }
    };

  const handleSubmit =
    async (
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
          error:
            uploadError,
        } =
          await supabase.storage
            .from(
              "prized-pets"
            )
            .upload(
              fileName,
              petPhoto
            );

        if (
          uploadError
        ) {

          setError(
            uploadError.message
          );

          setLoading(
            false
          );

          return;
        }

        const {
          data: {
            publicUrl,
          },
        } =
          supabase.storage
            .from(
              "prized-pets"
            )
            .getPublicUrl(
              fileName
            );

        photoUrl =
          publicUrl;
      }

      const { error } =
        await supabase
          .from(
            "prized_pets_entries"
          )
          .insert([
            {
              name,
              phone,
              photo_url:
                photoUrl,
              created_at:
                new Date().toISOString(),
            },
          ]);

      if (error) {

        setError(
          error.message
        );

        setLoading(
          false
        );

        return;
      }

      setSuccess(
        "Your pet has officially been entered into Prized Pets!"
      );

      setName("");

      setPhone("");

      setPetPhoto(
        null
      );

      setLoading(false);

      fetchEntries();
    };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-x-hidden">

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
          backgroundSize:
            "70px 70px",
        }}
      />

      {/* HERO */}
      <section className="relative z-20 px-4 pt-10 pb-12">

        <div className="max-w-7xl mx-auto text-center">

          <p
            className="uppercase tracking-[5px] text-xs"
            style={{
              color:
                BREEZE_GREEN,
            }}
          >
            BREEZE FAMILY PRESENTS
          </p>

          <h1
            className="mt-4 uppercase italic font-black"
            style={{
              fontFamily:
                "Bebas Neue, sans-serif",
              fontSize:
                "clamp(64px, 14vw, 180px)",
              letterSpacing:
                "0.1em",
              lineHeight:
                "0.82",
            }}
          >

            PRIZED
            <span
              className="block"
              style={{
                color:
                  BREEZE_GREEN,
              }}
            >
              PETS
            </span>

          </h1>

          <p
            className="mt-8 text-white/70 max-w-2xl mx-auto px-2 text-sm leading-relaxed"
          >

            Enter your pet into
            the Breeze Family
            Prized Pets competition.

          </p>

        </div>

      </section>

      {/* LIVE DRAW */}
      <section className="relative z-20 px-4 pb-10">

        <div className="max-w-5xl mx-auto rounded-[34px] overflow-hidden border border-[#8DFF00]/20 bg-white/5 backdrop-blur-2xl">

          <div className="p-6 text-center">

            <p
              className="uppercase tracking-[5px] text-xs"
              style={{
                color:
                  BREEZE_GREEN,
              }}
            >
              LIVE DRAW EVENT
            </p>

            <h2
              className="mt-4 uppercase italic font-black"
              style={{
                fontFamily:
                  "Bebas Neue, sans-serif",
                fontSize:
                  "clamp(42px, 10vw, 90px)",
                lineHeight:
                  "0.82",
              }}
            >

              FRIDAY
              <span
                className="block"
                style={{
                  color:
                    BREEZE_GREEN,
                }}
              >
                8PM LIVE
              </span>

            </h2>

            <p className="mt-8 text-white/70 leading-relaxed text-sm">

              Winners are selected
              LIVE during Kent Breeze
              TikTok Live.

              <br />
              <br />

              If your name is called,
              you MUST be present
              in the live.

              <br />
              <br />

              If absent,
              the prize is forfeited
              and a redraw happens.

            </p>

          </div>

        </div>

      </section>

      {/* PRIZES */}
      <section className="relative z-20 px-4">

        <div className="grid grid-cols-3 gap-3">

          <PrizeCard
            title="1st"
            amount="R500"
          />

          <PrizeCard
            title="2nd"
            amount="R250"
          />

          <PrizeCard
            title="3rd"
            amount="R200"
          />

        </div>

      </section>

      {/* ENTRY FORM */}
      <section className="relative z-20 px-4 pt-16">

        <div className="max-w-3xl mx-auto">

          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[34px] p-5">

            <h2
              className="uppercase italic font-black text-center"
              style={{
                fontFamily:
                  "Bebas Neue, sans-serif",
                fontSize:
                  "clamp(46px, 8vw, 90px)",
                lineHeight:
                  "0.9",
                letterSpacing:
                  "0.08em",
              }}
            >

              ENTER
              <span
                className="block"
                style={{
                  color:
                    BREEZE_GREEN,
                }}
              >
                NOW
              </span>

            </h2>

            {success && (

              <div className="mt-6 p-4 rounded-2xl bg-[#8DFF00]/10 border border-[#8DFF00]/20 text-[#8DFF00] text-sm">

                {success}

              </div>

            )}

            {error && (

              <div className="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-400/20 text-red-300 text-sm">

                {error}

              </div>

            )}

            <form
              onSubmit={
                handleSubmit
              }
              className="mt-8 space-y-4"
            >

              <input
                type="text"
                required
                placeholder="Your Name"
                value={name}
                onChange={(
                  e
                ) =>
                  setName(
                    e.target
                      .value
                  )
                }
                className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10"
              />

              <input
                type="tel"
                required
                placeholder="Contact Number"
                value={phone}
                onChange={(
                  e
                ) =>
                  setPhone(
                    e.target
                      .value
                  )
                }
                className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10"
              />

              <input
                type="file"
                accept="image/*"
                required
                onChange={(
                  e
                ) =>
                  setPetPhoto(
                    e.target
                      .files?.[0] ||
                      null
                  )
                }
                className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10"
              />

              <button
                type="submit"
                disabled={
                  loading
                }
                className="w-full py-4 rounded-2xl bg-[#8DFF00] text-black font-black uppercase tracking-[4px]"
              >

                {loading
                  ? "Submitting..."
                  : "Submit Entry"}

              </button>

            </form>

          </div>

        </div>

      </section>

      {/* WINNERS */}
      <section className="relative z-20 px-4 pt-20">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">

            <p
              className="uppercase tracking-[5px] text-xs"
              style={{
                color:
                  BREEZE_GREEN,
              }}
            >
              WINNER ARCHIVE
            </p>

            <h2
              className="mt-4 uppercase italic font-black"
              style={{
                fontFamily:
                  "Bebas Neue, sans-serif",
                fontSize:
                  "clamp(42px, 9vw, 100px)",
                lineHeight:
                  "0.82",
              }}
            >

              HALL OF
              <span
                className="block"
                style={{
                  color:
                    BREEZE_GREEN,
                }}
              >
                FAME
              </span>

            </h2>

          </div>

          <div className="space-y-8">

            {winners.map(
              (
                winner,
                index
              ) => (

                <div
                  key={index}
                  className="rounded-[34px] border border-[#8DFF00]/20 bg-white/5 backdrop-blur-2xl p-5"
                >

                  <div className="text-center mb-8">

                    <p
                      className="uppercase tracking-[4px] text-xs"
                      style={{
                        color:
                          BREEZE_GREEN,
                      }}
                    >
                      Friday Night Draw
                    </p>

                    <h3
                      className="mt-3 uppercase font-black text-2xl"
                    >

                      {
                        winner.draw_date
                      }

                    </h3>

                  </div>

                  <div className="grid grid-cols-1 gap-6">

                    {/* THIRD PLACE */}
                    <div>

                      <p
                        className="uppercase tracking-[4px] text-xs text-center mb-4"
                        style={{
                          color:
                            "#ffffff",
                        }}
                      >
                        3rd Place Winners
                      </p>

                      <div className="grid grid-cols-2 gap-4">

                        <WinnerBubble
                          name="Sors's Napoleon"
                          photo="https://xwzathzitijhmupqqxux.supabase.co/storage/v1/object/public/prized-pets/sors.jpg"
                          label="3rd"
                          setSelectedImage={
                            setSelectedImage
                          }
                        />

                        <WinnerBubble
                          name="Jaxster"
                          photo="https://xwzathzitijhmupqqxux.supabase.co/storage/v1/object/public/prized-pets/jaxster.jpeg"
                          label="3rd"
                          setSelectedImage={
                            setSelectedImage
                          }
                        />

                      </div>

                    </div>

                    {/* SECOND PLACE */}
                    <div>

                      <p
                        className="uppercase tracking-[4px] text-xs text-center mb-4"
                        style={{
                          color:
                            "#cccccc",
                        }}
                      >
                        2nd Place Winner
                      </p>

                      <div className="flex justify-center">

                        <WinnerBubble
                          name="Jessica"
                          photo="https://xwzathzitijhmupqqxux.supabase.co/storage/v1/object/public/prized-pets/Jessica.jpg"
                          label="2nd"
                          setSelectedImage={
                            setSelectedImage
                          }
                        />

                      </div>

                    </div>

                    {/* FIRST PLACE */}
                    <div>

                      <p
                        className="uppercase tracking-[4px] text-xs text-center mb-4"
                        style={{
                          color:
                            BREEZE_GREEN,
                        }}
                      >
                        1st Place Winner
                      </p>

                      <div className="flex justify-center">

                        <WinnerBubble
                          name="Kinnie - Titan & Raven"
                          photo="https://xwzathzitijhmupqqxux.supabase.co/storage/v1/object/public/prized-pets/kinnie-titan&raven.jpeg"
                          label="1st"
                          setSelectedImage={
                            setSelectedImage
                          }
                        />

                      </div>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </section>

      {/* ENTRIES */}
      <section
        id="pet-gallery"
        className="relative z-20 px-4 pt-20 pb-[220px]"
      >

        <div className="text-center mb-10">

          <p
            className="uppercase tracking-[5px] text-xs"
            style={{
              color:
                BREEZE_GREEN,
            }}
          >
            LIVE ENTRIES
          </p>

          <h2
            className="mt-4 uppercase italic font-black"
            style={{
              fontFamily:
                "Bebas Neue, sans-serif",
              fontSize:
                "clamp(42px, 9vw, 120px)",
              lineHeight:
                "0.82",
            }}
          >

            PET
            <span
              className="block"
              style={{
                color:
                  BREEZE_GREEN,
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

          <div className="grid grid-cols-3 gap-5">

            {entries.map(
              (
                entry,
                index
              ) => (

                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.05,
                  }}
                >

                  <div className="flex flex-col items-center text-center">

                    <div
                      onClick={() =>
                        setSelectedImage(
                          entry.photo_url
                        )
                      }
                      className="
                        relative
                        rounded-full
                        overflow-hidden
                        border-2
                        bg-black
                        w-[72px]
                        h-[72px]
                        flex
                        items-center
                        justify-center
                        cursor-pointer
                      "
                      style={{
                        borderColor:
                          `${BREEZE_GREEN}50`,
                      }}
                    >

                      <img
                        src={
                          entry.photo_url
                        }
                        alt={
                          entry.name
                        }
                        loading="lazy"
                        className="
                          w-full
                          h-full
                          object-contain
                          bg-black
                        "
                      />

                    </div>

                    <h3
                      className="mt-3 uppercase italic font-black break-words"
                      style={{
                        fontFamily:
                          "Bebas Neue, sans-serif",
                        fontSize:
                          "clamp(12px, 3vw, 18px)",
                        lineHeight:
                          "0.95",
                        letterSpacing:
                          "0.05em",
                        maxWidth:
                          "80px",
                      }}
                    >

                      {
                        entry.name
                      }

                    </h3>

                  </div>

                </motion.div>

              )
            )}

          </div>

        )}

      </section>

      {/* IMAGE MODAL */}
      {selectedImage && (

        <div
          onClick={() =>
            setSelectedImage(
              null
            )
          }
          className="
            fixed
            inset-0
            bg-black/90
            z-[999]
            flex
            items-center
            justify-center
            p-6
          "
        >

          <img
            src={
              selectedImage
            }
            alt="Pet"
            className="
              max-w-full
              max-h-full
              object-contain
              rounded-[30px]
            "
          />

        </div>

      )}

    </main>
  );
}

function PrizeCard({
  title,
  amount,
}: any) {

  return (

    <div className="bg-white/5 border border-[#8DFF00]/20 backdrop-blur-2xl rounded-[24px] p-4 text-center">

      <p
        className="uppercase tracking-[4px] text-[10px]"
        style={{
          color:
            BREEZE_GREEN,
        }}
      >
        {title} Place
      </p>

      <h2
        className="mt-3 uppercase italic font-black"
        style={{
          fontFamily:
            "Bebas Neue, sans-serif",
          fontSize:
            "clamp(24px, 6vw, 42px)",
        }}
      >

        {amount}

      </h2>

    </div>

  );
}

function WinnerBubble({
  name,
  photo,
  label,
  setSelectedImage,
}: any) {

  return (

    <div className="text-center">

      <div
        onClick={() =>
          setSelectedImage(
            photo
          )
        }
        className="
          relative
          mx-auto
          rounded-full
          overflow-hidden
          border-2
          w-[85px]
          h-[85px]
          cursor-pointer
        "
        style={{
          borderColor:
            label === "1st"
              ? "#8DFF00"
              : "white",
        }}
      >

        <img
          src={photo}
          alt={name}
          className="
            w-full
            h-full
            object-cover
          "
        />

      </div>

      <p
        className="mt-3 uppercase tracking-[3px] text-[10px]"
        style={{
          color:
            label === "1st"
              ? "#8DFF00"
              : "white",
        }}
      >
        {label} Place
      </p>

      <h3
        className="mt-2 uppercase font-black break-words text-sm"
      >

        {name}

      </h3>

    </div>

  );
}
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
    useState<any | null>(
      null
    );

  const [name, setName] =
    useState("");

  const [petName,
    setPetName] =
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
              pet_name:
                petName,
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

      setPetName("");

      setPhone("");

      setPetPhoto(
        null
      );

      setLoading(false);

      fetchEntries();
    };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-x-hidden">

      {/* ENTRY FORM */}
      <section className="relative z-20 px-4 pt-16">

        <div className="max-w-3xl mx-auto">

          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[34px] p-5">

            <form
              onSubmit={
                handleSubmit
              }
              className="mt-8 space-y-4"
            >

              <input
                type="text"
                required
                placeholder="Owner Name"
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
                type="text"
                required
                placeholder="Pet Name"
                value={petName}
                onChange={(
                  e
                ) =>
                  setPetName(
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

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">

            {entries.map(
              (
                entry,
                index
              ) => (

                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.03,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >

                  <div
                    onClick={() =>
                      setSelectedImage(
                        entry
                      )
                    }
                    className="
                      relative
                      rounded-[22px]
                      overflow-hidden
                      border-2
                      bg-black
                      aspect-square
                      cursor-pointer
                      shadow-[0_0_30px_rgba(141,255,0,0.08)]
                    "
                    style={{
                      borderColor:
                        `${BREEZE_GREEN}35`,
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
                        object-cover
                        transition
                        duration-300
                        hover:scale-105
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/80
                        via-black/10
                        to-transparent
                      "
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-3">

                      <div className="space-y-1">

                        <p
                          className="
                            text-white
                            uppercase
                            tracking-[2px]
                            text-[10px]
                            sm:text-xs
                            font-bold
                          "
                        >
                          Owner: {entry.name}
                        </p>

                        <h3
                          className="
                            uppercase
                            italic
                            font-black
                            text-white
                            break-words
                          "
                          style={{
                            fontFamily:
                              "Bebas Neue, sans-serif",
                            fontSize:
                              "clamp(14px, 3vw, 22px)",
                            lineHeight:
                              "0.9",
                            letterSpacing:
                              "0.05em",
                          }}
                        >

                          Pet: {entry.pet_name}

                        </h3>

                      </div>

                    </div>

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

          <div className="relative w-full max-w-3xl">

            <img
              src={
                selectedImage.photo_url
              }
              alt="Pet"
              className="
                w-full
                max-h-[85vh]
                object-contain
                rounded-[30px]
              "
            />

            <div className="absolute bottom-8 left-0 right-0 text-center px-6">

              <p
                className="
                  uppercase
                  tracking-[3px]
                  text-xs
                  text-white/80
                  font-bold
                "
              >
                Owner: {selectedImage.name}
              </p>

              <h2
                className="
                  mt-2
                  uppercase
                  italic
                  font-black
                  text-white
                "
                style={{
                  fontFamily:
                    "Bebas Neue, sans-serif",
                  fontSize:
                    "clamp(34px, 7vw, 70px)",
                  lineHeight:
                    "0.9",
                  letterSpacing:
                    "0.08em",
                }}
              >
                Pet: {selectedImage.pet_name}
              </h2>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}
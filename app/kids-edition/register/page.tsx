"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const BREEZE_GREEN = "#8DFF00";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function RegisterPage() {

  const [accepted, setAccepted] = useState(false);

  const [showPopup, setShowPopup] = useState(true);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");

  const [age, setAge] = useState("");

  const [parentFullName, setParentFullName] = useState("");

  const [parentIdNumber, setParentIdNumber] = useState("");

  const [parentPhone, setParentPhone] = useState("");

  const [parentEmail, setParentEmail] = useState("");

  const [talent, setTalent] = useState("Singing");

  const [tiktokUsername, setTiktokUsername] = useState("");

  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    setSuccess("");

    if (Number(age) > 17) {

      setError(
        "Kids Edition is only open to contestants aged 17 years and younger."
      );

      setLoading(false);

      return;
    }

    if (!accepted) {

      setError(
        "You must accept the legal consent and POPIA terms."
      );

      setLoading(false);

      return;
    }

    let photoUrl = "";

    if (photo) {

      const fileName =
        `${Date.now()}-${photo.name}`;

      const {
        error: uploadError
      } = await supabase.storage
        .from("contestant-photos")
        .upload(fileName, photo);

      if (uploadError) {

        setError(uploadError.message);

        setLoading(false);

        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("contestant-photos")
        .getPublicUrl(fileName);

      photoUrl = publicUrl;
    }

    const { error } =
      await supabase
        .from("contestants")
        .insert([
          {
            full_name: fullName,
            age,
            parent_full_name: parentFullName,
            parent_id_number: parentIdNumber,
            parent_phone: parentPhone,
            parent_email: parentEmail,
            talent_category: talent,
            tiktok_username: tiktokUsername,
            photo_url: photoUrl,
            popia_accepted: true,
            indemnity_accepted: true,
            status: "pending",
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
      "Entry submitted successfully. Your application is now awaiting review from the Breeze Family team."
    );

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* BACKGROUND GLOW */}
      <div
        className="absolute top-[-300px] left-[-300px] w-[700px] h-[700px] blur-[220px] rounded-full"
        style={{
          background: `${BREEZE_GREEN}20`,
        }}
      />

      <div
        className="absolute bottom-[-300px] right-[-300px] w-[700px] h-[700px] blur-[220px] rounded-full"
        style={{
          background: `${BREEZE_GREEN}10`,
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

      {/* LEGAL POPUP */}
      {showPopup && (

        <div className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">

          <div className="w-full max-w-3xl bg-[#080808] border border-white/10 rounded-[34px] p-6 md:p-10 overflow-y-auto max-h-[90vh]">

            <h2
              className="uppercase italic font-black text-center"
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "clamp(42px, 6vw, 80px)",
                letterSpacing: "0.08em",
                lineHeight: "0.9",
              }}
            >

              Parent Consent
              <span
                className="block"
                style={{
                  color: BREEZE_GREEN,
                }}
              >
                & POPIA
              </span>

            </h2>

            <div className="mt-10 space-y-5 text-white/70 leading-relaxed">

              {[
                "Permission is granted for the child to participate in the Breeze Family Kids Edition competition.",
                "Photos, videos and submitted content may be used across Breeze Family platforms and promotional material.",
                "POPIA consent is acknowledged for competition administration and communication.",
                "The parent or guardian confirms all information submitted is accurate and lawful."
              ].map((text, index) => (

                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5"
                >

                  {text}

                </div>

              ))}

            </div>

            <a
              href="/kids-indemnity.pdf"
              target="_blank"
              className="mt-8 block w-full py-4 rounded-2xl bg-[#8DFF00] text-black text-center font-black uppercase tracking-[3px]"
            >

              Download Legal PDF

            </a>

            <div className="mt-8 flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5">

              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) =>
                  setAccepted(e.target.checked)
                }
                className="mt-1 w-5 h-5"
              />

              <p className="text-white/80">

                I confirm that I am the parent or legal guardian and I accept the indemnity, media release and POPIA terms.

              </p>

            </div>

            <button
              disabled={!accepted}
              onClick={() =>
                setShowPopup(false)
              }
              className={`mt-10 w-full py-5 rounded-2xl font-black text-lg transition uppercase tracking-[4px] ${
                accepted
                  ? "bg-[#8DFF00] text-black"
                  : "bg-gray-800 text-gray-500"
              }`}
            >

              Continue

            </button>

          </div>

        </div>
      )}

      {/* PAGE */}
      <section className="relative z-20 px-4 md:px-6 pt-10 md:pt-14 pb-24">

        <div className="max-w-4xl mx-auto">

          <div className="text-center">

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
                fontSize: "clamp(70px, 10vw, 150px)",
                letterSpacing: "0.1em",
                lineHeight: "0.82",
              }}
            >

              KIDS
              <span
                className="block"
                style={{
                  color: BREEZE_GREEN,
                }}
              >
                EDITION
              </span>

            </h1>

          </div>

          {/* FORM CARD */}
          <div className="mt-14 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[34px] p-6 md:p-12">

            {success && (

              <div className="mb-6 p-6 rounded-2xl bg-[#8DFF00]/10 border border-[#8DFF00]/20 text-[#8DFF00]">

                {success}

              </div>
            )}

            {error && (

              <div className="mb-6 p-6 rounded-2xl bg-red-500/10 border border-red-400/20 text-red-300">

                {error}

              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {[
                ["Contestant Full Name", fullName, setFullName],
                ["Age", age, setAge],
                ["Parent / Guardian Full Name", parentFullName, setParentFullName],
                ["Parent ID Number", parentIdNumber, setParentIdNumber],
                ["Parent Contact Number", parentPhone, setParentPhone],
                ["Parent Email Address", parentEmail, setParentEmail],
                ["@TikTok Username", tiktokUsername, setTiktokUsername],
              ].map(([placeholder, value, setter], index) => (

                <input
                  key={index}
                  type="text"
                  required
                  placeholder={placeholder as string}
                  value={value as string}
                  onChange={(e) =>
                    (setter as any)(e.target.value)
                  }
                  className="
                    w-full
                    px-5
                    py-5
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

              ))}

              <select
                value={talent}
                onChange={(e) =>
                  setTalent(e.target.value)
                }
                className="
                  w-full
                  px-5
                  py-5
                  rounded-2xl
                  bg-black/40
                  border
                  border-white/10
                  text-white
                "
              >

                <option>Singing</option>
                <option>Dancing</option>
                <option>Comedy</option>
                <option>Instrument</option>
                <option>Other</option>

              </select>

              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) =>
                  setPhoto(
                    e.target.files?.[0] || null
                  )
                }
                className="
                  w-full
                  px-5
                  py-5
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
                  py-5
                  rounded-2xl
                  bg-[#8DFF00]
                  text-black
                  font-black
                  text-lg
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

    </main>
  );
}
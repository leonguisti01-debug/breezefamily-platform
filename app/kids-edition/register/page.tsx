"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

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

  /* FORM */
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [talent, setTalent] = useState("Singing");
  const [tiktokUsername, setTiktokUsername] = useState("");

  const [photo, setPhoto] = useState<File | null>(null);

  /* SUBMIT */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    let photoUrl = "";

    /* PHOTO UPLOAD */
    if (photo) {
      const fileName = `${Date.now()}-${photo.name}`;

      const { error: uploadError } = await supabase.storage
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

    /* SAVE TO DATABASE */
    const { error } = await supabase.from("contestants").insert([
      {
        full_name: fullName,
        age: age,
        guardian_name: guardianName,
        contact_number: contactNumber,
        email: email,
        talent_category: talent,

        tiktok_username: tiktokUsername,
        photo_url: photoUrl,

        guardian_consent: accepted,
        popia_consent: accepted,
        media_release: accepted,

        status: "pending",

        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(
      "Your entry has been successfully submitted and is awaiting approval from the Breeze Family team."
    );

    setFullName("");
    setAge("");
    setGuardianName("");
    setContactNumber("");
    setEmail("");
    setTiktokUsername("");

    setLoading(false);
  };

  return (
    <main
      className="min-h-screen text-white overflow-hidden"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="min-h-screen bg-black/45">

        {/* POPUP */}
        {showPopup && (
          <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">

            <div className="w-full max-w-3xl bg-[#0d0d0d] border border-green-500/20 rounded-3xl p-6 md:p-10 overflow-y-auto max-h-[90vh]">

              <h2 className="text-3xl md:text-5xl font-black uppercase text-center">
                Parent / Guardian Consent
              </h2>

              <div className="mt-8 space-y-5 text-white/75 leading-relaxed">

                <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                  Permission is granted for submitted content, videos and photos to be published across Breeze Family platforms and social media.
                </div>

                <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                  POPIA consent is acknowledged for competition administration purposes.
                </div>

              </div>

              <div className="mt-10 flex items-start gap-4 bg-black/30 border border-white/10 rounded-2xl p-5">

                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5"
                />

                <p className="text-white/85">
                  I accept the media release terms and POPIA requirements.
                </p>

              </div>

              <button
                disabled={!accepted}
                onClick={() => setShowPopup(false)}
                className={`mt-10 w-full py-5 rounded-2xl font-black text-lg transition ${
                  accepted
                    ? "bg-gradient-to-r from-green-400 to-lime-300 text-black"
                    : "bg-gray-700 text-gray-400"
                }`}
              >
                CONTINUE
              </button>

            </div>

          </div>
        )}

        {/* PAGE */}
        <section className="relative z-20 px-6 pt-20 md:pt-32 pb-24">

          <div className="max-w-4xl mx-auto">

            <h1 className="text-5xl md:text-7xl font-black uppercase text-center">

              ENTER THE

              <br />

              <span className="bg-gradient-to-r from-cyan-300 via-white to-pink-400 text-transparent bg-clip-text">
                COMPETITION
              </span>

            </h1>

            {/* FORM */}
            <div className="mt-14 bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12">

              {/* SUCCESS */}
              {success && (
                <div className="mb-6 p-6 rounded-2xl bg-green-500/10 border border-green-400/20 text-green-300 text-lg">
                  {success}
                </div>
              )}

              {/* ERROR */}
              {error && (
                <div className="mb-6 p-6 rounded-2xl bg-red-500/10 border border-red-400/20 text-red-300">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">

                {/* FULL NAME */}
                <div>
                  <label className="block mb-3 text-white/70 uppercase text-sm tracking-[3px]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white"
                  />
                </div>

                {/* TIKTOK */}
                <div>
                  <label className="block mb-3 text-white/70 uppercase text-sm tracking-[3px]">
                    TikTok Username
                  </label>

                  <input
                    type="text"
                    required
                    value={tiktokUsername}
                    onChange={(e) => setTiktokUsername(e.target.value)}
                    placeholder="@username"
                    className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white"
                  />
                </div>

                {/* PHOTO */}
                <div>
                  <label className="block mb-3 text-white/70 uppercase text-sm tracking-[3px]">
                    Upload Photo
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) =>
                      setPhoto(e.target.files?.[0] || null)
                    }
                    className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white"
                  />
                </div>

                {/* AGE */}
                <div>
                  <label className="block mb-3 text-white/70 uppercase text-sm tracking-[3px]">
                    Age
                  </label>

                  <input
                    type="number"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white"
                  />
                </div>

                {/* GUARDIAN */}
                <div>
                  <label className="block mb-3 text-white/70 uppercase text-sm tracking-[3px]">
                    Parent / Guardian
                  </label>

                  <input
                    type="text"
                    required
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white"
                  />
                </div>

                {/* CONTACT */}
                <div>
                  <label className="block mb-3 text-white/70 uppercase text-sm tracking-[3px]">
                    Contact Number
                  </label>

                  <input
                    type="text"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block mb-3 text-white/70 uppercase text-sm tracking-[3px]">
                    Email Address
                  </label>

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white"
                  />
                </div>

                {/* TALENT */}
                <div>
                  <label className="block mb-3 text-white/70 uppercase text-sm tracking-[3px]">
                    Talent Category
                  </label>

                  <select
                    value={talent}
                    onChange={(e) => setTalent(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white"
                  >
                    <option>Singing</option>
                    <option>Dancing</option>
                    <option>Comedy</option>
                    <option>Instrument</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-black text-lg shadow-[0_0_50px_rgba(255,0,140,0.4)]"
                >
                  {loading ? "SUBMITTING..." : "SUBMIT ENTRY"}
                </button>

              </form>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}
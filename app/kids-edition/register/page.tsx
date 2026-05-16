"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [accepted, setAccepted] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

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
      {/* OVERLAY */}
      <div className="min-h-screen bg-black/45">

        {/* LEGAL POPUP */}
        {showPopup && (
          <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">

            <div className="w-full max-w-3xl bg-[#0d0d0d] border border-green-500/20 rounded-3xl p-6 md:p-10 shadow-[0_0_80px_rgba(0,255,120,0.15)] overflow-y-auto max-h-[90vh]">

              <h2 className="text-3xl md:text-5xl font-black uppercase text-center">
                Parent / Guardian Consent
              </h2>

              <p className="mt-8 text-white/80 leading-relaxed text-sm md:text-base">
                By continuing with this registration, the parent or legal guardian confirms that they grant permission for the contestant to participate in the TikTok Stars Kids Edition competition operated by The Breeze Family.
              </p>

              <div className="mt-8 space-y-5 text-white/75 text-sm md:text-base leading-relaxed">

                <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                  Permission is granted for photographs, videos, performances, audio recordings and submitted content to be recorded, edited, published and distributed across websites, social media, livestreams, promotional campaigns and digital platforms.
                </div>

                <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                  The parent or legal guardian acknowledges that content may become publicly visible online and may be shared by third parties.
                </div>

                <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                  In accordance with South Africa’s POPIA legislation, personal information collected during registration will only be used for competition administration, communication, verification and platform-related purposes.
                </div>

                <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                  The parent or legal guardian confirms that they are legally authorised to provide consent on behalf of the contestant.
                </div>

              </div>

              {/* ACCEPT */}
              <div className="mt-10 flex items-start gap-4 bg-black/30 border border-white/10 rounded-2xl p-5">

                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5"
                />

                <p className="text-sm md:text-base text-white/85 leading-relaxed">
                  I confirm that I am the parent or legal guardian and I accept the media release terms, competition rules and POPIA consent requirements.
                </p>

              </div>

              {/* BUTTON */}
              <button
                disabled={!accepted}
                onClick={() => setShowPopup(false)}
                className={`mt-10 w-full py-5 rounded-2xl font-black text-lg md:text-xl transition duration-300 ${
                  accepted
                    ? "bg-gradient-to-r from-green-400 to-lime-300 text-black hover:scale-[1.02]"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                CONTINUE TO REGISTRATION
              </button>

            </div>

          </div>
        )}

        {/* HERO */}
        <section className="relative z-20 px-6 pt-20 md:pt-32 pb-24">

          <div className="max-w-4xl mx-auto">

            {/* TAG */}
            <div className="inline-block px-5 py-2 rounded-full border border-pink-400/40 bg-black/30 backdrop-blur-md text-sm uppercase tracking-[4px] text-pink-300 mb-8">
              Kids Edition Registration
            </div>

            {/* TITLE */}
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.92] text-center">

              ENTER THE

              <br />

              <span className="bg-gradient-to-r from-cyan-300 via-white to-pink-400 text-transparent bg-clip-text">
                COMPETITION
              </span>

            </h1>

            {/* DESCRIPTION */}
            <p className="mt-8 text-lg md:text-2xl text-white/80 leading-relaxed text-center max-w-3xl mx-auto">
              Complete the registration form below to enter TikTok Stars Kids Edition.
            </p>

            {/* FORM */}
            <div className="mt-14 bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12 shadow-[0_0_50px_rgba(255,255,255,0.05)]">

              <form className="space-y-8">

                {/* HIDDEN LEGAL FIELDS */}
                <input
                  type="hidden"
                  name="guardian_consent"
                  value={accepted ? "accepted" : "not_accepted"}
                />

                <input
                  type="hidden"
                  name="popia_consent"
                  value={accepted ? "accepted" : "not_accepted"}
                />

                <input
                  type="hidden"
                  name="media_release"
                  value={accepted ? "accepted" : "not_accepted"}
                />

                <input
                  type="hidden"
                  name="consent_timestamp"
                  value={new Date().toISOString()}
                />

                {/* FULL NAME */}
                <div>
                  <label className="block text-sm uppercase tracking-[3px] text-white/70 mb-3">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="full_name"
                    className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white outline-none focus:border-pink-400"
                    placeholder="Enter full name"
                  />
                </div>

                {/* AGE */}
                <div>
                  <label className="block text-sm uppercase tracking-[3px] text-white/70 mb-3">
                    Age
                  </label>

                  <input
                    type="number"
                    name="age"
                    className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white outline-none focus:border-pink-400"
                    placeholder="Enter age"
                  />
                </div>

                {/* PARENT/GUARDIAN */}
                <div>
                  <label className="block text-sm uppercase tracking-[3px] text-white/70 mb-3">
                    Parent / Guardian
                  </label>

                  <input
                    type="text"
                    name="guardian_name"
                    className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white outline-none focus:border-pink-400"
                    placeholder="Parent or guardian name"
                  />
                </div>

                {/* CONTACT */}
                <div>
                  <label className="block text-sm uppercase tracking-[3px] text-white/70 mb-3">
                    Contact Number
                  </label>

                  <input
                    type="tel"
                    name="contact_number"
                    className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white outline-none focus:border-pink-400"
                    placeholder="Enter contact number"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-sm uppercase tracking-[3px] text-white/70 mb-3">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white outline-none focus:border-pink-400"
                    placeholder="Enter email address"
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-black text-lg md:text-xl shadow-[0_0_50px_rgba(255,0,140,0.5)] hover:scale-[1.02] transition duration-300"
                >
                  SUBMIT ENTRY
                </button>

              </form>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}
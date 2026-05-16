import TopButtons from "@/components/TopButtons";

export default function RegisterPage() {
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
      {/* NAVBAR */}
      <TopButtons />

      {/* OVERLAY */}
      <div className="min-h-screen bg-black/45">

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
            <div className="mt-14 bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(255,255,255,0.05)]">

              <form className="space-y-8">

                {/* FULL NAME */}
                <div>
                  <label className="block text-sm uppercase tracking-[3px] text-white/70 mb-3">
                    Full Name
                  </label>

                  <input
                    type="text"
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
                    className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white outline-none focus:border-pink-400"
                    placeholder="Enter email address"
                  />
                </div>

                {/* TALENT */}
                <div>
                  <label className="block text-sm uppercase tracking-[3px] text-white/70 mb-3">
                    Talent Category
                  </label>

                  <select
                    className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white outline-none focus:border-pink-400"
                  >
                    <option>Choose Category</option>
                    <option>Singing</option>
                    <option>Dancing</option>
                    <option>Comedy</option>
                    <option>Instrument</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* PHOTO */}
                <div>
                  <label className="block text-sm uppercase tracking-[3px] text-white/70 mb-3">
                    Upload Photo
                  </label>

                  <input
                    type="file"
                    className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white"
                  />
                </div>

                {/* VIDEO */}
                <div>
                  <label className="block text-sm uppercase tracking-[3px] text-white/70 mb-3">
                    Upload Performance Video
                  </label>

                  <input
                    type="file"
                    className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white"
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
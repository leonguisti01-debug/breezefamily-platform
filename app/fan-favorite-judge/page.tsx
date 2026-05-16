export default function FanFavoriteJudgePage() {
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

        {/* HERO */}
        <section className="relative z-20 px-6 pt-20 md:pt-32 pb-16">

          <div className="max-w-7xl mx-auto text-center">

            {/* TAG */}
            <div className="inline-block px-5 py-2 rounded-full border border-green-400/40 bg-black/30 backdrop-blur-md text-sm uppercase tracking-[4px] text-green-300 mb-8">
              Favorite Judge Vote
            </div>

            {/* TITLE */}
            <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.92]">

              VOTE FOR

              <br />

              <span className="bg-gradient-to-r from-green-300 via-white to-lime-300 text-transparent bg-clip-text">
                YOUR JUDGE
              </span>

            </h1>

            {/* SUBTITLE */}
            <p className="mt-8 text-2xl md:text-3xl font-black uppercase text-white">
              Choose The Judge You Love Most
            </p>

            {/* DESCRIPTION */}
            <p className="mt-6 text-lg md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              Support your favorite judge and help crown the ultimate fan favorite.
            </p>

          </div>

        </section>

        {/* JUDGES */}
        <section className="relative z-20 px-6 pb-24">

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

            {/* JUDGE 1 */}
            <div className="flex flex-col items-center text-center bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

              <img
                src="/judge1.jpg"
                alt="Judge 1"
                className="w-full max-w-[220px] md:max-w-[320px] mx-auto rounded-3xl object-cover"
              />

              <h2 className="mt-6 text-3xl font-black uppercase">
                Judge 1
              </h2>

              <p className="mt-3 text-white/70">
                Inspiring mentor with a passion for discovering talent.
              </p>

              <button className="mt-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-green-400 to-lime-300 text-black font-black text-lg shadow-[0_0_50px_rgba(0,255,120,0.4)] hover:scale-105 transition duration-300">
                Vote Now
              </button>

            </div>

            {/* JUDGE 2 */}
            <div className="flex flex-col items-center text-center bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

              <img
                src="/judge2.jpg"
                alt="Judge 2"
                className="w-full max-w-[220px] md:max-w-[320px] mx-auto rounded-3xl object-cover"
              />

              <h2 className="mt-6 text-3xl font-black uppercase">
                Judge 2
              </h2>

              <p className="mt-3 text-white/70">
                Industry expert helping young stars shine brighter.
              </p>

              <button className="mt-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-green-400 to-lime-300 text-black font-black text-lg shadow-[0_0_50px_rgba(0,255,120,0.4)] hover:scale-105 transition duration-300">
                Vote Now
              </button>

            </div>

            {/* JUDGE 3 */}
            <div className="flex flex-col items-center text-center bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

              <img
                src="/judge3.jpg"
                alt="Judge 3"
                className="w-full max-w-[220px] md:max-w-[320px] mx-auto rounded-3xl object-cover"
              />

              <h2 className="mt-6 text-3xl font-black uppercase">
                Judge 3
              </h2>

              <p className="mt-3 text-white/70">
                Creative visionary bringing energy and excitement.
              </p>

              <button className="mt-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-green-400 to-lime-300 text-black font-black text-lg shadow-[0_0_50px_rgba(0,255,120,0.4)] hover:scale-105 transition duration-300">
                Vote Now
              </button>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}
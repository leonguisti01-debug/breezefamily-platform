export default function Season2FinalePage() {
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
            <div className="inline-block px-5 py-2 rounded-full border border-cyan-400/40 bg-black/30 backdrop-blur-md text-sm uppercase tracking-[4px] text-cyan-300 mb-8">
              Season 2 Finale
            </div>

            {/* TITLE */}
            <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.92]">

              LIVE

              <br />

              <span className="bg-gradient-to-r from-cyan-300 via-white to-pink-400 text-transparent bg-clip-text">
                VOTING
              </span>

            </h1>

            {/* SUBTITLE */}
            <p className="mt-8 text-2xl md:text-3xl font-black uppercase text-white">
              Vote For Your Favorite Contestant
            </p>

            {/* DESCRIPTION */}
            <p className="mt-6 text-lg md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              Support your favorite performer and help decide who becomes the next TikTok Stars champion.
            </p>

          </div>

        </section>

        {/* TOP 10 CONTESTANTS */}
        <section className="relative z-20 px-6 pb-24">

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

            {/* CARD 1 */}
            <div className="flex flex-col items-center text-center bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

              <img
                src="/contestant1.jpg"
                alt="Contestant 1"
                className="w-full max-w-[220px] md:max-w-[320px] mx-auto rounded-3xl object-cover"
              />

              <h2 className="mt-6 text-3xl font-black uppercase">
                Contestant 1
              </h2>

              <p className="mt-3 text-white/70">
                Amazing vocalist with incredible stage presence.
              </p>

              <button className="mt-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-black text-lg shadow-[0_0_50px_rgba(255,0,140,0.4)] hover:scale-105 transition duration-300">
                Vote Now
              </button>

            </div>

            {/* CARD 2 */}
            <div className="flex flex-col items-center text-center bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

              <img
                src="/contestant2.jpg"
                alt="Contestant 2"
                className="w-full max-w-[220px] md:max-w-[320px] mx-auto rounded-3xl object-cover"
              />

              <h2 className="mt-6 text-3xl font-black uppercase">
                Contestant 2
              </h2>

              <p className="mt-3 text-white/70">
                Energetic dancer bringing explosive performances.
              </p>

              <button className="mt-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-black text-lg shadow-[0_0_50px_rgba(255,0,140,0.4)] hover:scale-105 transition duration-300">
                Vote Now
              </button>

            </div>

            {/* CARD 3 */}
            <div className="flex flex-col items-center text-center bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

              <img
                src="/contestant3.jpg"
                alt="Contestant 3"
                className="w-full max-w-[220px] md:max-w-[320px] mx-auto rounded-3xl object-cover"
              />

              <h2 className="mt-6 text-3xl font-black uppercase">
                Contestant 3
              </h2>

              <p className="mt-3 text-white/70">
                Multi-talented performer captivating audiences.
              </p>

              <button className="mt-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-black text-lg shadow-[0_0_50px_rgba(255,0,140,0.4)] hover:scale-105 transition duration-300">
                Vote Now
              </button>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}
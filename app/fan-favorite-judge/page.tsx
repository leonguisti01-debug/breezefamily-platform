import TopButtons from "@/components/TopButtons";

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
      {/* NAVBAR */}
      <TopButtons />

      {/* OVERLAY */}
      <div className="min-h-screen bg-black/45">

        {/* HERO */}
        <section className="relative z-20 px-6 pt-20 md:pt-32 pb-24">

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

        {/* JUDGES SECTION */}
        <section className="relative z-20 px-6 pb-24">

          <div className="max-w-7xl mx-auto">

            {/* KEEP YOUR EXISTING JUDGES CONTENT HERE */}

          </div>

        </section>

        {/* FOOTER */}
        <footer className="relative z-20 border-t border-white/10 mt-10 bg-black/20 backdrop-blur-md">

          <div className="max-w-7xl mx-auto px-6 py-10 text-center">

            <p className="text-lg text-white/90">
              © 2026 Favorite Judge Vote
            </p>

            <p className="mt-4 uppercase tracking-[5px] text-sm text-white/70">
              Powered by The Breeze Family
            </p>

          </div>

        </footer>

      </div>

    </main>
  );
}
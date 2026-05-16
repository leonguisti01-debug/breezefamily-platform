import Link from "next/link";

export default function HomePage() {
  return (
    <main
      className="min-h-screen text-white overflow-hidden relative"
      style={{
        background:
          "radial-gradient(circle at top, rgba(50,255,50,0.18), transparent 35%), #050505",
      }}
    >
      {/* GLOW EFFECTS */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-green-500/20 blur-[180px] rounded-full"></div>

      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-lime-400/20 blur-[180px] rounded-full"></div>

      {/* NAVBAR */}
      <header className="relative z-20 w-full px-6 py-8 border-b border-green-500/10 backdrop-blur-xl bg-black/20">

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* LOGO */}
          <div className="flex items-center gap-5">

            <img
              src="/breeze-logo.png"
              alt="Breeze Family"
              className="w-[90px] md:w-[120px]"
            />

            <div>

              <h1 className="text-3xl md:text-5xl font-black leading-none">

                <span className="text-green-300">
                  BREEZE
                </span>{" "}

                <span className="text-lime-200">
                  FAMILY
                </span>

              </h1>

              <p className="text-xs md:text-sm tracking-[5px] uppercase text-white/70 mt-2">
                Entertainment • Media • Merch
              </p>

            </div>

          </div>

          {/* MENU */}
          <nav className="flex flex-wrap justify-center gap-8 md:gap-10 text-xs md:text-sm uppercase font-bold tracking-[2px]">

            <Link
              href="/"
              className="text-green-300 hover:text-lime-200 transition duration-300"
            >
              Home
            </Link>

            <Link
              href="/kids-edition"
              className="hover:text-green-300 transition duration-300"
            >
              Kids Edition
            </Link>

            <Link
              href="/season-2-finale"
              className="hover:text-green-300 transition duration-300"
            >
              Season 2
            </Link>

            <Link
              href="/fan-favorite-judge"
              className="hover:text-green-300 transition duration-300"
            >
              Favorite Judge Vote
            </Link>

            <Link
              href="/shop"
              className="hover:text-green-300 transition duration-300"
            >
              Shop
            </Link>

            <Link
              href="/login"
              className="px-5 py-2 rounded-full border border-green-400/30 bg-green-500/10 hover:bg-green-500/20 transition duration-300"
            >
              Login
            </Link>

          </nav>

        </div>

      </header>

      {/* HERO */}
      <section className="relative z-20 px-6 pt-20 md:pt-32 pb-24">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT SIDE */}
          <div>

            {/* TOP BADGE */}
            <div className="inline-block px-5 py-2 rounded-full border border-green-400/30 bg-green-500/10 backdrop-blur-md text-sm uppercase tracking-[4px] text-green-300 mb-8">
              Welcome To The Future
            </div>

            {/* TITLE */}
            <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.9]">

              THE NEW

              <br />

              <span className="bg-gradient-to-r from-green-300 via-lime-200 to-green-500 text-transparent bg-clip-text">
                BREEZE ERA
              </span>

            </h2>

            {/* SUBTITLE */}
            <p className="mt-8 text-2xl md:text-3xl font-black uppercase text-white">
              Entertainment • Talent • Merch • Media
            </p>

            {/* DESCRIPTION */}
            <p className="mt-6 text-lg md:text-2xl text-white/80 leading-relaxed max-w-2xl">
              The Breeze Family is building a next-generation entertainment platform for creators, performers and fans across South Africa.
            </p>

            {/* BUTTONS */}
            <div className="mt-14 flex flex-wrap gap-6">

              <Link
                href="/kids-edition"
                className="px-10 py-5 rounded-2xl bg-gradient-to-r from-green-400 to-lime-300 text-black font-black text-lg md:text-xl shadow-[0_0_50px_rgba(0,255,120,0.45)] hover:scale-105 transition duration-300"
              >
                ENTER KIDS EDITION
              </Link>

              <Link
                href="/shop"
                className="px-10 py-5 rounded-2xl border-2 border-green-300 text-green-300 font-black text-lg md:text-xl bg-black/20 backdrop-blur-md hover:bg-green-300 hover:text-black transition duration-300"
              >
                SHOP MERCH
              </Link>

            </div>

            {/* FEATURES */}
            <div className="mt-14 space-y-5 text-lg">

              <div className="flex items-center gap-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4">

                <div className="w-8 h-8 rounded-full bg-green-400 text-black flex items-center justify-center font-black">
                  ✓
                </div>

                Live Talent Competitions

              </div>

              <div className="flex items-center gap-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4">

                <div className="w-8 h-8 rounded-full bg-green-400 text-black flex items-center justify-center font-black">
                  ✓
                </div>

                Exclusive Breeze Family Merch

              </div>

              <div className="flex items-center gap-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4">

                <div className="w-8 h-8 rounded-full bg-green-400 text-black flex items-center justify-center font-black">
                  ✓
                </div>

                Creator Community & Fan Voting

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex justify-center">

            <div className="absolute inset-0 bg-green-400/20 blur-[120px] rounded-full"></div>

            <img
              src="/breeze-logo.png"
              alt="Breeze Family"
              className="relative z-10 w-full max-w-[700px] drop-shadow-[0_0_60px_rgba(0,255,100,0.45)]"
            />

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="relative z-20 border-t border-green-500/10 mt-10 bg-black/20 backdrop-blur-md">

        <div className="max-w-7xl mx-auto px-6 py-10 text-center">

          <p className="text-lg text-white/90">
            © 2026 The Breeze Family
          </p>

          <p className="mt-4 uppercase tracking-[5px] text-sm text-white/60">
            Shedding Light Where Darkness Looms
          </p>

        </div>

      </footer>

    </main>
  );
}
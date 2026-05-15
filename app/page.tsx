import Link from "next/link";

export default function HomePage() {
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
      {/* DARK OVERLAY */}
      <div className="min-h-screen bg-black/45">

        {/* GLOW EFFECTS */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-500/20 blur-[180px] rounded-full"></div>

        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[180px] rounded-full"></div>

        {/* NAVBAR */}
        <header className="relative z-20 w-full px-6 py-8">

          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">

            {/* LOGO */}
            <div className="flex items-center gap-5">

              <img
                src="/logo.png"
                alt="TikTok Stars"
                className="w-[90px] md:w-[110px]"
              />

              <div>

                <h1 className="text-3xl md:text-5xl font-black leading-none">

                  <span className="text-cyan-300">
                    TIKTOK
                  </span>{" "}

                  <span className="text-pink-400">
                    STARS
                  </span>

                </h1>

                <p className="text-xs md:text-sm tracking-[5px] uppercase text-white/80 mt-2">
                  Kids Talent Search
                </p>

              </div>

            </div>

            {/* MENU */}
            <nav className="flex flex-wrap justify-center gap-8 md:gap-10 text-xs md:text-sm uppercase font-bold tracking-[2px]">

              <Link
                href="/"
                className="text-pink-400 hover:text-cyan-300 transition duration-300"
              >
                Home
              </Link>

              <Link
                href="/kids-edition"
                className="hover:text-cyan-300 transition duration-300"
              >
                Kids Edition
              </Link>

              <Link
                href="/season-2-finale"
                className="hover:text-cyan-300 transition duration-300"
              >
                Season 2
              </Link>

              <Link
                href="/fan-favorite-judge"
                className="hover:text-cyan-300 transition duration-300"
              >
                Favorite Judge Vote
              </Link>

            </nav>

          </div>

        </header>

        {/* HERO */}
        <section className="relative z-20 px-6 pt-20 md:pt-32 pb-24">

          <div className="max-w-7xl mx-auto">

            <div className="max-w-3xl">

              {/* TOP TAG */}
              <div className="inline-block px-5 py-2 rounded-full border border-pink-400/40 bg-black/30 backdrop-blur-md text-sm uppercase tracking-[4px] text-pink-300 mb-8">
                South Africa's Ultimate Talent Search
              </div>

              {/* MAIN TITLE */}
              <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.92]">

                BE THE NEXT

                <br />

                <span className="bg-gradient-to-r from-cyan-300 via-white to-pink-400 text-transparent bg-clip-text">
                  TIKTOK STAR!
                </span>

              </h2>

              {/* SUBTITLE */}
              <p className="mt-8 text-2xl md:text-3xl font-black uppercase text-white">
                Sing. Dance. Perform. Shine!
              </p>

              {/* DESCRIPTION */}
              <p className="mt-6 text-lg md:text-2xl text-white/90 leading-relaxed max-w-2xl">
                South Africa’s ultimate live talent competition for young stars.
              </p>

              {/* FEATURES */}
              <div className="mt-12 space-y-5 text-lg">

                <div className="flex items-center gap-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4">

                  <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center font-black">
                    ✓
                  </div>

                  Open to all young talent in South Africa

                </div>

                <div className="flex items-center gap-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4">

                  <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center font-black">
                    ✓
                  </div>

                  Win amazing prizes and sponsorships

                </div>

                <div className="flex items-center gap-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4">

                  <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center font-black">
                    ✓
                  </div>

                  Be seen. Be heard. Be a Star!

                </div>

              </div>

              {/* BUTTONS */}
              <div className="mt-14 flex flex-wrap gap-6">

                <Link
                  href="/kids-edition"
                  className="px-10 py-5 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-black text-lg md:text-xl shadow-[0_0_50px_rgba(255,0,140,0.5)] hover:scale-105 transition duration-300"
                >
                  ENTER NOW
                </Link>

                <Link
                  href="/season-2-finale"
                  className="px-10 py-5 rounded-2xl border-2 border-cyan-300 text-cyan-300 font-black text-lg md:text-xl bg-black/20 backdrop-blur-md hover:bg-cyan-300 hover:text-black transition duration-300"
                >
                  LIVE VOTING
                </Link>

              </div>

            </div>

          </div>

        </section>

        {/* FOOTER */}
        <footer className="relative z-20 border-t border-white/10 mt-10 bg-black/20 backdrop-blur-md">

          <div className="max-w-7xl mx-auto px-6 py-10 text-center">

            <p className="text-lg text-white/90">
              © 2026 TikTok Stars Kids Talent Search
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
import Link from "next/link";

export default function KidsEditionPage() {
  return (
    <main
      className="min-h-screen text-white"
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

        {/* HEADER */}
        <header className="w-full px-6 py-8">

          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">

            {/* LOGO */}
            <div className="flex items-center gap-5">

              <img
                src="/logo.png"
                alt="TikTok Stars"
                className="w-[90px] md:w-[110px]"
              />

              <div>

                <h1 className="text-2xl md:text-4xl font-black leading-none">
                  <span className="text-cyan-300">TIKTOK</span>{" "}
                  <span className="text-pink-400">STARS</span>
                </h1>

                <p className="text-xs md:text-sm tracking-[4px] uppercase text-white/80 mt-2">
                  Kids Talent Search
                </p>

              </div>

            </div>

            {/* MENU */}
            <nav className="flex flex-wrap justify-center gap-6 md:gap-10 text-xs md:text-sm font-bold uppercase tracking-[2px] text-center">

              <Link
                href="/"
                className="hover:text-cyan-300 transition"
              >
                Home
              </Link>

              <Link
                href="/kids-edition"
                className="text-pink-400 hover:text-cyan-300 transition"
              >
                Kids Edition
              </Link>

              <Link
                href="/season-2-finale"
                className="hover:text-cyan-300 transition"
              >
                Season 2
              </Link>

              <Link
                href="/fan-favorite-judge"
                className="hover:text-cyan-300 transition"
              >
                Favorite Judge Vote
              </Link>

            </nav>

          </div>

        </header>

        {/* HERO */}
        <section className="w-full px-6 py-20 md:py-32">

          <div className="max-w-5xl mx-auto text-center">

            <div className="inline-block px-5 py-2 rounded-full border border-pink-400/40 bg-black/30 backdrop-blur-md text-sm uppercase tracking-[4px] text-pink-300 mb-8">
              Kids Edition Entries
            </div>

            <h2 className="text-5xl md:text-8xl font-black uppercase leading-[0.95]">

              ENTER THE

              <br />

              <span className="bg-gradient-to-r from-cyan-300 via-white to-pink-400 text-transparent bg-clip-text">
                COMPETITION
              </span>

            </h2>

            <p className="mt-8 text-2xl md:text-3xl font-black uppercase">
              Your Talent. Your Moment.
            </p>

            <p className="mt-6 text-lg md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Submit your performance video and stand a chance to become South Africa’s next TikTok Star.
            </p>

            {/* BUTTON */}
            <div className="mt-14">

              <Link
                href="/register"
                className="inline-block px-12 py-5 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-black text-lg md:text-2xl shadow-[0_0_50px_rgba(255,0,140,0.5)] hover:scale-105 transition duration-300"
              >
                ENTER HERE
              </Link>

            </div>

          </div>

        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/20 mt-10">

          <div className="max-w-7xl mx-auto px-6 py-10 text-center text-white">

            <p className="text-lg">
              © 2026 TikTok Stars Kids Talent Search
            </p>

            <p className="mt-4 uppercase tracking-[5px] text-sm">
              Powered by The Breeze Family
            </p>

          </div>

        </footer>

      </div>

    </main>
  );
}
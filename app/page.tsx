import Link from "next/link";

export default function HomePage() {
  return (
    <main
      className="min-h-screen text-white"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="min-h-screen bg-black/55">

        {/* NAVBAR */}
        <header className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* LOGO */}
          <div className="flex items-center gap-5">

            <img
              src="/logo.png"
              alt="TikTok Stars"
              className="w-[110px]"
            />

            <div>

              <h1 className="text-3xl font-black">
                <span className="text-cyan-300">TIKTOK</span>{" "}
                <span className="text-pink-400">STARS</span>
              </h1>

              <p className="text-sm tracking-[4px] uppercase text-white/80">
                Kids Talent Search
              </p>

            </div>

          </div>

          {/* MENU */}
          <nav className="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-[2px]">

            <Link
              href="/"
              className="text-pink-400 hover:text-cyan-300 transition"
            >
              Home
            </Link>

            <Link
              href="/kids-edition"
              className="hover:text-cyan-300 transition"
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

        </header>

        {/* HERO */}
        <section className="max-w-7xl mx-auto px-6 py-24">

          <div className="max-w-3xl">

            <h2 className="text-5xl md:text-8xl font-black uppercase leading-[0.95]">
              BE THE NEXT
              <br />

              <span className="bg-gradient-to-r from-cyan-300 to-pink-400 text-transparent bg-clip-text">
                TIKTOK STAR!
              </span>
            </h2>

            <p className="mt-8 text-2xl md:text-3xl font-black uppercase">
              Sing. Dance. Perform. Shine!
            </p>

            <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed max-w-xl">
              South Africa’s ultimate live talent competition for young stars.
            </p>

            {/* FEATURES */}
            <div className="mt-10 space-y-5 text-lg">

              <div className="flex items-center gap-4">
                <div className="w-7 h-7 rounded-full bg-pink-500 flex items-center justify-center">
                  ✓
                </div>

                Open to all young talent in South Africa
              </div>

              <div className="flex items-center gap-4">
                <div className="w-7 h-7 rounded-full bg-pink-500 flex items-center justify-center">
                  ✓
                </div>

                Win amazing prizes and sponsorships
              </div>

              <div className="flex items-center gap-4">
                <div className="w-7 h-7 rounded-full bg-pink-500 flex items-center justify-center">
                  ✓
                </div>

                Be seen. Be heard. Be a Star!
              </div>

            </div>

            {/* BUTTONS */}
            <div className="mt-12 flex flex-wrap gap-6">

              <Link
                href="/kids-edition"
                className="px-10 py-5 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-black text-xl hover:scale-105 transition"
              >
                ENTER NOW
              </Link>

              <Link
                href="/season-2-finale"
                className="px-10 py-5 rounded-2xl border border-cyan-300 text-cyan-300 font-black text-xl hover:bg-cyan-300 hover:text-black transition"
              >
                LIVE VOTING
              </Link>

            </div>

          </div>

        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/20 py-10 text-center text-white">

          <p>
            © 2026 TikTok Stars Kids Talent Search
          </p>

          <p className="mt-3 uppercase tracking-[4px] text-sm">
            Powered by The Breeze Family
          </p>

        </footer>

      </div>

    </main>
  );
}
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen text-white overflow-hidden relative">

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-50">
        <img
          src="/bg.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* DARK OVERLAY */}
      <div className="fixed inset-0 bg-black/75 -z-40"></div>

      {/* GLOWS */}
      <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-pink-500/20 blur-[180px] rounded-full -z-10"></div>

      <div className="absolute bottom-[-200px] left-[-200px] w-[600px] h-[600px] bg-cyan-500/20 blur-[180px] rounded-full -z-10"></div>

      {/* NAVBAR */}
      <header className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-50">

        {/* LOGO */}
        <div className="flex items-center gap-5">

          <img
            src="/logo.png"
            alt="TikTok Stars"
            className="w-[120px] h-auto"
          />

          <div>

            <h1 className="text-3xl font-black leading-none">
              <span className="text-cyan-400">TIKTOK</span>{" "}
              <span className="text-pink-500">STARS</span>
            </h1>

            <p className="text-xs uppercase tracking-[3px] text-gray-400 mt-1">
              Kids Talent Search
            </p>

          </div>

        </div>

        {/* MENU */}
        <nav className="flex flex-wrap justify-center items-center gap-5 text-xs md:text-sm uppercase font-bold tracking-[2px]">

          <Link href="/" className="text-pink-500 hover:text-cyan-400 transition">
            Home
          </Link>

          <Link href="/kids-edition" className="hover:text-cyan-400 transition">
            Kids Edition
          </Link>

          <Link href="/season-2-finale" className="hover:text-cyan-400 transition">
            Season 2
          </Link>

          <Link href="/fan-favorite-judge" className="hover:text-cyan-400 transition">
            Favorite Judge Vote
          </Link>

        </nav>

      </header>

      {/* HERO */}
      <section className="w-full max-w-7xl mx-auto px-6 pt-10 pb-24 relative z-10">

        <div className="max-w-3xl">

          <h2 className="text-5xl md:text-8xl font-black uppercase leading-[0.95]">

            BE THE NEXT

            <br />

            <span className="bg-gradient-to-r from-cyan-400 to-pink-500 text-transparent bg-clip-text">
              TIKTOK STAR!
            </span>

          </h2>

          <p className="mt-8 text-2xl md:text-3xl font-black uppercase">
            Sing. Dance. Perform. Shine!
          </p>

          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
            South Africa’s ultimate live talent competition for young stars.
          </p>

          {/* CHECKLIST */}
          <div className="mt-10 space-y-5 text-base md:text-lg">

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
              className="px-8 md:px-10 py-4 md:py-5 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-black text-lg md:text-xl shadow-[0_0_40px_rgba(255,0,150,0.45)] hover:scale-105 transition"
            >
              ENTER NOW
            </Link>

            <Link
              href="/season-2-finale"
              className="px-8 md:px-10 py-4 md:py-5 rounded-2xl border border-cyan-400 text-cyan-400 font-black text-lg md:text-xl hover:bg-cyan-400 hover:text-black transition"
            >
              LIVE VOTING
            </Link>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-gray-400 relative z-10">

        <p>
          © 2026 TikTok Stars Kids Talent Search
        </p>

        <p className="mt-3 uppercase tracking-[3px] text-sm">
          Powered by The Breeze Family
        </p>

      </footer>

    </main>
  );
}
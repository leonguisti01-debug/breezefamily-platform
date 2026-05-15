import Link from "next/link";

export default function HomePage() {

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-pink-500/20 blur-[160px] rounded-full"></div>

        <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[160px] rounded-full"></div>

        <div className="absolute bottom-0 left-[20%] w-[600px] h-[600px] bg-yellow-500/10 blur-[180px] rounded-full"></div>

      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-black leading-none">

              <span className="text-white">
                TikTok
              </span>

              <span className="text-yellow-400">
                Stars
              </span>

            </h1>

            <p className="text-pink-400 font-bold text-sm">
              Kids Edition
            </p>

          </div>

          <nav className="hidden lg:flex items-center gap-8 font-bold text-sm">

            <Link href="/vote" className="hover:text-pink-400 transition">
              Vote
            </Link>

            <Link href="/leaderboard" className="hover:text-cyan-400 transition">
              Leaderboard
            </Link>

            <Link href="/kids-edition" className="hover:text-yellow-400 transition">
              Enter
            </Link>

            <Link href="/admin-login" className="hover:text-red-400 transition">
              Admin
            </Link>

          </nav>

        </div>

      </header>

      {/* HERO */}
      <section className="relative px-6 lg:px-16 pt-20 pb-28">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>

            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-pink-500/30 bg-pink-500/10 mb-8">

              <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>

              <span className="font-bold text-pink-300">
                AUDITIONS NOW OPEN
              </span>

            </div>

            <h1 className="text-6xl md:text-8xl font-black leading-[0.9]">

              <span className="text-white">
                TikTok
              </span>

              <br />

              <span className="text-yellow-400 drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]">
                STARS
              </span>

              <br />

              <span className="text-pink-400">
                Kids Edition
              </span>

            </h1>

            <p className="mt-8 text-2xl text-gray-300 leading-relaxed max-w-2xl">

              South Africa’s brightest young stars compete for fame,
              prizes and the spotlight.

            </p>

            {/* INFO */}
            <div className="mt-10 grid sm:grid-cols-3 gap-5">

              <div className="rounded-3xl border border-pink-500/20 bg-pink-500/10 p-6">

                <h3 className="text-4xl font-black text-pink-400">
                  R10K
                </h3>

                <p className="mt-2 text-gray-300">
                  Starting Prize
                </p>

              </div>

              <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-6">

                <h3 className="text-4xl font-black text-cyan-400">
                  2-17
                </h3>

                <p className="mt-2 text-gray-300">
                  Ages Open
                </p>

              </div>

              <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-6">

                <h3 className="text-4xl font-black text-yellow-400">
                  MAY 29
                </h3>

                <p className="mt-2 text-gray-300">
                  Entries Close
                </p>

              </div>

            </div>

            {/* BUTTONS */}
            <div className="mt-12 flex flex-wrap gap-5">

              <Link
                href="/kids-edition"
                className="px-10 py-5 rounded-2xl bg-pink-500 hover:bg-pink-400 transition text-white font-black text-lg shadow-[0_0_40px_rgba(255,0,150,0.5)]"
              >
                ENTER NOW
              </Link>

              <Link
                href="/vote"
                className="px-10 py-5 rounded-2xl border border-white/10 bg-white/5 hover:border-cyan-400 transition font-black text-lg"
              >
                VOTE NOW
              </Link>

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative">

            <div className="rounded-[50px] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(255,0,150,0.3)]">

              <img
                src="/poster.jpg"
                alt="TikTok Stars"
                className="w-full h-auto object-cover"
              />

            </div>

            {/* FLOATING CARDS */}
            <div className="absolute -bottom-10 -left-10 rounded-3xl bg-black/70 border border-pink-500/20 backdrop-blur-xl p-6">

              <h3 className="text-4xl font-black text-pink-400">
                LIVE
              </h3>

              <p className="mt-2 text-gray-300">
                Voting Open
              </p>

            </div>

            <div className="absolute -top-10 -right-10 rounded-3xl bg-black/70 border border-yellow-500/20 backdrop-blur-xl p-6">

              <h3 className="text-4xl font-black text-yellow-400">
                2026
              </h3>

              <p className="mt-2 text-gray-300">
                Competition
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CATEGORIES */}
      <section className="px-6 lg:px-16 pb-28">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <h2 className="text-6xl font-black text-white">
              CATEGORIES
            </h2>

            <p className="mt-5 text-xl text-gray-400">
              Every young star deserves a stage.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">

            {[
              "Dance",
              "Singing",
              "Comedy",
              "Influencer",
              "Model",
            ].map((category) => (

              <div
                key={category}
                className="rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-xl p-10 text-center hover:-translate-y-3 hover:border-pink-500 transition duration-300"
              >

                <h3 className="text-3xl font-black text-pink-400">
                  {category}
                </h3>

                <p className="mt-4 text-gray-300">
                  Shine on stage
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="px-6 lg:px-16 pb-32">

        <div className="max-w-5xl mx-auto rounded-[50px] border border-pink-500/20 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 backdrop-blur-xl p-16 text-center">

          <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">

            SHOW YOUR TALENT.
            <br />
            SHINE LIKE A STAR.

          </h2>

          <p className="mt-8 text-2xl text-gray-300">

            This is your moment to be seen.

          </p>

          <div className="mt-12">

            <Link
              href="/kids-edition"
              className="inline-flex px-12 py-6 rounded-2xl bg-pink-500 hover:bg-pink-400 transition text-white font-black text-2xl shadow-[0_0_50px_rgba(255,0,150,0.5)]"
            >
              ENTER COMPETITION
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}
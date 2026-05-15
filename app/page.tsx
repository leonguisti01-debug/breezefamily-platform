import Link from "next/link";
import TopButtons from "./components/TopButtons";

export default function HomePage() {

  return (
    <main
      className="min-h-screen text-white relative bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/background.jpg')",
      }}
    >

      <TopButtons />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-7xl mx-auto text-center px-6 py-32">

        {/* BUTTONS */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">

          {/* SEASON 2 */}
          <Link
            href="/season-2-finale"
            className="group rounded-[40px] border border-cyan-500/20 bg-cyan-500/10 backdrop-blur-xl p-12 hover:-translate-y-2 hover:border-cyan-400 transition duration-300 shadow-[0_0_50px_rgba(0,255,255,0.15)]"
          >

            <div className="text-6xl mb-6">
              ⭐
            </div>

            <h2 className="text-4xl font-black text-cyan-400 leading-tight">

              TikTok Stars
              <br />
              Season 2 Finale

            </h2>

            <p className="mt-6 text-gray-300 text-lg">

              Vote for the Top 10 finalists.

            </p>

          </Link>

          {/* FAN FAVORITE JUDGE */}
          <Link
            href="/fan-favorite-judge"
            className="group rounded-[40px] border border-yellow-500/20 bg-yellow-500/10 backdrop-blur-xl p-12 hover:-translate-y-2 hover:border-yellow-400 transition duration-300 shadow-[0_0_50px_rgba(255,215,0,0.15)]"
          >

            <div className="text-6xl mb-6">
              👑
            </div>

            <h2 className="text-4xl font-black text-yellow-400 leading-tight">

              Season 2
              <br />
              Fan Favorite Judge

            </h2>

            <p className="mt-6 text-gray-300 text-lg">

              Vote for your favorite judge.

            </p>

          </Link>

          {/* KIDS */}
          <Link
            href="/kids-edition"
            className="group rounded-[40px] border border-pink-500/20 bg-pink-500/10 backdrop-blur-xl p-12 hover:-translate-y-2 hover:border-pink-400 transition duration-300 shadow-[0_0_50px_rgba(255,0,150,0.15)]"
          >

            <div className="text-6xl mb-6">
              🎤
            </div>

            <h2 className="text-4xl font-black text-pink-400 leading-tight">

              TikTok Stars
              <br />
              Kids Edition

            </h2>

            <p className="mt-6 text-gray-300 text-lg">

              Entries Now Open.

            </p>

          </Link>

        </div>

        {/* POSTER */}
        <div className="mt-20">

          <img
            src="/poster.jpg"
            alt="TikTok Stars Poster"
            className="w-full max-w-2xl mx-auto rounded-[40px] border border-white/10 shadow-[0_0_80px_rgba(255,0,150,0.3)]"
          />

        </div>

      </div>

    </main>
  );
}
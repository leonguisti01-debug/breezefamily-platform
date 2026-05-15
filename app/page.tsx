import Link from "next/link";
import TopButtons from "./components/TopButtons";

export default function HomePage() {

  return (
    <main className="min-h-screen text-white overflow-hidden relative">

      <TopButtons />

      {/* FIXED BACKGROUND IMAGE */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background.jpg')",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="fixed inset-0 -z-10 bg-black/70" />

      {/* NEON GLOW */}
      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-pink-500/20 blur-[160px] rounded-full"></div>

        <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[160px] rounded-full"></div>

        <div className="absolute bottom-0 left-[20%] w-[600px] h-[600px] bg-yellow-500/10 blur-[180px] rounded-full"></div>

      </div>

      {/* CONTENT */}
      <div className="w-full max-w-6xl mx-auto text-center px-6 py-32">

        {/* BUTTONS */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

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
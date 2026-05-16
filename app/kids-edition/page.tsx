import TopButtons from "@/components/TopButtons";
import Link from "next/link";

export default function KidsEditionPage() {
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

          <div className="max-w-6xl mx-auto text-center">

            {/* TAG */}
            <div className="inline-block px-5 py-2 rounded-full border border-pink-400/40 bg-black/30 backdrop-blur-md text-sm uppercase tracking-[4px] text-pink-300 mb-8">
              Kids Edition
            </div>

            {/* TITLE */}
            <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.92]">

              SHOW YOUR

              <br />

              <span className="bg-gradient-to-r from-cyan-300 via-white to-pink-400 text-transparent bg-clip-text">
                TALENT
              </span>

            </h1>

            {/* SUBTITLE */}
            <p className="mt-8 text-2xl md:text-3xl font-black uppercase text-white">
              Sing • Dance • Perform • Shine
            </p>

            {/* DESCRIPTION */}
            <p className="mt-6 text-lg md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              Enter South Africa’s most exciting youth talent competition and stand a chance to become the next TikTok Star.
            </p>

            {/* BUTTON */}
            <div className="mt-14">

              <Link
                href="/kids-edition/register"
                className="inline-block px-12 py-5 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-black text-lg md:text-2xl shadow-[0_0_50px_rgba(255,0,140,0.5)] hover:scale-105 transition duration-300"
              >
                ENTER HERE
              </Link>

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
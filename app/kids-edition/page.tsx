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

            {/* FEATURES */}
            <div className="mt-20 grid md:grid-cols-3 gap-6">

              <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

                <div className="text-5xl mb-5">🎤</div>

                <h3 className="text-2xl font-black uppercase">
                  Singing
                </h3>

                <p className="mt-4 text-white/70">
                  Show the world your voice and perform your favorite songs.
                </p>

              </div>

              <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

                <div className="text-5xl mb-5">💃</div>

                <h3 className="text-2xl font-black uppercase">
                  Dancing
                </h3>

                <p className="mt-4 text-white/70">
                  Bring energy, rhythm and movement to the stage.
                </p>

              </div>

              <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

                <div className="text-5xl mb-5">🌟</div>

                <h3 className="text-2xl font-black uppercase">
                  Talent
                </h3>

                <p className="mt-4 text-white/70">
                  Comedy, instruments, magic and unique performances are welcome.
                </p>

              </div>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}
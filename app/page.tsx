export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* Background Glow */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-lime-400/20 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-400/10 blur-[140px] rounded-full"></div>
      </div>

      {/* NAVBAR */}
      <nav className="w-full px-6 lg:px-16 py-6 border-b border-white/10 backdrop-blur-md fixed top-0 left-0 z-50 bg-black/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <h1 className="text-3xl font-black tracking-wider text-lime-400 drop-shadow-[0_0_20px_rgba(185,255,0,0.6)]">
            BREEZE FAMILY
          </h1>

          <div className="hidden md:flex items-center gap-8 font-semibold">
            <a href="#" className="hover:text-lime-400 transition">HOME</a>
            <a href="#merch" className="hover:text-lime-400 transition">MERCH</a>
            <a href="/kids-edition" className="hover:text-lime-400 transition">
              KIDS EDITION
            </a>
            <a href="#" className="hover:text-lime-400 transition">CONTACT</a>
          </div>

        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center px-6 lg:px-16 pt-40">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <div>

            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-lime-400/20 bg-white/5 backdrop-blur-md mb-8">
              <div className="w-3 h-3 rounded-full bg-lime-400 animate-pulse"></div>
              <span className="text-sm tracking-widest text-lime-300 font-semibold">
                EMPOWERING TALENT
              </span>
            </div>

            <h2 className="text-6xl md:text-8xl font-black leading-[0.9] uppercase">
              WELCOME TO
              <br />
              <span className="text-lime-400 drop-shadow-[0_0_30px_rgba(185,255,0,0.6)]">
                BREEZE
              </span>
              <br />
              FAMILY
            </h2>

            <p className="mt-8 text-gray-300 text-xl leading-9 max-w-xl">
              Creating platforms where stars shine and destinies are changed.
              Entertainment. Talent. Culture. Movement.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <a
                href="/kids-edition"
                className="px-8 py-5 rounded-2xl bg-lime-400 text-black font-black text-lg hover:scale-105 transition shadow-[0_0_40px_rgba(185,255,0,0.4)]"
              >
                ENTER NOW
              </a>

              <a
                href="#merch"
                className="px-8 py-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md font-bold hover:border-lime-400 transition"
              >
                VIEW MERCH
              </a>

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative">

            <div className="absolute inset-0 bg-lime-400/20 blur-[120px] rounded-full"></div>

            <div className="relative rounded-[40px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl p-10">

              <div className="aspect-square rounded-[30px] bg-gradient-to-br from-lime-400/20 to-green-500/10 flex items-center justify-center">

                <h3 className="text-5xl font-black text-center text-lime-400 leading-tight drop-shadow-[0_0_20px_rgba(185,255,0,0.6)]">
                  BREEZE
                  <br />
                  FAMILY
                </h3>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* COMPETITIONS */}
      <section className="px-6 lg:px-16 py-24">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">
            <h3 className="text-5xl font-black text-lime-400">
              OUR COMPETITIONS
            </h3>

            <p className="mt-4 text-gray-400 text-lg">
              Platforms where stars are born.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">

            {/* TIKTOK STARS */}
            <div className="rounded-[35px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl hover:-translate-y-2 transition duration-300">

              <div className="h-[320px] bg-gradient-to-br from-blue-500/20 to-black flex flex-col items-center justify-center p-10">

                <h4 className="text-5xl font-black text-blue-400 text-center">
                  TIKTOK
                  <br />
                  STARS
                </h4>

                <p className="mt-6 text-gray-300 text-center">
                  THE ULTIMATE TALENT SEARCH
                </p>

                <button className="mt-8 px-7 py-4 rounded-2xl bg-blue-500 text-white font-black shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                  COMING SOON
                </button>

              </div>

            </div>

            {/* KIDS EDITION */}
            <div className="rounded-[35px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl hover:-translate-y-2 transition duration-300">

              <div className="h-[320px] bg-gradient-to-br from-pink-500/20 to-black flex flex-col items-center justify-center p-10">

                <h4 className="text-5xl font-black text-pink-400 text-center">
                  TIKTOK
                  <br />
                  STARS
                  <br />
                  KIDS EDITION
                </h4>

                <p className="mt-6 text-gray-300 text-center">
                  AGES 2 – 17
                </p>

                <a
                  href="/kids-edition"
                  className="mt-8 px-7 py-4 rounded-2xl bg-pink-500 text-white font-black shadow-[0_0_30px_rgba(236,72,153,0.4)]"
                >
                  ENTER NOW
                </a>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* MERCH */}
      <section id="merch" className="px-6 lg:px-16 py-24">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">
            <h3 className="text-5xl font-black text-lime-400">
              OFFICIAL MERCH
            </h3>

            <p className="mt-4 text-gray-400 text-lg">
              Premium drops coming soon.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {['HOODIES', 'CAPS', 'T-SHIRTS'].map((item) => (
              <div
                key={item}
                className="rounded-[30px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
              >

                <div className="h-[260px] bg-gradient-to-br from-lime-400/10 to-black flex items-center justify-center">

                  <h4 className="text-4xl font-black text-lime-400">
                    {item}
                  </h4>

                </div>

                <div className="p-8 text-center">

                  <p className="text-gray-300 text-lg">
                    COMING SOON
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

    </main>
  );
}
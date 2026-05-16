export default function HomePage() {
  return (
    <main
      className="min-h-screen text-white overflow-hidden relative"
      style={{
        background:
          "radial-gradient(circle at top, rgba(50,255,50,0.18), transparent 35%), #050505",
      }}
    >
      {/* GLOW EFFECTS */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-green-500/20 blur-[180px] rounded-full"></div>

      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-lime-400/20 blur-[180px] rounded-full"></div>

      {/* HERO */}
      <section className="relative z-20 px-6 pt-32 md:pt-40 pb-24">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT SIDE */}
          <div>

            {/* SOCIAL ICONS */}
            <div className="flex flex-wrap items-center gap-4 mb-8">

              {/* TIKTOK */}
              <a
                href="https://www.tiktok.com/@itskentbreeze?_r=1&_t=ZS-96PJ9wohRtE"
                target="_blank"
                className="w-14 h-14 rounded-2xl bg-black/30 border border-green-400/20 backdrop-blur-md flex items-center justify-center hover:scale-110 transition duration-300"
              >
                <img
                  src="/tiktok-icon.png"
                  alt="TikTok"
                  className="w-7 h-7 object-contain"
                />
              </a>

              {/* EMAIL */}
              <a
                href="mailto:admin@breezefamily.co.za"
                className="w-14 h-14 rounded-2xl bg-black/30 border border-green-400/20 backdrop-blur-md flex items-center justify-center hover:scale-110 transition duration-300"
              >
                <img
                  src="/email-icon.png"
                  alt="Email"
                  className="w-7 h-7 object-contain"
                />
              </a>

              {/* WHATSAPP */}
              <a
                href="https://whatsapp.com/channel/0029VbD9d4P9sBI9ue1ekp2z"
                target="_blank"
                className="w-14 h-14 rounded-2xl bg-black/30 border border-green-400/20 backdrop-blur-md flex items-center justify-center hover:scale-110 transition duration-300"
              >
                <img
                  src="/whatsapp-icon.png"
                  alt="WhatsApp"
                  className="w-7 h-7 object-contain"
                />
              </a>

            </div>

            {/* WELCOME */}
            <div className="inline-block px-5 py-2 rounded-full border border-green-400/30 bg-green-500/10 backdrop-blur-md text-sm uppercase tracking-[4px] text-green-300 mb-8">
              Welcome To The Future
            </div>

            <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.9]">

              THE NEW

              <br />

              <span className="bg-gradient-to-r from-green-300 via-white to-lime-300 text-transparent bg-clip-text">
                BREEZE ERA
              </span>

            </h2>

            <p className="mt-8 text-2xl md:text-3xl font-black uppercase text-white">
              Entertainment • Talent • Merch • Media
            </p>

            <p className="mt-6 text-lg md:text-2xl text-white/80 leading-relaxed max-w-2xl">
              The Breeze Family is building a next-generation entertainment platform for creators, performers and fans across South Africa.
            </p>

          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex justify-center">

            <div className="absolute inset-0 bg-green-400/20 blur-[120px] rounded-full"></div>

            <img
              src="/breeze-logo.png"
              alt="Breeze Family"
              className="relative z-10 w-full max-w-[700px] drop-shadow-[0_0_60px_rgba(0,255,100,0.45)]"
            />

          </div>

        </div>

      </section>

      {/* SPOTIFY PLAYLIST */}
      <section className="relative z-20 px-6 pb-24">

        <div className="max-w-5xl mx-auto">

          <div className="rounded-3xl border border-green-400/20 bg-black/30 backdrop-blur-xl p-6 md:p-10">

            <div className="text-center mb-8">

              <p className="uppercase tracking-[4px] text-green-300 text-sm">
                Breeze Vibes
              </p>

              <h2 className="mt-4 text-4xl md:text-6xl font-black uppercase">
                Official Playlist
              </h2>

            </div>

            <iframe
              style={{ borderRadius: "24px" }}
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>

          </div>

        </div>

      </section>

      {/* MERCH SECTION */}
      <section className="relative z-20 px-6 pb-24">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-16">

            <p className="uppercase tracking-[4px] text-green-300 text-sm">
              Limited Drop
            </p>

            <h2 className="mt-4 text-5xl md:text-7xl font-black uppercase leading-[0.95]">

              Official

              <br />

              <span className="bg-gradient-to-r from-green-300 via-white to-lime-300 text-transparent bg-clip-text">
                Breeze Merch
              </span>

            </h2>

            <p className="mt-6 text-lg md:text-2xl text-white/70 max-w-3xl mx-auto">
              Premium streetwear inspired by entertainment, creators, music and fan culture.
            </p>

          </div>

          {/* MERCH GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

            {[
              {
                title: "Breeze Hoodie",
                image: "/merch-hoodie.jpg",
                desc:
                  "Premium oversized hoodie with iconic neon Breeze branding.",
              },

              {
                title: "Oversized Tees",
                image: "/merch-shirt.jpg",
                desc:
                  "Black and white Breeze Family streetwear collection.",
              },

              {
                title: "Thermal Flask",
                image: "/merch-bottle.png",
                desc:
                  "Premium insulated Breeze Family thermal flask.",
              },

              {
                title: "Tote Bag",
                image: "/merch-bag.png",
                desc:
                  "Minimal premium tote bag with neon Breeze artwork.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group rounded-3xl overflow-hidden border border-green-400/20 bg-black/40 backdrop-blur-xl hover:border-green-300/40 transition duration-500 hover:scale-[1.02]"
              >

                <div className="relative overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[420px] object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                  <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-green-400 text-black font-black uppercase text-xs tracking-[2px]">
                    Coming Soon
                  </div>

                </div>

                <div className="p-6">

                  <h3 className="text-2xl font-black uppercase">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-white/60">
                    {item.desc}
                  </p>

                  <button className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-green-400 to-lime-300 text-black font-black uppercase hover:scale-[1.02] transition duration-300 shadow-[0_0_40px_rgba(0,255,120,0.25)]">
                    Notify Me
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="relative z-20 border-t border-green-400/10 bg-black/30 backdrop-blur-md">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-white/60 text-sm uppercase tracking-[3px]">
            Powered by The Breeze Team
          </p>

          <p className="text-white/40 text-sm">
            © Copyright 2026
          </p>

        </div>

      </footer>

    </main>
  );
}
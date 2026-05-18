export default function HomePage() {
  return (
    <main className="min-h-screen text-white overflow-hidden relative bg-black">
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
                className="w-14 h-14 rounded-2xl bg-black/30 border border-green-400/20 backdrop-blur-md flex items-center justify-center transition duration-300"
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
                className="w-14 h-14 rounded-2xl bg-black/30 border border-green-400/20 backdrop-blur-md flex items-center justify-center transition duration-300"
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
                className="w-14 h-14 rounded-2xl bg-black/30 border border-green-400/20 backdrop-blur-md flex items-center justify-center transition duration-300"
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

            <h2 className="text-5xl md:text-8xl font-black uppercase leading-[0.9]">

              THE NEW

              <br />

              <span className="bg-gradient-to-r from-green-300 via-white to-lime-300 text-transparent bg-clip-text">
                BREEZE ERA
              </span>

            </h2>

            <p className="mt-8 text-xl md:text-3xl font-black uppercase text-white">
              Entertainment • Talent • Media
            </p>

            <p className="mt-6 text-base md:text-2xl text-white/80 leading-relaxed max-w-2xl">
              The Breeze Family is building a next-generation entertainment platform for creators, performers and fans across South Africa.
            </p>

          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex justify-center">

            <div className="absolute inset-0 bg-green-400/20 blur-[80px] md:blur-[120px] rounded-full"></div>

            <img
              src="/breeze-logo.png"
              alt="Breeze Family"
              className="relative z-10 w-full max-w-[500px] md:max-w-[700px] drop-shadow-[0_0_40px_rgba(0,255,100,0.35)]"
            />

          </div>

        </div>

      </section>

      {/* SPOTIFY PLAYLIST */}
      <section className="relative z-20 px-6 pb-24">

        <div className="max-w-5xl mx-auto">

          <div className="rounded-3xl border border-green-400/20 bg-black/30 backdrop-blur-md p-6 md:p-10">

            <div className="text-center mb-8">

              <p className="uppercase tracking-[4px] text-green-300 text-sm">
                Breeze Vibes
              </p>

              <h2 className="mt-4 text-3xl md:text-6xl font-black uppercase">
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
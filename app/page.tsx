import TopButtons from "./components/TopButtons";

export default function HomePage() {
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
      <div className="min-h-screen bg-black/60">

        {/* TOP NAVIGATION */}
        <TopButtons />

        {/* HERO */}
        <section className="relative z-20 px-6 pt-32 pb-24">

          <div className="max-w-6xl mx-auto">

            <div className="max-w-4xl">

              <div className="inline-block px-5 py-2 rounded-full border border-green-400/40 bg-black/30 backdrop-blur-md text-xs md:text-sm uppercase tracking-[4px] text-green-300 mb-8">
                Breeze Family
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase leading-[0.92]">

                ENTERTAINMENT • TALENT •

                <br />

                MERCH • MEDIA

              </h1>

              <p className="mt-10 text-xl md:text-3xl text-white/80 leading-relaxed max-w-4xl">
                The Breeze Family is building a next-generation entertainment
                platform for creators, performers and fans across South Africa.
              </p>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}
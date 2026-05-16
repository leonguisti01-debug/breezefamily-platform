export default function FanFavoriteJudgePage() {
  return (
    <main className="min-h-screen bg-black text-white">

      <div className="min-h-screen bg-black/45">

        <section className="relative z-20 px-6 pt-20 md:pt-32 pb-24">

          <div className="max-w-7xl mx-auto text-center">

            <div className="inline-block px-5 py-2 rounded-full border border-green-400/40 bg-black/30 backdrop-blur-md text-sm uppercase tracking-[4px] text-green-300 mb-8">
              Favorite Judge Vote
            </div>

            <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.92]">

              VOTE FOR

              <br />

              <span className="bg-gradient-to-r from-green-300 via-white to-lime-300 text-transparent bg-clip-text">
                YOUR JUDGE
              </span>

            </h1>

          </div>

        </section>

      </div>

    </main>
  );
}
export default function FanFavoriteJudgePage() {
  const judges = [
    {
      name: "Judge 1",
      video: "/judge1.mp4",
      role: "Music Producer",
    },
    {
      name: "Judge 2",
      video: "/judge2.mp4",
      role: "Talent Coach",
    },
    {
      name: "Judge 3",
      video: "/judge3.mp4",
      role: "Creative Director",
    },
    {
      name: "Judge 4",
      video: "/judge4.mp4",
      role: "Dance Specialist",
    },
  ];

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
        <section className="relative z-20 px-6 pt-20 md:pt-32 pb-16">

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

            <p className="mt-8 text-2xl md:text-3xl font-black uppercase text-white">
              Choose The Judge You Love Most
            </p>

            <p className="mt-6 text-lg md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              Support your favorite judge and help crown the ultimate fan favorite.
            </p>

          </div>

        </section>

        {/* JUDGES */}
        <section className="relative z-20 px-6 pb-24">

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">

            {judges.map((judge, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:scale-[1.02] transition duration-300"
              >

                {/* VIDEO */}
                <div className="w-full overflow-hidden rounded-3xl">

                  <video
                    src={judge.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    className="w-full aspect-video object-cover rounded-3xl"
                  />

                </div>

                {/* NAME */}
                <h2 className="mt-6 text-3xl font-black uppercase">
                  {judge.name}
                </h2>

                {/* ROLE */}
                <p className="mt-3 text-white/70 text-lg">
                  {judge.role}
                </p>

                {/* BUTTON */}
                <button className="mt-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-green-400 to-lime-300 text-black font-black text-lg shadow-[0_0_50px_rgba(0,255,120,0.4)] hover:scale-105 transition duration-300">
                  Vote Now
                </button>

              </div>
            ))}

          </div>

        </section>

      </div>

    </main>
  );
}
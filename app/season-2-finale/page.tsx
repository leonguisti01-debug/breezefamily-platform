export default function Season2FinalePage() {
  const contestants = [
    {
      rank: 1,
      name: "Contestant 1",
      image: "/contestant1.jpg",
      talent: "Vocalist",
      votes: 12842,
    },
    {
      rank: 2,
      name: "Contestant 2",
      image: "/contestant2.jpg",
      talent: "Dancer",
      votes: 11765,
    },
    {
      rank: 3,
      name: "Contestant 3",
      image: "/contestant3.jpg",
      talent: "Performer",
      votes: 10344,
    },
    {
      rank: 4,
      name: "Contestant 4",
      image: "/contestant4.jpg",
      talent: "Singer",
      votes: 9865,
    },
    {
      rank: 5,
      name: "Contestant 5",
      image: "/contestant5.jpg",
      talent: "Comedian",
      votes: 8754,
    },
    {
      rank: 6,
      name: "Contestant 6",
      image: "/contestant6.jpg",
      talent: "Musician",
      votes: 8421,
    },
    {
      rank: 7,
      name: "Contestant 7",
      image: "/contestant7.jpg",
      talent: "Dancer",
      votes: 7911,
    },
    {
      rank: 8,
      name: "Contestant 8",
      image: "/contestant8.jpg",
      talent: "Singer",
      votes: 7034,
    },
    {
      rank: 9,
      name: "Contestant 9",
      image: "/contestant9.jpg",
      talent: "Performer",
      votes: 6510,
    },
    {
      rank: 10,
      name: "Contestant 10",
      image: "/contestant10.jpg",
      talent: "Entertainer",
      votes: 6022,
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

            <div className="inline-block px-5 py-2 rounded-full border border-cyan-400/40 bg-black/30 backdrop-blur-md text-sm uppercase tracking-[4px] text-cyan-300 mb-8">
              Season 2 Finale
            </div>

            <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.92]">

              LIVE

              <br />

              <span className="bg-gradient-to-r from-cyan-300 via-white to-pink-400 text-transparent bg-clip-text">
                VOTING
              </span>

            </h1>

            <p className="mt-8 text-2xl md:text-3xl font-black uppercase text-white">
              Live Top 10 Rankings
            </p>

            <p className="mt-6 text-lg md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              Vote for your favorite contestant and watch the leaderboard change live.
            </p>

          </div>

        </section>

        {/* TOP 10 */}
        <section className="relative z-20 px-6 pb-24">

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

            {contestants.map((contestant, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center text-center bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:scale-[1.02] transition duration-300"
              >

                {/* RANK */}
                <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 text-black font-black text-sm shadow-[0_0_30px_rgba(0,255,255,0.4)]">
                  #{contestant.rank}
                </div>

                {/* IMAGE */}
                <img
                  src={contestant.image}
                  alt={contestant.name}
                  className="w-full max-w-[220px] md:max-w-[320px] mx-auto rounded-3xl object-cover"
                />

                {/* NAME */}
                <h2 className="mt-6 text-3xl font-black uppercase">
                  {contestant.name}
                </h2>

                {/* TALENT */}
                <p className="mt-3 text-white/70 text-lg">
                  {contestant.talent}
                </p>

                {/* VOTES */}
                <div className="mt-5 px-6 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/20">

                  <p className="text-cyan-300 uppercase tracking-[3px] text-xs">
                    Live Votes
                  </p>

                  <p className="text-3xl font-black mt-2">
                    {contestant.votes.toLocaleString()}
                  </p>

                </div>

                {/* BUTTON */}
                <button className="mt-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-black text-lg shadow-[0_0_50px_rgba(255,0,140,0.4)] hover:scale-105 transition duration-300">
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
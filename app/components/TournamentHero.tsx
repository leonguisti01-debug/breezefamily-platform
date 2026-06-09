export default function TournamentHero() {
  return (
    <div className="rounded-[32px] border border-[#8DFF00]/30 bg-[#8DFF00]/10 p-8 mb-8">

      <p className="uppercase tracking-widest text-[#8DFF00] text-sm font-bold">
        Featured Tournament
      </p>

      <h2 className="text-4xl font-black mt-2">
        BREEZE FAMILY COD CHAMPIONSHIP
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mt-6">

        <div>
          <p className="text-white/60 text-sm">
            Prize Pool
          </p>

          <h3 className="text-4xl font-black">
            R50 000
          </h3>
        </div>

        <div>
          <p className="text-white/60 text-sm">
            Teams Registered
          </p>

          <h3 className="text-4xl font-black">
            24 / 32
          </h3>
        </div>

      </div>

      <button
        className="
          mt-8
          px-6
          py-3
          rounded-full
          bg-[#8DFF00]
          text-black
          font-black
        "
      >
        VIEW TOURNAMENT
      </button>

    </div>
  );
}
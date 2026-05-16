"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "YOUR_ANON_KEY"
);

export default function Season2FinalePage() {
  const [contestants, setContestants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* LOAD CONTESTANTS */
  useEffect(() => {
    fetchContestants();
  }, []);

  const fetchContestants = async () => {
    const { data, error } = await supabase
      .from("contestants")
      .select("*")
      .in("status", ["approved", "through"])
      .order("votes", { ascending: false });

    if (!error && data) {
      setContestants(data);
    }

    setLoading(false);
  };

  /* VOTE */
  const voteForContestant = async (
    contestantId: number,
    currentVotes: number
  ) => {
    const { error } = await supabase
      .from("contestants")
      .update({
        votes: currentVotes + 1,
      })
      .eq("id", contestantId);

    if (!error) {
      fetchContestants();
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-black uppercase animate-pulse">
          Loading Contestants...
        </h1>
      </main>
    );
  }

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
        <section className="relative z-20 px-4 md:px-6 pt-20 md:pt-32 pb-16">

          <div className="max-w-7xl mx-auto text-center">

            <div className="inline-block px-5 py-2 rounded-full border border-cyan-400/40 bg-black/30 backdrop-blur-md text-xs md:text-sm uppercase tracking-[4px] text-cyan-300 mb-8">
              Season 2 Finale
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black uppercase leading-[0.92]">

              LIVE

              <br />

              <span className="bg-gradient-to-r from-cyan-300 via-white to-pink-400 text-transparent bg-clip-text">
                VOTING
              </span>

            </h1>

            <p className="mt-6 md:mt-8 text-xl md:text-3xl font-black uppercase text-white">
              Live Contestant Rankings
            </p>

            <p className="mt-5 text-base md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto px-4">
              Vote for your favorite contestant and watch the leaderboard change live.
            </p>

          </div>

        </section>

        {/* CONTESTANTS */}
        <section className="relative z-20 px-4 md:px-6 pb-24">

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">

            {contestants.map((contestant, index) => (
              <div
                key={contestant.id}
                className="relative flex flex-col items-center text-center bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-6 hover:scale-[1.02] transition duration-300"
              >

                {/* RANK */}
                <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 text-black font-black text-sm shadow-[0_0_30px_rgba(0,255,255,0.4)]">
                  #{index + 1}
                </div>

                {/* IMAGE */}
                <div className="w-full flex justify-center">

                  <img
                    src={
                      contestant.photo_url ||
                      "/contestant-placeholder.jpg"
                    }
                    alt={contestant.full_name}
                    className="w-full max-w-[180px] sm:max-w-[220px] md:max-w-[300px] rounded-3xl object-cover"
                  />

                </div>

                {/* NAME */}
                <h2 className="mt-5 text-2xl md:text-3xl font-black uppercase">
                  {contestant.full_name}
                </h2>

                {/* TALENT */}
                <p className="mt-2 text-white/70 text-base md:text-lg">
                  {contestant.talent_category}
                </p>

                {/* TIKTOK */}
                <p className="mt-2 text-cyan-300 text-sm">
                  @{contestant.tiktok_username}
                </p>

                {/* LIVE VOTES */}
                <div className="mt-5 px-6 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/20">

                  <p className="text-cyan-300 uppercase tracking-[3px] text-xs">
                    Live Votes
                  </p>

                  <p className="text-3xl font-black mt-2">
                    {contestant.votes || 0}
                  </p>

                </div>

                {/* BUTTON */}
                <button
                  onClick={() =>
                    voteForContestant(
                      contestant.id,
                      contestant.votes || 0
                    )
                  }
                  className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-black text-lg shadow-[0_0_50px_rgba(255,0,140,0.4)] hover:scale-[1.02] transition duration-300"
                >
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
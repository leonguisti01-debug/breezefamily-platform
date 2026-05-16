"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function Season2FinalePage() {
  const [contestants, setContestants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchContestants();
  }, []);

  const fetchContestants = async () => {
    const { data } = await supabase
      .from("season2_finalists")
      .select("*")
      .eq("eliminated", false)
      .order("votes", { ascending: false });

    if (data) {
      setContestants(data);
    }

    setLoading(false);
  };

  const voteForContestant = async (
    contestantId: number,
    currentVotes: number
  ) => {
    const hasVoted =
      localStorage.getItem("season2_voted");

    if (hasVoted) {
      setMessage(
        "You have already voted in the Season 2 Finale."
      );

      setTimeout(() => {
        setMessage("");
      }, 4000);

      return;
    }

    await supabase
      .from("season2_finalists")
      .update({
        votes: currentVotes + 1,
      })
      .eq("id", contestantId);

    localStorage.setItem(
      "season2_voted",
      "true"
    );

    setMessage(
      "Your vote has been successfully submitted!"
    );

    setTimeout(() => {
      setMessage("");
    }, 4000);

    fetchContestants();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-black uppercase animate-pulse">
          Loading Top 10...
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
      <div className="min-h-screen bg-black/50">

        {/* MESSAGE */}
        {message && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] px-8 py-4 rounded-2xl bg-black/80 border border-cyan-400/30 backdrop-blur-xl text-white font-bold">
            {message}
          </div>
        )}

        {/* HERO */}
        <section className="relative z-20 px-4 md:px-6 pt-20 md:pt-32 pb-16">

          <div className="max-w-7xl mx-auto text-center">

            <div className="inline-block px-5 py-2 rounded-full border border-cyan-400/40 bg-black/30 backdrop-blur-md text-xs md:text-sm uppercase tracking-[4px] text-cyan-300 mb-8">
              Season 2 Finale
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black uppercase leading-[0.92]">

              TOP 10

              <br />

              <span className="bg-gradient-to-r from-cyan-300 via-white to-pink-400 text-transparent bg-clip-text">
                LIVE VOTING
              </span>

            </h1>

            <p className="mt-6 md:mt-8 text-xl md:text-3xl font-black uppercase text-white">
              Public Leaderboard
            </p>

          </div>

        </section>

        {/* LEADERBOARD */}
        <section className="relative z-20 px-4 md:px-6 pb-16">

          <div className="max-w-5xl mx-auto bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10">

            <h2 className="text-3xl md:text-5xl font-black uppercase text-center">
              Live Leaderboard
            </h2>

            <div className="mt-10 space-y-4">

              {contestants.map((contestant, index) => (
                <div
                  key={contestant.id}
                  className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-black/30 border border-white/10"
                >

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 text-black font-black flex items-center justify-center">
                      #{index + 1}
                    </div>

                    <img
                      src={
                        contestant.image_url ||
                        "/contestant-placeholder.jpg"
                      }
                      alt={contestant.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />

                    <div>

                      <h3 className="font-black uppercase text-lg">
                        {contestant.name}
                      </h3>

                      <p className="text-white/60 text-sm uppercase">
                        {contestant.status || "safe"}
                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-white/60 uppercase text-xs tracking-[3px]">
                      Votes
                    </p>

                    <p className="text-2xl font-black">
                      {contestant.votes || 0}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </section>

        {/* TOP 10 CARDS */}
        <section className="relative z-20 px-4 md:px-6 pb-24">

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">

            {contestants.map((contestant, index) => (
              <div
                key={contestant.id}
                className="relative flex flex-col items-center text-center bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-6"
              >

                {/* RANK */}
                <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 text-black font-black text-sm">
                  #{index + 1}
                </div>

                {/* IMAGE */}
                <img
                  src={
                    contestant.image_url ||
                    "/contestant-placeholder.jpg"
                  }
                  alt={contestant.name}
                  className="w-full max-w-[180px] sm:max-w-[220px] md:max-w-[300px] rounded-3xl object-cover"
                />

                {/* NAME */}
                <h2 className="mt-5 text-2xl md:text-3xl font-black uppercase">
                  {contestant.name}
                </h2>

                {/* STATUS */}
                <div className="mt-3 px-5 py-2 rounded-2xl bg-white/10 border border-white/10">

                  <p className="uppercase tracking-[3px] text-xs text-white">
                    {contestant.status || "safe"}
                  </p>

                </div>

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
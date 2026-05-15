"use client";

import { useEffect, useState } from "react";
import TopButtons from "../components/TopButtons";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Season2FinalePage() {

  const [finalists, setFinalists] = useState<any[]>([]);
  const [votes, setVotes] = useState<any>({});
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {

    fetchFinalists();
    fetchVotes();

    const voted = localStorage.getItem("season2-voted");

    if (voted === "true") {
      setHasVoted(true);
    }

  }, []);

  const fetchFinalists = async () => {

    const { data } = await supabase
      .from("season2_finalists")
      .select("*")
      .eq("eliminated", false)
      .order("id");

    if (data) {
      setFinalists(data);
    }

  };

  const fetchVotes = async () => {

    const { data } = await supabase
      .from("season2_votes")
      .select("*");

    if (!data) return;

    const totals: any = {};

    data.forEach((vote) => {

      if (!totals[vote.finalist_id]) {
        totals[vote.finalist_id] = 0;
      }

      totals[vote.finalist_id]++;

    });

    setVotes(totals);

  };

  const voteForFinalist = async (
    id: number
  ) => {

    if (hasVoted) {

      alert("You have already voted.");
      return;

    }

    const { error } = await supabase
      .from("season2_votes")
      .insert([
        {
          finalist_id: id,
        },
      ]);

    if (error) {

      console.log(error);
      alert("Something went wrong.");

    } else {

      localStorage.setItem("season2-voted", "true");

      setHasVoted(true);

      fetchVotes();

      alert("Vote submitted!");

    }
  };

  const leaderboard = finalists
    .map((finalist) => ({
      ...finalist,
      totalVotes: votes[finalist.id] || 0,
    }))
    .sort((a, b) => b.totalVotes - a.totalVotes);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden px-6 py-16">

      <TopButtons />

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-500/20 blur-[160px] rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-500/20 blur-[160px] rounded-full"></div>

      </div>

      {/* HEADER */}
      <div className="max-w-6xl mx-auto text-center mb-16 pt-24">

        <h1 className="text-5xl md:text-8xl font-black text-cyan-400">
          SEASON 2 FINALE
        </h1>

      </div>

      {/* LEADERBOARD */}
      <div className="max-w-5xl mx-auto mb-20">

        <div className="rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl p-8">

          <h2 className="text-4xl font-black text-pink-400 mb-8 text-center">
            LIVE LEADERBOARD
          </h2>

          <div className="space-y-4">

            {leaderboard.map((contestant, index) => (

              <div
                key={contestant.id}
                className="flex items-center justify-between rounded-2xl bg-black/40 border border-white/10 px-6 py-5"
              >

                <div className="flex items-center gap-5">

                  <div className="text-3xl font-black text-cyan-400 w-[60px]">
                    #{index + 1}
                  </div>

                  <h3 className="text-xl font-black text-white">
                    {contestant.name}
                  </h3>

                </div>

                <div className="text-2xl font-black text-pink-400">
                  {contestant.totalVotes} Votes
                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* FINALISTS */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">

        {finalists.map((finalist) => (

          <div
            key={finalist.id}
            className="rounded-[35px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
          >

            {/* IMAGE */}
            <div className="h-[320px] overflow-hidden">

              <img
                src={finalist.image_url}
                alt={finalist.name}
                className="w-full h-full object-cover"
              />

            </div>

            {/* INFO */}
            <div className="p-6 text-center">

              <h2 className="text-2xl font-black text-white">
                {finalist.name}
              </h2>

              <p className="mt-3 text-cyan-400 font-bold">
                Votes: {votes[finalist.id] || 0}
              </p>

              <button
                onClick={() =>
                  voteForFinalist(finalist.id)
                }
                disabled={hasVoted}
                className={`mt-6 w-full px-5 py-4 rounded-2xl font-black transition ${
                  hasVoted
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-pink-500 hover:bg-pink-400"
                }`}
              >

                {hasVoted ? "VOTED" : "VOTE NOW"}

              </button>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}
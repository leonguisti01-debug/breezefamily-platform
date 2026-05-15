"use client";

import { useEffect, useState } from "react";
import TopButtons from "../components/TopButtons";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function FanFavoriteJudgePage() {

  const [judges, setJudges] = useState<any[]>([]);
  const [votes, setVotes] = useState<any>({});
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {

    fetchJudges();
    fetchVotes();

    const voted = localStorage.getItem("judge-voted");

    if (voted === "true") {
      setHasVoted(true);
    }

  }, []);

  const fetchJudges = async () => {

    const { data } = await supabase
      .from("fan_favorite_judges")
      .select("*")
      .eq("eliminated", false)
      .order("name", { ascending: true });

    if (data) {
      setJudges(data);
    }

  };

  const fetchVotes = async () => {

    const { data } = await supabase
      .from("fan_favorite_votes")
      .select("*");

    if (!data) return;

    const totals: any = {};

    data.forEach((vote) => {

      if (!totals[vote.judge_id]) {
        totals[vote.judge_id] = 0;
      }

      totals[vote.judge_id]++;

    });

    setVotes(totals);

  };

  const voteForJudge = async (
    id: number
  ) => {

    if (hasVoted) {

      alert("You have already voted.");
      return;

    }

    const { error } = await supabase
      .from("fan_favorite_votes")
      .insert([
        {
          judge_id: id,
        },
      ]);

    if (error) {

      console.log(error);
      alert("Something went wrong.");

    } else {

      localStorage.setItem("judge-voted", "true");

      setHasVoted(true);

      fetchVotes();

      alert("Vote submitted!");

    }
  };

  const leaderboard = judges
    .map((judge) => ({
      ...judge,
      totalVotes: votes[judge.id] || 0,
    }))
    .sort((a, b) => b.totalVotes - a.totalVotes);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden px-6 py-16">

      <TopButtons />

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-yellow-500/20 blur-[160px] rounded-full"></div>

      </div>

      {/* HEADER */}
      <div className="max-w-6xl mx-auto text-center mb-16 pt-24">

        <h1 className="text-5xl md:text-8xl font-black text-yellow-400">
          FAN FAVORITE JUDGE
        </h1>

      </div>

      {/* LEADERBOARD */}
      <div className="max-w-5xl mx-auto mb-20">

        <div className="rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl p-8">

          <h2 className="text-4xl font-black text-yellow-400 mb-8 text-center">
            LIVE LEADERBOARD
          </h2>

          <div className="space-y-4">

            {leaderboard.map((judge, index) => (

              <div
                key={judge.id}
                className="flex items-center justify-between rounded-2xl bg-black/40 border border-white/10 px-6 py-5"
              >

                <div className="flex items-center gap-5">

                  <div className="text-3xl font-black text-yellow-400 w-[60px]">
                    #{index + 1}
                  </div>

                  <h3 className="text-xl font-black text-white">
                    {judge.name}
                  </h3>

                </div>

                <div className="text-2xl font-black text-yellow-400">
                  {judge.totalVotes} Votes
                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* JUDGES */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-10">

        {judges.map((judge) => (

          <div
            key={judge.id}
            className="rounded-[35px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
          >

            {/* VIDEO */}
            <div className="aspect-video overflow-hidden bg-black">

              {judge.video_url ? (

                <video
                  src={judge.video_url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-contain bg-black"
                />

              ) : (

                <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold">
                  NO VIDEO
                </div>

              )}

            </div>

            {/* INFO */}
            <div className="p-6 text-center">

              <h2 className="text-2xl font-black text-white">
                {judge.name}
              </h2>

              <p className="mt-3 text-yellow-400 font-bold">
                Votes: {votes[judge.id] || 0}
              </p>

              <button
                onClick={() =>
                  voteForJudge(judge.id)
                }
                disabled={hasVoted}
                className={`mt-6 w-full px-5 py-4 rounded-2xl font-black transition ${
                  hasVoted
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-400 text-black"
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
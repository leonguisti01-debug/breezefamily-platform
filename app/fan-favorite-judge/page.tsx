"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function FanFavoriteJudgePage() {
  const [judges, setJudges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchJudges();
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

    setLoading(false);
  };

  const voteForJudge = async (
    judgeId: number,
    currentVotes: number
  ) => {
    const hasVoted =
      localStorage.getItem("judge_voted");

    if (hasVoted) {
      setMessage(
        "You have already voted for your favorite judge."
      );

      setTimeout(() => {
        setMessage("");
      }, 4000);

      return;
    }

    await supabase
      .from("fan_favorite_judges")
      .update({
        votes: currentVotes + 1,
      })
      .eq("id", judgeId);

    await supabase
      .from("judge_votes")
      .insert([
        {
          judge_id: judgeId,
          ip_address: "browser_vote",
        },
      ]);

    localStorage.setItem(
      "judge_voted",
      "true"
    );

    setMessage(
      "Your judge vote has been submitted!"
    );

    setTimeout(() => {
      setMessage("");
    }, 4000);

    fetchJudges();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-black uppercase animate-pulse">
          Loading Judges...
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
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] px-8 py-4 rounded-2xl bg-black/80 border border-pink-400/30 backdrop-blur-xl text-white font-bold">
            {message}
          </div>
        )}

        {/* HERO */}
        <section className="relative z-20 px-4 md:px-6 pt-20 md:pt-32 pb-16">

          <div className="max-w-7xl mx-auto text-center">

            <div className="inline-block px-5 py-2 rounded-full border border-pink-400/40 bg-black/30 backdrop-blur-md text-xs md:text-sm uppercase tracking-[4px] text-pink-300 mb-8">
              Fan Favorite Judge
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black uppercase leading-[0.92]">

              FAVORITE

              <br />

              <span className="bg-gradient-to-r from-pink-300 via-white to-cyan-300 text-transparent bg-clip-text">
                JUDGE
              </span>

            </h1>

            <p className="mt-6 md:mt-8 text-xl md:text-3xl font-black uppercase text-white">
              Public Voting
            </p>

          </div>

        </section>

        {/* LEADERBOARD */}
        <section className="relative z-20 px-4 md:px-6 pb-16">

          <div className="max-w-5xl mx-auto bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10">

            <h2 className="text-3xl md:text-5xl font-black uppercase text-center">
              Judge Leaderboard
            </h2>

            <div className="mt-10 space-y-4">

              {[...judges]
                .sort((a, b) => (b.votes || 0) - (a.votes || 0))
                .map((judge, index) => (
                  <div
                    key={judge.id}
                    className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-black/30 border border-white/10"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-cyan-400 text-black font-black flex items-center justify-center">
                        #{index + 1}
                      </div>

                      <div>

                        <h3 className="font-black uppercase text-lg">
                          {judge.name}
                        </h3>

                      </div>

                    </div>

                    <div className="text-right">

                      <p className="text-white/60 uppercase text-xs tracking-[3px]">
                        Votes
                      </p>

                      <p className="text-2xl font-black">
                        {judge.votes || 0}
                      </p>

                    </div>

                  </div>
                ))}

            </div>

          </div>

        </section>

        {/* JUDGES */}
        <section className="relative z-20 px-4 md:px-6 pb-24">

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">

            {judges.map((judge) => (
              <div
                key={judge.id}
                className="flex flex-col items-center text-center bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
              >

                {/* VIDEO */}
                <div className="w-full aspect-[9/16] bg-black">

                  {judge.video_url ? (
                    <video
                      src={judge.video_url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/40">
                      No Video Uploaded
                    </div>
                  )}

                </div>

                {/* CONTENT */}
                <div className="p-6 w-full">

                  <h2 className="text-2xl md:text-3xl font-black uppercase">
                    {judge.name}
                  </h2>

                  {/* VOTES */}
                  <div className="mt-5 px-6 py-3 rounded-2xl bg-pink-500/10 border border-pink-400/20">

                    <p className="text-pink-300 uppercase tracking-[3px] text-xs">
                      Live Votes
                    </p>

                    <p className="text-3xl font-black mt-2">
                      {judge.votes || 0}
                    </p>

                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={() =>
                      voteForJudge(
                        judge.id,
                        judge.votes || 0
                      )
                    }
                    className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-black text-lg shadow-[0_0_50px_rgba(255,0,140,0.4)]"
                  >
                    Vote Judge
                  </button>

                </div>

              </div>
            ))}

          </div>

        </section>

      </div>

    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function FanFavoriteJudgePage() {

  const [judges,
    setJudges] =
    useState<any[]>([]);

  const [hasVoted,
    setHasVoted] =
    useState(false);

  const [votingOpen,
    setVotingOpen] =
    useState(true);

  const [loading,
    setLoading] =
    useState(true);

  /* LOAD */
  useEffect(() => {

    fetchJudges();
    fetchSettings();

    const interval =
      setInterval(() => {
        fetchSettings();
      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  /* SETTINGS */
  const fetchSettings =
    async () => {

      const {
        data,
        error,
      } =
        await supabase
          .from("site_settings")
          .select("*")
          .eq(
            "key",
            "judges_voting_open"
          )
          .single();

      if (error) {
        console.log(error);
        return;
      }

      const rawValue =
        data?.value;

      const isOpen =
        rawValue === true ||
        rawValue === "true" ||
        rawValue === 1 ||
        rawValue === "1";

      setVotingOpen(isOpen);

      const voted =
        localStorage.getItem(
          "judge-voted"
        );

      setHasVoted(
        voted === "true"
      );
    };

  /* FETCH JUDGES */
  const fetchJudges =
    async () => {

      const { data } =
        await supabase
          .from(
            "fan_favorite_judges"
          )
          .select("*")
          .neq(
            "status",
            "eliminated"
          )
          .neq(
            "status",
            "disqualified"
          )
          .order("votes", {
            ascending: false,
          });

      if (data)
        setJudges(data);

      setLoading(false);
    };

  /* VOTE */
  const voteForJudge =
    async (
      judgeId: number
    ) => {

      await fetchSettings();

      if (!votingOpen) {

        alert(
          "Voting is currently closed."
        );

        return;
      }

      if (hasVoted) {

        alert(
          "You have already voted."
        );

        return;
      }

      const judge =
        judges.find(
          (j) =>
            j.id === judgeId
        );

      if (!judge) return;

      const currentVotes =
        judge.votes || 0;

      const { error } =
        await supabase
          .from(
            "fan_favorite_judges"
          )
          .update({
            votes:
              currentVotes + 1,
          })
          .eq(
            "id",
            judgeId
          );

      if (error) {

        console.log(error);

        alert(
          "Vote failed"
        );

        return;
      }

      localStorage.setItem(
        "judge-voted",
        "true"
      );

      setHasVoted(true);

      alert(
        "Vote submitted!"
      );

      fetchJudges();
    };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <h1 className="text-4xl font-black uppercase">
          Loading...
        </h1>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center">

          <p className="uppercase tracking-[4px] text-pink-300 text-sm">
            Breeze Family
          </p>

          <h1 className="mt-4 text-5xl md:text-7xl font-black uppercase">
            Fan Favorite Judge
          </h1>

          {!votingOpen && (
            <div className="mt-8 inline-block px-6 py-4 rounded-2xl bg-red-500 text-white font-black uppercase">
              Voting Closed
            </div>
          )}

        </div>

        {/* LEADERBOARD */}
        <section className="mt-20">

          <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden">

            <div className="grid grid-cols-3 bg-pink-500 text-white font-black uppercase text-sm tracking-[2px]">

              <div className="p-5">
                Rank
              </div>

              <div className="p-5">
                Judge
              </div>

              <div className="p-5 text-right">
                Votes
              </div>

            </div>

            {judges.map(
              (
                judge,
                index
              ) => (
                <div
                  key={judge.id}
                  className="grid grid-cols-3 border-t border-white/10 items-center"
                >

                  <div className="p-5 font-black text-2xl text-pink-300">
                    #{index + 1}
                  </div>

                  <div className="p-5 font-bold uppercase">
                    {judge.name}
                  </div>

                  <div className="p-5 text-right text-2xl font-black">
                    {judge.votes || 0}
                  </div>

                </div>
              )
            )}

          </div>

        </section>

        {/* JUDGE CARDS */}
        <section className="mt-24">

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

            {judges.map(
              (
                judge,
                index
              ) => (
                <div
                  key={judge.id}
                  className="rounded-3xl overflow-hidden bg-white/5 border border-white/10"
                >

                  {/* VIDEO */}
                  <div className="w-full bg-black overflow-hidden">

                    {judge.video_url ? (
                      <video
                        src={
                          judge.video_url
                        }
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                        className="w-full h-auto max-h-[750px] object-contain"
                      />
                    ) : judge.image_url ? (
                      <img
                        src={
                          judge.image_url
                        }
                        alt={
                          judge.name
                        }
                        className="w-full aspect-square object-cover"
                      />
                    ) : (
                      <div className="w-full aspect-square bg-black flex items-center justify-center text-white/30">
                        No Media
                      </div>
                    )}

                  </div>

                  <div className="p-6 text-center">

                    <div className="inline-block px-4 py-2 rounded-full bg-pink-500 text-white font-black uppercase text-sm">
                      #{index + 1}
                    </div>

                    <h2 className="mt-5 text-3xl font-black uppercase">
                      {judge.name}
                    </h2>

                    <div className="mt-5 px-5 py-4 rounded-2xl bg-pink-500/10 border border-pink-400/20">

                      <p className="uppercase tracking-[3px] text-xs text-pink-300">
                        Votes
                      </p>

                      <p className="mt-2 text-4xl font-black">
                        {judge.votes || 0}
                      </p>

                    </div>

                    <button
                      onClick={() =>
                        voteForJudge(
                          judge.id
                        )
                      }
                      disabled={
                        hasVoted ||
                        !votingOpen
                      }
                      className={`mt-8 w-full py-4 rounded-2xl font-black uppercase transition duration-300 ${
                        hasVoted ||
                        !votingOpen
                          ? "bg-white/10 text-white/40"
                          : "bg-pink-500 text-white"
                      }`}
                    >

                      {!votingOpen
                        ? "Voting Closed"
                        : hasVoted
                        ? "Already Voted"
                        : "Vote"}

                    </button>

                  </div>

                </div>
              )
            )}

          </div>

        </section>

      </div>

    </main>
  );
}
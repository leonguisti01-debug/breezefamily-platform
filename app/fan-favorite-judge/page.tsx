"use client";

import { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "YOUR_SUPABASE_ANON_KEY"
);

export default function FanFavoriteJudgePage() {

  const [judges, setJudges] =
    useState<any[]>([]);

  const [hasVoted, setHasVoted] =
    useState(false);

  const [votingOpen, setVotingOpen] =
    useState(true);

  const [loading, setLoading] =
    useState(true);

  /* LOAD */
  useEffect(() => {
    fetchJudges();
    fetchSettings();
  }, []);

  /* FETCH SETTINGS */
  const fetchSettings = async () => {

    const { data } =
      await supabase
        .from("site_settings")
        .select("*");

    if (!data) return;

    const setting =
      data.find(
        (s: any) =>
          s.key ===
          "judges_voting_open"
      );

    const isOpen =
      setting?.value === true ||
      setting?.value === "true";

    setVotingOpen(isOpen);

    /* RESET STORAGE WHEN REOPENED */
    if (isOpen) {

      localStorage.removeItem(
        "judge-voted"
      );

      setHasVoted(false);

    } else {

      const voted =
        localStorage.getItem(
          "judge-voted"
        );

      if (voted === "true") {
        setHasVoted(true);
      }

    }
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
            j.id ===
            judgeId
        );

      if (!judge) return;

      const currentVotes =
        judge.votes || 0;

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

        {/* GRID */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

          {judges.map(
            (judge) => (
              <div
                key={judge.id}
                className="rounded-3xl overflow-hidden bg-white/5 border border-white/10"
              >

                {judge.image_url ? (
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
                    No Photo
                  </div>
                )}

                <div className="p-6 text-center">

                  <h2 className="text-3xl font-black uppercase">
                    {judge.name}
                  </h2>

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

      </div>

    </main>
  );
}
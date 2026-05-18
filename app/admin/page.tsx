"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function AdminPage() {

  /* STATES */
  const [contestants, setContestants] = useState<any[]>([]);
  const [season2Contestants, setSeason2Contestants] =
    useState<any[]>([]);
  const [judges, setJudges] = useState<any[]>([]);

  const [judgesVotingOpen, setJudgesVotingOpen] =
    useState(true);

  const [top10VotingOpen, setTop10VotingOpen] =
    useState(true);

  const [loading, setLoading] =
    useState(true);

  /* LOAD */
  useEffect(() => {
    fetchContestants();
    fetchSeason2Contestants();
    fetchJudges();
    fetchSettings();
  }, []);

  /* SETTINGS */
  const fetchSettings = async () => {

    const { data } = await supabase
      .from("site_settings")
      .select("*");

    if (!data) return;

    const judges =
      data.find(
        (s: any) =>
          s.key ===
          "judges_voting_open"
      );

    const top10 =
      data.find(
        (s: any) =>
          s.key ===
          "top10_voting_open"
      );

    setJudgesVotingOpen(
      judges?.value ?? true
    );

    setTop10VotingOpen(
      top10?.value ?? true
    );
  };

  /* TOGGLE SETTINGS */
  const toggleSetting = async (
    key: string,
    value: boolean
  ) => {

    await supabase
      .from("site_settings")
      .update({
        value: !value,
      })
      .eq("key", key);

    fetchSettings();
  };

  /* KIDS */
  const fetchContestants = async () => {

    const { data } = await supabase
      .from("contestants")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (data)
      setContestants(data);
  };

  /* TOP 10 */
  const fetchSeason2Contestants =
    async () => {

      const { data } = await supabase
        .from("season2_finalists")
        .select("*")
        .order("votes", {
          ascending: false,
        });

      if (data)
        setSeason2Contestants(data);
    };

  /* JUDGES */
  const fetchJudges = async () => {

    const { data } = await supabase
      .from("fan_favorite_judges")
      .select("*")
      .order("votes", {
        ascending: false,
      });

    if (data)
      setJudges(data);

    setLoading(false);
  };

  /* UPDATE KIDS */
  const updateStatus = async (
    id: number,
    status: string
  ) => {

    await supabase
      .from("contestants")
      .update({ status })
      .eq("id", id);

    fetchContestants();
  };

  /* UPDATE TOP 10 */
  const updateFinalistStatus =
    async (
      id: number,
      status: string,
      eliminated: boolean
    ) => {

      await supabase
        .from("season2_finalists")
        .update({
          status,
          eliminated,
        })
        .eq("id", id);

      fetchSeason2Contestants();
    };

  /* UPDATE JUDGES */
  const updateJudgeStatus =
    async (
      id: number,
      status: string,
      eliminated: boolean
    ) => {

      await supabase
        .from("fan_favorite_judges")
        .update({
          status,
          eliminated,
        })
        .eq("id", id);

      fetchJudges();
    };

  /* RESET TOP 10 */
  const resetFinalistVotes =
    async () => {

      const confirmReset =
        window.confirm(
          "Reset ALL Top 10 votes?"
        );

      if (!confirmReset) return;

      await supabase
        .from("season2_finalists")
        .update({
          votes: 0,
        })
        .neq("id", 0);

      alert("Top 10 votes reset.");

      fetchSeason2Contestants();
    };

  /* RESET JUDGES */
  const resetJudgeVotes =
    async () => {

      const confirmReset =
        window.confirm(
          "Reset ALL judge votes?"
        );

      if (!confirmReset) return;

      await supabase
        .from("fan_favorite_judges")
        .update({
          votes: 0,
        })
        .neq("id", 0);

      alert("Judge votes reset.");

      fetchJudges();
    };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <h1 className="text-4xl font-black uppercase">
          Loading Admin...
        </h1>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* HEADER */}
        <div>

          <p className="uppercase tracking-[4px] text-green-300 text-sm">
            Breeze Family
          </p>

          <h1 className="mt-4 text-5xl md:text-7xl font-black uppercase">
            Admin Dashboard
          </h1>

        </div>

        {/* VOTING CONTROLS */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">

          <button
            onClick={() =>
              toggleSetting(
                "judges_voting_open",
                judgesVotingOpen
              )
            }
            className={`py-8 rounded-3xl font-black uppercase text-2xl ${
              judgesVotingOpen
                ? "bg-green-400 text-black"
                : "bg-red-500 text-white"
            }`}
          >

            Judges Voting

            <br />

            <span className="text-lg">

              {judgesVotingOpen
                ? "OPEN"
                : "CLOSED"}

            </span>

          </button>

          <button
            onClick={() =>
              toggleSetting(
                "top10_voting_open",
                top10VotingOpen
              )
            }
            className={`py-8 rounded-3xl font-black uppercase text-2xl ${
              top10VotingOpen
                ? "bg-green-400 text-black"
                : "bg-red-500 text-white"
            }`}
          >

            Top 10 Voting

            <br />

            <span className="text-lg">

              {top10VotingOpen
                ? "OPEN"
                : "CLOSED"}

            </span>

          </button>

        </div>

        {/* TOP 10 */}
        <section className="mt-24">

          <div className="flex justify-between items-center">

            <h2 className="text-4xl font-black uppercase">
              Top 10
            </h2>

            <button
              onClick={resetFinalistVotes}
              className="px-6 py-4 rounded-2xl bg-red-500 text-white font-black uppercase"
            >
              Reset Votes
            </button>

          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {season2Contestants.map(
              (contestant) => (
                <div
                  key={contestant.id}
                  className="rounded-3xl overflow-hidden bg-white/5 border border-white/10"
                >

                  <img
                    src={contestant.image_url}
                    alt={contestant.name}
                    className="w-full aspect-square object-cover"
                  />

                  <div className="p-6">

                    <h3 className="text-3xl font-black uppercase">
                      {contestant.name}
                    </h3>

                    <p className="mt-3 text-green-300 font-bold">
                      Votes:
                      {" "}
                      {contestant.votes || 0}
                    </p>

                    <div className="mt-6 grid gap-3">

                      <button
                        onClick={() =>
                          updateFinalistStatus(
                            contestant.id,
                            "safe",
                            false
                          )
                        }
                        className="py-3 rounded-2xl bg-green-500"
                      >
                        Safe
                      </button>

                      <button
                        onClick={() =>
                          updateFinalistStatus(
                            contestant.id,
                            "eliminated",
                            true
                          )
                        }
                        className="py-3 rounded-2xl bg-red-500"
                      >
                        Eliminated
                      </button>

                      <button
                        onClick={() =>
                          updateFinalistStatus(
                            contestant.id,
                            "re-instated",
                            false
                          )
                        }
                        className="py-3 rounded-2xl bg-cyan-500"
                      >
                        Re-Instated
                      </button>

                      <button
                        onClick={() =>
                          updateFinalistStatus(
                            contestant.id,
                            "disqualified",
                            true
                          )
                        }
                        className="py-3 rounded-2xl bg-pink-500"
                      >
                        Disqualified
                      </button>

                    </div>

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
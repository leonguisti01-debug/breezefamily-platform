"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "YOUR_SUPABASE_ANON_KEY"
);

export default function AdminPage() {

  const [contestants, setContestants] = useState<any[]>([]);
  const [season2Contestants, setSeason2Contestants] =
    useState<any[]>([]);
  const [judges, setJudges] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [judgesVotingOpen, setJudgesVotingOpen] =
    useState(true);

  const [top10VotingOpen, setTop10VotingOpen] =
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

  /* TOGGLE */
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

    if (data) setContestants(data);
  };

  /* FINALISTS */
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

    if (data) setJudges(data);

    setLoading(false);
  };

  /* KIDS STATUS */
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

  /* FINALIST STATUS */
  const updateFinalistStatus = async (
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

  /* JUDGE STATUS */
  const updateJudgeStatus = async (
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

  /* RESET FINALIST VOTES */
  const resetFinalistVotes = async () => {

    const confirmReset =
      window.confirm(
        "Reset ALL finalist votes?"
      );

    if (!confirmReset) return;

    await supabase
      .from("season2_finalists")
      .update({
        votes: 0,
      })
      .neq("id", 0);

    alert("Finalist votes reset.");

    fetchSeason2Contestants();
  };

  /* RESET JUDGE VOTES */
  const resetJudgeVotes = async () => {

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

        <h1 className="text-3xl font-black uppercase">
          Loading Admin...
        </h1>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="px-6 py-20 max-w-7xl mx-auto">

        {/* HEADER */}
        <div>

          <p className="uppercase tracking-[4px] text-green-300 text-sm">
            Breeze Family
          </p>

          <h1 className="mt-3 text-5xl md:text-7xl font-black uppercase">
            Admin Dashboard
          </h1>

        </div>

        {/* VOTING CONTROLS */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">

          {/* JUDGES */}
          <button
            onClick={() =>
              toggleSetting(
                "judges_voting_open",
                judgesVotingOpen
              )
            }
            className={`py-8 rounded-3xl font-black uppercase text-2xl transition duration-300 ${
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

          {/* TOP 10 */}
          <button
            onClick={() =>
              toggleSetting(
                "top10_voting_open",
                top10VotingOpen
              )
            }
            className={`py-8 rounded-3xl font-black uppercase text-2xl transition duration-300 ${
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

        {/* FINALISTS */}
        <section className="mt-20">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <h2 className="text-4xl font-black uppercase">
              Season 2 Top 10
            </h2>

            <button
              onClick={resetFinalistVotes}
              className="px-8 py-4 rounded-2xl bg-red-500/10 border border-red-400/20 text-red-300 font-black"
            >
              RESET FINALIST VOTES
            </button>

          </div>

        </section>

        {/* JUDGES */}
        <section className="mt-24">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <h2 className="text-4xl font-black uppercase">
              Fan Favorite Judges
            </h2>

            <button
              onClick={resetJudgeVotes}
              className="px-8 py-4 rounded-2xl bg-pink-500/10 border border-pink-400/20 text-pink-300 font-black"
            >
              RESET JUDGE VOTES
            </button>

          </div>

        </section>

      </div>

    </main>
  );
}
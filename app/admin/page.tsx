"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function AdminPage() {

  /* AUTH */
  const [authorized,
    setAuthorized] =
    useState(false);

  const [password,
    setPassword] =
    useState("");

  /* DATA */
  const [contestants,
    setContestants] =
    useState<any[]>([]);

  const [season2Contestants,
    setSeason2Contestants] =
    useState<any[]>([]);

  const [judges,
    setJudges] =
    useState<any[]>([]);

  const [hits,
    setHits] =
    useState<any[]>([]);

  const [judgesVotingOpen,
    setJudgesVotingOpen] =
    useState(true);

  const [top10VotingOpen,
    setTop10VotingOpen] =
    useState(true);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    const savedAuth =
      localStorage.getItem(
        "admin-auth"
      );

    if (
      savedAuth === "true"
    ) {

      setAuthorized(true);

    }

    fetchContestants();
    fetchSeason2Contestants();
    fetchJudges();
    fetchSettings();
    fetchHits();

  }, []);

  /* SETTINGS */
  const fetchSettings =
    async () => {

      const { data } =
        await supabase
          .from("site_settings")
          .select("*");

      if (!data) return;

      const judgesSetting =
        data.find(
          (s: any) =>
            s.key ===
            "judges_voting_open"
        );

      const top10Setting =
        data.find(
          (s: any) =>
            s.key ===
            "top10_voting_open"
        );

      setJudgesVotingOpen(
        judgesSetting?.value === true ||
        judgesSetting?.value === "true" ||
        judgesSetting?.value === 1 ||
        judgesSetting?.value === "1"
      );

      setTop10VotingOpen(
        top10Setting?.value === true ||
        top10Setting?.value === "true" ||
        top10Setting?.value === 1 ||
        top10Setting?.value === "1"
      );
    };

  /* FETCH HITS */
  const fetchHits =
    async () => {

      const { data } =
        await supabase
          .from("site_hits")
          .select("*");

      if (data)
        setHits(data);
    };

  /* FETCH */
  const fetchContestants =
    async () => {

      const { data } =
        await supabase
          .from("contestants")
          .select("*")
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      if (data)
        setContestants(data);
    };

  const fetchSeason2Contestants =
    async () => {

      const { data } =
        await supabase
          .from("season2_finalists")
          .select("*")
          .order(
            "votes",
            {
              ascending: false,
            }
          );

      if (data)
        setSeason2Contestants(data);
    };

  const fetchJudges =
    async () => {

      const { data } =
        await supabase
          .from(
            "fan_favorite_judges"
          )
          .select("*")
          .order(
            "votes",
            {
              ascending: false,
            }
          );

      if (data)
        setJudges(data);

      setLoading(false);
    };

  /* TOGGLE */
  const toggleSetting =
    async (
      key: string,
      current: boolean
    ) => {

      await supabase
        .from("site_settings")
        .update({
          value: !current,
        })
        .eq(
          "key",
          key
        );

      fetchSettings();
    };

  /* STATUS */
  const updateStatus =
    async (
      id: number,
      status: string
    ) => {

      await supabase
        .from("contestants")
        .update({
          status,
        })
        .eq(
          "id",
          id
        );

      fetchContestants();
    };

  const updateFinalistStatus =
    async (
      id: number,
      status: string
    ) => {

      await supabase
        .from(
          "season2_finalists"
        )
        .update({
          status,
        })
        .eq(
          "id",
          id
        );

      fetchSeason2Contestants();
    };

  const updateJudgeStatus =
    async (
      id: number,
      status: string
    ) => {

      await supabase
        .from(
          "fan_favorite_judges"
        )
        .update({
          status,
        })
        .eq(
          "id",
          id
        );

      fetchJudges();
    };

  /* LOGIN */
  if (!authorized) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

        <div className="w-full max-w-md rounded-3xl bg-white/5 border border-white/10 p-10">

          <h1 className="text-4xl font-black uppercase">
            Admin Login
          </h1>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="mt-8 w-full px-5 py-4 rounded-2xl bg-black border border-white/10 text-white"
          />

          <button
            onClick={() => {

              if (
                password ===
                "BreezeAdmin2026"
              ) {

                localStorage.setItem(
                  "admin-auth",
                  "true"
                );

                setAuthorized(true);

              } else {

                alert(
                  "Incorrect password"
                );

              }
            }}
            className="mt-6 w-full py-4 rounded-2xl bg-green-400 text-black font-black uppercase"
          >

            Login

          </button>

        </div>

      </main>

    );
  }

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

        <h1 className="text-6xl font-black uppercase">
          Admin Dashboard
        </h1>

        {/* HIT COUNTER */}
        <div className="mt-10 rounded-3xl bg-white/5 border border-white/10 p-8">

          <p className="uppercase text-sm tracking-[3px] text-white/50">
            Total Site Hits
          </p>

          <h2 className="mt-4 text-5xl font-black">
            {hits.length}
          </h2>

        </div>

        {/* VOTING */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">

          <button
            onClick={() =>
              toggleSetting(
                "judges_voting_open",
                judgesVotingOpen
              )
            }
            className={`py-6 rounded-3xl font-black uppercase text-2xl ${
              judgesVotingOpen
                ? "bg-green-400 text-black"
                : "bg-red-500 text-white"
            }`}
          >
            Judges Voting
          </button>

          <button
            onClick={() =>
              toggleSetting(
                "top10_voting_open",
                top10VotingOpen
              )
            }
            className={`py-6 rounded-3xl font-black uppercase text-2xl ${
              top10VotingOpen
                ? "bg-green-400 text-black"
                : "bg-red-500 text-white"
            }`}
          >
            Top 10 Voting
          </button>

        </div>

        {/* TOP 10 */}
        <section className="mt-24">

          <h2 className="text-4xl font-black uppercase">
            Top 10 Finalists
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {season2Contestants.map(
              (contestant) => (
                <div
                  key={contestant.id}
                  className="rounded-3xl bg-white/5 border border-white/10 p-6"
                >

                  <h3 className="text-3xl font-black uppercase">
                    {contestant.name}
                  </h3>

                  <p className="mt-3">
                    Votes:
                    {" "}
                    {contestant.votes || 0}
                  </p>

                  <div className="mt-6 grid gap-3">

                    <button
                      onClick={() =>
                        updateFinalistStatus(
                          contestant.id,
                          "safe"
                        )
                      }
                      className="py-3 rounded-2xl bg-green-500 text-black font-black uppercase"
                    >
                      Safe
                    </button>

                    <button
                      onClick={() =>
                        updateFinalistStatus(
                          contestant.id,
                          "eliminated"
                        )
                      }
                      className="py-3 rounded-2xl bg-red-500 text-white font-black uppercase"
                    >
                      Eliminated
                    </button>

                    <button
                      onClick={() =>
                        updateFinalistStatus(
                          contestant.id,
                          "disqualified"
                        )
                      }
                      className="py-3 rounded-2xl bg-pink-500 text-white font-black uppercase"
                    >
                      Disqualified
                    </button>

                  </div>

                </div>
              )
            )}

          </div>

        </section>

        {/* JUDGES */}
        <section className="mt-24">

          <h2 className="text-4xl font-black uppercase">
            Fan Favorite Judges
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {judges.map(
              (judge) => (
                <div
                  key={judge.id}
                  className="rounded-3xl bg-white/5 border border-white/10 p-6"
                >

                  <h3 className="text-3xl font-black uppercase">
                    {judge.name}
                  </h3>

                  <p className="mt-3">
                    Votes:
                    {" "}
                    {judge.votes || 0}
                  </p>

                  <div className="mt-6 grid gap-3">

                    <button
                      onClick={() =>
                        updateJudgeStatus(
                          judge.id,
                          "safe"
                        )
                      }
                      className="py-3 rounded-2xl bg-green-500 text-black font-black uppercase"
                    >
                      Safe
                    </button>

                    <button
                      onClick={() =>
                        updateJudgeStatus(
                          judge.id,
                          "eliminated"
                        )
                      }
                      className="py-3 rounded-2xl bg-red-500 text-white font-black uppercase"
                    >
                      Eliminated
                    </button>

                    <button
                      onClick={() =>
                        updateJudgeStatus(
                          judge.id,
                          "disqualified"
                        )
                      }
                      className="py-3 rounded-2xl bg-pink-500 text-white font-black uppercase"
                    >
                      Disqualified
                    </button>

                  </div>

                </div>
              )
            )}

          </div>

        </section>

        {/* KIDS */}
        <section className="mt-24">

          <h2 className="text-4xl font-black uppercase">
            Kids Entries
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {contestants.map(
              (contestant) => (
                <div
                  key={contestant.id}
                  className="rounded-3xl bg-white/5 border border-white/10 p-6"
                >

                  <h3 className="text-3xl font-black uppercase">
                    {
                      contestant.full_name
                    }
                  </h3>

                  <p className="mt-3">
                    Age:
                    {" "}
                    {contestant.age}
                  </p>

                  <div className="mt-6 grid gap-3">

                    <button
                      onClick={() =>
                        updateStatus(
                          contestant.id,
                          "safe"
                        )
                      }
                      className="py-3 rounded-2xl bg-green-500 text-black font-black uppercase"
                    >
                      Safe
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          contestant.id,
                          "eliminated"
                        )
                      }
                      className="py-3 rounded-2xl bg-red-500 text-white font-black uppercase"
                    >
                      Eliminated
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          contestant.id,
                          "disqualified"
                        )
                      }
                      className="py-3 rounded-2xl bg-pink-500 text-white font-black uppercase"
                    >
                      Disqualified
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
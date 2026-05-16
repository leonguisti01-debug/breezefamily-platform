"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function AdminPage() {
  const [contestants, setContestants] = useState<any[]>([]);
  const [season2Contestants, setSeason2Contestants] = useState<any[]>([]);
  const [judges, setJudges] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  /* LOAD */
  useEffect(() => {
    fetchContestants();
    fetchSeason2Contestants();
    fetchJudges();
  }, []);

  /* KIDS */
  const fetchContestants = async () => {
    const { data } = await supabase
      .from("contestants")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setContestants(data);
  };

  /* FINALISTS */
  const fetchSeason2Contestants = async () => {
    const { data } = await supabase
      .from("season2_finalists")
      .select("*")
      .order("votes", { ascending: false });

    if (data) setSeason2Contestants(data);
  };

  /* JUDGES */
  const fetchJudges = async () => {
    const { data } = await supabase
      .from("fan_favorite_judges")
      .select("*")
      .order("votes", { ascending: false });

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
    const confirmReset = window.confirm(
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
    const confirmReset = window.confirm(
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
    <main
      className="min-h-screen text-white"
      style={{
        background:
          "radial-gradient(circle at top, rgba(50,255,50,0.18), transparent 35%), #050505",
      }}
    >
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

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

            {season2Contestants.map((contestant) => (
              <div
                key={contestant.id}
                className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
              >

                <div className="aspect-square overflow-hidden">

                  <img
                    src={contestant.image_url}
                    alt={contestant.name}
                    className="w-full h-full object-cover"
                  />

                </div>

                <div className="p-6 text-center">

                  <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs uppercase tracking-[3px]">
                    {contestant.status || "safe"}
                  </div>

                  <h3 className="mt-5 text-3xl font-black uppercase">
                    {contestant.name}
                  </h3>

                  <div className="mt-5 px-5 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/20">

                    <p className="text-cyan-300 uppercase tracking-[3px] text-xs">
                      Votes
                    </p>

                    <p className="text-3xl font-black mt-2">
                      {contestant.votes || 0}
                    </p>

                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-3">

                    <button
                      onClick={() =>
                        updateFinalistStatus(
                          contestant.id,
                          "safe",
                          false
                        )
                      }
                      className="py-3 rounded-2xl bg-green-500/10 border border-green-400/20"
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
                      className="py-3 rounded-2xl bg-red-500/10 border border-red-400/20"
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
                      className="py-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/20"
                    >
                      Re-Instated
                    </button>

                  </div>

                </div>

              </div>
            ))}

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

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

            {judges.map((judge) => (
              <div
                key={judge.id}
                className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
              >

                {/* VIDEO */}
                <div className="w-full bg-black flex items-center justify-center overflow-hidden">

                  {judge.video_url ? (
                    <video
                      src={judge.video_url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-auto max-h-[750px] object-contain"
                    />
                  ) : (
                    <div className="w-full h-[500px] flex items-center justify-center text-white/40">
                      No Video
                    </div>
                  )}

                </div>

                {/* CONTENT */}
                <div className="p-6 text-center">

                  <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs uppercase tracking-[3px]">
                    {judge.status || "active"}
                  </div>

                  <h3 className="mt-5 text-3xl font-black uppercase">
                    {judge.name}
                  </h3>

                  <div className="mt-5 px-5 py-3 rounded-2xl bg-pink-500/10 border border-pink-400/20">

                    <p className="text-pink-300 uppercase tracking-[3px] text-xs">
                      Votes
                    </p>

                    <p className="text-3xl font-black mt-2">
                      {judge.votes || 0}
                    </p>

                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-3">

                    <button
                      onClick={() =>
                        updateJudgeStatus(
                          judge.id,
                          "active",
                          false
                        )
                      }
                      className="py-3 rounded-2xl bg-green-500/10 border border-green-400/20"
                    >
                      Active
                    </button>

                    <button
                      onClick={() =>
                        updateJudgeStatus(
                          judge.id,
                          "eliminated",
                          true
                        )
                      }
                      className="py-3 rounded-2xl bg-red-500/10 border border-red-400/20"
                    >
                      Eliminated
                    </button>

                    <button
                      onClick={() =>
                        updateJudgeStatus(
                          judge.id,
                          "re-instated",
                          false
                        )
                      }
                      className="py-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/20"
                    >
                      Re-Instated
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </section>

        {/* KIDS */}
        <section className="mt-24">

          <h2 className="text-4xl font-black uppercase">
            Kids Contestants
          </h2>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

            {contestants.map((contestant) => (
              <div
                key={contestant.id}
                className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
              >

                <div className="aspect-square overflow-hidden">

                  <img
                    src={contestant.photo_url}
                    alt={contestant.full_name}
                    className="w-full h-full object-cover"
                  />

                </div>

                <div className="p-6">

                  <div className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-400/20 text-green-300 text-xs uppercase tracking-[3px]">
                    {contestant.status || "pending"}
                  </div>

                  <h2 className="mt-5 text-3xl font-black uppercase">
                    {contestant.full_name}
                  </h2>

                  <div className="mt-5 space-y-3 text-white/70">

                    <p>
                      <span className="text-white font-bold">
                        Age:
                      </span>{" "}
                      {contestant.age}
                    </p>

                    <p>
                      <span className="text-white font-bold">
                        TikTok:
                      </span>{" "}
                      @{contestant.tiktok_username}
                    </p>

                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3">

                    <button
                      onClick={() =>
                        updateStatus(
                          contestant.id,
                          "approved"
                        )
                      }
                      className="py-3 rounded-2xl bg-green-500/10 border border-green-400/20"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          contestant.id,
                          "declined"
                        )
                      }
                      className="py-3 rounded-2xl bg-red-500/10 border border-red-400/20"
                    >
                      Decline
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          contestant.id,
                          "through"
                        )
                      }
                      className="py-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/20"
                    >
                      Through
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          contestant.id,
                          "out"
                        )
                      }
                      className="py-3 rounded-2xl bg-yellow-500/10 border border-yellow-400/20"
                    >
                      Out
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          contestant.id,
                          "disqualified"
                        )
                      }
                      className="col-span-2 py-3 rounded-2xl bg-pink-500/10 border border-pink-400/20"
                    >
                      Disqualified
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </section>

      </div>

    </main>
  );
}
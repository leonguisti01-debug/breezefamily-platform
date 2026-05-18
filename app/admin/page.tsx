"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "YOUR_SUPABASE_ANON_KEY"
);

export default function AdminPage() {

  /* STATES */
  const [contestants, setContestants] =
    useState<any[]>([]);

  const [season2Contestants,
    setSeason2Contestants] =
    useState<any[]>([]);

  const [judges, setJudges] =
    useState<any[]>([]);

  const [judgesVotingOpen,
    setJudgesVotingOpen] =
    useState(true);

  const [top10VotingOpen,
    setTop10VotingOpen] =
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

  /* TOGGLE */
  const toggleSetting = async (
    key: string,
    current: boolean
  ) => {

    const newValue =
      !current;

    await supabase
      .from("site_settings")
      .update({
        value: newValue,
      })
      .eq("key", key);

    fetchSettings();
  };

  /* FETCH KIDS */
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

  /* FETCH TOP 10 */
  const fetchSeason2Contestants =
    async () => {

      const { data } =
        await supabase
          .from("season2_finalists")
          .select("*")
          .order("votes", {
            ascending: false,
          });

      if (data)
        setSeason2Contestants(data);
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
          .order("votes", {
            ascending: false,
          });

      if (data)
        setJudges(data);

      setLoading(false);
    };

  /* UPDATE KIDS */
  const updateStatus =
    async (
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
        .from(
          "season2_finalists"
        )
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
        .from(
          "fan_favorite_judges"
        )
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

      if (!confirmReset)
        return;

      await supabase
        .from(
          "season2_finalists"
        )
        .update({
          votes: 0,
        })
        .neq("id", 0);

      fetchSeason2Contestants();

      alert(
        "Top 10 votes reset."
      );
    };

  /* RESET JUDGES */
  const resetJudgeVotes =
    async () => {

      const confirmReset =
        window.confirm(
          "Reset ALL judge votes?"
        );

      if (!confirmReset)
        return;

      await supabase
        .from(
          "fan_favorite_judges"
        )
        .update({
          votes: 0,
        })
        .neq("id", 0);

      fetchJudges();

      alert(
        "Judge votes reset."
      );
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

        {/* TOP 10 */}
        <section className="mt-24">

          <div className="flex justify-between items-center">

            <h2 className="text-4xl font-black uppercase">
              Top 10 Finalists
            </h2>

            <button
              onClick={resetFinalistVotes}
              className="px-6 py-4 rounded-2xl bg-green-500 text-black font-black uppercase"
            >
              Reset Top 10 Votes
            </button>

          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {season2Contestants.map(
              (contestant) => (
                <div
                  key={contestant.id}
                  className="rounded-3xl overflow-hidden bg-white/5 border border-white/10"
                >

                  {contestant.image_url ? (

                    <img
                      src={contestant.image_url}
                      alt={contestant.name}
                      className="w-full aspect-square object-cover"
                    />

                  ) : (

                    <div className="w-full aspect-square bg-black flex items-center justify-center text-white/30">
                      No Image
                    </div>

                  )}

                  <div className="p-6">

                    <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs uppercase tracking-[3px]">
                      {contestant.status || "safe"}
                    </div>

                    <h3 className="mt-5 text-3xl font-black uppercase">
                      {contestant.name}
                    </h3>

                    <div className="mt-5 px-5 py-3 rounded-2xl bg-green-500/10 border border-green-400/20">

                      <p className="text-green-300 uppercase tracking-[3px] text-xs">
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
                        className="py-3 rounded-2xl bg-green-500 text-black font-black uppercase"
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
                        className="py-3 rounded-2xl bg-red-500 text-white font-black uppercase"
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
                        className="py-3 rounded-2xl bg-cyan-500 text-white font-black uppercase"
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
                        className="py-3 rounded-2xl bg-pink-500 text-white font-black uppercase"
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

        {/* JUDGES */}
        <section className="mt-24">

          <div className="flex justify-between items-center">

            <h2 className="text-4xl font-black uppercase">
              Fan Favorite Judges
            </h2>

            <button
              onClick={resetJudgeVotes}
              className="px-6 py-4 rounded-2xl bg-pink-500 text-white font-black uppercase"
            >
              Reset Judge Votes
            </button>

          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {judges.map((judge) => (
              <div
                key={judge.id}
                className="rounded-3xl overflow-hidden bg-white/5 border border-white/10"
              >

                {/* MEDIA */}
                <div className="w-full bg-black overflow-hidden">

                  {judge.video_url &&
                  judge.video_url !== "" &&
                  judge.video_url !== "NULL" ? (

                    <video
                      key={judge.video_url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      preload="metadata"
                      className="w-full h-auto max-h-[750px] object-contain"
                    >

                      <source
                        src={judge.video_url}
                        type="video/mp4"
                      />

                    </video>

                  ) : judge.image_url &&
                    judge.image_url !== "" &&
                    judge.image_url !== "NULL" ? (

                    <img
                      src={judge.image_url}
                      alt={judge.name}
                      className="w-full aspect-square object-cover"
                    />

                  ) : (

                    <div className="w-full aspect-square bg-black flex items-center justify-center text-white/30">
                      No Media
                    </div>

                  )}

                </div>

                <div className="p-6">

                  <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs uppercase tracking-[3px]">
                    {judge.status || "safe"}
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
                          "safe",
                          false
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
                          "eliminated",
                          true
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
                          "re-instated",
                          false
                        )
                      }
                      className="py-3 rounded-2xl bg-cyan-500 text-white font-black uppercase"
                    >
                      Re-Instated
                    </button>

                    <button
                      onClick={() =>
                        updateJudgeStatus(
                          judge.id,
                          "disqualified",
                          true
                        )
                      }
                      className="py-3 rounded-2xl bg-pink-500 text-white font-black uppercase"
                    >
                      Disqualified
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </section>

        {/* KIDS ENTRIES */}
        <section className="mt-24">

          <h2 className="text-4xl font-black uppercase">
            Kids Entries
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {contestants.map(
              (contestant) => (
                <div
                  key={contestant.id}
                  className="rounded-3xl overflow-hidden bg-white/5 border border-white/10"
                >

                  <img
                    src={contestant.photo_url}
                    alt={contestant.full_name}
                    className="w-full aspect-square object-cover"
                  />

                  <div className="p-6">

                    <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs uppercase tracking-[3px]">
                      {contestant.status || "pending"}
                    </div>

                    <h3 className="mt-5 text-3xl font-black uppercase">
                      {contestant.full_name}
                    </h3>

                    <p className="mt-4 text-white/70">
                      Age: {contestant.age}
                    </p>

                    <div className="mt-8 grid grid-cols-2 gap-3">

                      <button
                        onClick={() =>
                          updateStatus(
                            contestant.id,
                            "approved"
                          )
                        }
                        className="py-3 rounded-2xl bg-green-500 text-black font-black uppercase"
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
                        className="py-3 rounded-2xl bg-red-500 text-white font-black uppercase"
                      >
                        Decline
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
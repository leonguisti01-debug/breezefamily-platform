"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function AdminPage() {

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

  /* TOGGLE */
  const toggleSetting =
    async (
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
        .eq(
          "key",
          key
        );

      fetchSettings();
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

  /* UPLOAD TOP10 PHOTO */
  const uploadTop10Image =
    async (
      e: any,
      contestantId: number
    ) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const fileName =
        `${Date.now()}-${file.name}`;

      await supabase.storage
        .from(
          "contestant-photos"
        )
        .upload(
          fileName,
          file
        );

      const {
        data: publicUrlData,
      } = supabase.storage
        .from(
          "contestant-photos"
        )
        .getPublicUrl(
          fileName
        );

      await supabase
        .from(
          "season2_finalists"
        )
        .update({
          image_url:
            publicUrlData.publicUrl,
        })
        .eq(
          "id",
          contestantId
        );

      fetchSeason2Contestants();

      alert(
        "Photo uploaded!"
      );
    };

  /* UPLOAD JUDGE VIDEO */
  const uploadJudgeVideo =
    async (
      e: any,
      judgeId: number
    ) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const fileName =
        `${Date.now()}-${file.name}`;

      await supabase.storage
        .from("judges")
        .upload(
          fileName,
          file
        );

      const {
        data: publicUrlData,
      } = supabase.storage
        .from("judges")
        .getPublicUrl(
          fileName
        );

      await supabase
        .from(
          "fan_favorite_judges"
        )
        .update({
          video_url:
            publicUrlData.publicUrl,
        })
        .eq(
          "id",
          judgeId
        );

      fetchJudges();

      alert(
        "Video uploaded!"
      );
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

  /* RESET */
  const resetFinalistVotes =
    async () => {

      await supabase
        .from(
          "season2_finalists"
        )
        .update({
          votes: 0,
        })
        .neq(
          "id",
          0
        );

      fetchSeason2Contestants();

      alert(
        "Top 10 votes reset."
      );
    };

  const resetJudgeVotes =
    async () => {

      await supabase
        .from(
          "fan_favorite_judges"
        )
        .update({
          votes: 0,
        })
        .neq(
          "id",
          0
        );

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

        {/* HITS */}
        <div className="mt-10 grid md:grid-cols-4 gap-6">

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

            <p className="uppercase tracking-[3px] text-white/50 text-sm">
              Total Site Hits
            </p>

            <h2 className="mt-4 text-5xl font-black">
              {hits.length}
            </h2>

          </div>

        </div>

        {/* VOTING */}
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

            {judgesVotingOpen
              ? "OPEN"
              : "CLOSED"}

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

            {top10VotingOpen
              ? "OPEN"
              : "CLOSED"}

          </button>

        </div>

      </div>

    </main>
  );
}
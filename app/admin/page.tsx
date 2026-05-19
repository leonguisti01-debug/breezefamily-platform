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

  const [siteHits,
    setSiteHits] =
    useState(0);

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
        judgesSetting?.value === "true"
      );

      setTop10VotingOpen(
        top10Setting?.value === true ||
        top10Setting?.value === "true"
      );
    };

  /* HITS */
  const fetchHits =
    async () => {

      const {
        count
      } = await supabase
        .from("site_hits")
        .select("*", {
          count: "exact",
          head: true,
        });

      setSiteHits(
        count || 0
      );
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
        .eq("key", key);

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
          .order("votes", {
            ascending: false,
          });

      if (data)
        setSeason2Contestants(data);
    };

  const fetchJudges =
    async () => {

      const { data } =
        await supabase
          .from("fan_favorite_judges")
          .select("*")
          .order("votes", {
            ascending: false,
          });

      if (data)
        setJudges(data);

      setLoading(false);
    };

  /* KIDS STATUS */
  const updateKidsStatus =
    async (
      id: number,
      status: string
    ) => {

      await supabase
        .from("contestants")
        .update({
          status,
        })
        .eq("id", id);

      fetchContestants();
    };

  /* FINALIST STATUS */
  const updateFinalistStatus =
    async (
      id: number,
      status: string
    ) => {

      await supabase
        .from("season2_finalists")
        .update({
          status,
        })
        .eq("id", id);

      fetchSeason2Contestants();
    };

  /* JUDGE STATUS */
  const updateJudgeStatus =
    async (
      id: number,
      status: string
    ) => {

      await supabase
        .from("fan_favorite_judges")
        .update({
          status,
        })
        .eq("id", id);

      fetchJudges();
    };

  /* UPLOAD FINALIST PHOTO */
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
        .from("contestant-photos")
        .upload(
          fileName,
          file
        );

      const {
        data: publicUrlData,
      } = supabase.storage
        .from("contestant-photos")
        .getPublicUrl(
          fileName
        );

      await supabase
        .from("season2_finalists")
        .update({
          image_url:
            publicUrlData.publicUrl,
        })
        .eq("id", contestantId);

      fetchSeason2Contestants();

      alert("Photo uploaded!");
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
        .from("fan_favorite_judges")
        .update({
          video_url:
            publicUrlData.publicUrl,
        })
        .eq("id", judgeId);

      fetchJudges();

      alert("Video uploaded!");
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
    <main className="min-h-screen bg-black text-white px-6 py-20">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div>

          <p className="uppercase tracking-[4px] text-green-300 text-sm">
            Breeze Family
          </p>

          <h1 className="mt-4 text-6xl font-black uppercase">
            Admin Dashboard
          </h1>

        </div>

        {/* CONTROLS */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">

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

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col items-center justify-center">

            <p className="uppercase tracking-[4px] text-white/50 text-sm">
              Site Hits
            </p>

            <h2 className="mt-4 text-6xl font-black">
              {siteHits}
            </h2>

          </div>

        </div>

        {/* TOP 10 */}
        <section className="mt-24">

          <h2 className="text-5xl font-black uppercase">
            Top 10 Finalists
          </h2>

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

                    <h3 className="text-3xl font-black uppercase">
                      {contestant.name}
                    </h3>

                    <p className="mt-3 text-green-300 font-bold">
                      Votes: {contestant.votes || 0}
                    </p>

                    <label className="mt-6 block">

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          uploadTop10Image(
                            e,
                            contestant.id
                          )
                        }
                        className="hidden"
                      />

                      <div className="cursor-pointer py-3 rounded-2xl bg-white text-black text-center font-black uppercase">
                        Upload Photo
                      </div>

                    </label>

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

                </div>
              )
            )}

          </div>

        </section>

        {/* JUDGES */}
        <section className="mt-24">

          <h2 className="text-5xl font-black uppercase">
            Fan Favorite Judges
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {judges.map(
              (judge) => (

                <div
                  key={judge.id}
                  className="rounded-3xl overflow-hidden bg-white/5 border border-white/10"
                >

                  {judge.video_url ? (

                    <video
                      src={judge.video_url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      className="w-full h-auto"
                    />

                  ) : (

                    <div className="w-full aspect-square bg-black flex items-center justify-center text-white/30">
                      No Video
                    </div>

                  )}

                  <div className="p-6">

                    <h3 className="text-3xl font-black uppercase">
                      {judge.name}
                    </h3>

                    <p className="mt-3 text-pink-300 font-bold">
                      Votes: {judge.votes || 0}
                    </p>

                    <label className="mt-6 block">

                      <input
                        type="file"
                        accept="video/mp4"
                        onChange={(e) =>
                          uploadJudgeVideo(
                            e,
                            judge.id
                          )
                        }
                        className="hidden"
                      />

                      <div className="cursor-pointer py-3 rounded-2xl bg-white text-black text-center font-black uppercase">
                        Upload Video
                      </div>

                    </label>

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

                </div>
              )
            )}

          </div>

        </section>

        {/* KIDS */}
        <section className="mt-24">

          <h2 className="text-5xl font-black uppercase">
            Kids Entries
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {contestants.map(
              (contestant) => (

                <div
                  key={contestant.id}
                  className="rounded-3xl overflow-hidden bg-white/5 border border-white/10"
                >

                  {contestant.photo_url ? (

                    <img
                      src={contestant.photo_url}
                      alt={contestant.full_name}
                      className="w-full aspect-square object-cover"
                    />

                  ) : (

                    <div className="w-full aspect-square bg-black flex items-center justify-center text-white/30">
                      No Photo
                    </div>

                  )}

                  <div className="p-6">

                    <h3 className="text-3xl font-black uppercase">
                      {contestant.full_name}
                    </h3>

                    <p className="mt-3 text-white/70">
                      Age: {contestant.age}
                    </p>

                    <p className="mt-2 text-white/40 uppercase text-sm">
                      {contestant.status || "pending"}
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3">

                      <button
                        onClick={() =>
                          updateKidsStatus(
                            contestant.id,
                            "accepted"
                          )
                        }
                        className="py-3 rounded-2xl bg-green-500 text-black font-black uppercase"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          updateKidsStatus(
                            contestant.id,
                            "rejected"
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
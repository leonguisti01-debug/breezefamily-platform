"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
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

    const { data, error } =
      await supabase
        .from("site_settings")
        .select("*");

    if (error) {
      console.log(error);
      return;
    }

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
      judges?.value === true ||
      judges?.value === "true"
    );

    setTop10VotingOpen(
      top10?.value === true ||
      top10?.value === "true"
    );
  };

  /* TOGGLE SETTINGS */
  const toggleSetting = async (
    key: string,
    value: boolean
  ) => {

    const newValue = !value;

    const { error } =
      await supabase
        .from("site_settings")
        .update({
          value: newValue,
        })
        .eq("key", key);

    if (error) {
      console.log(error);
      alert("Failed to update setting");
      return;
    }

    if (
      key ===
      "judges_voting_open"
    ) {
      setJudgesVotingOpen(newValue);
    }

    if (
      key ===
      "top10_voting_open"
    ) {
      setTop10VotingOpen(newValue);
    }
  };

  /* KIDS */
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

  /* TOP 10 */
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

  /* JUDGES */
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

  /* UPLOAD TOP 10 IMAGE */
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

      const { error: uploadError } =
        await supabase.storage
          .from("contestant-photos")
          .upload(
            fileName,
            file
          );

      if (uploadError) {
        console.log(uploadError);
        alert("Upload failed");
        return;
      }

      const {
        data: publicUrlData,
      } = supabase.storage
        .from("contestant-photos")
        .getPublicUrl(
          fileName
        );

      const imageUrl =
        publicUrlData.publicUrl;

      const { error: updateError } =
        await supabase
          .from(
            "season2_finalists"
          )
          .update({
            image_url: imageUrl,
          })
          .eq(
            "id",
            contestantId
          );

      if (updateError) {
        console.log(updateError);
        alert("Database update failed");
        return;
      }

      alert("Top 10 photo uploaded!");

      fetchSeason2Contestants();
    };

  /* UPLOAD JUDGE IMAGE */
  const uploadJudgeImage =
    async (
      e: any,
      judgeId: number
    ) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const fileName =
        `${Date.now()}-${file.name}`;

      const { error: uploadError } =
        await supabase.storage
          .from("judges")
          .upload(
            fileName,
            file
          );

      if (uploadError) {
        console.log(uploadError);
        alert("Upload failed");
        return;
      }

      const {
        data: publicUrlData,
      } = supabase.storage
        .from("judges")
        .getPublicUrl(
          fileName
        );

      const imageUrl =
        publicUrlData.publicUrl;

      const { error: updateError } =
        await supabase
          .from(
            "fan_favorite_judges"
          )
          .update({
            image_url: imageUrl,
          })
          .eq(
            "id",
            judgeId
          );

      if (updateError) {
        console.log(updateError);
        alert("Database update failed");
        return;
      }

      alert("Judge photo uploaded!");

      fetchJudges();
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

      alert(
        "Top 10 votes reset."
      );

      fetchSeason2Contestants();
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

      alert(
        "Judge votes reset."
      );

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
              Top 10
            </h2>

            <button
              onClick={
                resetFinalistVotes
              }
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
                    src={
                      contestant.image_url
                    }
                    alt={
                      contestant.name
                    }
                    className="w-full aspect-square object-cover"
                  />

                  <div className="p-6">

                    <h3 className="text-3xl font-black uppercase">
                      {
                        contestant.name
                      }
                    </h3>

                    <p className="mt-3 text-green-300 font-bold">
                      Votes:
                      {" "}
                      {
                        contestant.votes || 0
                      }
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

        {/* JUDGES */}
        <section className="mt-24">

          <div className="flex justify-between items-center">

            <h2 className="text-4xl font-black uppercase">
              Fan Favorite Judges
            </h2>

            <button
              onClick={
                resetJudgeVotes
              }
              className="px-6 py-4 rounded-2xl bg-pink-500 text-white font-black uppercase"
            >
              Reset Judge Votes
            </button>

          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

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

                  <div className="p-6">

                    <h3 className="text-3xl font-black uppercase">
                      {judge.name}
                    </h3>

                    <p className="mt-3 text-pink-300 font-bold">
                      Votes:
                      {" "}
                      {
                        judge.votes || 0
                      }
                    </p>

                    <label className="mt-6 block">

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          uploadJudgeImage(
                            e,
                            judge.id
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
                          updateJudgeStatus(
                            judge.id,
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
                          updateJudgeStatus(
                            judge.id,
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
                          updateJudgeStatus(
                            judge.id,
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
                          updateJudgeStatus(
                            judge.id,
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
                  className="rounded-3xl overflow-hidden bg-white/5 border border-white/10"
                >

                  <img
                    src={
                      contestant.photo_url
                    }
                    alt={
                      contestant.full_name
                    }
                    className="w-full aspect-square object-cover"
                  />

                  <div className="p-6">

                    <h3 className="text-3xl font-black uppercase">
                      {
                        contestant.full_name
                      }
                    </h3>

                    <p className="mt-3 text-white/70">
                      Age:
                      {" "}
                      {
                        contestant.age
                      }
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3">

                      <button
                        onClick={() =>
                          updateStatus(
                            contestant.id,
                            "approved"
                          )
                        }
                        className="py-3 rounded-2xl bg-green-500"
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
                        className="py-3 rounded-2xl bg-red-500"
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
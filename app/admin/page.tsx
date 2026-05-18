"use client";

import { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function AdminPage() {

  const [judgesVotingOpen, setJudgesVotingOpen] =
    useState(true);

  const [top10VotingOpen, setTop10VotingOpen] =
    useState(true);

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

  useEffect(() => {
    fetchSettings();
  }, []);

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

  return (
    <main
      className="min-h-screen text-white px-6 py-32"
      style={{
        background:
          "radial-gradient(circle at top, rgba(50,255,50,0.18), transparent 35%), #050505",
      }}
    >

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center">

          <p className="uppercase tracking-[4px] text-green-300 text-sm">
            Breeze Control Center
          </p>

          <h1 className="mt-4 text-5xl md:text-7xl font-black uppercase">

            Admin Panel

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
            className={`py-8 rounded-3xl font-black uppercase text-2xl transition duration-300 shadow-[0_0_40px_rgba(0,255,120,0.18)] ${
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
            className={`py-8 rounded-3xl font-black uppercase text-2xl transition duration-300 shadow-[0_0_40px_rgba(0,255,120,0.18)] ${
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

      </div>

    </main>
  );
}
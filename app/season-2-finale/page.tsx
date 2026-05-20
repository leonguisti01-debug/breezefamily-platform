"use client";

import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function Season2FinalePage() {

  const [contestants,
    setContestants] =
    useState<any[]>([]);

  const [hasVoted,
    setHasVoted] =
    useState(false);

  const [votingOpen,
    setVotingOpen] =
    useState(true);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    fetchContestants();
    fetchSettings();
    checkExistingVote();
  }, []);

  /* CHECK EXISTING VOTE */
  const checkExistingVote =
    async () => {

      try {

        /* IP */
        const res =
          await fetch(
            "https://api.ipify.org?format=json"
          );

        const ipData =
          await res.json();

        const ip =
          ipData.ip;

        /* FINGERPRINT */
        const fp =
          await FingerprintJS.load();

        const result =
          await fp.get();

        const fingerprint =
          result.visitorId;

        const {
          data: existingVotes,
          error: checkError
        } = await supabase
          .from("top10_votes")
          .select("id")
          .or(
            `ip_address.eq.${ip},fingerprint.eq.${fingerprint}`
          );

        if (checkError) {

          console.log(checkError);

        }

        if (
          existingVotes &&
          existingVotes.length > 0
        ) {

          setHasVoted(true);

          localStorage.setItem(
            "top10-voted",
            "true"
          );

        }

      } catch (err) {

        console.log(err);

      }
    };

  /* SETTINGS */
  const fetchSettings =
    async () => {

      const { data } =
        await supabase
          .from("site_settings")
          .select("*");

      if (!data) return;

      const setting =
        data.find(
          (s: any) =>
            s.key ===
            "top10_voting_open"
        );

      const isOpen =
        setting?.value === true ||
        setting?.value === "true" ||
        setting?.value === 1 ||
        setting?.value === "1";

      setVotingOpen(isOpen);
    };

  /* FETCH CONTESTANTS */
  const fetchContestants =
    async () => {

      const { data } =
        await supabase
          .from(
            "season2_finalists"
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
        setContestants(data);

      setLoading(false);
    };

  /* VOTE */
  const voteForContestant =
    async (
      contestantId: number
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

      try {

        /* IP */
        const res =
          await fetch(
            "https://api.ipify.org?format=json"
          );

        const ipData =
          await res.json();

        const ip =
          ipData.ip;

        /* COUNTRY */
        const geoRes =
          await fetch(
            `https://ipapi.co/${ip}/json/`
          );

        const geoData =
          await geoRes.json();

        const country =
          geoData.country_name ||
          "Unknown";

        /* USER AGENT */
        const userAgent =
          navigator.userAgent;

        /* FINGERPRINT */
        const fp =
          await FingerprintJS.load();

        const result =
          await fp.get();

        const fingerprint =
          result.visitorId;

        /* CHECK EXISTING */
        const {
          data: existingVotes,
          error: checkError
        } = await supabase
          .from("top10_votes")
          .select("id")
          .or(
            `ip_address.eq.${ip},fingerprint.eq.${fingerprint}`
          );

        if (checkError) {

          console.log(checkError);

        }

        /* BLOCK DUPLICATES */
        if (
          existingVotes &&
          existingVotes.length > 0
        ) {

          setHasVoted(true);

          localStorage.setItem(
            "top10-voted",
            "true"
          );

          alert(
            "You have already voted."
          );

          return;
        }

        /* GET CONTESTANT */
        const contestant =
          contestants.find(
            (c) =>
              c.id ===
              contestantId
          );

        if (!contestant)
          return;

        const currentVotes =
          contestant.votes || 0;

        /* UPDATE VOTES */
        const {
          error: voteError
        } = await supabase
          .from(
            "season2_finalists"
          )
          .update({
            votes:
              currentVotes + 1,
          })
          .eq(
            "id",
            contestantId
          );

        if (voteError) {

          console.log(voteError);

          alert(
            "Vote failed."
          );

          return;
        }

        /* STORE VOTE */
        const {
          error: insertError
        } = await supabase
          .from("top10_votes")
          .insert({
            contestant_id:
              contestantId,
            ip_address: ip,
            fingerprint,
            user_agent:
              userAgent,
            country,
          });

        if (insertError) {

          console.log(insertError);

        }

        setHasVoted(true);

        localStorage.setItem(
          "top10-voted",
          "true"
        );

        alert(
          "Vote submitted!"
        );

        fetchContestants();

      } catch (err) {

        console.log(err);

        alert(
          "Voting failed."
        );
      }
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

          <p className="uppercase tracking-[4px] text-green-300 text-sm">
            Breeze Family
          </p>

          <h1 className="mt-4 text-5xl md:text-7xl font-black uppercase">
            Top 10 Leaderboard
          </h1>

          {!votingOpen && (
            <div className="mt-8 inline-block px-6 py-4 rounded-2xl bg-red-500 text-white font-black uppercase">
              Voting Closed
            </div>
          )}

        </div>

      </div>

    </main>
  );
}
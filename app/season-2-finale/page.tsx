"use client";

import { useEffect, useState } from "react";
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

        const res =
          await fetch(
            "https://api.ipify.org?format=json"
          );

        const ipData =
          await res.json();

        const ip =
          ipData.ip;

        const {
          data: existingVote,
        } = await supabase
          .from("top10_votes")
          .select("*")
          .eq(
            "ip_address",
            ip
          )
          .maybeSingle();

        if (existingVote) {

          setHasVoted(true);

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

  /* FETCH */
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

        /* GET USER IP */
        const res =
          await fetch(
            "https://api.ipify.org?format=json"
          );

        const ipData =
          await res.json();

        const ip =
          ipData.ip;

        /* CHECK EXISTING VOTE */
        const {
          data: existingVote,
        } = await supabase
          .from("top10_votes")
          .select("*")
          .eq(
            "ip_address",
            ip
          )
          .maybeSingle();

        if (existingVote) {

          setHasVoted(true);

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
        const { error } =
          await supabase
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

        if (error) {

          console.log(error);

          alert("Vote failed");

          return;
        }

        /* STORE IP VOTE */
        await supabase
          .from("top10_votes")
          .insert({
            contestant_id:
              contestantId,
            ip_address: ip,
          });

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

        {/* LEADERBOARD */}
        <section className="mt-20">

          <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden">

            <div className="grid grid-cols-3 bg-green-400 text-black font-black uppercase text-sm tracking-[2px]">

              <div className="p-5">
                Rank
              </div>

              <div className="p-5">
                Contestant
              </div>

              <div className="p-5 text-right">
                Votes
              </div>

            </div>

            {contestants.map(
              (
                contestant,
                index
              ) => (
                <div
                  key={contestant.id}
                  className="grid grid-cols-3 border-t border-white/10 items-center"
                >

                  <div className="p-5 font-black text-2xl text-green-300">
                    #{index + 1}
                  </div>

                  <div className="p-5 font-bold uppercase">
                    {
                      contestant.name
                    }
                  </div>

                  <div className="p-5 text-right text-2xl font-black">
                    {
                      contestant.votes || 0
                    }
                  </div>

                </div>
              )
            )}

          </div>

        </section>

        {/* CONTESTANT CARDS */}
        <section className="mt-24">

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

            {contestants.map(
              (
                contestant,
                index
              ) => (
                <div
                  key={contestant.id}
                  className="rounded-3xl overflow-hidden bg-white/5 border border-white/10"
                >

                  {contestant.image_url ? (

                    <div className="w-full bg-black flex items-center justify-center p-4">

                      <img
                        src={
                          contestant.image_url
                        }
                        alt={
                          contestant.name
                        }
                        className="w-full h-auto max-h-[750px] object-contain rounded-2xl"
                      />

                    </div>

                  ) : (

                    <div className="w-full h-[500px] bg-black flex items-center justify-center text-white/30">
                      No Photo
                    </div>

                  )}

                  <div className="p-6 text-center">

                    <div className="inline-block px-4 py-2 rounded-full bg-green-400 text-black font-black uppercase text-sm">
                      #{index + 1}
                    </div>

                    <h2 className="mt-5 text-3xl font-black uppercase">
                      {
                        contestant.name
                      }
                    </h2>

                    <div className="mt-5 px-5 py-4 rounded-2xl bg-green-500/10 border border-green-400/20">

                      <p className="uppercase tracking-[3px] text-xs text-green-300">
                        Votes
                      </p>

                      <p className="mt-2 text-4xl font-black">
                        {
                          contestant.votes || 0
                        }
                      </p>

                    </div>

                    <button
                      onClick={() =>
                        voteForContestant(
                          contestant.id
                        )
                      }
                      disabled={
                        hasVoted ||
                        !votingOpen
                      }
                      className={`mt-8 w-full py-4 rounded-2xl font-black uppercase transition duration-300 ${
                        hasVoted ||
                        !votingOpen
                          ? "bg-white/10 text-white/40"
                          : "bg-green-400 text-black"
                      }`}
                    >

                      {!votingOpen
                        ? "Voting Closed"
                        : hasVoted
                        ? "Already Voted"
                        : "Vote"}

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
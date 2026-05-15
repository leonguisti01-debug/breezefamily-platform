"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function VotePage() {

  const [contestants, setContestants] = useState<any[]>([]);
  const [loadingVote, setLoadingVote] = useState<number | null>(null);

  useEffect(() => {
    fetchContestants();
  }, []);

  const fetchContestants = async () => {

    const { data, error } = await supabase
      .from("contestants")
      .select("*")
      .eq("approved", true)
      .order("votes", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setContestants(data || []);
    }
  };

  const voteForContestant = async (
    id: number,
    currentVotes: number
  ) => {

    const voteKey = `voted_${id}`;

    const alreadyVoted = localStorage.getItem(voteKey);

    if (alreadyVoted) {
      alert("You have already voted for this contestant today.");
      return;
    }

    setLoadingVote(id);

    const { error } = await supabase
      .from("contestants")
      .update({
        votes: currentVotes + 1,
      })
      .eq("id", id);

    if (error) {

      console.log(error);
      alert("Vote failed.");

    } else {

      localStorage.setItem(voteKey, "true");

      alert("Vote submitted successfully!");

      fetchContestants();
    }

    setLoadingVote(null);
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-500/20 blur-[140px] rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      </div>

      {/* HEADER */}
      <section className="px-6 lg:px-16 pt-20 pb-10">

        <div className="max-w-7xl mx-auto text-center">

          <h1 className="text-6xl md:text-8xl font-black text-pink-400">
            VOTE NOW
          </h1>

          <p className="mt-6 text-xl text-gray-300">
            Support your favourite contestants.
          </p>

        </div>

      </section>

      {/* CONTESTANTS */}
      <section className="px-6 lg:px-16 pb-20">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {contestants.map((contestant) => (

            <div
              key={contestant.id}
              className="rounded-[35px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl hover:-translate-y-2 transition duration-300"
            >

              {/* IMAGE */}
              <div className="h-[320px] overflow-hidden relative">

                {contestant.image_url ? (

                  <img
                    src={contestant.image_url}
                    alt={contestant.child_name}
                    className="w-full h-full object-cover"
                  />

                ) : (

                  <div className="w-full h-full bg-gradient-to-br from-pink-500/20 to-cyan-500/10 flex items-center justify-center">

                    <h2 className="text-5xl font-black text-pink-400 text-center px-6">
                      {contestant.child_name}
                    </h2>

                  </div>

                )}

                <div className="absolute inset-0 bg-black/20"></div>

                <div className="absolute bottom-6 left-6">

                  <h2 className="text-4xl font-black text-white drop-shadow-lg">
                    {contestant.child_name}
                  </h2>

                </div>

              </div>

              {/* INFO */}
              <div className="p-8">

                <div className="space-y-3 text-gray-300">

                  <p>
                    <span className="text-pink-400 font-bold">
                      Age:
                    </span>{" "}
                    {contestant.age}
                  </p>

                  <p>
                    <span className="text-cyan-400 font-bold">
                      Category:
                    </span>{" "}
                    {contestant.category}
                  </p>

                  <p>
                    <span className="text-lime-400 font-bold">
                      Votes:
                    </span>{" "}
                    {contestant.votes || 0}
                  </p>

                </div>

                {/* BUTTONS */}
                <div className="flex gap-4 mt-8">

                  <Link
                    href={`/contestant/${contestant.id}`}
                    className="flex-1 text-center px-5 py-4 rounded-2xl border border-white/10 bg-white/5 hover:border-pink-500 transition"
                  >
                    VIEW PROFILE
                  </Link>

                  <button
                    onClick={() =>
                      voteForContestant(
                        contestant.id,
                        contestant.votes || 0
                      )
                    }
                    disabled={loadingVote === contestant.id}
                    className="flex-1 px-5 py-4 rounded-2xl bg-pink-500 hover:bg-pink-400 transition font-black disabled:opacity-50"
                  >

                    {loadingVote === contestant.id
                      ? "VOTING..."
                      : "VOTE"}

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}
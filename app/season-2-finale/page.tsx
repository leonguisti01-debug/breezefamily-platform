"use client";

import { useEffect, useState } from "react";
import TopButtons from "../components/TopButtons";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const finalists = [
  {
    id: 1,
    name: "Contestant 1",
    image: "/finalist1.jpg",
  },
  {
    id: 2,
    name: "Contestant 2",
    image: "/finalist2.jpg",
  },
  {
    id: 3,
    name: "Contestant 3",
    image: "/finalist3.jpg",
  },
  {
    id: 4,
    name: "Contestant 4",
    image: "/finalist4.jpg",
  },
  {
    id: 5,
    name: "Contestant 5",
    image: "/finalist5.jpg",
  },
  {
    id: 6,
    name: "Contestant 6",
    image: "/finalist6.jpg",
  },
  {
    id: 7,
    name: "Contestant 7",
    image: "/finalist7.jpg",
  },
  {
    id: 8,
    name: "Contestant 8",
    image: "/finalist8.jpg",
  },
  {
    id: 9,
    name: "Contestant 9",
    image: "/finalist9.jpg",
  },
  {
    id: 10,
    name: "Contestant 10",
    image: "/finalist10.jpg",
  },
];

export default function Season2FinalePage() {

  const [votes, setVotes] = useState<any>({});
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {

    fetchVotes();

    const voted = localStorage.getItem("season2-voted");

    if (voted === "true") {
      setHasVoted(true);
    }

  }, []);

  const fetchVotes = async () => {

    const { data } = await supabase
      .from("season2_votes")
      .select("*");

    if (!data) return;

    const totals: any = {};

    finalists.forEach((f) => {
      totals[f.id] = 0;
    });

    data.forEach((vote) => {
      totals[vote.finalist_id]++;
    });

    setVotes(totals);
  };

  const voteForFinalist = async (id: number) => {

    if (hasVoted) {
      alert("You have already voted.");
      return;
    }

    const { error } = await supabase
      .from("season2_votes")
      .insert([
        {
          finalist_id: id,
        },
      ]);

    if (error) {

      console.log(error);
      alert("Something went wrong.");

    } else {

      localStorage.setItem("season2-voted", "true");

      setHasVoted(true);

      fetchVotes();

      alert("Vote submitted!");

    }
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden px-6 py-16">

      <TopButtons />

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-500/20 blur-[160px] rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-500/20 blur-[160px] rounded-full"></div>

      </div>

      {/* HEADER */}
      <div className="max-w-6xl mx-auto text-center mb-16 pt-24">

        <h1 className="text-5xl md:text-8xl font-black text-cyan-400">
          SEASON 2 FINALE
        </h1>

        <p className="mt-6 text-xl text-gray-300">
          Vote for South Africa's Top 10 finalists.
        </p>

      </div>

      {/* FINALISTS */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">

        {finalists.map((finalist) => (

          <div
            key={finalist.id}
            className="rounded-[35px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl hover:-translate-y-2 transition duration-300"
          >

            {/* IMAGE */}
            <div className="h-[320px] overflow-hidden">

              <img
                src={finalist.image}
                alt={finalist.name}
                className="w-full h-full object-cover"
              />

            </div>

            {/* INFO */}
            <div className="p-6 text-center">

              <h2 className="text-2xl font-black text-white">
                {finalist.name}
              </h2>

              <p className="mt-3 text-cyan-400 font-bold">
                Votes: {votes[finalist.id] || 0}
              </p>

              <button
                onClick={() => voteForFinalist(finalist.id)}
                disabled={hasVoted}
                className={`mt-6 w-full px-5 py-4 rounded-2xl font-black transition ${
                  hasVoted
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-pink-500 hover:bg-pink-400"
                }`}
              >

                {hasVoted ? "VOTED" : "VOTE NOW"}

              </button>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}
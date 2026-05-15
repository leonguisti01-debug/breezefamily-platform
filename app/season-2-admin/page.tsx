"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const finalists = [
  "Contestant 1",
  "Contestant 2",
  "Contestant 3",
  "Contestant 4",
  "Contestant 5",
  "Contestant 6",
  "Contestant 7",
  "Contestant 8",
  "Contestant 9",
  "Contestant 10",
];

export default function Season2AdminPage() {

  const router = useRouter();

  const [votes, setVotes] = useState<any>({});

  useEffect(() => {

    const auth = localStorage.getItem("season2-admin-auth");

    if (auth !== "true") {

      router.push("/season-2-admin-login");

    }

    fetchVotes();

  }, []);

  const fetchVotes = async () => {

    const { data } = await supabase
      .from("season2_votes")
      .select("*");

    if (!data) return;

    const totals: any = {};

    finalists.forEach((_, index) => {
      totals[index + 1] = 0;
    });

    data.forEach((vote) => {
      totals[vote.finalist_id]++;
    });

    setVotes(totals);
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">

      <h1 className="text-5xl font-black text-cyan-400 text-center mb-16">
        SEASON 2 ADMIN
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">

        {finalists.map((name, index) => (

          <div
            key={index}
            className="rounded-[30px] border border-white/10 bg-white/5 p-8 flex justify-between items-center"
          >

            <h2 className="text-2xl font-black text-white">
              {name}
            </h2>

            <div className="text-3xl font-black text-pink-400">
              {votes[index + 1] || 0} Votes
            </div>

          </div>

        ))}

      </div>

    </main>
  );
}
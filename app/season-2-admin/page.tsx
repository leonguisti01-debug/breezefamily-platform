"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Season2AdminPage() {

  const router = useRouter();

  const [finalists, setFinalists] = useState<any[]>([]);
  const [votingStatus, setVotingStatus] = useState("closed");

  useEffect(() => {

    const auth = localStorage.getItem("season2-admin-auth");

    if (auth !== "true") {

      router.push("/season-2-admin-login");

    }

    fetchFinalists();
    fetchVotingStatus();

  }, []);

  const fetchVotingStatus = async () => {

    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .eq("key", "season2_voting")
      .single();

    if (data) {
      setVotingStatus(data.value);
    }

  };

  const toggleVoting = async () => {

    const newStatus =
      votingStatus === "open"
        ? "closed"
        : "open";

    await supabase
      .from("site_settings")
      .update({
        value: newStatus,
      })
      .eq("key", "season2_voting");

    setVotingStatus(newStatus);

  };

  const fetchFinalists = async () => {

    const { data } = await supabase
      .from("season2_finalists")
      .select("*")
      .order("name", { ascending: true });

    if (data) {
      setFinalists(data);
    }

  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">

      <h1 className="text-5xl font-black text-cyan-400 text-center mb-10">
        SEASON 2 ADMIN
      </h1>

      {/* VOTING CONTROL */}
      <div className="max-w-3xl mx-auto mb-16">

        <div className="rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-xl p-10 text-center">

          <h2 className="text-3xl font-black text-white mb-6">
            VOTING CONTROL
          </h2>

          <div
            className={`text-3xl font-black mb-8 ${
              votingStatus === "open"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >

            {votingStatus === "open"
              ? "VOTING OPEN"
              : "VOTING CLOSED"}

          </div>

          <button
            onClick={toggleVoting}
            className={`px-10 py-5 rounded-2xl font-black text-xl transition ${
              votingStatus === "open"
                ? "bg-red-500 hover:bg-red-400"
                : "bg-green-500 hover:bg-green-400"
            }`}
          >

            {votingStatus === "open"
              ? "CLOSE VOTING"
              : "OPEN VOTING"}

          </button>

        </div>

      </div>

      {/* FINALISTS */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        {finalists.map((finalist) => (

          <div
            key={finalist.id}
            className="rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          >

            <h2 className="text-3xl font-black text-white">
              {finalist.name}
            </h2>

          </div>

        ))}

      </div>

    </main>
  );
}
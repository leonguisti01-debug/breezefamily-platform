"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function AdminPage() {
  const [contestants, setContestants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* LOAD CONTESTANTS */
  useEffect(() => {
    fetchContestants();
  }, []);

  const fetchContestants = async () => {
    const { data, error } = await supabase
      .from("contestants")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setContestants(data);
    }

    setLoading(false);
  };

  /* UPDATE STATUS */
  const updateStatus = async (id: number, status: string) => {
    const { error } = await supabase
      .from("contestants")
      .update({ status })
      .eq("id", id);

    if (!error) {
      fetchContestants();
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-black uppercase animate-pulse">
          Loading Contestants...
        </h1>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen text-white overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top, rgba(50,255,50,0.18), transparent 35%), #050505",
      }}
    >
      {/* GLOW */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-green-500/20 blur-[180px] rounded-full"></div>

      <div className="relative z-20 px-6 py-20 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-16">

          <p className="uppercase tracking-[4px] text-green-300 text-sm">
            Breeze Family
          </p>

          <h1 className="mt-3 text-5xl md:text-7xl font-black uppercase">
            Contestant Management
          </h1>

          <p className="mt-5 text-white/70 text-xl">
            Approve, manage and moderate contestant entries.
          </p>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

          {contestants.map((contestant) => (
            <div
              key={contestant.id}
              className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
            >

              {/* PHOTO */}
              <div className="w-full aspect-square overflow-hidden">

                <img
                  src={
                    contestant.photo_url ||
                    "/contestant-placeholder.jpg"
                  }
                  alt={contestant.full_name}
                  className="w-full h-full object-cover"
                />

              </div>

              {/* CONTENT */}
              <div className="p-6">

                {/* STATUS */}
                <div className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-400/20 text-green-300 text-xs uppercase tracking-[3px]">
                  {contestant.status || "pending"}
                </div>

                {/* NAME */}
                <h2 className="mt-5 text-3xl font-black uppercase">
                  {contestant.full_name}
                </h2>

                {/* INFO */}
                <div className="mt-5 space-y-3 text-white/70">

                  <p>
                    <span className="text-white font-bold">Age:</span>{" "}
                    {contestant.age}
                  </p>

                  <p>
                    <span className="text-white font-bold">Talent:</span>{" "}
                    {contestant.talent_category}
                  </p>

                  <p>
                    <span className="text-white font-bold">
                      TikTok:
                    </span>{" "}
                    @{contestant.tiktok_username}
                  </p>

                  <p>
                    <span className="text-white font-bold">
                      Guardian:
                    </span>{" "}
                    {contestant.guardian_name}
                  </p>

                </div>

                {/* BUTTONS */}
                <div className="mt-8 grid grid-cols-2 gap-3">

                  <button
                    onClick={() =>
                      updateStatus(contestant.id, "approved")
                    }
                    className="py-3 rounded-2xl bg-green-500/10 border border-green-400/20 hover:bg-green-500/20 transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(contestant.id, "declined")
                    }
                    className="py-3 rounded-2xl bg-red-500/10 border border-red-400/20 hover:bg-red-500/20 transition"
                  >
                    Decline
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(contestant.id, "through")
                    }
                    className="py-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 hover:bg-cyan-500/20 transition"
                  >
                    Through
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(contestant.id, "out")
                    }
                    className="py-3 rounded-2xl bg-yellow-500/10 border border-yellow-400/20 hover:bg-yellow-500/20 transition"
                  >
                    Out
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        contestant.id,
                        "disqualified"
                      )
                    }
                    className="col-span-2 py-3 rounded-2xl bg-pink-500/10 border border-pink-400/20 hover:bg-pink-500/20 transition"
                  >
                    Disqualified
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </main>
  );
}
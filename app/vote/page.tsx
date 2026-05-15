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

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-500/20 blur-[140px] rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      </div>

      {/* HEADER */}
      <section className="px-6 lg:px-16 pt-20 pb-10 text-center">

        <div className="max-w-5xl mx-auto">

          <h1 className="text-6xl md:text-8xl font-black text-pink-400">
            PUBLIC VOTING
          </h1>

          <p className="mt-6 text-2xl text-gray-300">
            Voting will officially open soon.
          </p>

          <div className="mt-8 inline-flex px-8 py-4 rounded-full border border-yellow-500/30 bg-yellow-500/10">

            <span className="font-bold text-yellow-300 text-lg">
              🚀 Stay tuned for voting announcements
            </span>

          </div>

        </div>

      </section>

      {/* CONTESTANTS */}
      <section className="px-6 lg:px-16 pb-20">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {contestants.map((contestant) => (

            <div
              key={contestant.id}
              className="rounded-[35px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
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
                    disabled
                    className="flex-1 px-5 py-4 rounded-2xl bg-gray-700 text-gray-400 font-black cursor-not-allowed"
                  >
                    VOTING CLOSED
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
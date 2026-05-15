"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LeaderboardPage() {

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
      <section className="px-6 lg:px-16 pt-20 pb-10">

        <div className="max-w-7xl mx-auto text-center">

          <h1 className="text-6xl md:text-8xl font-black text-pink-400">
            LEADERBOARD
          </h1>

          <p className="mt-6 text-xl text-gray-300">
            South Africa’s top rising TikTok Stars.
          </p>

        </div>

      </section>

      {/* LEADERBOARD */}
      <section className="px-6 lg:px-16 pb-20">

        <div className="max-w-6xl mx-auto space-y-6">

          {contestants.map((contestant, index) => (

            <div
              key={contestant.id}
              className="rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden flex flex-col md:flex-row items-center"
            >

              {/* POSITION */}
              <div className="w-full md:w-[180px] flex items-center justify-center p-8">

                <div className="text-center">

                  <h2 className="text-6xl font-black text-pink-400">
                    #{index + 1}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    Entry
                  </p>

                </div>

              </div>

              {/* IMAGE */}
              <div className="w-full md:w-[250px] h-[250px] overflow-hidden">

                {contestant.image_url ? (

                  <img
                    src={contestant.image_url}
                    alt={contestant.child_name}
                    className="w-full h-full object-cover"
                  />

                ) : (

                  <div className="w-full h-full bg-gradient-to-br from-pink-500/20 to-cyan-500/10 flex items-center justify-center">

                    <h2 className="text-4xl font-black text-pink-400 text-center px-6">
                      {contestant.child_name}
                    </h2>

                  </div>

                )}

              </div>

              {/* INFO */}
              <div className="flex-1 p-8">

                <h2 className="text-4xl font-black text-white">
                  {contestant.child_name}
                </h2>

                <div className="mt-5 space-y-3 text-gray-300">

                  <p>
                    <span className="text-cyan-400 font-bold">
                      Age:
                    </span>{" "}
                    {contestant.age}
                  </p>

                </div>

              </div>

              {/* ACTIONS */}
              <div className="p-8 w-full md:w-auto">

                <Link
                  href={`/contestant/${contestant.id}`}
                  className="block text-center px-8 py-4 rounded-2xl bg-pink-500 hover:bg-pink-400 transition font-black"
                >
                  VIEW PROFILE
                </Link>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}
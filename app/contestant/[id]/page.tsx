"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ContestantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const [contestant, setContestant] = useState<any>(null);

  useEffect(() => {
    fetchContestant();
  }, []);

  const fetchContestant = async () => {

    const resolvedParams = await params;
    const id = resolvedParams.id;

    const { data, error } = await supabase
      .from("contestants")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
    } else {
      setContestant(data);
    }
  };

  if (!contestant) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <h1 className="text-4xl font-black text-pink-400 animate-pulse">
          Loading Contestant...
        </h1>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-500/20 blur-[140px] rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      </div>

      {/* CONTENT */}
      <section className="px-6 lg:px-16 py-20">

        <div className="max-w-5xl mx-auto">

          <div className="rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">

            {/* HERO IMAGE */}
            <div className="h-[500px] overflow-hidden relative">

              {contestant.image_url ? (

                <img
                  src={contestant.image_url}
                  alt={contestant.child_name}
                  className="w-full h-full object-cover"
                />

              ) : (

                <div className="w-full h-full bg-gradient-to-br from-pink-500/20 to-cyan-500/10 flex items-center justify-center">

                  <h1 className="text-7xl font-black text-pink-400">
                    {contestant.child_name}
                  </h1>

                </div>

              )}

              <div className="absolute inset-0 bg-black/40"></div>

              <div className="absolute bottom-10 left-10">

                <h1 className="text-6xl font-black text-white drop-shadow-lg">
                  {contestant.child_name}
                </h1>

              </div>

            </div>

            {/* INFO */}
            <div className="p-10">

              <div className="grid md:grid-cols-2 gap-10">

                <div>

                  <h2 className="text-3xl font-black text-pink-400 mb-6">
                    Contestant Info
                  </h2>

                  <div className="space-y-5 text-xl">

                    <p>
                      <span className="text-gray-400">Age:</span>{" "}
                      {contestant.age}
                    </p>

                    <p>
                      <span className="text-gray-400">Category:</span>{" "}
                      {contestant.category}
                    </p>

                    <p>
                      <span className="text-gray-400">Votes:</span>{" "}
                      {contestant.votes || 0}
                    </p>

                  </div>

                </div>

                <div>

                  <h2 className="text-3xl font-black text-cyan-400 mb-6">
                    About
                  </h2>

                  <p className="text-gray-300 leading-9 text-lg">
                    {contestant.description}
                  </p>

                </div>

              </div>

              {/* BUTTON */}
              <div className="mt-14">

                <button className="px-12 py-5 rounded-2xl bg-pink-500 hover:bg-pink-400 transition text-white font-black text-xl shadow-[0_0_40px_rgba(255,0,166,0.4)]">

                  VOTE NOW

                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
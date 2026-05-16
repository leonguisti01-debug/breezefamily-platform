"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function KidsEditionPage() {
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
      .in("status", ["approved", "through"])
      .order("created_at", { ascending: false });

    if (!error && data) {
      setContestants(data);
    }

    setLoading(false);
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
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundPositionY: "top",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* OVERLAY */}
      <div className="min-h-screen bg-black/50">

        {/* HERO */}
        <section className="relative z-20 px-4 md:px-6 pt-20 md:pt-32 pb-16">

          <div className="max-w-7xl mx-auto text-center">

            <div className="inline-block px-5 py-2 rounded-full border border-pink-400/40 bg-black/30 backdrop-blur-md text-xs md:text-sm uppercase tracking-[4px] text-pink-300 mb-8">
              Breeze Family Kids Edition
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black uppercase leading-[0.92]">

              KIDS

              <br />

              <span className="bg-gradient-to-r from-pink-300 via-white to-cyan-300 text-transparent bg-clip-text">
                EDITION
              </span>

            </h1>

            <p className="mt-6 md:mt-8 text-xl md:text-3xl font-black uppercase text-white">
              Approved Contestants
            </p>

            <p className="mt-5 text-base md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto px-4">
              Meet the talented young stars officially approved by the Breeze Family team.
            </p>

            {/* ENTER BUTTON */}
            <Link href="/kids-edition/register">

              <button className="mt-10 px-10 py-5 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-black text-lg md:text-xl shadow-[0_0_50px_rgba(255,0,140,0.4)] hover:scale-[1.02] transition duration-300">
                ENTER NOW
              </button>

            </Link>

          </div>

        </section>

        {/* CONTESTANTS */}
        <section className="relative z-20 px-4 md:px-6 pb-24">

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">

            {contestants.map((contestant) => (
              <div
                key={contestant.id}
                className="flex flex-col items-center text-center bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-6 hover:scale-[1.02] transition duration-300"
              >

                {/* IMAGE */}
                <div className="w-full flex justify-center">

                  <img
                    src={
                      contestant.photo_url ||
                      "/contestant-placeholder.jpg"
                    }
                    alt={contestant.full_name}
                    className="w-full max-w-[180px] sm:max-w-[220px] md:max-w-[300px] rounded-3xl object-cover"
                  />

                </div>

                {/* NAME */}
                <h2 className="mt-5 text-2xl md:text-3xl font-black uppercase">
                  {contestant.full_name}
                </h2>

                {/* TALENT */}
                <p className="mt-2 text-white/70 text-base md:text-lg">
                  {contestant.talent_category}
                </p>

                {/* TIKTOK */}
                <p className="mt-2 text-cyan-300 text-sm">
                  @{contestant.tiktok_username}
                </p>

                {/* STATUS */}
                <div className="mt-5 px-5 py-2 rounded-2xl bg-green-500/10 border border-green-400/20">

                  <p className="text-green-300 uppercase tracking-[3px] text-xs">
                    {contestant.status}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </section>

      </div>

    </main>
  );
}
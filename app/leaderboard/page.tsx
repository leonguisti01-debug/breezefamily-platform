"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const BREEZE_GREEN = "#8DFF00";

export default function LeaderboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    const { data } = await supabase
      .from("members")
      .select("*")
      .order("breeze_points", {
        ascending: false,
      });

    setMembers(data || []);
    setLoading(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main
      className="min-h-screen text-white px-4 md:px-8 py-8"
      style={{
        background:
          "radial-gradient(circle at top, rgba(141,255,0,0.10), #000 50%)",
      }}
    >
      <div className="max-w-6xl mx-auto">

        <button
          onClick={() => router.push("/portal")}
          className="
            px-5
            py-3
            rounded-full
            bg-white/10
            border
            border-white/10
            mb-8
          "
        >
          ← Back To Portal
        </button>

        <h1 className="text-5xl font-black uppercase mb-2">
          🏅 Breeze Leaderboard
        </h1>

        <p className="text-white/60 mb-10">
          Top members ranked by Breeze Points.
        </p>

        <div className="space-y-4">

          {members.map((member, index) => (

            <div
              key={member.id}
              className="
                bg-white/5
                border
                border-white/10
                rounded-[24px]
                p-6
                flex
                items-center
                justify-between
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className="
                    w-12
                    h-12
                    rounded-full
                    bg-[#8DFF00]/20
                    flex
                    items-center
                    justify-center
                    font-black
                    text-[#8DFF00]
                  "
                >
                  #{index + 1}
                </div>

                {member.avatar_url ? (

                  <img
                    src={member.avatar_url}
                    alt={member.full_name}
                    className="
                      w-14
                      h-14
                      rounded-full
                      object-cover
                    "
                  />

                ) : (

                  <div
                    className="
                      w-14
                      h-14
                      rounded-full
                      bg-white/10
                      flex
                      items-center
                      justify-center
                      font-black
                    "
                  >
                    {member.full_name?.charAt(0)}
                  </div>

                )}

                <div>

                  <h3 className="font-black text-xl">
                    {member.full_name}
                  </h3>

                  <p className="text-white/50">
                    Level {member.member_level || 1}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <div
                  className="
                    text-3xl
                    font-black
                    text-[#8DFF00]
                  "
                >
                  {member.breeze_points || 0}
                </div>

                <div className="text-white/50">
                  Breeze Points
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </main>
  );
}
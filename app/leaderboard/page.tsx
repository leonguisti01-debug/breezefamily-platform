"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LeaderboardPage() {
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

  const getRank = (points: number) => {
  if (points >= 10000) return "LEGEND";
  if (points >= 5000) return "PLATINUM";
  if (points >= 2500) return "GOLD";
  if (points >= 1000) return "SILVER";
  return "BRONZE";
};

const getRankImage = (points: number) => {
  const rank = getRank(points);

  switch (rank) {
    case "LEGEND":
      return "/ranks/legend.png";

    case "PLATINUM":
      return "/ranks/platinum.png";

    case "GOLD":
      return "/ranks/gold.png";

    case "SILVER":
      return "/ranks/silver.png";

    default:
      return "/ranks/bronze.png";
  }
};

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading Hall Of Legends...
      </main>
    );
  }

  const topThree = members.slice(0, 3);
  const remaining = members.slice(3);

  return (
    <main className="min-h-screen bg-black pt-[20px] pb-10">

      {/* HERO */}

      <section className="max-w-[1200px] mx-auto px-3 mb-6">

        <div
          className="
            rounded-[24px]
            overflow-hidden
            border
            border-[#8DFF00]/20
            bg-gradient-to-r
            from-black
            via-[#101900]
            to-black
          "
        >

          <div className="py-12 text-center">

            <h1
              className="
                text-4xl
                md:text-7xl
                font-black
                uppercase
                text-white
              "
            >
              HALL OF LEGENDS
            </h1>

            <p className="text-white/70 mt-3">
              Earn Breeze Points.
              Climb the ranks.
              Become a Legend.
            </p>

          </div>

        </div>

      </section>

      {/* TOP 3 */}

      <section className="max-w-[1200px] mx-auto px-3 mb-8">

        <div className="grid md:grid-cols-3 gap-4">

          {topThree.map((member, index) => (

            <div
              key={member.id}
              className="
                bg-[#050505]
                border
                border-[#8DFF00]/20
                rounded-[24px]
                p-6
                text-center
              "
            >

              <div className="text-[#8DFF00] font-black text-xl mb-4">
                #{index + 1}
              </div>

              <img
                src={getRankImage(member.breeze_points || 0)}
                alt={member.rank}
                className="
                  w-[140px]
                  mx-auto
                  mb-4
                "
              />

              <h2
                className="
                  text-2xl
                  font-black
                  uppercase
                  text-white
                "
              >
                {member.full_name}
              </h2>

              <div
                className="
                  text-[#8DFF00]
                  uppercase
                  font-bold
                  mt-2
                "
              >
                {member.rank || "BRONZE"}
              </div>

              <div
                className="
                  text-3xl
                  font-black
                  mt-4
                  text-white
                "
              >
                {member.breeze_points || 0}
              </div>

              <div className="text-white/50">
                Breeze Points
              </div>

            </div>

          ))}

        </div>

      </section>

      {/* REMAINING MEMBERS */}

      <section className="max-w-[1200px] mx-auto px-3">

        <div className="space-y-3">

          {remaining.map((member, index) => (

            <div
              key={member.id}
              className="
                bg-[#050505]
                border
                border-white/10
                rounded-[20px]
                p-4
                flex
                items-center
                justify-between
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className="
                    text-[#8DFF00]
                    font-black
                    text-xl
                    w-[50px]
                  "
                >
                  #{index + 4}
                </div>

                <img
                  src={getRankImage(member.rank)}
                  alt={getRank(member.breeze_points || 0)}
                  className="
                    w-[70px]
                  "
                />

                <div>

                  <div
                    className="
                      text-white
                      font-black
                      uppercase
                    "
                  >
                    {member.full_name}
                  </div>

                  <div
                    className="
                      text-[#8DFF00]
                      text-sm
                      uppercase
                    "
                  >
                    {getRank(member.breeze_points || 0)}
                  </div>

                </div>

              </div>

              <div className="text-right">

                <div
                  className="
                    text-2xl
                    font-black
                    text-white
                  "
                >
                  {member.breeze_points || 0}
                </div>

                <div className="text-white/50 text-sm">
                  BP
                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}
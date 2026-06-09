"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AchievementsPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [unlocked, setUnlocked] = useState<any[]>([]);

  useEffect(() => {
    loadAchievements();
  }, []);

  const unlockAchievement = async (
    memberId: string,
    achievementId: string
  ) => {
    const exists = unlocked.some(
      (a) => a.achievement_id === achievementId
    );

    if (exists) return;

    await supabase
      .from("member_achievements")
      .insert({
        member_id: memberId,
        achievement_id: achievementId,
      });
  };

  const loadAchievements = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data: member } = await supabase
      .from("members")
      .select("*")
      .eq("auth_user_id", user.id)
      .single();

    if (!member) {
      setLoading(false);
      return;
    }

    const { data: allAchievements } = await supabase
      .from("achievements")
      .select("*")
      .order("badge_name");

    const { data: currentUnlocked } = await supabase
      .from("member_achievements")
      .select("*")
      .eq("member_id", member.id);

    const unlockedList = currentUnlocked || [];

    setUnlocked(unlockedList);

    for (const achievement of allAchievements || []) {
      const name = achievement.badge_name;

      if (
        name === "First Steps" &&
        member.bio &&
        member.bio.trim() !== ""
      ) {
        await unlockAchievement(
          member.id,
          achievement.id
        );
      }

      if (
        name === "Social Butterfly" &&
        member.discord_username &&
        member.discord_username.trim() !== ""
      ) {
        await unlockAchievement(
          member.id,
          achievement.id
        );
      }

      if (
        name === "Rising Star" &&
        (member.breeze_points || 0) >= 100
      ) {
        await unlockAchievement(
          member.id,
          achievement.id
        );
      }

      if (
        name === "Breeze Elite" &&
        (member.breeze_points || 0) >= 1000
      ) {
        await unlockAchievement(
          member.id,
          achievement.id
        );
      }

      if (
        name === "Legend" &&
        (member.breeze_points || 0) >= 5000
      ) {
        await unlockAchievement(
          member.id,
          achievement.id
        );
      }
    }

    const { data: refreshedUnlocked } = await supabase
      .from("member_achievements")
      .select("*")
      .eq("member_id", member.id);

    setAchievements(allAchievements || []);
    setUnlocked(refreshedUnlocked || []);

    setLoading(false);
  };

  const isUnlocked = (achievementId: string) => {
    return unlocked.some(
      (badge) =>
        badge.achievement_id === achievementId
    );
  };
  console.log("ACHIEVEMENTS", achievements);
console.log("UNLOCKED", unlocked);

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

        <h1 className="text-5xl font-black mb-2">
          🎖 Achievements
        </h1>

        <p className="text-white/50 mb-10">
  {unlocked.length} / {achievements.length} Unlocked
</p>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {achievements.map((achievement) => {

            const unlockedBadge =
              isUnlocked(achievement.id);

            return (

              <div
                key={achievement.id}
                className={`
                  rounded-[28px]
                  p-6
                  border
                  ${
                    unlockedBadge
                      ? "border-[#8DFF00]/50 bg-[#8DFF00]/10"
                      : "border-white/10 bg-white/5"
                  }
                `}
              >

                <div className="text-5xl mb-4">
                  {achievement.badge_icon}
                </div>

                <h2 className="text-2xl font-black">
                  {achievement.badge_name}
                </h2>

                <p className="text-white/60 mt-2">
                  {achievement.badge_description}
                </p>

                <div className="mt-6">

                  {unlockedBadge ? (

                    <span className="px-4 py-2 rounded-full bg-[#8DFF00] text-black font-black">
                      UNLOCKED
                    </span>

                  ) : (

                    <span className="px-4 py-2 rounded-full bg-white/10 text-white">
                      LOCKED
                    </span>

                  )}

                </div>

              </div>

            );
          })}

        </div>

      </div>
    </main>
  );
}
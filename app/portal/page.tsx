"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const BREEZE_GREEN = "#8DFF00";

export default function PortalPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [memberName, setMemberName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [breezePoints, setBreezePoints] = useState(0);
const [memberLevel, setMemberLevel] = useState(1);
const [loginStreak, setLoginStreak] = useState(0);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("members")
        .select("*")
        .eq("auth_user_id", user.id)
        .single();

      if (data) {
  setMemberName(data.full_name || "");
  setAvatarUrl(data.avatar_url || "");
  setBreezePoints(data.breeze_points || 0);
  setMemberLevel(data.member_level || 1);
  setLoginStreak(data.login_streak || 0);
}

      setLoading(false);
    };

    loadUser();
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
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
      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="relative overflow-hidden rounded-[32px] border border-[#8DFF00]/20 mb-8">

          <img
            src="/portal_main.jpg"
            alt="Portal Banner"
            className="w-full h-[260px] md:h-[450px] object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute inset-0 flex items-center">

            <div className="p-8 md:p-12">

              <p className="uppercase tracking-[4px] text-[#8DFF00] text-sm font-bold">
                The Breeze Family
              </p>

              <h1 className="text-4xl md:text-7xl font-black uppercase mt-2">
                Welcome Back
              </h1>

              <h2 className="text-2xl md:text-5xl font-black text-[#8DFF00] mt-2">
                {memberName}
              </h2>

              <p className="text-white/70 mt-4 max-w-xl">
                Home of tournaments, rewards, community events and everything Breeze.
              </p>

            </div>

          </div>

        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-8">

  <div className="bg-white/5 border border-white/10 rounded-[24px] p-6">
    <p className="text-white/50">Breeze Points</p>
    <h3 className="text-4xl font-black text-[#8DFF00]">
      {breezePoints}
    </h3>
  </div>

  <div className="bg-white/5 border border-white/10 rounded-[24px] p-6">
    <p className="text-white/50">Member Level</p>
    <h3 className="text-4xl font-black">
      {memberLevel}
    </h3>
  </div>

  <div className="bg-white/5 border border-white/10 rounded-[24px] p-6">
    <p className="text-white/50">Login Streak</p>
    <h3 className="text-4xl font-black">
      🔥 {loginStreak}
    </h3>
  </div>

</div>

        {/* PROFILE + DISCORD */}

        <div className="grid lg:grid-cols-2 gap-6 mb-8">

          <div className="bg-white/5 border border-white/10 rounded-[28px] p-8">

            <div className="flex items-center gap-5">

              {avatarUrl ? (

                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="
                    w-24
                    h-24
                    rounded-full
                    object-cover
                    border
                    border-[#8DFF00]/30
                  "
                />

              ) : (

                <div className="w-24 h-24 rounded-full bg-[#8DFF00]/20 border border-[#8DFF00]/30 flex items-center justify-center text-4xl font-black text-[#8DFF00]">
                  {memberName?.charAt(0)}
                </div>

              )}

              <div>

                <p className="text-white/50 uppercase text-sm">
                  Breeze Family Member
                </p>

                <h3 className="text-3xl font-black">
                  {memberName}
                </h3>

                <div className="space-y-1 mt-1">
  <p className="text-white/50">
    ⭐ Level {memberLevel}
  </p>

  <p className="text-[#8DFF00] font-bold">
    🏆 {breezePoints} Breeze Points
  </p>

  <p className="text-orange-400">
    🔥 {loginStreak} Day Streak
  </p>
</div>

              </div>

            </div>

            <button
              onClick={() => router.push("/profile")}
              className="
                mt-6
                px-5
                py-3
                rounded-full
                bg-[#8DFF00]
                text-black
                font-black
              "
            >
              EDIT PROFILE
            </button>

          </div>

          <div className="bg-white/5 border border-[#8DFF00]/20 rounded-[28px] p-8">

            <h3 className="text-3xl font-black mb-2">
              💬 Discord Hub
            </h3>

            <p className="text-white/60 mb-5">
              Join the conversation and stay connected with the family.
            </p>

            <a
              href="https://discord.gg/cKbz3nQDV"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-block
                px-6
                py-3
                rounded-full
                bg-[#8DFF00]
                text-black
                font-black
              "
            >
              JOIN DISCORD
            </a>

          </div>

        </div>

        {/* TOURNAMENT */}

        <div className="rounded-[32px] border border-[#8DFF00]/30 bg-[#8DFF00]/10 p-8 mb-8">

          <p className="uppercase tracking-widest text-[#8DFF00] text-sm font-bold">
            Featured Tournament
          </p>

          <h2 className="text-4xl font-black mt-2">
            BREEZE FAMILY COD CHAMPIONSHIP
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-6">

            <div>
              <p className="text-white/60 text-sm">
                Prize Pool
              </p>

              <h3 className="text-4xl font-black">
                R5 000
              </h3>
            </div>

            <div>
              <p className="text-white/60 text-sm">
                Teams Registered
              </p>

              <h3 className="text-4xl font-black">
                24 / 32
              </h3>
            </div>

          </div>

        </div>

        {/* ACTIVITY + REWARDS */}

        <div className="grid lg:grid-cols-2 gap-6 mb-8">

          <div className="bg-white/5 border border-white/10 rounded-[28px] p-8">

            <h3 className="text-2xl font-black mb-6">
              🔥 Community Activity
            </h3>

            <div className="space-y-4">

              <div className="border-b border-white/10 pb-3">
                Leon joined the family
              </div>

              <div className="border-b border-white/10 pb-3">
                Sarah uploaded a prized pet
              </div>

              <div className="border-b border-white/10 pb-3">
                Team Alpha registered
              </div>

              <div className="border-b border-white/10 pb-3">
                New merchandise added
              </div>

              <div>
                Kill Of The Week voting opens Friday
              </div>

            </div>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-[28px] p-8">

            <h3 className="text-2xl font-black mb-6">
              🏆 Rewards Preview
            </h3>

            <div className="space-y-4">
              <div>🎖 Achievement Badges</div>
              <div>🏆 Breeze Points</div>
              <div>🎁 Exclusive Giveaways</div>
              <div>💬 Discord Perks</div>
            </div>

            <p className="text-white/50 mt-6">
              Coming Soon
            </p>

          </div>

        </div>

        {/* QUICK ACCESS */}

        <h3 className="text-3xl font-black mb-6">
          Quick Access
        </h3>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div
            onClick={() => router.push("/prized-pets")}
            className="cursor-pointer rounded-[24px] bg-white/5 border border-white/10 p-6 hover:border-[#8DFF00] transition"
          >
            <div className="text-4xl mb-3">🐾</div>
            <h4 className="font-black">Prized Pets</h4>
          </div>

          <div
            onClick={() => router.push("/family-members")}
            className="cursor-pointer rounded-[24px] bg-white/5 border border-white/10 p-6 hover:border-[#8DFF00] transition"
          >
            <div className="text-4xl mb-3">👨‍👩‍👧</div>
            <h4 className="font-black">Family Members</h4>
          </div>

          <div
            onClick={() => router.push("/tiktok-stars")}
            className="cursor-pointer rounded-[24px] bg-white/5 border border-white/10 p-6 hover:border-[#8DFF00] transition"
          >
            <div className="text-4xl mb-3">⭐</div>
            <h4 className="font-black">TikTok Stars</h4>
          </div>

          <div
            onClick={() => router.push("/kill-of-the-week")}
            className="cursor-pointer rounded-[24px] bg-white/5 border border-white/10 p-6 hover:border-[#8DFF00] transition"
          >
            <div className="text-4xl mb-3">🎬</div>
            <h4 className="font-black">Kill Of The Week</h4>
          </div>

        </div>

        <div className="mt-12 text-center">

          <button
            onClick={logout}
            className="px-8 py-4 rounded-full font-black text-black"
            style={{
              background: BREEZE_GREEN,
            }}
          >
            LOGOUT
          </button>

        </div>

      </div>
    </main>
  );
}
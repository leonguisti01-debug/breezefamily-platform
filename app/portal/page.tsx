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
        setMemberName(data.full_name);
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
      className="min-h-screen text-white px-6 py-8"
      style={{
        background:
          "radial-gradient(circle at top, rgba(141,255,0,0.12), #000 50%)",
      }}
    >
      <div className="max-w-7xl mx-auto">

        <div className="relative overflow-hidden rounded-[32px] border border-[#8DFF00]/20 bg-white/5 mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-[#8DFF00]/10 to-transparent" />

          <div className="relative p-8 md:p-12">
            <p className="uppercase tracking-[4px] text-[#8DFF00] text-sm">
              The Breeze Family
            </p>

            <h1 className="text-4xl md:text-6xl font-black uppercase mt-2">
              Welcome Back
            </h1>

            <h2 className="text-3xl md:text-5xl font-black text-[#8DFF00] mt-2">
              {memberName}
            </h2>

            <p className="text-white/60 mt-4">
              Community Member
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Breeze Points" value="0" />
          <StatCard title="Badges" value="0" />
          <StatCard title="Tournaments" value="0" />
          <StatCard title="Login Streak" value="1 Day" />
        </div>

        <div className="rounded-[28px] border border-[#8DFF00]/30 bg-[#8DFF00]/10 p-6 mb-8">
          <p className="uppercase text-sm tracking-widest text-[#8DFF00]">
            Daily Reward
          </p>

          <h3 className="text-3xl font-black mt-2">
            Claim Today's Reward
          </h3>

          <button
            className="
              mt-4
              bg-[#8DFF00]
              text-black
              px-6
              py-3
              rounded-full
              font-black
            "
          >
            Claim Reward
          </button>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <PortalCard
            icon="🐾"
            title="Prized Pets"
            description="Browse community pets"
            onClick={() => router.push("/prized-pets")}
          />

          <PortalCard
            icon="👨‍👩‍👧"
            title="Family Members"
            description="Meet the Breeze Family"
            onClick={() => router.push("/family-members")}
          />

          <PortalCard
            icon="⭐"
            title="TikTok Stars"
            description="Featured creators"
            onClick={() => router.push("/tiktok-stars")}
          />

          <PortalCard
            icon="🎮"
            title="Tournaments"
            description="Current competitions"
            onClick={() => router.push("/tournaments")}
          />

        </div>

        <div className="mt-10">
          <button
            onClick={logout}
            className="
              px-8
              py-4
              rounded-full
              font-black
              text-black
            "
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
}function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-[24px] p-6">
      <p className="text-sm text-white/60">
        {title}
      </p>

      <h3 className="text-3xl font-black mt-2">
        {value}
      </h3>
    </div>
  );
}

function PortalCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer
        rounded-[28px]
        bg-white/5
        border
        border-white/10
        p-8
        hover:border-[#8DFF00]
        hover:-translate-y-1
        transition
      "
    >
      <div className="text-5xl mb-4">
        {icon}
      </div>

      <h3 className="text-2xl font-black">
        {title}
      </h3>

      <p className="text-white/60 mt-2">
        {description}
      </p>
    </div>
  );
}
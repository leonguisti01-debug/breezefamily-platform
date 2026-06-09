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
            className="w-full h-[250px] md:h-[400px] object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />

          <div className="absolute inset-0 flex items-center">

            <div className="p-8 md:p-12">

              <p className="uppercase tracking-[4px] text-[#8DFF00] text-sm font-bold">
                The Breeze Family
              </p>

              <h1 className="text-4xl md:text-6xl font-black uppercase mt-2">
                Welcome Back
              </h1>

              <h2 className="text-2xl md:text-5xl font-black text-[#8DFF00] mt-2">
                {memberName}
              </h2>

            </div>

          </div>

        </div>

        {/* PROFILE + DISCORD */}

        <div className="grid lg:grid-cols-2 gap-6 mb-8">

          <div className="bg-white/5 border border-white/10 rounded-[28px] p-8">

            <div className="flex items-center gap-5">

              <div className="w-20 h-20 rounded-full bg-[#8DFF00]/20 border border-[#8DFF00]/30 flex items-center justify-center text-3xl font-black text-[#8DFF00]">

                {memberName?.charAt(0)}

              </div>

              <div>

                <p className="text-white/50 uppercase text-sm">
                  Breeze Family Member
                </p>

                <h3 className="text-2xl font-black">
                  {memberName}
                </h3>

                <p className="text-white/50">
                  Welcome Home
                </p>

              </div>

            </div>

          </div>

          <div className="bg-white/5 border border-[#8DFF00]/20 rounded-[28px] p-8">

            <h3 className="text-2xl font-black mb-2">
              💬 Discord Hub
            </h3>

            <p className="text-white/60 mb-4">
              Join the conversation and stay connected with the family.
            </p>

            <a
              href="https://discord.gg/cKbz3nQDV"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-full font-black text-black"
              style={{
                background: BREEZE_GREEN,
              }}
            >
              JOIN DISCORD
            </a>

          </div>

        </div>

        {/* MAIN CARDS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          <PortalCard
            icon="🎮"
            title="COD Tournament"
            description="View tournaments and rankings."
            onClick={() => router.push("/tournaments")}
          />

          <PortalCard
            icon="🎬"
            title="Kill Of The Week"
            description="Vote and submit your best clips."
            onClick={() => router.push("/kill-of-the-week")}
          />

          <PortalCard
            icon="🐾"
            title="Prized Pets"
            description="Browse our furry family members."
            onClick={() => router.push("/prized-pets")}
          />

          <PortalCard
            icon="👨‍👩‍👧"
            title="Family Members"
            description="Meet the Breeze Family."
            onClick={() => router.push("/family-members")}
          />

          <PortalCard
            icon="⭐"
            title="TikTok Stars"
            description="Featured creators and content."
            onClick={() => router.push("/tiktok-stars")}
          />

          <PortalCard
            icon="🏆"
            title="Coming Soon"
            description="Points, badges and rewards."
            onClick={() => {}}
          />

        </div>        {/* LOGOUT */}

        <div className="mt-10 text-center">

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
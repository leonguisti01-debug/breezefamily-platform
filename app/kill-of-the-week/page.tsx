"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const BREEZE_GREEN = "#8DFF00";

export default function KillOfTheWeekPage() {
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const [clips, setClips] = useState<any[]>([]);

  useEffect(() => {
    loadClips();
  }, []);

  const loadClips = async () => {
    const { data } = await supabase
      .from("kill_of_the_week")
      .select("*")
      .order("votes", { ascending: false });

    setClips(data || []);
    setLoading(false);
  };

  const submitClip = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login.");
      return;
    }

    if (!title || !url) {
      alert("Complete all fields.");
      return;
    }

    const { data: member } = await supabase
      .from("members")
      .select("*")
      .eq("auth_user_id", user.id)
      .single();

    if (!member) {
      alert("Member not found.");
      return;
    }

    const currentWeek = Math.ceil(
      (new Date().getDate() +
        new Date(
          new Date().getFullYear(),
          0,
          1
        ).getDay()) /
        7
    );

    await supabase
      .from("kill_of_the_week")
      .insert({
        member_id: member.id,
        clip_title: title,
        clip_url: url,
        week_number: currentWeek,
      });

    await supabase
      .from("members")
      .update({
        breeze_points:
          (member.breeze_points || 0) + 50,
      })
      .eq("id", member.id);

    await supabase
      .from("points_log")
      .insert({
        member_id: member.id,
        points: 50,
        reason: "Kill Of The Week Submission",
      });

    await supabase
      .from("activity_feed")
      .insert({
        member_id: member.id,
        activity_type: "kotw_upload",
        activity_text:
          "Submitted a Kill Of The Week clip",
      });

    setTitle("");
    setUrl("");

    loadClips();

    alert("Clip submitted!");
  };

  const voteForClip = async (clip: any) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login.");
      return;
    }

    const { data: member } = await supabase
      .from("members")
      .select("*")
      .eq("auth_user_id", user.id)
      .single();

    if (!member) {
      return;
    }

    const { data: existingVote } =
      await supabase
        .from("kill_of_the_week_votes")
        .select("*")
        .eq("clip_id", clip.id)
        .eq("member_id", member.id)
        .single();

    if (existingVote) {
      alert("You already voted.");
      return;
    }

    await supabase
      .from("kill_of_the_week_votes")
      .insert({
        clip_id: clip.id,
        member_id: member.id,
      });

    await supabase
      .from("kill_of_the_week")
      .update({
        votes: clip.votes + 1,
      })
      .eq("id", clip.id);

    await supabase
      .from("members")
      .update({
        breeze_points:
          (member.breeze_points || 0) + 5,
      })
      .eq("id", member.id);

    await supabase
      .from("points_log")
      .insert({
        member_id: member.id,
        points: 5,
        reason: "Kill Of The Week Vote",
      });

    loadClips();
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
      className="min-h-screen px-6 py-10 text-white"
      style={{
        background:
          "radial-gradient(circle at top, rgba(141,255,0,0.10), #000 50%)",
      }}
    >
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-black uppercase mb-2">
          🎬 Kill Of The Week
        </h1>

        <p className="text-white/60 mb-10">
          Upload your best clip and earn Breeze Points.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 mb-10">

          <h2 className="text-3xl font-black mb-6">
            Submit Your Clip
          </h2>

          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Clip Title"
            className="
              w-full
              p-4
              rounded-xl
              bg-black
              border
              border-white/10
              mb-4
            "
          />

          <input
            value={url}
            onChange={(e) =>
              setUrl(e.target.value)
            }
            placeholder="YouTube / TikTok / Streamable URL"
            className="
              w-full
              p-4
              rounded-xl
              bg-black
              border
              border-white/10
              mb-6
            "
          />

          <button
            onClick={submitClip}
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
            SUBMIT CLIP
          </button>

        </div>

        <h2 className="text-3xl font-black mb-6">
          Current Leaderboard
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {clips.map((clip) => (

            <div
              key={clip.id}
              className="
                bg-white/5
                border
                border-white/10
                rounded-[28px]
                p-6
              "
            >

              <h3 className="text-2xl font-black mb-3">
                {clip.clip_title}
              </h3>

              <p className="text-[#8DFF00] text-xl font-bold mb-4">
                {clip.votes} Votes
              </p>

              <a
                href={clip.clip_url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-white/70"
              >
                Watch Clip
              </a>

              <div className="mt-6">

                <button
                  onClick={() =>
                    voteForClip(clip)
                  }
                  className="
                    px-6
                    py-3
                    rounded-full
                    font-black
                    text-black
                  "
                  style={{
                    background:
                      BREEZE_GREEN,
                  }}
                >
                  VOTE
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </main>
  );
}
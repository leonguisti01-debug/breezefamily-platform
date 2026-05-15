"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function JudgeAdminPage() {

  const router = useRouter();

  const [judges, setJudges] = useState<any[]>([]);

  useEffect(() => {

    const auth = localStorage.getItem("judge-admin-auth");

    if (auth !== "true") {

      router.push("/judge-admin-login");

    }

    fetchJudges();

  }, []);

  const fetchJudges = async () => {

    const { data } = await supabase
      .from("fan_favorite_judges")
      .select("*")
      .order("name", { ascending: true });

    if (data) {
      setJudges(data);
    }

  };

  const uploadVideo = async (
    e: any,
    judgeId: number
  ) => {

    const file = e.target.files[0];

    if (!file) return;

    const fileExt = file.name.split(".").pop();

    const fileName = `judge-${judgeId}-${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("judges")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {

      console.log(error);
      alert(error.message);
      return;

    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("judges")
      .getPublicUrl(fileName);

    const { error: updateError } = await supabase
      .from("fan_favorite_judges")
      .update({
        video_url: publicUrl,
      })
      .eq("id", judgeId);

    if (updateError) {

      console.log(updateError);
      alert(updateError.message);
      return;

    }

    fetchJudges();

    alert("Video uploaded successfully");

  };

  const eliminateJudge = async (
    judgeId: number
  ) => {

    await supabase
      .from("fan_favorite_judges")
      .update({
        eliminated: true,
      })
      .eq("id", judgeId);

    fetchJudges();

  };

  const reinstateJudge = async (
    judgeId: number
  ) => {

    await supabase
      .from("fan_favorite_judges")
      .update({
        eliminated: false,
      })
      .eq("id", judgeId);

    fetchJudges();

  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">

      <h1 className="text-5xl font-black text-yellow-400 text-center mb-16">
        JUDGE ADMIN
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        {judges.map((judge) => (

          <div
            key={judge.id}
            className="rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
          >

            {/* VIDEO */}
            <div className="h-[420px] overflow-hidden bg-black">

              {judge.video_url ? (

                <video
                  src={judge.video_url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />

              ) : (

                <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold">
                  NO VIDEO
                </div>

              )}

            </div>

            {/* INFO */}
            <div className="p-6">

              <h2 className="text-3xl font-black text-white">
                {judge.name}
              </h2>

              {/* UPLOAD */}
              <div className="mt-6">

                <input
                  type="file"
                  accept="video/mp4,video/mov"
                  onChange={(e) =>
                    uploadVideo(e, judge.id)
                  }
                  className="w-full"
                />

              </div>

              {/* STATUS */}
              <div className="mt-6">

                {judge.eliminated ? (

                  <div className="space-y-4">

                    <div className="w-full px-5 py-4 rounded-2xl bg-gray-700 text-gray-300 font-black text-center">
                      ELIMINATED
                    </div>

                    <button
                      onClick={() =>
                        reinstateJudge(judge.id)
                      }
                      className="w-full px-5 py-4 rounded-2xl bg-green-500 hover:bg-green-400 transition font-black"
                    >
                      RE-INSTATE
                    </button>

                  </div>

                ) : (

                  <button
                    onClick={() =>
                      eliminateJudge(judge.id)
                    }
                    className="w-full px-5 py-4 rounded-2xl bg-red-500 hover:bg-red-400 transition font-black"
                  >
                    ELIMINATE JUDGE
                  </button>

                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}
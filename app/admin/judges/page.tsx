"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const BREEZE_GREEN = "#8DFF00";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminJudgesPage() {

  const router = useRouter();

  const [judges, setJudges] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchJudges();

  }, []);

  const fetchJudges =
    async () => {

      const {
        data,
        error,
      } = await supabase
        .from("fan_favorite_judges")
        .select("*")
        .order(
          "votes",
          {
            ascending: false,
          }
        );

      if (!error && data) {

        setJudges(data);

      }

      setLoading(false);

    };

  const updateStatus =
    async (
      id: number,
      status: string
    ) => {

      await supabase
        .from("fan_favorite_judges")
        .update({
          status,
        })
        .eq("id", id);

      fetchJudges();

    };

  const uploadVideo =
    async (
      file: File,
      judgeId: number
    ) => {

      const fileName =
        `${Date.now()}-${file.name}`;

      await supabase.storage
        .from("judges")
        .upload(
          fileName,
          file
        );

      const {
        data,
      } = supabase.storage
        .from("judges")
        .getPublicUrl(
          fileName
        );

      await supabase
        .from("fan_favorite_judges")
        .update({
          video_url:
            data.publicUrl,
        })
        .eq(
          "id",
          judgeId
        );

      fetchJudges();

    };

  return (

    <main className="min-h-screen bg-black text-white px-4 py-20">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-10">

          <div>

            <p
              className="uppercase tracking-[4px] text-xs"
              style={{
                color:
                  BREEZE_GREEN,
              }}
            >
              Admin
            </p>

            <h1 className="text-5xl md:text-7xl font-black uppercase">
              Fan Favourite Judges
            </h1>

          </div>

          <button
            onClick={() =>
              router.push(
                "/admin-v2"
              )
            }
            className="px-6 py-4 rounded-2xl font-black text-black"
            style={{
              background:
                BREEZE_GREEN,
              }}
          >
            Back
          </button>

        </div>

        {loading ? (

          <div className="text-center py-20">
            Loading Judges...
          </div>

        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

            {judges.map(
              (judge) => (

                <div
                  key={judge.id}
                  className="rounded-[30px] overflow-hidden border border-white/10 bg-white/5"
                >

                  {judge.video_url ? (

                    <video
                      src={judge.video_url}
                      controls
                      muted
                      playsInline
                      className="w-full h-[300px] object-cover"
                    />

                  ) : (

                    <div className="h-[300px] bg-black flex items-center justify-center text-white/30">
                      No Video
                    </div>

                  )}

                  <div className="p-5">

                    <h2 className="text-2xl font-black uppercase">
                      {judge.name}
                    </h2>

                    <p className="mt-2 text-pink-300 font-bold">
                      Votes: {judge.votes || 0}
                    </p>

                    <p className="mt-2 text-white/50 uppercase text-xs">
                      Status: {judge.status || "pending"}
                    </p>

                    <label className="block mt-5">

                      <input
                        type="file"
                        accept="video/mp4"
                        className="hidden"
                        onChange={(e) => {

                          const file =
                            e.target.files?.[0];

                          if (!file)
                            return;

                          uploadVideo(
                            file,
                            judge.id
                          );

                        }}
                      />

                      <div className="cursor-pointer py-3 rounded-xl bg-white text-black text-center font-black uppercase">
                        Upload Video
                      </div>

                    </label>

                    <div className="mt-4 grid gap-2">

                      <button
                        onClick={() =>
                          updateStatus(
                            judge.id,
                            "safe"
                          )
                        }
                        className="py-3 rounded-xl bg-green-500 text-black font-black"
                      >
                        Safe
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            judge.id,
                            "eliminated"
                          )
                        }
                        className="py-3 rounded-xl bg-red-500 text-white font-black"
                      >
                        Eliminated
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            judge.id,
                            "disqualified"
                          )
                        }
                        className="py-3 rounded-xl bg-pink-500 text-white font-black"
                      >
                        Disqualified
                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </main>

  );

}
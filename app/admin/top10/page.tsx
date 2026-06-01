"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const BREEZE_GREEN = "#8DFF00";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminTop10Page() {

  const router = useRouter();

  const [contestants, setContestants] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchContestants();

  }, []);

  const fetchContestants =
    async () => {

      const {
        data,
        error,
      } = await supabase
        .from("season2_finalists")
        .select("*")
        .order(
          "votes",
          {
            ascending: false,
          }
        );

      if (!error && data) {

        setContestants(data);

      }

      setLoading(false);

    };

  const updateStatus =
    async (
      id: number,
      status: string
    ) => {

      await supabase
        .from("season2_finalists")
        .update({
          status,
        })
        .eq("id", id);

      fetchContestants();

    };

  const uploadImage =
    async (
      file: File,
      contestantId: number
    ) => {

      const fileName =
        `${Date.now()}-${file.name}`;

      await supabase.storage
        .from("contestant-photos")
        .upload(
          fileName,
          file
        );

      const {
        data,
      } = supabase.storage
        .from("contestant-photos")
        .getPublicUrl(
          fileName
        );

      await supabase
        .from("season2_finalists")
        .update({
          image_url:
            data.publicUrl,
        })
        .eq(
          "id",
          contestantId
        );

      fetchContestants();

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
              Top 10 Finalists
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
            Loading Finalists...
          </div>

        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

            {contestants.map(
              (contestant) => (

                <div
                  key={contestant.id}
                  className="rounded-[30px] overflow-hidden border border-white/10 bg-white/5"
                >

                  {contestant.image_url ? (

                    <img
                      src={contestant.image_url}
                      alt={contestant.name}
                      className="w-full h-[300px] object-cover"
                    />

                  ) : (

                    <div className="h-[300px] bg-black flex items-center justify-center text-white/30">
                      No Image
                    </div>

                  )}

                  <div className="p-5">

                    <h2 className="text-2xl font-black uppercase">
                      {contestant.name}
                    </h2>

                    <p className="mt-2 text-[#8DFF00] font-bold">
                      Votes: {contestant.votes || 0}
                    </p>

                    <p className="mt-2 text-white/50 uppercase text-xs">
                      Status: {contestant.status || "pending"}
                    </p>

                    <label className="block mt-5">

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {

                          const file =
                            e.target.files?.[0];

                          if (!file)
                            return;

                          uploadImage(
                            file,
                            contestant.id
                          );

                        }}
                      />

                      <div className="cursor-pointer py-3 rounded-xl bg-white text-black text-center font-black uppercase">
                        Upload Photo
                      </div>

                    </label>

                    <div className="mt-4 grid gap-2">

                      <button
                        onClick={() =>
                          updateStatus(
                            contestant.id,
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
                            contestant.id,
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
                            contestant.id,
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
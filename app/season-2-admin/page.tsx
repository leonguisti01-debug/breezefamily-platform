"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Season2AdminPage() {

  const router = useRouter();

  const [finalists, setFinalists] = useState<any[]>([]);

  useEffect(() => {

    const auth = localStorage.getItem("season2-admin-auth");

    if (auth !== "true") {

      router.push("/season-2-admin-login");

    }

    fetchFinalists();

  }, []);

  const fetchFinalists = async () => {

    const { data } = await supabase
      .from("season2_finalists")
      .select("*")
      .order("id");

    if (data) {
      setFinalists(data);
    }

  };

  const uploadImage = async (
    e: any,
    finalistId: number
  ) => {

    const file = e.target.files[0];

    if (!file) return;

    const fileName = `finalist-${finalistId}-${Date.now()}`;

    const { error: uploadError } = await supabase.storage
      .from("season2")
      .upload(fileName, file);

    if (uploadError) {

      console.log(uploadError);
      alert("Upload failed");
      return;

    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("season2")
      .getPublicUrl(fileName);

    await supabase
      .from("season2_finalists")
      .update({
        image_url: publicUrl,
      })
      .eq("id", finalistId);

    fetchFinalists();

  };

  const eliminateContestant = async (
    finalistId: number
  ) => {

    await supabase
      .from("season2_finalists")
      .update({
        eliminated: true,
      })
      .eq("id", finalistId);

    fetchFinalists();

  };

  const reinstateContestant = async (
    finalistId: number
  ) => {

    await supabase
      .from("season2_finalists")
      .update({
        eliminated: false,
      })
      .eq("id", finalistId);

    fetchFinalists();

  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">

      <h1 className="text-5xl font-black text-cyan-400 text-center mb-16">
        SEASON 2 ADMIN
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        {finalists.map((finalist) => (

          <div
            key={finalist.id}
            className="rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
          >

            {/* IMAGE */}
            <div className="h-[320px] overflow-hidden bg-black/30">

              {finalist.image_url ? (

                <img
                  src={finalist.image_url}
                  alt={finalist.name}
                  className="w-full h-full object-cover"
                />

              ) : (

                <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold">
                  NO IMAGE
                </div>

              )}

            </div>

            {/* INFO */}
            <div className="p-6">

              <h2 className="text-3xl font-black text-white">
                {finalist.name}
              </h2>

              <div className="mt-6">

                <input
                  type="file"
                  onChange={(e) =>
                    uploadImage(e, finalist.id)
                  }
                  className="w-full"
                />

              </div>

              {/* STATUS */}
              <div className="mt-6">

                {finalist.eliminated ? (

                  <div className="space-y-4">

                    <div className="w-full px-5 py-4 rounded-2xl bg-gray-700 text-gray-300 font-black text-center">
                      ELIMINATED
                    </div>

                    <button
                      onClick={() =>
                        reinstateContestant(finalist.id)
                      }
                      className="w-full px-5 py-4 rounded-2xl bg-green-500 hover:bg-green-400 transition font-black"
                    >
                      RE-INSTATE
                    </button>

                  </div>

                ) : (

                  <button
                    onClick={() =>
                      eliminateContestant(finalist.id)
                    }
                    className="w-full px-5 py-4 rounded-2xl bg-red-500 hover:bg-red-400 transition font-black"
                  >
                    ELIMINATE CONTESTANT
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
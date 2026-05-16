"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function AdminPage() {
  const [contestants, setContestants] = useState<any[]>([]);
  const [season2Contestants, setSeason2Contestants] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  /* SEASON 2 FORM */
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  /* LOAD */
  useEffect(() => {
    fetchContestants();
    fetchSeason2Contestants();
  }, []);

  /* KIDS */
  const fetchContestants = async () => {
    const { data } = await supabase
      .from("contestants")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setContestants(data);
  };

  /* SEASON 2 */
  const fetchSeason2Contestants = async () => {
    const { data } = await supabase
      .from("season2_finalists")
      .select("*")
      .order("votes", { ascending: false });

    if (data) setSeason2Contestants(data);

    setLoading(false);
  };

  /* UPDATE KIDS STATUS */
  const updateStatus = async (
    id: number,
    status: string
  ) => {
    await supabase
      .from("contestants")
      .update({ status })
      .eq("id", id);

    fetchContestants();
  };

  /* ADD SEASON 2 FINALIST */
  const addSeason2Contestant = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    let photoUrl = "";

    if (photo) {
      const fileName = `${Date.now()}-${photo.name}`;

      await supabase.storage
        .from("contestant-photos")
        .upload(fileName, photo);

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("contestant-photos")
        .getPublicUrl(fileName);

      photoUrl = publicUrl;
    }

    await supabase
      .from("season2_finalists")
      .insert([
        {
          name: name,
          image_url: photoUrl,
          votes: 0,
          eliminated: false,
          status: "safe",
        },
      ]);

    setName("");
    setPhoto(null);

    fetchSeason2Contestants();
  };

  /* UPDATE FINALIST STATUS */
  const updateFinalistStatus = async (
    id: number,
    status: string,
    eliminated: boolean
  ) => {
    await supabase
      .from("season2_finalists")
      .update({
        status,
        eliminated,
      })
      .eq("id", id);

    fetchSeason2Contestants();
  };

  /* RESET VOTES */
  const resetVotes = async () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset ALL Season 2 votes?"
    );

    if (!confirmReset) return;

    await supabase
      .from("season2_finalists")
      .update({
        votes: 0,
      })
      .neq("id", 0);

    localStorage.removeItem(
      "season2_voted"
    );

    fetchSeason2Contestants();

    alert("All votes have been reset.");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-black uppercase">
          Loading Admin...
        </h1>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen text-white"
      style={{
        background:
          "radial-gradient(circle at top, rgba(50,255,50,0.18), transparent 35%), #050505",
      }}
    >
      <div className="px-6 py-20 max-w-7xl mx-auto">

        {/* HEADER */}
        <div>

          <p className="uppercase tracking-[4px] text-green-300 text-sm">
            Breeze Family
          </p>

          <h1 className="mt-3 text-5xl md:text-7xl font-black uppercase">
            Admin Dashboard
          </h1>

        </div>

        {/* SEASON 2 */}
        <section className="mt-20">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <h2 className="text-4xl font-black uppercase">
              Season 2 Top 10
            </h2>

            {/* RESET BUTTON */}
            <button
              onClick={resetVotes}
              className="px-8 py-4 rounded-2xl bg-red-500/10 border border-red-400/20 text-red-300 font-black hover:bg-red-500/20 transition"
            >
              RESET ALL VOTES
            </button>

          </div>

          {/* FORM */}
          <form
            onSubmit={addSeason2Contestant}
            className="mt-10 bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6"
          >

            {/* NAME */}
            <div>

              <label className="block mb-3 uppercase text-sm tracking-[3px] text-white/70">
                Finalist Name
              </label>

              <input
                type="text"
                required
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white"
              />

            </div>

            {/* PHOTO */}
            <div>

              <label className="block mb-3 uppercase text-sm tracking-[3px] text-white/70">
                Upload Photo
              </label>

              <input
                type="file"
                required
                accept="image/*"
                onChange={(e) =>
                  setPhoto(
                    e.target.files?.[0] || null
                  )
                }
                className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white"
              />

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-cyan-400 to-pink-500 text-black font-black text-lg"
            >
              ADD FINALIST
            </button>

          </form>

          {/* FINALISTS */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

            {season2Contestants.map((contestant) => (
              <div
                key={contestant.id}
                className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
              >

                {/* IMAGE */}
                <div className="aspect-square overflow-hidden">

                  <img
                    src={
                      contestant.image_url ||
                      "/contestant-placeholder.jpg"
                    }
                    alt={contestant.name}
                    className="w-full h-full object-cover"
                  />

                </div>

                {/* CONTENT */}
                <div className="p-6 text-center">

                  {/* STATUS */}
                  <div
                    className={`inline-block px-4 py-2 rounded-full text-xs uppercase tracking-[3px] border ${
                      contestant.status === "safe"
                        ? "bg-green-500/10 border-green-400/20 text-green-300"
                        : contestant.status === "eliminated"
                        ? "bg-red-500/10 border-red-400/20 text-red-300"
                        : contestant.status === "re-instated"
                        ? "bg-cyan-500/10 border-cyan-400/20 text-cyan-300"
                        : "bg-white/10 border-white/10 text-white"
                    }`}
                  >
                    {contestant.status || "safe"}
                  </div>

                  {/* NAME */}
                  <h3 className="mt-5 text-3xl font-black uppercase">
                    {contestant.name}
                  </h3>

                  {/* VOTES */}
                  <div className="mt-5 px-5 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/20">

                    <p className="text-cyan-300 uppercase tracking-[3px] text-xs">
                      Live Votes
                    </p>

                    <p className="text-3xl font-black mt-2">
                      {contestant.votes || 0}
                    </p>

                  </div>

                  {/* BUTTONS */}
                  <div className="mt-8 grid grid-cols-1 gap-3">

                    {/* SAFE */}
                    <button
                      onClick={() =>
                        updateFinalistStatus(
                          contestant.id,
                          "safe",
                          false
                        )
                      }
                      className="py-3 rounded-2xl bg-green-500/10 border border-green-400/20 hover:bg-green-500/20 transition"
                    >
                      Safe
                    </button>

                    {/* ELIMINATED */}
                    <button
                      onClick={() =>
                        updateFinalistStatus(
                          contestant.id,
                          "eliminated",
                          true
                        )
                      }
                      className="py-3 rounded-2xl bg-red-500/10 border border-red-400/20 hover:bg-red-500/20 transition"
                    >
                      Eliminated
                    </button>

                    {/* RE-INSTATED */}
                    <button
                      onClick={() =>
                        updateFinalistStatus(
                          contestant.id,
                          "re-instated",
                          false
                        )
                      }
                      className="py-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 hover:bg-cyan-500/20 transition"
                    >
                      Re-Instated
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </section>

        {/* KIDS */}
        <section className="mt-24">

          <h2 className="text-4xl font-black uppercase">
            Kids Contestants
          </h2>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

            {contestants.map((contestant) => (
              <div
                key={contestant.id}
                className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
              >

                {/* PHOTO */}
                <div className="aspect-square overflow-hidden">

                  <img
                    src={
                      contestant.photo_url ||
                      "/contestant-placeholder.jpg"
                    }
                    alt={contestant.full_name}
                    className="w-full h-full object-cover"
                  />

                </div>

                {/* CONTENT */}
                <div className="p-6">

                  <div className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-400/20 text-green-300 text-xs uppercase tracking-[3px]">
                    {contestant.status || "pending"}
                  </div>

                  <h2 className="mt-5 text-3xl font-black uppercase">
                    {contestant.full_name}
                  </h2>

                  <div className="mt-5 space-y-3 text-white/70">

                    <p>
                      <span className="text-white font-bold">
                        Age:
                      </span>{" "}
                      {contestant.age}
                    </p>

                    <p>
                      <span className="text-white font-bold">
                        TikTok:
                      </span>{" "}
                      @{contestant.tiktok_username}
                    </p>

                  </div>

                  {/* BUTTONS */}
                  <div className="mt-8 grid grid-cols-2 gap-3">

                    <button
                      onClick={() =>
                        updateStatus(
                          contestant.id,
                          "approved"
                        )
                      }
                      className="py-3 rounded-2xl bg-green-500/10 border border-green-400/20"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          contestant.id,
                          "declined"
                        )
                      }
                      className="py-3 rounded-2xl bg-red-500/10 border border-red-400/20"
                    >
                      Decline
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          contestant.id,
                          "through"
                        )
                      }
                      className="py-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/20"
                    >
                      Through
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          contestant.id,
                          "out"
                        )
                      }
                      className="py-3 rounded-2xl bg-yellow-500/10 border border-yellow-400/20"
                    >
                      Out
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          contestant.id,
                          "disqualified"
                        )
                      }
                      className="col-span-2 py-3 rounded-2xl bg-pink-500/10 border border-pink-400/20"
                    >
                      Disqualified
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </section>

      </div>

    </main>
  );
}
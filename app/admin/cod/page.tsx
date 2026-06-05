"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminCodPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [userEmail, setUserEmail] =
    useState("");

  const [players, setPlayers] =
    useState<any[]>([]);

  useEffect(() => {
    checkAccess();
  }, []);

  async function checkAccess() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      router.push(
        "/admin/login"
      );

      return;
    }

    const { data: admin } =
      await supabase
        .from("admin_users")
        .select("*")
        .eq(
          "email",
          user.email
        )
        .single();

    if (!admin) {

      alert(
        "Access Denied"
      );

      router.push("/");

      return;
    }

    setUserEmail(
      user.email || ""
    );

    await loadPlayers();

    setLoading(false);
  }

  async function loadPlayers() {

    const { data } =
      await supabase
        .from("cod_players")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    setPlayers(data || []);
  }

  async function approvePlayer(
    id: number
  ) {

    await supabase
      .from("cod_players")
      .update({
        status:
          "approved",
      })
      .eq("id", id);

    loadPlayers();
  }

  async function rejectPlayer(
    id: number
  ) {

    await supabase
      .from("cod_players")
      .update({
        status:
          "rejected",
      })
      .eq("id", id);

    loadPlayers();
  }

  async function logout() {

    await supabase.auth.signOut();

    router.push(
      "/admin/login"
    );
  }

  if (loading) {

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  const pending =
    players.filter(
      (p) =>
        p.status ===
          "pending" ||
        !p.status
    );

  const approved =
    players.filter(
      (p) =>
        p.status ===
        "approved"
    );

  const rejected =
    players.filter(
      (p) =>
        p.status ===
        "rejected"
    );

  return (

    <main className="min-h-screen bg-black text-white p-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-5xl font-black">
              COD ADMIN
            </h1>

            <p className="text-white/60 mt-2">
              {userEmail}
            </p>

          </div>

          <button
            onClick={logout}
            className="
              bg-red-600
              px-5
              py-3
              rounded-xl
              font-bold
            "
          >
            LOGOUT
          </button>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="border border-[#8DFF00]/20 rounded-3xl p-6">
            <div className="text-white/60">
              Pending
            </div>

            <div className="text-5xl font-black text-[#8DFF00]">
              {pending.length}
            </div>
          </div>

          <div className="border border-[#8DFF00]/20 rounded-3xl p-6">
            <div className="text-white/60">
              Approved
            </div>

            <div className="text-5xl font-black text-[#8DFF00]">
              {approved.length}
            </div>
          </div>

          <div className="border border-[#8DFF00]/20 rounded-3xl p-6">
            <div className="text-white/60">
              Rejected
            </div>

            <div className="text-5xl font-black text-[#8DFF00]">
              {rejected.length}
            </div>
          </div>

        </div>

        <h2 className="text-3xl font-black mt-16 mb-6">
          PENDING APPROVAL
        </h2>

        <div className="grid gap-4">

          {pending.map(
            (player) => (

              <div
                key={player.id}
                className="
                  border
                  border-white/10
                  rounded-2xl
                  p-6
                "
              >

                <div className="font-black text-xl">
                  {player.player_name}
                </div>

                <div className="mt-2 text-white/70">
                  Team {player.team_id}
                </div>

                <div className="text-white/70">
                  {player.platform}
                </div>

                <div className="text-white/70">
                  {player.activision_id}
                </div>

                <div className="text-white/70">
                  {player.email}
                </div>

                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() =>
                      approvePlayer(
                        player.id
                      )
                    }
                    className="
                      bg-[#8DFF00]
                      text-black
                      font-black
                      px-5
                      py-3
                      rounded-xl
                    "
                  >
                    APPROVE
                  </button>

                  <button
                    onClick={() =>
                      rejectPlayer(
                        player.id
                      )
                    }
                    className="
                      bg-red-600
                      text-white
                      font-black
                      px-5
                      py-3
                      rounded-xl
                    "
                  >
                    REJECT
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </main>
  );
}
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

    if (
      !admin ||
      !admin.active ||
      (
        admin.role !== "super_admin" &&
        admin.role !== "cod_admin"
      )
    ) {

      alert(
        "Access Denied"
      );

      router.push(
        "/cod-admin/login"
      );

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
          "team_id",
          {
            ascending: true,
          }
        );

    setPlayers(
      data || []
    );
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
      .eq(
        "id",
        id
      );

    loadPlayers();
  }

  async function disqualifyPlayer(
  id: number
) {

  const confirmed =
    window.confirm(
      "Disqualify this player and free their slot?"
    );

  if (!confirmed) return;

  await supabase
    .from("cod_players")
    .update({
      status: "disqualified",
      team_id: null,
    })
    .eq(
      "id",
      id
    );

  loadPlayers();
}

  async function reinstatePlayer(
    id: number
  ) {

    await supabase
      .from("cod_players")
      .update({
        status:
          "approved",
      })
      .eq(
        "id",
        id
      );

    loadPlayers();
  }
async function changeTeam(
  playerId: number,
  teamId: number
) {
  await supabase
    .from("cod_players")
    .update({
      team_id: teamId,
    })
    .eq("id", playerId);

  loadPlayers();
}

async function toggleCaptain(
  playerId: number,
  currentValue: boolean
) {

  await supabase
    .from("cod_players")
    .update({
      is_captain: !currentValue,
    })
    .eq("id", playerId);

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

  const disqualified =
    players.filter(
      (p) =>
        p.status ===
        "disqualified"
    );

  return (

    <main className="min-h-screen bg-black text-white p-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-black">
              COD ADMIN
            </h1>

            <p className="text-white/50 mt-2">
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

        <div className="grid md:grid-cols-3 gap-6">

          <div className="border border-[#8DFF00]/20 rounded-2xl p-5">

            <div className="text-white/60">
              Pending
            </div>

            <div className="text-4xl font-black text-[#8DFF00]">
              {pending.length}
            </div>

          </div>

          <div className="border border-[#8DFF00]/20 rounded-2xl p-5">

            <div className="text-white/60">
              Approved
            </div>

            <div className="text-4xl font-black text-[#8DFF00]">
              {approved.length}
            </div>

          </div>

          <div className="border border-red-600/20 rounded-2xl p-5">

            <div className="text-white/60">
              Disqualified
            </div>

            <div className="text-4xl font-black text-red-500">
              {disqualified.length}
            </div>

          </div>

        </div>

        <h2 className="text-3xl font-black mt-14 mb-5">
          PENDING APPROVAL
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

          {pending.map(
            (player) => (

              <div
                key={player.id}
                className="
                  border
                  border-white/10
                  rounded-2xl
p-5
                "
              >

                <div className="flex items-center justify-between">

                  <div>

  <div className="text-xs text-white/50">
    FULL NAME
  </div>

  <div className="flex items-center gap-2">

  <div className="font-bold">
    {player.player_name}
  </div>

  {player.is_captain && (
    <img
      src="/captain-badge.png"
      alt="Captain"
      className="h-7 w-auto"
    />
  )}

</div>

  <div className="mt-3 text-xs text-white/50">
    GAMERTAG
  </div>

  <div>
    {player.gamertag}
  </div>

  <div className="mt-3 text-xs text-white/50">
    WHATSAPP
  </div>

  <div>
    {player.whatsapp}
  </div>

  <div className="mt-3 text-xs text-white/50">
    EMAIL
  </div>

  <div className="break-all">
    {player.email}
  </div>

  <div className="mt-3 text-xs text-white/50">
  TEAM
</div>

<select
  value={player.team_id || ""}
  onChange={(e) =>
    changeTeam(
      player.id,
      Number(e.target.value)
    )
  }
  className="
    mt-1
    w-full
    bg-black
    border
    border-[#8DFF00]/30
    rounded-lg
    px-3
    py-2
    text-white
  "
>
  {Array.from({ length: 38 }, (_, i) => i + 1).map((team) => (
    <option
      key={team}
      value={team}
    >
      Team {team}
    </option>
  ))}
</select>

  <div className="mt-3 text-xs text-white/50">
    PLATFORM
  </div>

  <div>
  {player.platform}
</div>

<div className="mt-4">

  <button
    onClick={() =>
      toggleCaptain(
        player.id,
        player.is_captain
      )
    }
    className={`
      px-4
      py-2
      rounded-lg
      font-black
      ${
        player.is_captain
          ? "bg-[#8DFF00] text-black"
          : "bg-zinc-800 text-white"
      }
    `}
  >
    {player.is_captain
      ? "REMOVE CAPTAIN"
      : "MAKE CAPTAIN"}
  </button>

</div>

<div className="mt-4">

  <button
    onClick={() =>
      toggleCaptain(
        player.id,
        player.is_captain
      )
    }
    className={`
      px-4
      py-2
      rounded-lg
      font-black
      ${
        player.is_captain
          ? "bg-[#8DFF00] text-black"
          : "bg-zinc-800 text-white"
      }
    `}
  >
    {player.is_captain
      ? "REMOVE CAPTAIN"
      : "MAKE CAPTAIN"}
  </button>

</div>

</div>

                  <div className="flex gap-2">                  <button
                    onClick={() =>
                      approvePlayer(
                        player.id
                      )
                    }
                    className="
                      bg-[#8DFF00]
                      text-black
                      font-black
                      px-4
                      py-2
                      rounded-lg
                    "
                  >
                    APPROVE
                  </button>

                  <button
                    onClick={() =>
                      disqualifyPlayer(
                        player.id
                      )
                    }
                    className="
                      bg-red-600
                      text-white
                      font-black
                      px-4
                      py-2
                      rounded-lg
                    "
                  >
                    DQ
                  </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

        <h2 className="text-3xl font-black mt-14 mb-5">
          APPROVED PLAYERS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

          {approved.map(
            (player) => (

              <div
                key={player.id}
                className="
                  border
                  border-[#8DFF00]/20
                  rounded-2xl
p-5
                "
              >

                <div className="flex items-center justify-between">

                  <div>

  <div className="text-xs text-white/50">
    FULL NAME
  </div>

  <div className="flex items-center gap-2">

  <div className="font-bold">
    {player.player_name}
  </div>

  {player.is_captain && (
    <img
      src="/captain-badge.png"
      alt="Captain"
      className="h-7 w-auto"
    />
  )}

</div>

  <div className="mt-3 text-xs text-white/50">
    GAMERTAG
  </div>

  <div>
    {player.gamertag}
  </div>

  <div className="mt-3 text-xs text-white/50">
    WHATSAPP
  </div>

  <div>
    {player.whatsapp}
  </div>

  <div className="mt-3 text-xs text-white/50">
    EMAIL
  </div>

  <div className="break-all">
    {player.email}
  </div>

  <div className="mt-3 text-xs text-white/50">
    TEAM
  </div>

  <div>
    {player.team_id}
  </div>

  <div className="mt-3 text-xs text-white/50">
    PLATFORM
  </div>

  <div className="flex items-center gap-2">

  <div className="font-bold">
    {player.player_name}
  </div>

  {player.is_captain && (
    <img
      src="/captain-badge.png"
      alt="Captain"
      className="h-7 w-auto"
    />
  )}

</div>

</div>

                  <button
                    onClick={() =>
                      disqualifyPlayer(
                        player.id
                      )
                    }
                    className="
                      bg-red-600
                      text-white
                      font-black
                      px-4
                      py-2
                      rounded-lg
                    "
                  >
                    DQ
                  </button>

                </div>

              </div>

            )
          )}

        </div>

        <h2 className="text-3xl font-black mt-14 mb-5">
          DISQUALIFIED PLAYERS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

          {disqualified.map(
            (player) => (

              <div
                key={player.id}
                className="
                  border
                  border-red-600/30
                  rounded-2xl
p-5
                "
              >

                <div className="flex items-center justify-between">

                  <div>

  <div className="text-xs text-white/50">
    FULL NAME
  </div>

  <div className="font-bold">
    {player.player_name}
  </div>

  <div className="mt-3 text-xs text-white/50">
    GAMERTAG
  </div>

  <div>
    {player.gamertag}
  </div>

  <div className="mt-3 text-xs text-white/50">
    WHATSAPP
  </div>

  <div>
    {player.whatsapp}
  </div>

  <div className="mt-3 text-xs text-white/50">
    EMAIL
  </div>

  <div className="break-all">
    {player.email}
  </div>

  <div className="mt-3 text-xs text-white/50">
    TEAM
  </div>

  <div>
    {player.team_id}
  </div>

  <div className="mt-3 text-xs text-white/50">
    PLATFORM
  </div>

  <div>
    {player.platform}
  </div>

</div>

                  <button
                    onClick={() =>
                      reinstatePlayer(
                        player.id
                      )
                    }
                    className="
                      bg-[#8DFF00]
                      text-black
                      font-black
                      px-4
                      py-2
                      rounded-lg
                    "
                  >
                    REINSTATE
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
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Contestant = {
  id: number;
  full_name: string | null;
  age: string | null;
  photo_url: string | null;
  tiktok_username: string | null;
  talent_category: string | null;
  mentor: string | null;
  audition_status: string | null;
};

type Judge = {
  id: number;
  email: string;
  role: string;
};

type Round = {
  id: number;
  season_id: number;
  name: string;
  battle_date: string;
  status: "pending" | "active" | "completed";
};

type Battle = {
  id: number;
  round_id: number;
  battle_number: number;
  contestant_left: Contestant;
  contestant_right: Contestant;
  winner: Contestant | null;
  loser: Contestant | null;
  status: "pending" | "completed";
  judged_by: number | null;
  judged_at: string | null;
  judge: Judge | null;
};

export default function KidsBattlesPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [isSuperAdmin, setIsSuperAdmin] =
    useState(false);

  const [rounds, setRounds] =
    useState<Round[]>([]);

  const [selectedRoundId, setSelectedRoundId] =
    useState<number | null>(null);

  const [battles, setBattles] =
    useState<Battle[]>([]);

  useEffect(() => {
    checkAccess();
  }, []);

  async function checkAccess() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/admin/login");
      return;
    }

    const { data: admin, error } =
      await supabase
        .from("admin_users")
        .select("*")
        .eq("email", user.email)
        .single();

    if (
      error ||
      !admin ||
      !admin.active ||
      (admin.role !== "admin" &&
        admin.role !== "super_admin")
    ) {
      alert("Access Denied");
      router.push("/admin/login");
      return;
    }

    setUserEmail(user.email || "");

    setIsSuperAdmin(
      admin.role === "super_admin"
    );

    await loadRounds();
  }

  async function loadRounds() {
    const { data, error } =
      await supabase
        .from("tiktok_rounds")
        .select(`
          id,
          season_id,
          name,
          battle_date,
          status
        `)
        .eq(
          "season_id",
          (
            await supabase
              .from("tiktok_seasons")
              .select("id")
              .eq(
                "name",
                "Season 2 - Kids Edition"
              )
              .single()
          ).data?.id
        )
        .order("battle_date", {
          ascending: false,
        });

    if (error) {
      console.error(error);
      alert(error.message);
      setLoading(false);
      return;
    }

    const roundData = data || [];

    setRounds(roundData);

    if (roundData.length > 0) {
      setSelectedRoundId(
        roundData[0].id
      );

      await loadBattles(roundData[0].id);
    } else {
      setBattles([]);
    }

    setLoading(false);
  }

  async function loadBattles(roundId: number) {
    const { data: battleRows, error } =
      await supabase
        .from("kids_battles")
        .select(`
          id,
          round_id,
          battle_number,
          contestant_left_id,
          contestant_right_id,
          winner_id,
          loser_id,
          status,
          judged_by,
          judged_at
        `)
        .eq("round_id", roundId)
        .order("battle_number", {
          ascending: true,
        });

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    if (!battleRows) {
      setBattles([]);
      return;
    }

    const contestantIds = Array.from(
      new Set(
        battleRows.flatMap((battle) => [
          battle.contestant_left_id,
          battle.contestant_right_id,
          battle.winner_id,
          battle.loser_id,
        ])
      )
    ).filter(
      (id): id is number => id !== null
    );

    let contestantMap =
      new Map<number, Contestant>();

    if (contestantIds.length > 0) {
      const {
        data: contestantRows,
        error: contestantError,
      } = await supabase
        .from("contestants")
        .select(`
          id,
          full_name,
          age,
          photo_url,
          tiktok_username,
          talent_category,
          mentor,
          audition_status
        `)
        .in("id", contestantIds);

      if (contestantError) {
        console.error(contestantError);
        alert(contestantError.message);
        return;
      }

      (contestantRows || []).forEach(
        (contestant) => {
          contestantMap.set(
            contestant.id,
            contestant
          );
        }
      );
    }

    const judgeIds = Array.from(
      new Set(
        battleRows
          .map(
            (battle) =>
              battle.judged_by
          )
          .filter(
            (id): id is number =>
              id !== null
          )
      )
    );

    const judgeMap =
      new Map<number, Judge>();

    if (judgeIds.length > 0) {
      const { data: judges } =
        await supabase
          .from("admin_users")
          .select(`
            id,
            email,
            role
          `)
          .in("id", judgeIds);

      (judges || []).forEach(
        (judge) => {
          judgeMap.set(
            judge.id,
            judge
          );
        }
      );
    }

    const formattedBattles: Battle[] =
      battleRows
        .map((battle) => {
          const left =
            contestantMap.get(
              battle.contestant_left_id
            );

          const right =
            contestantMap.get(
              battle.contestant_right_id
            );

          if (!left || !right) {
            return null;
          }

          return {
            id: battle.id,
            round_id: battle.round_id,
            battle_number:
              battle.battle_number,

            contestant_left: left,
            contestant_right: right,

            winner: battle.winner_id
              ? contestantMap.get(
                  battle.winner_id
                ) || null
              : null,

            loser: battle.loser_id
              ? contestantMap.get(
                  battle.loser_id
                ) || null
              : null,

            status: battle.status,

            judged_by:
              battle.judged_by,

            judged_at:
              battle.judged_at,

            judge: battle.judged_by
              ? judgeMap.get(
                  battle.judged_by
                ) || null
              : null,
          };
        })
        .filter(
          (battle): battle is Battle =>
            battle !== null
        );

    setBattles(formattedBattles);
  }

  async function changeRound(
    roundId: number
  ) {
    setSelectedRoundId(roundId);
    await loadBattles(roundId);
  }

  function openBattle(
    battle: Battle
  ) {
    router.push(
      `/admin/tiktok-kids/battles/${battle.battle_number}?roundId=${battle.round_id}`
    );
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  function formatDate(
    date: string | null
  ) {
    if (!date) return "";

    return new Date(
      `${date}T12:00:00`
    ).toLocaleDateString(
      "en-ZA",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  }

  const selectedRound =
    rounds.find(
      (round) =>
        round.id ===
        selectedRoundId
    ) || null;

  const completed = battles.filter(
    (battle) =>
      battle.status === "completed"
  ).length;

  const pending = battles.filter(
    (battle) =>
      battle.status === "pending"
  ).length;

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl font-black uppercase">
          Loading Battles...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-white/10 bg-zinc-950">

        <div className="max-w-7xl mx-auto px-5 py-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <p className="text-cyan-400 font-black uppercase tracking-[4px] text-xs">
                TikTok Stars
              </p>

              <h1 className="text-4xl md:text-6xl font-black uppercase italic">
                Kids Edition
              </h1>

              <p className="text-white/40 mt-1">
                Battle Judging
              </p>

              <p className="text-white/20 text-xs mt-2">
                {userEmail}

                {isSuperAdmin && (
                  <span className="ml-2 text-yellow-400 font-black">
                    SUPER ADMIN
                  </span>
                )}
              </p>

            </div>

            <div className="flex gap-2">

              {isSuperAdmin && (
                <button
                  onClick={() =>
                    router.push(
                      "/admin/tiktok-kids/rounds"
                    )
                  }
                  className="
                    bg-cyan-400
                    text-black
                    px-5
                    py-3
                    rounded-xl
                    font-black
                    uppercase
                    text-sm
                  "
                >
                  Round Manager
                </button>
              )}

              <button
                onClick={() =>
                  router.push(
                    "/admin/tiktok-kids"
                  )
                }
                className="
                  bg-zinc-900
                  border
                  border-white/10
                  px-5
                  py-3
                  rounded-xl
                  font-black
                  uppercase
                  text-sm
                "
              >
                Contestants
              </button>

              <button
                onClick={logout}
                className="
                  bg-red-600
                  px-5
                  py-3
                  rounded-xl
                  font-black
                  uppercase
                  text-sm
                "
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      </header>


      {/* =====================================================
          ROUND SELECTOR
      ===================================================== */}

      <div className="max-w-7xl mx-auto px-5 pt-8">

        <div className="
          bg-zinc-950
          border
          border-white/10
          rounded-3xl
          p-5
          md:p-7
        ">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

            <div className="flex-1">

              <p className="text-cyan-400 text-xs font-black uppercase tracking-[3px]">
                Competition Round
              </p>

              <h2 className="text-2xl md:text-3xl font-black uppercase mt-1">
                {selectedRound?.name ||
                  "No Round Selected"}
              </h2>

              {selectedRound && (
                <p className="text-white/40 mt-1">
                  Battle Date:{" "}
                  {formatDate(
                    selectedRound.battle_date
                  )}
                </p>
              )}

            </div>

            <div className="w-full md:w-[360px]">

              <label className="block text-white/40 text-xs uppercase font-black tracking-wider mb-2">
                Select Round
              </label>

              <select
                value={
                  selectedRoundId ??
                  ""
                }
                onChange={(e) =>
                  changeRound(
                    Number(
                      e.target.value
                    )
                  )
                }
                className="
                  w-full
                  bg-black
                  border
                  border-white/10
                  text-white
                  rounded-xl
                  px-4
                  py-4
                  font-black
                  outline-none
                  focus:border-cyan-400
                "
              >

                {rounds.map(
                  (round) => (
                    <option
                      key={round.id}
                      value={round.id}
                    >
                      {round.name} —{" "}
                      {formatDate(
                        round.battle_date
                      )}
                    </option>
                  )
                )}

              </select>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="max-w-7xl mx-auto px-5 py-8">


        {/* STATS */}

        <div className="grid grid-cols-3 gap-3 mb-8">

          <StatCard
            label="Battles"
            value={battles.length}
          />

          <StatCard
            label="Pending"
            value={pending}
            yellow
          />

          <StatCard
            label="Completed"
            value={completed}
            green
          />

        </div>


        {/* PROGRESS */}

        <div className="mb-8">

          <div className="flex justify-between text-xs uppercase font-black mb-2">

            <span className="text-white/40">
              Round Progress
            </span>

            <span className="text-white/70">
              {completed} /{" "}
              {battles.length}
            </span>

          </div>

          <div className="h-3 bg-zinc-900 rounded-full overflow-hidden">

            <div
              className="
                h-full
                bg-cyan-400
                transition-all
                duration-500
              "
              style={{
                width:
                  battles.length > 0
                    ? `${
                        (completed /
                          battles.length) *
                        100
                      }%`
                    : "0%",
              }}
            />

          </div>

        </div>


        {/* ===================================================
            BATTLES
        =================================================== */}

        <div className="space-y-5">

          {battles.map(
            (battle) => {

              const isCompleted =
                battle.status ===
                "completed";

              return (
                <div
                  key={battle.id}
                  className={`
                    bg-zinc-950
                    border
                    rounded-3xl
                    overflow-hidden
                    transition
                    ${
                      isCompleted
                        ? "border-green-500/20"
                        : "border-white/10"
                    }
                  `}
                >

                  {/* BATTLE HEADER */}

                  <div className="px-5 md:px-7 py-5 border-b border-white/10">

                    <div className="flex items-center justify-between gap-4">

                      <div>

                        <p className="text-cyan-400 text-xs font-black uppercase tracking-[3px]">
                          Battle{" "}
                          {battle.battle_number}
                        </p>

                        <p className="text-white/30 text-xs mt-1">
                          {isCompleted
                            ? "Result recorded"
                            : "Awaiting decision"}
                        </p>

                      </div>

                      <div
                        className={`
                          px-4
                          py-2
                          rounded-full
                          text-xs
                          font-black
                          uppercase
                          ${
                            isCompleted
                              ? "bg-green-500/15 text-green-400"
                              : "bg-yellow-500/15 text-yellow-400"
                          }
                        `}
                      >
                        {isCompleted
                          ? "Completed"
                          : "Pending"}
                      </div>

                    </div>

                  </div>


                  {/* CONTESTANTS */}

                  <div className="grid md:grid-cols-[1fr_auto_1fr] items-stretch">

                    {/* LEFT */}

                    <ContestantResultCard
                      contestant={
                        battle.contestant_left
                      }
                      winner={
                        battle.winner?.id ===
                        battle
                          .contestant_left
                          .id
                      }
                      loser={
                        battle.loser?.id ===
                        battle
                          .contestant_left
                          .id
                      }
                      completed={
                        isCompleted
                      }
                    />


                    {/* VS */}

                    <div className="hidden md:flex items-center justify-center px-5">

                      <div className="
                        w-12
                        h-12
                        rounded-full
                        bg-zinc-900
                        border
                        border-white/10
                        flex
                        items-center
                        justify-center
                      ">

                        <span className="text-white/30 font-black text-xs">
                          VS
                        </span>

                      </div>

                    </div>


                    {/* RIGHT */}

                    <ContestantResultCard
                      contestant={
                        battle.contestant_right
                      }
                      winner={
                        battle.winner?.id ===
                        battle
                          .contestant_right
                          .id
                      }
                      loser={
                        battle.loser?.id ===
                        battle
                          .contestant_right
                          .id
                      }
                      completed={
                        isCompleted
                      }
                      right
                    />

                  </div>


                  {/* RESULT */}

                  {isCompleted &&
                    battle.winner &&
                    battle.loser && (

                      <div className="
                        border-t
                        border-white/10
                        px-5
                        md:px-7
                        py-5
                      ">

                        <div className="
                          flex
                          flex-col
                          md:flex-row
                          md:items-center
                          md:justify-between
                          gap-4
                        ">

                          <div>

                            <p className="
                              text-green-400
                              text-xs
                              font-black
                              uppercase
                              tracking-[3px]
                            ">
                              Goes Through
                            </p>

                            <p className="
                              text-xl
                              font-black
                              uppercase
                              mt-1
                            ">
                              {
                                battle
                                  .winner
                                  .full_name
                              }
                            </p>

                          </div>

                          <div className="text-left md:text-right">

                            <p className="
                              text-white/30
                              text-xs
                              font-black
                              uppercase
                              tracking-wider
                            ">
                              Judged By
                            </p>

                            <p className="
                              text-white/70
                              text-sm
                              font-bold
                              mt-1
                            ">
                              {battle.judge?.email ||
                                "Unknown"}
                            </p>

                            {battle.judged_at && (
                              <p className="
                                text-white/30
                                text-xs
                                mt-1
                              ">
                                {formatDateTime(
                                  battle.judged_at
                                )}
                              </p>
                            )}

                          </div>

                          <button
                            onClick={() =>
                              openBattle(
                                battle
                              )
                            }
                            className="
                              bg-zinc-900
                              border
                              border-white/10
                              px-6
                              py-3
                              rounded-xl
                              font-black
                              uppercase
                              text-sm
                              hover:border-cyan-400
                              transition
                            "
                          >
                            View Result →
                          </button>

                        </div>

                      </div>

                    )}


                  {/* PENDING ACTION */}

                  {!isCompleted && (

                    <div className="
                      border-t
                      border-white/10
                      p-5
                    ">

                      <button
                        onClick={() =>
                          openBattle(
                            battle
                          )
                        }
                        className="
                          w-full
                          bg-cyan-400
                          text-black
                          py-4
                          rounded-2xl
                          font-black
                          uppercase
                          tracking-wide
                          hover:bg-cyan-300
                          transition
                        "
                      >
                        Open Battle →
                      </button>

                    </div>

                  )}

                </div>
              );
            }
          )}

        </div>


        {battles.length === 0 && (

          <div className="
            border
            border-yellow-500/20
            bg-yellow-500/5
            rounded-3xl
            p-10
            text-center
          ">

            <p className="
              text-yellow-400
              font-black
              uppercase
            ">
              No battles in this round
            </p>

            <p className="
              text-white/30
              text-sm
              mt-2
            ">
              Use Round Manager to add
              battles to this round.
            </p>

          </div>

        )}

      </div>

    </main>
  );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  label,
  value,
  yellow = false,
  green = false,
}: {
  label: string;
  value: number;
  yellow?: boolean;
  green?: boolean;
}) {
  return (
    <div
      className={`
        rounded-2xl
        p-5
        border
        ${
          yellow
            ? "bg-yellow-500/5 border-yellow-500/20"
            : green
            ? "bg-green-500/5 border-green-500/20"
            : "bg-zinc-950 border-white/10"
        }
      `}
    >

      <p
        className={`
          text-xs
          font-black
          uppercase
          tracking-wider
          ${
            yellow
              ? "text-yellow-400"
              : green
              ? "text-green-400"
              : "text-white/40"
          }
        `}
      >
        {label}
      </p>

      <p
        className={`
          text-3xl
          md:text-4xl
          font-black
          mt-2
          ${
            yellow
              ? "text-yellow-400"
              : green
              ? "text-green-400"
              : "text-white"
          }
        `}
      >
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   CONTESTANT RESULT CARD
========================================================= */

function ContestantResultCard({
  contestant,
  winner,
  loser,
  completed,
  right = false,
}: {
  contestant: Contestant;
  winner: boolean;
  loser: boolean;
  completed: boolean;
  right?: boolean;
}) {
  return (
    <div
      className={`
        p-5
        md:p-7
        ${
          right
            ? "md:border-l border-white/10"
            : ""
        }
        ${
          winner
            ? "bg-green-500/[0.03]"
            : loser
            ? "opacity-50"
            : ""
        }
      `}
    >

      <div className="flex gap-4 items-center">

        {/* PHOTO */}

        <div className="
          w-20
          h-24
          md:w-24
          md:h-28
          rounded-2xl
          overflow-hidden
          bg-zinc-900
          shrink-0
        ">

          {contestant.photo_url ? (

            <img
              src={contestant.photo_url}
              alt={
                contestant.full_name ||
                ""
              }
              className="
                w-full
                h-full
                object-cover
              "
            />

          ) : (

            <div className="
              w-full
              h-full
              flex
              items-center
              justify-center
              text-white/20
              text-[10px]
              font-black
              uppercase
            ">
              No Photo
            </div>

          )}

        </div>


        {/* DETAILS */}

        <div className="min-w-0 flex-1">

          <p className="
            text-white/30
            text-[10px]
            font-black
            uppercase
            tracking-[2px]
          ">
            {right
              ? "Contestant 2"
              : "Contestant 1"}
          </p>

          <h3 className="
            text-lg
            md:text-2xl
            font-black
            uppercase
            leading-tight
            mt-1
          ">
            {contestant.full_name}
          </h3>

          <p className="
            text-cyan-400
            text-sm
            font-bold
            mt-1
            truncate
          ">
            {contestant.tiktok_username ||
              "No TikTok username"}
          </p>

          <p className="
            text-white/30
            text-xs
            mt-2
          ">
            {contestant.mentor
              ? `Mentor: ${contestant.mentor}`
              : "Mentor not assigned"}
          </p>

        </div>


        {/* STATUS */}

        {completed && (

          <div className="shrink-0">

            {winner && (
              <span className="
                inline-block
                bg-green-500
                text-black
                px-3
                py-2
                rounded-full
                text-[10px]
                md:text-xs
                font-black
                uppercase
              ">
                Through
              </span>
            )}

            {loser && (
              <span className="
                inline-block
                bg-red-500/15
                text-red-400
                border
                border-red-500/20
                px-3
                py-2
                rounded-full
                text-[10px]
                md:text-xs
                font-black
                uppercase
              ">
                Out
              </span>
            )}

          </div>

        )}

      </div>

    </div>
  );
}


function formatDateTime(
  date: string
) {
  return new Date(date).toLocaleString(
    "en-ZA",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}
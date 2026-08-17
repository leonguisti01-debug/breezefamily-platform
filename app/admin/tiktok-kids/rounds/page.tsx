"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Season = {
  id: number;
  name: string;
};

type Round = {
  id: number;
  season_id: number;
  name: string;
  battle_date: string;
  status: "pending" | "active" | "completed";
  created_at: string;
};

type Contestant = {
  id: number;
  full_name: string | null;
  age: string | null;
  tiktok_username: string | null;
  photo_url: string | null;
  mentor: string | null;
  audition_status: string | null;
};

type Battle = {
  id: number;
  round_id: number;
  battle_number: number;
  contestant_left_id: number;
  contestant_right_id: number;
  winner_id: number | null;
  loser_id: number | null;
  status: "pending" | "completed";
};

export default function KidsRoundsPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [adminEmail, setAdminEmail] = useState("");

  const [season, setSeason] = useState<Season | null>(null);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [contestants, setContestants] = useState<Contestant[]>([]);

  const [selectedRound, setSelectedRound] =
    useState<Round | null>(null);

  const [battles, setBattles] = useState<Battle[]>([]);

  const [showCreateRound, setShowCreateRound] =
    useState(false);

  const [showAddBattle, setShowAddBattle] =
    useState(false);

  const [roundName, setRoundName] =
    useState("");

  const [battleDate, setBattleDate] =
    useState("");

  const [leftSearch, setLeftSearch] =
    useState("");

  const [rightSearch, setRightSearch] =
    useState("");

  const [leftContestant, setLeftContestant] =
    useState<Contestant | null>(null);

  const [rightContestant, setRightContestant] =
    useState<Contestant | null>(null);

  useEffect(() => {
    checkAccess();
  }, []);

  async function checkAccess() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/admin/login");
      return;
    }

    setAdminEmail(user.email || "");

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
      admin.role !== "super_admin"
    ) {
      alert(
        "Only Super Admins can manage competition rounds."
      );

      router.push("/admin/tiktok-kids/battles");
      return;
    }

    await loadData();

    setLoading(false);
  }

  async function loadData() {
    const { data: seasonData, error: seasonError } =
      await supabase
        .from("tiktok_seasons")
        .select("*")
        .eq("name", "Season 2 - Kids Edition")
        .single();

    if (seasonError || !seasonData) {
      console.error(seasonError);

      alert(
        "Season 2 - Kids Edition could not be found."
      );

      return;
    }

    setSeason(seasonData);

    const { data: roundData, error: roundError } =
      await supabase
        .from("tiktok_rounds")
        .select("*")
        .eq("season_id", seasonData.id)
        .order("battle_date", {
          ascending: false,
        });

    if (roundError) {
      console.error(roundError);
      alert(roundError.message);
      return;
    }

    setRounds(roundData || []);

    const { data: contestantData, error: contestantError } =
      await supabase
        .from("contestants")
        .select(`
          id,
          full_name,
          age,
          tiktok_username,
          photo_url,
          mentor,
          audition_status
        `)
        .order("full_name");

    if (contestantError) {
      console.error(contestantError);
      alert(contestantError.message);
      return;
    }

    setContestants(contestantData || []);
  }

  async function openRound(round: Round) {
    setSelectedRound(round);

    const { data, error } =
      await supabase
        .from("kids_battles")
        .select("*")
        .eq("round_id", round.id)
        .order("battle_number");

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    setBattles(data || []);
  }

  async function createRound() {
    if (!season) return;

    if (!roundName.trim()) {
      alert("Please enter a round name.");
      return;
    }

    if (!battleDate) {
      alert("Please select a battle date.");
      return;
    }

    setSaving(true);

    const { data, error } =
      await supabase
        .from("tiktok_rounds")
        .insert({
          season_id: season.id,
          name: roundName.trim(),
          battle_date: battleDate,
          status: "pending",
        })
        .select()
        .single();

    if (error) {
      console.error(error);
      alert(error.message);
      setSaving(false);
      return;
    }

    setRounds((current) => [
      data,
      ...current,
    ]);

    setRoundName("");
    setBattleDate("");
    setShowCreateRound(false);
    setSelectedRound(data);
    setBattles([]);

    setSaving(false);
  }

  async function addBattle() {
    if (!selectedRound) return;

    if (!leftContestant || !rightContestant) {
      alert(
        "Please select both contestants."
      );
      return;
    }

    if (
      leftContestant.id ===
      rightContestant.id
    ) {
      alert(
        "A contestant cannot battle themselves."
      );
      return;
    }

    setSaving(true);

    const nextBattleNumber =
      battles.length > 0
        ? Math.max(
            ...battles.map(
              (battle) =>
                battle.battle_number
            )
          ) + 1
        : 1;

    const { data, error } =
      await supabase
        .from("kids_battles")
        .insert({
          round_id: selectedRound.id,
          battle_number:
            nextBattleNumber,
          contestant_left_id:
            leftContestant.id,
          contestant_right_id:
            rightContestant.id,
          status: "pending",
        })
        .select()
        .single();

    if (error) {
      console.error(error);
      alert(error.message);
      setSaving(false);
      return;
    }

    setBattles((current) => [
      ...current,
      data,
    ]);

    setLeftContestant(null);
    setRightContestant(null);
    setLeftSearch("");
    setRightSearch("");
    setShowAddBattle(false);

    setSaving(false);
  }

  async function activateRound() {
    if (!selectedRound) return;

    const { error } =
      await supabase
        .from("tiktok_rounds")
        .update({
          status: "active",
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedRound.id);

    if (error) {
      alert(error.message);
      return;
    }

    const updated = {
      ...selectedRound,
      status: "active" as const,
    };

    setSelectedRound(updated);

    setRounds((current) =>
      current.map((round) =>
        round.id === updated.id
          ? updated
          : round
      )
    );
  }

  async function completeRound() {
    if (!selectedRound) return;

    const confirmed = window.confirm(
      "Are you sure you want to mark this round as completed?"
    );

    if (!confirmed) return;

    const { error } =
      await supabase
        .from("tiktok_rounds")
        .update({
          status: "completed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedRound.id);

    if (error) {
      alert(error.message);
      return;
    }

    const updated = {
      ...selectedRound,
      status: "completed" as const,
    };

    setSelectedRound(updated);

    setRounds((current) =>
      current.map((round) =>
        round.id === updated.id
          ? updated
          : round
      )
    );
  }

  function formatDate(date: string) {
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

  const leftResults = useMemo(() => {
    const search =
      leftSearch
        .toLowerCase()
        .trim();

    if (!search) return [];

    return contestants
      .filter((contestant) =>
        contestant.id !==
        rightContestant?.id
      )
      .filter((contestant) => {
        const name =
          contestant.full_name ||
          "";

        const username =
          contestant.tiktok_username ||
          "";

        return (
          name
            .toLowerCase()
            .includes(search) ||
          username
            .toLowerCase()
            .includes(search)
        );
      })
      .slice(0, 8);
  }, [
    contestants,
    leftSearch,
    rightContestant,
  ]);

  const rightResults = useMemo(() => {
    const search =
      rightSearch
        .toLowerCase()
        .trim();

    if (!search) return [];

    return contestants
      .filter((contestant) =>
        contestant.id !==
        leftContestant?.id
      )
      .filter((contestant) => {
        const name =
          contestant.full_name ||
          "";

        const username =
          contestant.tiktok_username ||
          "";

        return (
          name
            .toLowerCase()
            .includes(search) ||
          username
            .toLowerCase()
            .includes(search)
        );
      })
      .slice(0, 8);
  }, [
    contestants,
    rightSearch,
    leftContestant,
  ]);

  function getContestant(id: number) {
    return contestants.find(
      (contestant) =>
        contestant.id === id
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl font-black uppercase">
          Loading Round Manager...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/95 backdrop-blur-xl">

        <div className="max-w-[1600px] mx-auto px-5 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <p className="text-cyan-400 text-xs font-black uppercase tracking-[4px]">
              TikTok Stars
            </p>

            <h1 className="text-3xl md:text-5xl font-black uppercase italic">
              Kids Edition
            </h1>

            <p className="text-white/40 text-sm mt-1">
              Round Manager
            </p>

          </div>

          <div className="flex gap-3">

            <button
              onClick={() =>
                router.push(
                  "/admin/tiktok-kids/battles"
                )
              }
              className="
                border
                border-white/20
                text-white
                px-5
                py-3
                rounded-xl
                uppercase
                text-xs
                font-black
              "
            >
              Battle Judging
            </button>

            <button
              onClick={() =>
                setShowCreateRound(true)
              }
              className="
                bg-cyan-400
                text-black
                px-5
                py-3
                rounded-xl
                uppercase
                text-xs
                font-black
              "
            >
              + New Round
            </button>

          </div>

        </div>

      </header>


      <div className="max-w-[1600px] mx-auto p-5 md:p-8">

        {/* SEASON */}

        <div className="mb-8">

          <p className="text-white/40 text-xs font-black uppercase tracking-[3px]">
            Competition
          </p>

          <h2 className="text-2xl md:text-3xl font-black uppercase mt-1">
            {season?.name}
          </h2>

        </div>


        <div className="grid lg:grid-cols-[360px_1fr] gap-6">

          {/* ROUND LIST */}

          <aside className="space-y-3">

            <h3 className="text-xs font-black uppercase tracking-[3px] text-white/40 mb-4">
              Rounds
            </h3>

            {rounds.length === 0 && (
              <div className="border border-white/10 rounded-2xl p-6 text-white/40">
                No rounds yet.
              </div>
            )}

            {rounds.map((round) => (

              <button
                key={round.id}
                onClick={() =>
                  openRound(round)
                }
                className={`
                  w-full
                  text-left
                  rounded-2xl
                  border
                  p-5
                  transition
                  ${
                    selectedRound?.id ===
                    round.id
                      ? "border-cyan-400 bg-cyan-400/10"
                      : "border-white/10 bg-zinc-950 hover:border-white/30"
                  }
                `}
              >

                <div className="flex items-start justify-between gap-3">

                  <div>

                    <p className="font-black uppercase">
                      {round.name}
                    </p>

                    <p className="text-white/40 text-sm mt-1">
                      {formatDate(
                        round.battle_date
                      )}
                    </p>

                  </div>

                  <span
                    className={`
                      text-[9px]
                      uppercase
                      font-black
                      px-2
                      py-1
                      rounded-full
                      ${
                        round.status ===
                        "active"
                          ? "bg-cyan-400 text-black"
                          : round.status ===
                            "completed"
                          ? "bg-white/20 text-white"
                          : "bg-white/10 text-white/50"
                      }
                    `}
                  >
                    {round.status}
                  </span>

                </div>

              </button>

            ))}

          </aside>


          {/* ROUND CONTENT */}

          <section>

            {!selectedRound ? (

              <div className="
                min-h-[500px]
                border
                border-white/10
                rounded-[30px]
                bg-zinc-950
                flex
                items-center
                justify-center
                text-center
                p-8
              ">

                <div>

                  <div className="text-6xl mb-5">
                    +
                  </div>

                  <h2 className="text-3xl font-black uppercase">
                    Select a Round
                  </h2>

                  <p className="text-white/40 mt-2">
                    Or create a new round to start
                    building battles.
                  </p>

                </div>

              </div>

            ) : (

              <div>

                {/* ROUND HEADER */}

                <div className="border border-white/10 bg-zinc-950 rounded-[30px] p-6 md:p-8 mb-6">

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                    <div>

                      <p className="text-cyan-400 text-xs font-black uppercase tracking-[3px]">
                        Round
                      </p>

                      <h2 className="text-3xl md:text-4xl font-black uppercase italic">
                        {selectedRound.name}
                      </h2>

                      <p className="text-white/40 mt-2">
                        {formatDate(
                          selectedRound.battle_date
                        )}
                      </p>

                    </div>

                    <div className="flex gap-3">

                      {selectedRound.status ===
                        "pending" && (

                        <button
                          onClick={
                            activateRound
                          }
                          className="
                            border
                            border-cyan-400
                            text-cyan-400
                            px-5
                            py-3
                            rounded-xl
                            uppercase
                            text-xs
                            font-black
                          "
                        >
                          Activate Round
                        </button>

                      )}

                      {selectedRound.status ===
                        "active" && (

                        <button
                          onClick={
                            completeRound
                          }
                          className="
                            bg-cyan-400
                            text-black
                            px-5
                            py-3
                            rounded-xl
                            uppercase
                            text-xs
                            font-black
                          "
                        >
                          Complete Round
                        </button>

                      )}

                    </div>

                  </div>

                </div>


                {/* BATTLES */}

                <div className="space-y-4">

                  {battles.map((battle) => {

                    const left =
                      getContestant(
                        battle.contestant_left_id
                      );

                    const right =
                      getContestant(
                        battle.contestant_right_id
                      );

                    return (
                      <div
                        key={battle.id}
                        className="
                          border
                          border-white/10
                          bg-zinc-950
                          rounded-2xl
                          p-5
                        "
                      >

                        <div className="flex items-center justify-between mb-4">

                          <p className="text-cyan-400 font-black uppercase tracking-[2px]">
                            Battle{" "}
                            {battle.battle_number}
                          </p>

                          <span className="text-[10px] uppercase font-black text-white/40">
                            {battle.status}
                          </span>

                        </div>

                        <div className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-4">

                          <div className="border border-white/10 rounded-xl p-4">

                            <p className="font-black">
                              {left?.full_name ||
                                "Unknown"}
                            </p>

                            <p className="text-white/40 text-xs mt-1">
                              {left?.tiktok_username ||
                                "No TikTok username"}
                            </p>

                          </div>

                          <div className="text-white/20 font-black text-center">
                            VS
                          </div>

                          <div className="border border-white/10 rounded-xl p-4">

                            <p className="font-black">
                              {right?.full_name ||
                                "Unknown"}
                            </p>

                            <p className="text-white/40 text-xs mt-1">
                              {right?.tiktok_username ||
                                "No TikTok username"}
                            </p>

                          </div>

                        </div>

                        {battle.winner_id && (
                          <div className="mt-4 border border-cyan-400/30 bg-cyan-400/5 rounded-xl p-3">

                            <p className="text-cyan-400 text-xs font-black uppercase">
                              Through
                            </p>

                            <p className="font-black mt-1">
                              {
                                getContestant(
                                  battle.winner_id
                                )?.full_name
                              }
                            </p>

                          </div>
                        )}

                      </div>
                    );
                  })}


                  {/* ADD BATTLE */}

                  <button
                    onClick={() =>
                      setShowAddBattle(true)
                    }
                    disabled={
                      selectedRound.status ===
                      "completed"
                    }
                    className="
                      w-full
                      border-2
                      border-dashed
                      border-white/15
                      hover:border-cyan-400
                      hover:text-cyan-400
                      rounded-2xl
                      py-8
                      text-white/40
                      uppercase
                      font-black
                      tracking-[2px]
                      transition
                      disabled:opacity-30
                    "
                  >
                    + Add Battle
                  </button>

                </div>

              </div>

            )}

          </section>

        </div>

      </div>


      {/* CREATE ROUND MODAL */}

      {showCreateRound && (

        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-5">

          <div className="w-full max-w-lg bg-zinc-950 border border-white/10 rounded-[30px] p-7 md:p-9">

            <p className="text-cyan-400 text-xs font-black uppercase tracking-[3px]">
              New Round
            </p>

            <h2 className="text-3xl font-black uppercase italic mt-2">
              Create Round
            </h2>

            <div className="space-y-5 mt-7">

              <div>

                <label className="text-xs uppercase font-black text-white/50">
                  Round Name
                </label>

                <input
                  value={roundName}
                  onChange={(e) =>
                    setRoundName(
                      e.target.value
                    )
                  }
                  placeholder="Top 30"
                  className="
                    w-full
                    mt-2
                    bg-black
                    border
                    border-white/10
                    rounded-xl
                    px-4
                    py-4
                    text-white
                    outline-none
                    focus:border-cyan-400
                  "
                />

              </div>

              <div>

                <label className="text-xs uppercase font-black text-white/50">
                  Battle Date
                </label>

                <input
                  type="date"
                  value={battleDate}
                  onChange={(e) =>
                    setBattleDate(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    mt-2
                    bg-black
                    border
                    border-white/10
                    rounded-xl
                    px-4
                    py-4
                    text-white
                    outline-none
                    focus:border-cyan-400
                  "
                />

              </div>

            </div>

            <div className="flex gap-3 mt-8">

              <button
                onClick={() =>
                  setShowCreateRound(false)
                }
                className="
                  flex-1
                  border
                  border-white/10
                  rounded-xl
                  py-4
                  uppercase
                  font-black
                  text-xs
                "
              >
                Cancel
              </button>

              <button
                onClick={createRound}
                disabled={saving}
                className="
                  flex-1
                  bg-cyan-400
                  text-black
                  rounded-xl
                  py-4
                  uppercase
                  font-black
                  text-xs
                  disabled:opacity-30
                "
              >
                {saving
                  ? "Creating..."
                  : "Create Round"}
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ADD BATTLE MODAL */}

      {showAddBattle && (

        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-5 overflow-y-auto">

          <div className="w-full max-w-5xl bg-zinc-950 border border-white/10 rounded-[30px] p-7 md:p-9 my-8">

            <div className="flex items-start justify-between gap-5">

              <div>

                <p className="text-cyan-400 text-xs font-black uppercase tracking-[3px]">
                  Battle{" "}
                  {battles.length + 1}
                </p>

                <h2 className="text-3xl font-black uppercase italic mt-2">
                  Choose Contestants
                </h2>

              </div>

              <button
                onClick={() =>
                  setShowAddBattle(false)
                }
                className="text-white/40 hover:text-white text-2xl"
              >
                ×
              </button>

            </div>


            <div className="grid md:grid-cols-2 gap-6 mt-8">

              {/* LEFT */}

              <div>

                <p className="text-xs uppercase font-black text-white/50 mb-2">
                  Contestant Left
                </p>

                {leftContestant ? (

                  <div className="border border-cyan-400 rounded-2xl p-5">

                    <p className="text-cyan-400 text-xs font-black uppercase">
                      Selected
                    </p>

                    <h3 className="text-xl font-black mt-2">
                      {leftContestant.full_name}
                    </h3>

                    <p className="text-white/40 text-sm mt-1">
                      {leftContestant.tiktok_username ||
                        "No TikTok username"}
                    </p>

                    <button
                      onClick={() =>
                        setLeftContestant(
                          null
                        )
                      }
                      className="text-red-400 text-xs font-black uppercase mt-4"
                    >
                      Change
                    </button>

                  </div>

                ) : (

                  <>

                    <input
                      value={leftSearch}
                      onChange={(e) =>
                        setLeftSearch(
                          e.target.value
                        )
                      }
                      placeholder="Search name or TikTok..."
                      className="
                        w-full
                        bg-black
                        border
                        border-white/10
                        rounded-xl
                        px-4
                        py-4
                        outline-none
                        focus:border-cyan-400
                      "
                    />

                    <div className="mt-2 space-y-2">

                      {leftResults.map(
                        (contestant) => (

                          <button
                            key={
                              contestant.id
                            }
                            onClick={() => {
                              setLeftContestant(
                                contestant
                              );
                              setLeftSearch(
                                ""
                              );
                            }}
                            className="
                              w-full
                              text-left
                              border
                              border-white/10
                              bg-black
                              hover:border-cyan-400
                              rounded-xl
                              p-4
                              transition
                            "
                          >

                            <p className="font-black">
                              {
                                contestant.full_name
                              }
                            </p>

                            <p className="text-white/40 text-xs mt-1">
                              {
                                contestant.tiktok_username ||
                                "No TikTok username"
                              }
                            </p>

                          </button>

                        )
                      )}

                    </div>

                  </>

                )}

              </div>


              {/* RIGHT */}

              <div>

                <p className="text-xs uppercase font-black text-white/50 mb-2">
                  Contestant Right
                </p>

                {rightContestant ? (

                  <div className="border border-cyan-400 rounded-2xl p-5">

                    <p className="text-cyan-400 text-xs font-black uppercase">
                      Selected
                    </p>

                    <h3 className="text-xl font-black mt-2">
                      {rightContestant.full_name}
                    </h3>

                    <p className="text-white/40 text-sm mt-1">
                      {rightContestant.tiktok_username ||
                        "No TikTok username"}
                    </p>

                    <button
                      onClick={() =>
                        setRightContestant(
                          null
                        )
                      }
                      className="text-red-400 text-xs font-black uppercase mt-4"
                    >
                      Change
                    </button>

                  </div>

                ) : (

                  <>

                    <input
                      value={rightSearch}
                      onChange={(e) =>
                        setRightSearch(
                          e.target.value
                        )
                      }
                      placeholder="Search name or TikTok..."
                      className="
                        w-full
                        bg-black
                        border
                        border-white/10
                        rounded-xl
                        px-4
                        py-4
                        outline-none
                        focus:border-cyan-400
                      "
                    />

                    <div className="mt-2 space-y-2">

                      {rightResults.map(
                        (contestant) => (

                          <button
                            key={
                              contestant.id
                            }
                            onClick={() => {
                              setRightContestant(
                                contestant
                              );
                              setRightSearch(
                                ""
                              );
                            }}
                            className="
                              w-full
                              text-left
                              border
                              border-white/10
                              bg-black
                              hover:border-cyan-400
                              rounded-xl
                              p-4
                              transition
                            "
                          >

                            <p className="font-black">
                              {
                                contestant.full_name
                              }
                            </p>

                            <p className="text-white/40 text-xs mt-1">
                              {
                                contestant.tiktok_username ||
                                "No TikTok username"
                              }
                            </p>

                          </button>

                        )
                      )}

                    </div>

                  </>

                )}

              </div>

            </div>


            {/* SAVE */}

            <button
              onClick={addBattle}
              disabled={
                saving ||
                !leftContestant ||
                !rightContestant
              }
              className="
                w-full
                mt-8
                bg-cyan-400
                text-black
                rounded-2xl
                py-5
                uppercase
                font-black
                tracking-[2px]
                disabled:opacity-30
              "
            >
              {saving
                ? "Saving Battle..."
                : "Save Battle"}
            </button>

          </div>

        </div>

      )}

    </main>
  );
}
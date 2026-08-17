"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { supabase } from "@/lib/supabase";


type Contestant = {
  id: number;
  full_name: string | null;
  age: string | null;
  guardian_name: string | null;
  contact_number: string | null;
  email: string | null;
  talent_category: string | null;
  tiktok_username: string | null;
  photo_url: string | null;
  parent_full_name: string | null;
  parent_phone: string | null;
  parent_email: string | null;
  audition_status: string | null;
  mentor: string | null;
  audition_notes: string | null;
  golden_buzzer: boolean | null;
  golden_buzzer_by: string | null;
  performance_date: string | null;
};


type Battle = {
  id: number;
  round_id: number;
  battle_number: number;

  contestant_left: Contestant;
  contestant_right: Contestant;

  winner_id: number | null;
  loser_id: number | null;

  status: "pending" | "completed";

  judged_by: number | null;
  judged_at: string | null;
};


export default function BattleJudgingPage() {

  const router = useRouter();

  const params = useParams();

  const searchParams =
    useSearchParams();


  const battleNumber = Number(
    params.battleNumber
  );


  const roundId = Number(
    searchParams.get("roundId")
  );


  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [userEmail, setUserEmail] =
    useState("");

  const [adminId, setAdminId] =
    useState<number | null>(null);

  const [battle, setBattle] =
    useState<Battle | null>(null);

  const [selectedWinner, setSelectedWinner] =
    useState<number | null>(null);

  const [showConfirmation, setShowConfirmation] =
    useState(false);

  const [totalBattles, setTotalBattles] =
    useState(0);


  /*
   * =========================================================
   * LOAD PAGE
   * =========================================================
   */

  useEffect(() => {

    if (
      Number.isFinite(
        battleNumber
      ) &&
      battleNumber > 0 &&
      Number.isFinite(
        roundId
      ) &&
      roundId > 0
    ) {

      checkAccess();

    } else {

      alert(
        "Invalid battle or round."
      );

      router.push(
        "/admin/tiktok-kids/battles"
      );
    }

  }, [
    battleNumber,
    roundId,
  ]);


  /*
   * =========================================================
   * CHECK ACCESS
   * =========================================================
   */

  async function checkAccess() {

    const {
      data: {
        user,
      },
    } =
      await supabase.auth.getUser();


    if (!user) {

      router.push(
        "/admin/login"
      );

      return;
    }


    const {
      data: admin,
      error,
    } =
      await supabase
        .from("admin_users")
        .select("*")
        .eq(
          "email",
          user.email
        )
        .single();


    if (
      error ||
      !admin ||
      !admin.active ||
      admin.role !==
        "super_admin"
    ) {

      alert(
        "Only Super Admins can judge battles."
      );

      router.push(
        "/admin/tiktok-kids/battles"
      );

      return;
    }


    setUserEmail(
      user.email || ""
    );

    setAdminId(
      admin.id
    );


    await loadBattle();

    setLoading(false);
  }


  /*
   * =========================================================
   * LOAD BATTLE
   *
   * IMPORTANT:
   * We now use BOTH:
   *
   * round_id
   * battle_number
   *
   * This prevents Battle 1 from another round
   * being loaded.
   * =========================================================
   */

  async function loadBattle() {

    const {
      data: battleRow,
      error,
    } =
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
        .eq(
          "round_id",
          roundId
        )
        .eq(
          "battle_number",
          battleNumber
        )
        .maybeSingle();


    if (
      error ||
      !battleRow
    ) {

      console.error(
        "Battle load error:",
        error
      );

      alert(
        "Battle not found for this round."
      );

      router.push(
        "/admin/tiktok-kids/battles"
      );

      return;
    }


    /*
     * =======================================================
     * COUNT BATTLES IN THIS ROUND
     * =======================================================
     */

    const {
      count,
    } =
      await supabase
        .from("kids_battles")
        .select(
          "id",
          {
            count:
              "exact",
            head: true,
          }
        )
        .eq(
          "round_id",
          roundId
        );


    setTotalBattles(
      count || 0
    );


    /*
     * =======================================================
     * LOAD CONTESTANTS
     * =======================================================
     */

    const contestantIds = [
      battleRow.contestant_left_id,
      battleRow.contestant_right_id,
    ];


    const {
      data: contestants,
      error:
        contestantsError,
    } =
      await supabase
        .from("contestants")
        .select(`
          id,
          full_name,
          age,
          guardian_name,
          contact_number,
          email,
          talent_category,
          tiktok_username,
          photo_url,
          parent_full_name,
          parent_phone,
          parent_email,
          audition_status,
          mentor,
          audition_notes,
          golden_buzzer,
          golden_buzzer_by,
          performance_date
        `)
        .in(
          "id",
          contestantIds
        );


    if (
      contestantsError
    ) {

      console.error(
        contestantsError
      );

      alert(
        contestantsError.message
      );

      return;
    }


    const left =
      contestants?.find(
        (contestant) =>
          contestant.id ===
          battleRow.contestant_left_id
      );


    const right =
      contestants?.find(
        (contestant) =>
          contestant.id ===
          battleRow.contestant_right_id
      );


    if (
      !left ||
      !right
    ) {

      alert(
        "One of the contestants could not be found."
      );

      return;
    }


    const loadedBattle:
      Battle = {

      id:
        battleRow.id,

      round_id:
        battleRow.round_id,

      battle_number:
        battleRow.battle_number,

      contestant_left:
        left,

      contestant_right:
        right,

      winner_id:
        battleRow.winner_id,

      loser_id:
        battleRow.loser_id,

      status:
        battleRow.status,

      judged_by:
        battleRow.judged_by,

      judged_at:
        battleRow.judged_at,
    };


    setBattle(
      loadedBattle
    );


    /*
     * Restore previously selected winner.
     */

    if (
      battleRow.winner_id
    ) {

      setSelectedWinner(
        battleRow.winner_id
      );

    } else {

      setSelectedWinner(
        null
      );
    }
  }


  /*
   * =========================================================
   * SELECT / UNSELECT WINNER
   * =========================================================
   */

  function selectWinner(
    id: number
  ) {

    /*
     * Clicking the currently selected contestant
     * again will UNSELECT them.
     */

    if (
      selectedWinner === id
    ) {

      setSelectedWinner(
        null
      );

      return;
    }


    setSelectedWinner(
      id
    );
  }


  /*
   * =========================================================
   * CLEAR SELECTION
   * =========================================================
   */

  function clearSelection() {

    setSelectedWinner(
      null
    );
  }


  /*
   * =========================================================
   * OPEN CONFIRMATION
   * =========================================================
   */

  function openConfirmation() {

    if (
      !selectedWinner
    ) {

      alert(
        "Please select who goes through."
      );

      return;
    }


    setShowConfirmation(
      true
    );
  }


  /*
   * =========================================================
   * SAVE RESULT
   * =========================================================
   */

  async function saveResult() {

    if (!battle) {
      return;
    }


    if (
      !selectedWinner
    ) {

      alert(
        "Please select who goes through."
      );

      return;
    }


    if (!adminId) {

      alert(
        "Admin account not found."
      );

      return;
    }


    setSaving(true);


    try {

      const {
        error,
      } =
        await supabase.rpc(
          "save_kids_battle_result",
          {
            p_battle_id:
              battle.id,

            p_winner_id:
              selectedWinner,

            p_judged_by:
              adminId,
          }
        );


      if (error) {
        throw error;
      }


      setShowConfirmation(
        false
      );


      /*
       * Update the page immediately.
       */

      setBattle(
        (current) =>
          current
            ? {
                ...current,

                winner_id:
                  selectedWinner,

                loser_id:
                  selectedWinner ===
                  current
                    .contestant_left
                    .id
                    ? current
                        .contestant_right
                        .id
                    : current
                        .contestant_left
                        .id,

                status:
                  "completed",

                judged_by:
                  adminId,

                judged_at:
                  new Date().toISOString(),
              }
            : current
      );


      /*
       * Stay on this battle after saving.
       *
       * This makes it easy to verify the result
       * and change it again if necessary.
       */

      alert(
        "Result saved successfully."
      );


    } catch (
      error: any
    ) {

      console.error(
        error
      );

      alert(
        error?.message ||
          "Could not save the result."
      );

    } finally {

      setSaving(false);
    }
  }


  /*
   * =========================================================
   * GO TO NEXT BATTLE
   * =========================================================
   */

  function nextBattle() {

    const nextNumber =
      battleNumber + 1;


    if (
      nextNumber <=
      totalBattles
    ) {

      router.push(
        `/admin/tiktok-kids/battles/${nextNumber}?roundId=${roundId}`
      );

    } else {

      router.push(
        "/admin/tiktok-kids/battles"
      );
    }
  }


  /*
   * =========================================================
   * LOGOUT
   * =========================================================
   */

  async function logout() {

    await supabase.auth.signOut();

    router.push(
      "/admin/login"
    );
  }


  /*
   * =========================================================
   * LOADING
   * =========================================================
   */

  if (loading) {

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <div className="text-xl font-black uppercase">
          Loading Battle...
        </div>

      </main>
    );
  }


  /*
   * =========================================================
   * BATTLE NOT FOUND
   * =========================================================
   */

  if (!battle) {

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <div className="text-xl font-black uppercase">
          Battle not found.
        </div>

      </main>
    );
  }


  const left =
    battle.contestant_left;

  const right =
    battle.contestant_right;


  const completed =
    battle.status ===
    "completed";


  const winner =
    selectedWinner ===
    left.id
      ? left
      : selectedWinner ===
        right.id
      ? right
      : null;


  const loser =
    selectedWinner ===
    left.id
      ? right
      : selectedWinner ===
        right.id
      ? left
      : null;


  return (
    <main className="min-h-screen bg-black text-white">


      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <header className="border-b border-white/10 bg-zinc-950 sticky top-0 z-50">

        <div className="max-w-[1600px] mx-auto px-5 py-4 flex items-center justify-between gap-4">

          <div>

            <p className="text-cyan-400 text-xs font-black uppercase tracking-[4px]">
              TikTok Stars Kids Edition
            </p>

            <h1 className="text-2xl md:text-4xl font-black uppercase italic">

              Battle{" "}
              {battleNumber}

              <span className="text-white/30">
                {" "}
                /{" "}
                {totalBattles}
              </span>

            </h1>

            <p className="text-white/30 text-xs mt-1">
              {userEmail}
            </p>

          </div>


          <div className="flex gap-2">

            <button
              onClick={() =>
                router.push(
                  "/admin/tiktok-kids/battles"
                )
              }
              className="
                bg-zinc-900
                border
                border-white/10
                px-4
                py-3
                rounded-xl
                font-black
                uppercase
                text-sm
              "
            >
              Battles
            </button>


            <button
              onClick={logout}
              className="
                bg-red-600
                px-4
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

      </header>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-8">


        {/* COMPLETED NOTICE */}

        {completed && (

          <div className="
            mb-6
            bg-green-500/10
            border
            border-green-500/30
            rounded-2xl
            p-5
            text-center
          ">

            <p className="
              text-green-400
              font-black
              uppercase
            ">
              Battle Completed
            </p>

            <p className="
              text-white/50
              text-sm
              mt-1
            ">
              This result has already been saved.
              You can change the selection below and save again.
            </p>

          </div>

        )}


        {/* ===================================================
            CONTESTANTS
        =================================================== */}

        <div className="grid lg:grid-cols-2 gap-5 md:gap-8">

          <ContestantCard
            contestant={
              left
            }
            selected={
              selectedWinner ===
              left.id
            }
            disabled={false}
            onSelect={() =>
              selectWinner(
                left.id
              )
            }
          />


          <ContestantCard
            contestant={
              right
            }
            selected={
              selectedWinner ===
              right.id
            }
            disabled={false}
            onSelect={() =>
              selectWinner(
                right.id
              )
            }
            right
          />

        </div>


        {/* ===================================================
            JUDGING AREA
        =================================================== */}

        <div className="mt-8 max-w-4xl mx-auto">

          <div className="
            border
            border-white/10
            bg-zinc-950
            rounded-3xl
            p-6
            md:p-8
          ">

            <p className="
              text-center
              text-white/40
              text-xs
              font-black
              uppercase
              tracking-[4px]
            ">
              Who goes through?
            </p>


            <div className="
              grid
              md:grid-cols-2
              gap-4
              mt-5
            ">


              {/* LEFT BUTTON */}

              <button
                onClick={() =>
                  selectWinner(
                    left.id
                  )
                }
                className={`
                  rounded-2xl
                  p-5
                  font-black
                  uppercase
                  text-lg
                  border-2
                  transition
                  ${
                    selectedWinner ===
                    left.id
                      ? "bg-green-500 border-green-400 text-black"
                      : "bg-zinc-900 border-white/10 hover:border-green-400/50"
                  }
                `}
              >

                {selectedWinner ===
                left.id
                  ? "✓ "
                  : ""}

                {left.full_name}

                {selectedWinner ===
                left.id
                  ? " — THROUGH"
                  : ""}

              </button>


              {/* RIGHT BUTTON */}

              <button
                onClick={() =>
                  selectWinner(
                    right.id
                  )
                }
                className={`
                  rounded-2xl
                  p-5
                  font-black
                  uppercase
                  text-lg
                  border-2
                  transition
                  ${
                    selectedWinner ===
                    right.id
                      ? "bg-green-500 border-green-400 text-black"
                      : "bg-zinc-900 border-white/10 hover:border-green-400/50"
                  }
                `}
              >

                {selectedWinner ===
                right.id
                  ? "✓ "
                  : ""}

                {right.full_name}

                {selectedWinner ===
                right.id
                  ? " — THROUGH"
                  : ""}

              </button>

            </div>


            {/* CLEAR */}

            {selectedWinner && (

              <button
                onClick={
                  clearSelection
                }
                className="
                  w-full
                  mt-4
                  bg-zinc-900
                  border
                  border-white/10
                  text-white/60
                  py-3
                  rounded-xl
                  font-black
                  uppercase
                  text-sm
                  hover:border-red-400
                  hover:text-red-400
                  transition
                "
              >
                Clear Selection
              </button>

            )}


            {/* SAVE */}

            {selectedWinner && (

              <button
                onClick={
                  openConfirmation
                }
                disabled={saving}
                className="
                  w-full
                  mt-5
                  bg-cyan-400
                  text-black
                  py-5
                  rounded-2xl
                  font-black
                  uppercase
                  text-lg
                  tracking-wide
                  disabled:opacity-30
                  disabled:cursor-not-allowed
                  hover:bg-cyan-300
                  transition
                "
              >
                {completed
                  ? "Update Result"
                  : "Save Result"}
              </button>

            )}


            {/* NEXT */}

            {completed && (

              <button
                onClick={
                  nextBattle
                }
                className="
                  w-full
                  mt-3
                  bg-zinc-900
                  border
                  border-white/10
                  text-white
                  py-4
                  rounded-2xl
                  font-black
                  uppercase
                  text-lg
                  hover:border-cyan-400
                  transition
                "
              >
                {battleNumber <
                totalBattles
                  ? "Next Battle →"
                  : "Back to Battles"}
              </button>

            )}

          </div>

        </div>

      </div>


      {/* =====================================================
          CONFIRMATION MODAL
      ===================================================== */}

      {showConfirmation &&
        winner &&
        loser && (

          <div className="
            fixed
            inset-0
            z-[100]
            bg-black/85
            backdrop-blur-md
            flex
            items-center
            justify-center
            p-5
          ">

            <div className="
              w-full
              max-w-xl
              bg-zinc-950
              border
              border-white/10
              rounded-[30px]
              p-7
              md:p-10
              shadow-2xl
            ">

              <p className="
                text-cyan-400
                text-xs
                font-black
                uppercase
                tracking-[4px]
                text-center
              ">
                {completed
                  ? "Update Result"
                  : "Confirm Result"}
              </p>


              <h2 className="
                text-3xl
                md:text-4xl
                font-black
                uppercase
                italic
                text-center
                mt-3
              ">
                Are You Sure?
              </h2>


              <p className="
                text-white/40
                text-center
                mt-3
              ">
                Please check the result before saving.
              </p>


              {/* WINNER */}

              <div className="
                mt-8
                bg-green-500/10
                border
                border-green-500/30
                rounded-2xl
                p-5
                text-center
              ">

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
                  text-2xl
                  md:text-3xl
                  font-black
                  uppercase
                  mt-2
                ">
                  {
                    winner.full_name
                  }
                </p>

                <p className="
                  text-green-400/70
                  text-sm
                  mt-1
                ">
                  {
                    winner.tiktok_username ||
                    "TikTok username not provided"
                  }
                </p>

              </div>


              {/* LOSER */}

              <div className="
                mt-3
                bg-red-500/10
                border
                border-red-500/30
                rounded-2xl
                p-5
                text-center
              ">

                <p className="
                  text-red-400
                  text-xs
                  font-black
                  uppercase
                  tracking-[3px]
                ">
                  Eliminated
                </p>

                <p className="
                  text-2xl
                  md:text-3xl
                  font-black
                  uppercase
                  mt-2
                ">
                  {
                    loser.full_name
                  }
                </p>

                <p className="
                  text-red-400/70
                  text-sm
                  mt-1
                ">
                  {
                    loser.tiktok_username ||
                    "TikTok username not provided"
                  }
                </p>

              </div>


              {/* BUTTONS */}

              <div className="
                grid
                grid-cols-2
                gap-3
                mt-7
              ">

                <button
                  onClick={() =>
                    setShowConfirmation(
                      false
                    )
                  }
                  disabled={saving}
                  className="
                    bg-zinc-900
                    border
                    border-white/10
                    py-4
                    rounded-2xl
                    font-black
                    uppercase
                    hover:bg-zinc-800
                    transition
                  "
                >
                  Cancel
                </button>


                <button
                  onClick={
                    saveResult
                  }
                  disabled={
                    saving
                  }
                  className="
                    bg-green-500
                    text-black
                    py-4
                    rounded-2xl
                    font-black
                    uppercase
                    disabled:opacity-40
                    hover:bg-green-400
                    transition
                  "
                >
                  {saving
                    ? "Saving..."
                    : completed
                    ? "Update Result"
                    : "Confirm Result"}
                </button>

              </div>

            </div>

          </div>

        )}

    </main>
  );
}


/* =========================================================
   CONTESTANT CARD
========================================================= */

function ContestantCard({
  contestant,
  selected,
  disabled,
  onSelect,
  right = false,
}: {
  contestant: Contestant;
  selected: boolean;
  disabled: boolean;
  onSelect: () => void;
  right?: boolean;
}) {

  return (

    <div
      className={`
        relative
        rounded-[30px]
        overflow-hidden
        border-2
        bg-zinc-950
        transition
        ${
          selected
            ? "border-green-400 shadow-[0_0_40px_rgba(34,197,94,.18)]"
            : "border-white/10"
        }
      `}
    >

      {/* PHOTO */}

      <div className="relative">

        {contestant.photo_url ? (

          <img
            src={
              contestant.photo_url
            }
            alt={
              contestant.full_name ||
              ""
            }
            className="
              w-full
              h-[360px]
              md:h-[470px]
              object-cover
            "
          />

        ) : (

          <div className="
            w-full
            h-[360px]
            md:h-[470px]
            bg-zinc-900
            flex
            items-center
            justify-center
            text-white/20
            font-black
            uppercase
          ">
            No Photo
          </div>

        )}


        {selected && (

          <div className="
            absolute
            top-5
            left-5
            bg-green-400
            text-black
            px-4
            py-2
            rounded-full
            font-black
            uppercase
            text-sm
          ">
            THROUGH
          </div>

        )}

      </div>


      {/* DETAILS */}

      <div className="p-6">

        <p className="
          text-cyan-400
          text-xs
          font-black
          uppercase
          tracking-[3px]
        ">
          {right
            ? "Contestant 2"
            : "Contestant 1"}
        </p>


        <h2 className="
          text-3xl
          md:text-4xl
          font-black
          uppercase
          leading-tight
          mt-1
        ">
          {
            contestant.full_name
          }
        </h2>


        <div className="
          mt-6
          space-y-4
        ">

          <InfoRow
            label="TikTok Username"
            value={
              contestant.tiktok_username
            }
            highlight
          />

          <InfoRow
            label="Age"
            value={
              contestant.age
            }
          />

          <InfoRow
            label="Talent Category"
            value={
              contestant.talent_category
            }
          />

          <InfoRow
            label="Mentor"
            value={
              contestant.mentor
            }
          />

          <InfoRow
            label="Guardian"
            value={
              contestant.parent_full_name ||
              contestant.guardian_name
            }
          />

          <InfoRow
            label="Parent Phone"
            value={
              contestant.parent_phone ||
              contestant.contact_number
            }
          />

          <InfoRow
            label="Parent Email"
            value={
              contestant.parent_email ||
              contestant.email
            }
          />

          <InfoRow
            label="Performance Date"
            value={
              contestant.performance_date
            }
          />

        </div>


        {contestant.audition_notes && (

          <div className="
            mt-6
            pt-6
            border-t
            border-white/10
          ">

            <p className="
              text-white/40
              text-xs
              uppercase
              font-black
              tracking-wider
            ">
              Audition Notes
            </p>

            <p className="
              text-white/80
              mt-2
              leading-relaxed
            ">
              {
                contestant.audition_notes
              }
            </p>

          </div>

        )}


        {contestant.golden_buzzer && (

          <div className="
            mt-6
            bg-yellow-400/10
            border
            border-yellow-400/30
            rounded-2xl
            p-4
          ">

            <p className="
              text-yellow-400
              font-black
              uppercase
            ">
              Golden Buzzer
            </p>

            <p className="
              text-white/60
              text-sm
              mt-1
            ">
              Awarded by{" "}
              {
                contestant.golden_buzzer_by ||
                "TBA"
              }
            </p>

          </div>

        )}


        {!disabled && (

          <button
            onClick={
              onSelect
            }
            className={`
              w-full
              mt-7
              py-4
              rounded-2xl
              font-black
              uppercase
              border-2
              transition
              ${
                selected
                  ? "bg-green-500 border-green-400 text-black"
                  : "bg-zinc-900 border-white/10 hover:border-cyan-400"
              }
            `}
          >
            {selected
              ? "✓ Selected — Goes Through"
              : "Select This Contestant"}
          </button>

        )}

      </div>

    </div>
  );
}


/* =========================================================
   INFO ROW
========================================================= */

function InfoRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value:
    | string
    | null
    | undefined;
  highlight?: boolean;
}) {

  return (

    <div>

      <p className="
        text-white/35
        text-xs
        uppercase
        font-black
        tracking-wider
      ">
        {label}
      </p>


      <p
        className={`
          mt-1
          font-semibold
          break-words
          ${
            highlight
              ? "text-cyan-400 text-lg"
              : "text-white/80"
          }
        `}
      >
        {
          value ||
          "Not provided"
        }
      </p>

    </div>
  );
}
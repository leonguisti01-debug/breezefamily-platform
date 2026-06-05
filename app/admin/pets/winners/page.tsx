"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const BREEZE_GREEN = "#8DFF00";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type PetEntry = {
  id: number;
  name: string;
  pet_name: string;
  photo_url: string;
  phone?: string;
};

export default function PrizedPetsAdminPage() {

  const [entries,
    setEntries] =
    useState<PetEntry[]>([]);

  const [carousel,
    setCarousel] =
    useState<PetEntry[]>([]);

  const [loadingEntries,
    setLoadingEntries] =
    useState(true);

  const [spinning,
    setSpinning] =
    useState(false);

  const [saving,
    setSaving] =
    useState(false);

  const [thirdPlace,
    setThirdPlace] =
    useState<PetEntry | null>(
      null
    );

  const [runnerUp,
    setRunnerUp] =
    useState<PetEntry | null>(
      null
    );

  const [winner,
    setWinner] =
    useState<PetEntry | null>(
      null
    );

  useEffect(() => {

    loadEntries();

  }, []);

  async function loadEntries() {

    setLoadingEntries(
      true
    );

    const { data } =
      await supabase
        .from(
          "prized_pets_entries"
        )
        .select("*")
        .order(
          "created_at",
          {
            ascending:
              false,
          }
        );

    if (data) {

      setEntries(
        data
      );

      setCarousel([
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
      ]);

    }

    setLoadingEntries(
      false
    );

  }

  const availableEntries =
    useMemo(() => {

      return entries.filter(
        (entry) =>
          entry.id !==
            thirdPlace?.id &&
          entry.id !==
            runnerUp?.id &&
          entry.id !==
            winner?.id
      );

    }, [
      entries,
      thirdPlace,
      runnerUp,
      winner,
    ]);

  function getStage() {

    if (!thirdPlace)
      return "third";

    if (!runnerUp)
      return "runner";

    if (!winner)
      return "winner";

    return "complete";

  }

  function getWeekNumber() {

    const date =
      new Date();

    const firstDay =
      new Date(
        date.getFullYear(),
        0,
        1
      );

    const days =
      Math.floor(
        (
          date.getTime() -
          firstDay.getTime()
        ) /
          86400000
      );

    return Math.ceil(
      (
        days +
        firstDay.getDay() +
        1
      ) /
      7
    );

  }

  async function spinForWinner() {

    if (
      spinning ||
      getStage() ===
        "complete"
    ) {
      return;
    }

    if (
      availableEntries.length ===
      0
    ) {
      return;
    }

    setSpinning(
      true
    );

    const selectedPet =
      availableEntries[
        Math.floor(
          Math.random() *
          availableEntries.length
        )
      ];

    let count = 0;
    let delay = 40;

    const animate =
      () => {

        const shuffled =
          [
            ...availableEntries,
            ...availableEntries,
            ...availableEntries,
            ...availableEntries,
          ].sort(
            () =>
              Math.random() -
              0.5
          );

        setCarousel(
          shuffled
        );

        count++;

        delay += 4;

        if (
          count < 50
        ) {

          setTimeout(
            animate,
            delay
          );

        } else {

          setCarousel([
            selectedPet,
            selectedPet,
            selectedPet,
            selectedPet,
            selectedPet,
          ]);

          const stage =
            getStage();

          if (
            stage ===
            "third"
          ) {

            setThirdPlace(
              selectedPet
            );

          } else if (
            stage ===
            "runner"
          ) {

            setRunnerUp(
              selectedPet
            );

          } else {

            setWinner(
              selectedPet
            );

          }

          setSpinning(
            false
          );

        }

      };

    animate();

  }

  async function resetDraw() {

    setThirdPlace(
      null
    );

    setRunnerUp(
      null
    );

    setWinner(
      null
    );

    loadEntries();

  }

  async function saveWinners() {    if (
      !thirdPlace ||
      !runnerUp ||
      !winner
    ) {

      alert(
        "Complete the draw first."
      );

      return;

    }

    setSaving(
      true
    );

    const week =
      getWeekNumber();

    const rows = [

      {
        week_number:
          week,
        position:
          "third_place",
        entry_id:
          thirdPlace.id,
        owner_name:
          thirdPlace.name,
        pet_name:
          thirdPlace.pet_name,
        photo_url:
          thirdPlace.photo_url,
        selected_by:
          "admin",
      },

      {
        week_number:
          week,
        position:
          "runner_up",
        entry_id:
          runnerUp.id,
        owner_name:
          runnerUp.name,
        pet_name:
          runnerUp.pet_name,
        photo_url:
          runnerUp.photo_url,
        selected_by:
          "admin",
      },

      {
        week_number:
          week,
        position:
          "winner",
        entry_id:
          winner.id,
        owner_name:
          winner.name,
        pet_name:
          winner.pet_name,
        photo_url:
          winner.photo_url,
        selected_by:
          "admin",
      },

    ];

    const { error } =
      await supabase
        .from(
          "prized_pets_winners"
        )
        .insert(
          rows
        );

    if (error) {

      alert(
        error.message
      );

      setSaving(
        false
      );

      return;

    }

    alert(
      "Winners saved successfully."
    );

    setSaving(
      false
    );

  }

  return (

    <main className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="text-center">

          <div
            className="
              uppercase
              tracking-[6px]
              text-xs
            "
            style={{
              color:
                BREEZE_GREEN,
            }}
          >
            Breeze Family
          </div>

          <h1
            className="
              mt-4
              text-6xl
              md:text-8xl
              font-black
              uppercase
            "
            style={{
              color:
                BREEZE_GREEN,
            }}
          >
            Prized Pets
          </h1>

          <h2
            className="
              text-3xl
              md:text-5xl
              font-black
              uppercase
            "
          >
            Slot Machine Draw
          </h2>
          <div
  className="
    mt-8
    inline-flex
    items-center
    justify-center
    px-8
    py-4
    rounded-full
    border
    border-[#8DFF00]/30
    bg-[#8DFF00]/10
    font-black
    uppercase
    text-lg
  "
>
  {getStage() === "third" &&
    "🥉 Draw Third Place"}

  {getStage() === "runner" &&
    "🥈 Draw Runner Up"}

  {getStage() === "winner" &&
    "🥇 Draw Winner"}

  {getStage() === "complete" &&
    "🏆 Draw Complete"}
</div>

        </div>

        <div
          className="
            mt-10
            rounded-[40px]
            border
            border-[#8DFF00]/20
            bg-white/5
            p-8
          "
        >

          <div
            className="
              text-center
              text-[#8DFF00]
              text-5xl
              font-black
            "
          >
            ▼
          </div>

          <div
            className="
              flex
              justify-center
              gap-4
              mt-6
              overflow-hidden
            "
          >

            {carousel
              .slice(
                0,
                5
              )
              .map(
                (
                  pet,
                  index
                ) => (

                  <div
                    key={
                      index
                    }
                    className={`
                      overflow-hidden
                      rounded-[24px]
                      border-2
                      bg-black
                      ${
                        index === 2
                          ? "border-[#8DFF00] shadow-[0_0_60px_#8DFF00]"
                          : "border-white/10"
                      }
                    `}
                  >

                    <img
                      src={
                        pet.photo_url
                      }
                      alt=""
                      className="
  w-[220px]
  h-[320px]
  object-contain
  bg-black
"
                    />

                  </div>

                )
              )}

          </div>

          <div
  className="
    mt-6
    text-center
    text-[#8DFF00]
    text-5xl
    font-black
  "
>
  ▲
</div>

        </div>

        <button
          onClick={
            spinForWinner
          }
          disabled={
            spinning ||
            getStage() ===
              "complete"
          }
          className="
            mt-8
            w-full
            py-5
            rounded-[24px]
            font-black
            uppercase
            text-black
            text-xl
          "
          style={{
            background:
              BREEZE_GREEN,
          }}
        >

          {spinning
  ? "SPINNING..."
  : getStage() === "third"
  ? "DRAW THIRD PLACE"
  : getStage() === "runner"
  ? "DRAW RUNNER UP"
  : getStage() === "winner"
  ? "DRAW WINNER"
  : "DRAW COMPLETE"}

        </button>

        <div
          className="
            mt-12
            grid
            md:grid-cols-3
            gap-6
          "
        >

          {[
            {
              title:
                "🥉 Third Place",
              pet:
                thirdPlace,
            },
            {
              title:
                "🥈 Runner Up",
              pet:
                runnerUp,
            },
            {
              title:
                "🥇 Winner",
              pet:
                winner,
            },
          ].map(
            (
              card
            ) => (

              <div
                key={
                  card.title
                }
                className="
                  rounded-[30px]
                  overflow-hidden
                  border
                  border-white/10
                  bg-white/5
                "
              >

                {card.pet ? (

                  <>

                    <img
                      src={
                        card.pet
                          .photo_url
                      }
                      alt=""
                      className="
                        w-full
                        h-[350px]
                        object-cover
                        object-center
                      "
                    />

                    <div className="p-5 text-center">

                      <div className="font-black uppercase">
                        {
                          card.title
                        }
                      </div>

                      <div className="mt-2">
                        {
                          card.pet
                            .pet_name
                        }
                      </div>

                      <div className="text-white/60">
                        Owner:
                        {" "}
                        {
                          card.pet
                            .name
                        }
                      </div>

                    </div>

                  </>

                ) : (

                  <div
                    className="
                      h-[450px]
                      flex
                      items-center
                      justify-center
                      text-white/30
                    "
                  >
                    Waiting...
                  </div>

                )}

              </div>

            )
          )}

        </div>

        <div
          className="
            mt-10
            grid
            md:grid-cols-2
            gap-4
          "
        >

          <button
            onClick={
              saveWinners
            }
            disabled={
              saving ||
              !winner
            }
            className="
              py-5
              rounded-[24px]
              font-black
              uppercase
              text-black
            "
            style={{
              background:
                BREEZE_GREEN,
              opacity:
                winner
                  ? 1
                  : 0.5,
            }}
          >
            SAVE WINNERS
          </button>

          <button
            onClick={
              resetDraw
            }
            className="
              py-5
              rounded-[24px]
              font-black
              uppercase
              border
              border-white/20
            "
          >
            RESET DRAW
          </button>

        </div>

      </div>

    </main>

  );

}
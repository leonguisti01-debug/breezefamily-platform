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
  const [entries, setEntries] =
    useState<PetEntry[]>([]);

  const [carousel, setCarousel] =
    useState<PetEntry[]>([]);

  const [loading, setLoading] =
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

  const [saving,
    setSaving] =
    useState(false);

  useEffect(() => {
    loadEntries();
  }, []);

  async function loadEntries() {

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

    if (!data) return;

    setEntries(data);

    setCarousel([
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
    ]);

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

  function getCurrentStage() {

    if (!thirdPlace)
      return "third";

    if (!runnerUp)
      return "runner";

    if (!winner)
      return "winner";

    return "complete";

  }

  function getWeekNumber() {

    const today =
      new Date();

    const firstDay =
      new Date(
        today.getFullYear(),
        0,
        1
      );

    const days =
      Math.floor(
        (
          today.getTime() -
          firstDay.getTime()
        ) /
          86400000
      );

    return Math.ceil(
      (days +
        firstDay.getDay() +
        1) /
        7
    );

  }

  async function spinForWinner() {

    if (
      loading ||
      getCurrentStage() ===
        "complete"
    )
      return;

    if (
      availableEntries.length ===
      0
    )
      return;

    setLoading(true);

    const finalWinner =
      availableEntries[
        Math.floor(
          Math.random() *
            availableEntries.length
        )
      ];

    let speed = 40;
    let count = 0;

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

        speed += 4;

        if (count < 40) {

          setTimeout(
            animate,
            speed
          );

        } else {

          setCarousel([
            finalWinner,
          ]);

          const stage =
            getCurrentStage();

          if (
            stage ===
            "third"
          ) {

            setThirdPlace(
              finalWinner
            );

          } else if (
            stage ===
            "runner"
          ) {

            setRunnerUp(
              finalWinner
            );

          } else {

            setWinner(
              finalWinner
            );

          }

          setLoading(
            false
          );

        }

      };

    animate();

  }

  async function saveWinners() {

    if (
      !thirdPlace ||
      !runnerUp ||
      !winner
    ) {

      alert(
        "Complete all draws first."
      );

      return;

    }

    setSaving(true);

    const week =
      getWeekNumber();

    const now =
      new Date()
        .toISOString();

    const payload = [
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
        created_at:
          now,
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
        created_at:
          now,
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
        created_at:
          now,
      },
    ];

    const { error } =
      await supabase
        .from(
          "prized_pets_winners"
        )
        .insert(
          payload
        );

    if (error) {

      alert(
        error.message
      );

      setSaving(false);

      return;

    }

    alert(
      "Winners saved successfully."
    );

    setSaving(false);

  }

  const stage =
    getCurrentStage();

  return (    <main className="min-h-screen bg-black text-white px-4 py-12">

      <div className="max-w-7xl mx-auto">

        <div className="text-center">

          <p
            className="uppercase tracking-[5px] text-xs"
            style={{
              color:
                BREEZE_GREEN,
            }}
          >
            Breeze Family
          </p>

          <h1
            className="
              mt-4
              text-5xl
              md:text-7xl
              font-black
              uppercase
            "
          >
            Prized Pets
          </h1>

          <h2
            className="
              text-4xl
              md:text-6xl
              font-black
              uppercase
            "
            style={{
              color:
                BREEZE_GREEN,
            }}
          >
            Slot Machine Draw
          </h2>

        </div>

        <div
          className="
            mt-10
            text-center
          "
        >

          <div
            className="
              inline-block
              px-6
              py-3
              rounded-full
              bg-white/5
              border
              border-white/10
              font-black
              uppercase
            "
          >

            {stage ===
              "third" &&
              "🥉 Draw Third Place"}

            {stage ===
              "runner" &&
              "🥈 Draw Runner Up"}

            {stage ===
              "winner" &&
              "🥇 Draw Winner"}

            {stage ===
              "complete" &&
              "🏆 Draw Complete"}

          </div>

        </div>

        {/* SLOT MACHINE */}

        <div
          className="
            mt-10
            rounded-[30px]
            border
            border-[#8DFF00]/20
            bg-white/5
            p-6
            overflow-hidden
          "
        >

          <div
            className="
              text-center
              text-[#8DFF00]
              font-black
              text-4xl
              mb-4
            "
          >
            ▼
          </div>

          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-5
              gap-4
            "
          >

            {carousel
              .slice(
                0,
                10
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
                    className="
                      rounded-[24px]
                      overflow-hidden
                      border
                      border-white/10
                      bg-black
                    "
                  >

                    <img
                      src={
                        pet.photo_url
                      }
                      alt=""
                      className="
                        w-full
                        aspect-square
                        object-cover
                      "
                    />

                  </div>

                )
              )}

          </div>

        </div>

        <button
          onClick={
            spinForWinner
          }
          disabled={
            loading ||
            stage ===
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
          "
          style={{
            background:
              BREEZE_GREEN,
          }}
        >

          {loading
            ? "SPINNING..."
            : "SPIN"}

        </button>

        {/* WINNERS */}

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
                        aspect-square
                        object-cover
                      "
                    />

                    <div className="p-5 text-center">

                      <h3
                        className="
                          font-black
                          uppercase
                        "
                      >
                        {
                          card.title
                        }
                      </h3>

                      <div className="mt-2 font-bold">
                        {
                          card.pet
                            .pet_name
                        }
                      </div>

                      <div className="text-white/60 text-sm">
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
                      aspect-square
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

        <button
          onClick={
            saveWinners
          }
          disabled={
            stage !==
              "complete" ||
            saving
          }
          className="
            mt-10
            w-full
            py-5
            rounded-[24px]
            font-black
            uppercase
            text-black
          "
          style={{
            background:
              BREEZE_GREEN,
          }}
        >

          {saving
            ? "SAVING..."
            : "SAVE WINNERS"}

        </button>

      </div>

    </main>

  );

}
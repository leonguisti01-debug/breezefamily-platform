"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PetsDrawPage() {
  const [entries, setEntries] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [spinning, setSpinning] =
  useState(false);

const [currentWinner, setCurrentWinner] =
  useState<any>(null);

const [drawStage, setDrawStage] =
  useState<
    "bronze" |
    "silver" |
    "gold" |
    "complete"
  >("bronze");

const [confirmedBronze, setConfirmedBronze] =
  useState<any>(null);

const [confirmedSilver, setConfirmedSilver] =
  useState<any>(null);

const [confirmedGold, setConfirmedGold] =
  useState<any>(null);

const [excludedIds, setExcludedIds] =
  useState<number[]>([]);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    const { data } =
      await supabase
        .from(
          "prized_pets_entries"
        )
        .select("*");

    setEntries(data || []);
    setLoading(false);
  };

  const spinMachine = () => {

  const available =
    entries.filter(
      (pet) =>
        !excludedIds.includes(
          pet.id
        )
    );

  if (
    available.length < 1
  ) {
    alert(
      "No entries left."
    );
    return;
  }

  setSpinning(true);

  const animation =
    setInterval(() => {

      const random =
        available[
          Math.floor(
            Math.random() *
            available.length
          )
        ];

      setCurrentWinner(
        random
      );

    }, 80);

  setTimeout(() => {

    clearInterval(
      animation
    );

    const winner =
      available[
        Math.floor(
          Math.random() *
          available.length
        )
      ];

    setCurrentWinner(
      winner
    );

    setSpinning(false);

  }, 6000);

};
const confirmWinner = () => {

  if (
    !currentWinner
  ) return;

  setExcludedIds(
    [
      ...excludedIds,
      currentWinner.id,
    ]
  );

  if (
    drawStage ===
    "bronze"
  ) {

    setConfirmedBronze(
      currentWinner
    );

    setDrawStage(
      "silver"
    );

  } else if (
    drawStage ===
    "silver"
  ) {

    setConfirmedSilver(
      currentWinner
    );

    setDrawStage(
      "gold"
    );

  } else {

    setConfirmedGold(
      currentWinner
    );

    setDrawStage(
      "complete"
    );

  }

  setCurrentWinner(
    null
  );
};
const spinAgain = () => {

  if (
    !currentWinner
  ) return;

  setExcludedIds(
    [
      ...excludedIds,
      currentWinner.id,
    ]
  );

  setCurrentWinner(
    null
  );

  spinMachine();
};
  const saveWinners = async () => {

  if (
    !confirmedBronze ||
    !confirmedSilver ||
    !confirmedGold
  ) {
    alert(
      "Complete all draws first."
    );
    return;
  }

  const weekNumber =
    Math.ceil(
      (
        new Date().getTime() -
        new Date(
          new Date().getFullYear(),
          0,
          1
        ).getTime()
      ) / 604800000
    );

  await supabase
    .from(
      "pet_weekly_winners"
    )
    .insert([
      {
        week_number: weekNumber,
        position: "bronze",
        entry_id: confirmedBronze.id,
        owner_name: confirmedBronze.name,
        pet_name: confirmedBronze.pet_name,
        photo_url: confirmedBronze.photo_url,
        selected_by: "Kent",
      },
      {
        week_number: weekNumber,
        position: "silver",
        entry_id: confirmedSilver.id,
        owner_name: confirmedSilver.name,
        pet_name: confirmedSilver.pet_name,
        photo_url: confirmedSilver.photo_url,
        selected_by: "Kent",
      },
      {
        week_number: weekNumber,
        position: "gold",
        entry_id: confirmedGold.id,
        owner_name: confirmedGold.name,
        pet_name: confirmedGold.pet_name,
        photo_url: confirmedGold.photo_url,
        selected_by: "Kent",
      },
    ]);

  alert(
    "Winners Saved!"
  );
};

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white py-12 px-4">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-6xl font-black text-center mb-4">
          PET DRAW MACHINE
        </h1>

        <p className="text-center text-white/50 mb-10">
          {entries.length} Pet Entries
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white/5 border border-[#8DFF00]/20 rounded-[32px] p-6 text-center">

            <h2 className="text-yellow-400 font-black text-2xl mb-4">
              GOLD PAW
            </h2>

            <>
  {currentWinner?.photo_url && (
    <img
      src={currentWinner?.photo_url}
      alt=""
      className="
  w-full
  h-[300px]
  object-cover
  rounded-2xl
"
    />
  )}

  <div className="text-3xl font-black">
    {currentWinner?.pet_name || "???"}
  </div>

  <div className="text-white/50 mt-2">
    {currentWinner?.name}
  </div>
</>

            <div className="text-white/50 mt-2">
              {currentWinner?.name}
            </div>

          </div>

          <div className="bg-white/5 border border-[#8DFF00]/20 rounded-[32px] p-6 text-center">

            <h2 className="text-gray-300 font-black text-2xl mb-4">
              SILVER PAW
            </h2>

            <>
  {currentWinner?.photo_url && (
    <img
      src={currentWinner?.photo_url}
      alt=""
      className="
  w-full
  h-[300px]
  object-cover
  rounded-2xl
"
    />
  )}

  <div className="text-3xl font-black">
    {currentWinner?.pet_name || "???"}
  </div>

  <div className="text-white/50 mt-2">
    {currentWinner?.name}
  </div>
</>

            <div className="text-white/50 mt-2">
              {currentWinner?.name}
            </div>

          </div>

          <div className="bg-white/5 border border-[#8DFF00]/20 rounded-[32px] p-6 text-center">

            <h2 className="text-orange-500 font-black text-2xl mb-4">
              BRONZE PAW
            </h2>

            <>
  {currentWinner?.photo_url && (
    <img
      src={currentWinner?.photo_url}
      alt=""
      className="
  w-full
  h-[300px]
  object-cover
  rounded-2xl
"
    />
  )}

  <div className="text-3xl font-black">
    {currentWinner?.pet_name || "???"}
  </div>

  <div className="text-white/50 mt-2">
    {currentWinner?.name}
  </div>
</>

            <div className="text-white/50 mt-2">
              {currentWinner?.name}
            </div>

          </div>

        </div>

        <div className="text-center">

          <button
            onClick={
              spinMachine
            }
            disabled={
              spinning
            }
            className="
              px-10
              py-5
              rounded-full
              bg-[#8DFF00]
              text-black
              font-black
              text-2xl
            "
          >
            SPIN THE MACHINE
          </button>

          {drawStage ===
  "complete" && (

            <div className="mt-6">

              <button
                onClick={
                  saveWinners
                }
                className="
                  px-10
                  py-5
                  rounded-full
                  bg-white
                  text-black
                  font-black
                  text-xl
                "
              >
                SAVE WINNERS
              </button>

            </div>

          )}

        </div>

      </div>

    </main>
  );
}
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

  const [gold, setGold] =
    useState<any>(null);

  const [silver, setSilver] =
    useState<any>(null);

  const [bronze, setBronze] =
    useState<any>(null);

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

  if (
    !entries ||
    entries.length < 3
  ) {
    alert(
      "Need at least 3 pet entries."
    );
    return;
  }

  setSpinning(true);

  const animation =
    setInterval(() => {

      const shuffled =
        [...entries].sort(
          () =>
            Math.random() - 0.5
        );

      setGold(
        shuffled[0]
      );

      setSilver(
        shuffled[1]
      );

      setBronze(
        shuffled[2]
      );

    }, 80);

  setTimeout(() => {

    clearInterval(
      animation
    );

    const finalShuffle =
      [...entries].sort(
        () =>
          Math.random() - 0.5
      );

    setGold(
      finalShuffle[0]
    );

    setSilver(
      finalShuffle[1]
    );

    setBronze(
      finalShuffle[2]
    );

    setSpinning(false);

  }, 8000);

};
  const saveWinners =
    async () => {

      const weekNumber =
        Math.ceil(
          (
            new Date().getTime() -
            new Date(
              new Date().getFullYear(),
              0,
              1
            ).getTime()
          ) /
            604800000
        );

      await supabase
        .from(
          "pet_weekly_winners"
        )
        .insert([
          {
            week_number:
              weekNumber,
            position:
              "gold",
            entry_id:
              gold.id,
            owner_name:
              gold.name,
            pet_name:
              gold.pet_name,
            photo_url:
              gold.photo_url,
            selected_by:
              "Kent",
          },
          {
            week_number:
              weekNumber,
            position:
              "silver",
            entry_id:
              silver.id,
            owner_name:
              silver.name,
            pet_name:
              silver.pet_name,
            photo_url:
              silver.photo_url,
            selected_by:
              "Kent",
          },
          {
            week_number:
              weekNumber,
            position:
              "bronze",
            entry_id:
              bronze.id,
            owner_name:
              bronze.name,
            pet_name:
              bronze.pet_name,
            photo_url:
              bronze.photo_url,
            selected_by:
              "Kent",
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
  {gold?.photo_url && (
    <img
      src={gold.photo_url}
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
    {gold?.pet_name || "???"}
  </div>

  <div className="text-white/50 mt-2">
    {gold?.name}
  </div>
</>

            <div className="text-white/50 mt-2">
              {gold?.name}
            </div>

          </div>

          <div className="bg-white/5 border border-[#8DFF00]/20 rounded-[32px] p-6 text-center">

            <h2 className="text-gray-300 font-black text-2xl mb-4">
              SILVER PAW
            </h2>

            <>
  {gold?.photo_url && (
    <img
      src={silver.photo_url}
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
    {silver?.pet_name || "???"}
  </div>

  <div className="text-white/50 mt-2">
    {silver?.name}
  </div>
</>

            <div className="text-white/50 mt-2">
              {silver?.name}
            </div>

          </div>

          <div className="bg-white/5 border border-[#8DFF00]/20 rounded-[32px] p-6 text-center">

            <h2 className="text-orange-500 font-black text-2xl mb-4">
              BRONZE PAW
            </h2>

            <>
  {gold?.photo_url && (
    <img
      src={bronze.photo_url}
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
    {bronze?.pet_name || "???"}
  </div>

  <div className="text-white/50 mt-2">
    {bronze?.name}
  </div>
</>

            <div className="text-white/50 mt-2">
              {bronze?.name}
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

          {gold &&
            silver &&
            bronze && (

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
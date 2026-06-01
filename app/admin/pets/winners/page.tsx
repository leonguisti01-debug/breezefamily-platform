"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const BREEZE_GREEN = "#8DFF00";

export default function PetWinnersPage() {

  const [entries, setEntries] =
    useState<any[]>([]);

  const [weekNumber, setWeekNumber] =
    useState(1);

  useEffect(() => {

    loadEntries();

  }, []);

  const loadEntries =
    async () => {

      const {
        data,
      } = await supabase
        .from("prized_pets_entries")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      if (data) {

        setEntries(data);

      }

    };

  const saveWinner =
    async (
      entry: any,
      position: string
    ) => {

      const { error } =
        await supabase
          .from(
            "pet_weekly_winners"
          )
          .insert([
            {
              week_number:
                weekNumber,

              position,

              entry_id:
                entry.id,

              owner_name:
                entry.name,

              pet_name:
                entry.pet_name,

              photo_url:
                entry.photo_url,

              selected_by:
                "admin",
            },
          ]);

      if (error) {

        alert(
          error.message
        );

        return;

      }

      alert(
        `${entry.pet_name} saved as ${position}`
      );

    };

  return (

    <main className="min-h-screen bg-black text-white px-4 py-20">

      <div className="max-w-7xl mx-auto">

        <h1
          className="
            text-5xl
            md:text-7xl
            font-black
            uppercase
            mb-10
          "
        >
          Weekly Winners
        </h1>

        <div className="mb-8">

          <label className="block mb-2">
            Week Number
          </label>

          <input
            type="number"
            min="1"
            value={weekNumber}
            onChange={(e) =>
              setWeekNumber(
                Number(
                  e.target.value
                )
              )
            }
            className="
              bg-black
              border
              border-white/20
              rounded-xl
              px-4
              py-3
            "
          />

        </div>

        <div
          className="
            grid
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-5
          "
        >

          {entries.map(
            (entry) => (

              <div
                key={entry.id}
                className="
                  rounded-[30px]
                  overflow-hidden
                  border
                  border-white/10
                  bg-white/5
                "
              >

                <img
                  src={
                    entry.photo_url
                  }
                  alt={
                    entry.pet_name
                  }
                  className="
                    w-full
                    h-[280px]
                    object-cover
                  "
                />

                <div className="p-5">

                  <h2
                    className="
                      text-xl
                      font-black
                    "
                  >
                    {
                      entry.pet_name
                    }
                  </h2>

                  <p className="text-white/70">
                    Owner:
                    {" "}
                    {entry.name}
                  </p>

                  <div className="mt-5 grid gap-2">

                    <button
                      onClick={() =>
                        saveWinner(
                          entry,
                          "winner"
                        )
                      }
                      className="
                        py-3
                        rounded-xl
                        font-black
                        text-black
                      "
                      style={{
                        background:
                          BREEZE_GREEN,
                      }}
                    >
                      Winner
                    </button>

                    <button
                      onClick={() =>
                        saveWinner(
                          entry,
                          "runner_up"
                        )
                      }
                      className="
                        py-3
                        rounded-xl
                        bg-yellow-500
                        text-black
                        font-black
                      "
                    >
                      Runner Up
                    </button>

                    <button
                      onClick={() =>
                        saveWinner(
                          entry,
                          "third_place"
                        )
                      }
                      className="
                        py-3
                        rounded-xl
                        bg-orange-500
                        text-black
                        font-black
                      "
                    >
                      Third Place
                    </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </main>

  );

}
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const BREEZE_GREEN = "#8DFF00";

export default function HallOfFame() {

  const [winners, setWinners] =
    useState<any[]>([]);

  useEffect(() => {

    loadWinners();

  }, []);

  const loadWinners =
    async () => {

      const { data } =
        await supabase
          .from(
            "pet_weekly_winners"
          )
          .select("*")
          .order(
            "week_number",
            {
              ascending: false,
            }
          );

      if (data) {

        setWinners(data);

      }

    };

  const weeks =
    [...new Set(
      winners.map(
        (winner) =>
          winner.week_number
      )
    )];

  return (

    <section className="py-20">

      <div className="max-w-7xl mx-auto px-4">

        <h2
          className="
            text-5xl
            md:text-7xl
            font-black
            uppercase
            text-center
            mb-14
          "
        >
          Hall Of Fame
        </h2>

        {weeks.map(
          (week) => {

            const weekEntries =
              winners.filter(
                (winner) =>
                  winner.week_number ===
                  week
              );

            return (

              <div
                key={week}
                className="mb-16"
              >

                <h3
                  className="
                    text-3xl
                    font-black
                    mb-6
                  "
                  style={{
                    color:
                      BREEZE_GREEN,
                  }}
                >
                  Week {week}
                </h3>

                <div
                  className="
                    grid
grid-cols-2
md:grid-cols-4
xl:grid-cols-6
gap-3
                  "
                >

                  {weekEntries.map(
                    (winner) => (

                      <div
                        key={winner.id}
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
                            winner.photo_url
                          }
                          alt=""
                          className="
                            w-full
                            h-[160px]
                            object-cover
                          "
                        />

                        <div className="p-3">

                          <div
                            className="
                              text-[#8DFF00]
                              uppercase
                              text-sm
                              tracking-[3px]
                            "
                          >
                            {winner.position.replace(
                              "_",
                              " "
                            )}
                          </div>

                          <h4
                            className="
                              text-base
                              font-black
                              mt-2
                            "
                          >
                            {winner.pet_name}
                          </h4>

                          <p className="text-white/60">
                            Owner:
                            {" "}
                            {winner.owner_name}
                          </p>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

            );

          }
        )}

      </div>

    </section>

  );

}
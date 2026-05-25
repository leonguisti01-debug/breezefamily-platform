"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const BREEZE_GREEN = "#8DFF00";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function PrizedPetsAdminPage() {

  const [entries, setEntries] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [slotNames, setSlotNames] =
    useState<string[]>([]);

  const [thirdPlace, setThirdPlace] =
    useState<any>(null);

  const [secondPlace, setSecondPlace] =
    useState<any>(null);

  const [firstPlace, setFirstPlace] =
    useState<any>(null);

  const [currentDraw,
    setCurrentDraw] =
    useState("");

  useEffect(() => {

    fetchEntries();

    const today =
      new Date();

    setCurrentDraw(
      today.toLocaleDateString(
        "en-ZA",
        {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )
    );

  }, []);

  const fetchEntries =
    async () => {

      const { data } =
        await supabase
          .from(
            "prized_pets_entries"
          )
          .select("*");

      if (data) {

        setEntries(data);

        setSlotNames(
          data.map(
            (item) => item.name
          )
        );
      }
    };

  const spinForWinner =
    async (
      position:
        | "third"
        | "second"
        | "first"
    ) => {

      if (
        entries.length === 0
      )
        return;

      setLoading(true);

      const randomWinner =
        entries[
          Math.floor(
            Math.random() *
              entries.length
          )
        ];

      let counter = 0;

      const interval =
        setInterval(() => {

          const randomNames =
            entries
              .sort(
                () =>
                  0.5 -
                  Math.random()
              )
              .map(
                (e) => e.name
              );

          setSlotNames(
            randomNames
          );

          counter++;

          if (counter > 30) {

            clearInterval(
              interval
            );

            if (
              position ===
              "third"
            ) {

              setThirdPlace(
                randomWinner
              );

            } else if (
              position ===
              "second"
            ) {

              setSecondPlace(
                randomWinner
              );

            } else {

              setFirstPlace(
                randomWinner
              );
            }

            setLoading(false);
          }

        }, 100);
    };

  const saveWinners =
    async () => {

      if (
        !firstPlace ||
        !secondPlace ||
        !thirdPlace
      ) {
        return;
      }

      await supabase
        .from(
          "prized_pets_winners"
        )
        .insert([
          {
            draw_date:
              currentDraw,

            first_place_name:
              firstPlace.name,

            first_place_photo:
              firstPlace.photo_url,

            second_place_name:
              secondPlace.name,

            second_place_photo:
              secondPlace.photo_url,

            third_place_name:
              thirdPlace.name,

            third_place_photo:
              thirdPlace.photo_url,
          },
        ]);

      alert(
        "Winners Saved!"
      );
    };

  return (
    <main className="min-h-screen bg-black text-white px-4 py-24 overflow-x-hidden">

      {/* BACKGROUND */}
      <div
        className="fixed top-[-300px] left-[-300px] w-[600px] h-[600px] blur-[220px] rounded-full pointer-events-none"
        style={{
          background: `${BREEZE_GREEN}15`,
        }}
      />

      <div
        className="fixed bottom-[-300px] right-[-300px] w-[600px] h-[600px] blur-[220px] rounded-full pointer-events-none"
        style={{
          background: `${BREEZE_GREEN}10`,
        }}
      />

      <div className="relative z-20 max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center">

          <p
            className="uppercase tracking-[5px] text-xs"
            style={{
              color: BREEZE_GREEN,
            }}
          >
            Kent Breeze Live
          </p>

          <h1
            className="mt-4 uppercase italic font-black"
            style={{
              fontFamily:
                "Bebas Neue, sans-serif",
              fontSize:
                "clamp(60px, 12vw, 140px)",
              lineHeight: "0.82",
            }}
          >

            LIVE
            <span
              className="block"
              style={{
                color:
                  BREEZE_GREEN,
              }}
            >
              DRAW
            </span>

          </h1>

          <p className="mt-6 text-white/60 text-sm uppercase tracking-[3px]">

            Friday Nights • 8PM

          </p>

        </div>

        {/* SLOT MACHINE */}
        <div className="mt-16 rounded-[36px] border border-[#8DFF00]/20 bg-white/5 backdrop-blur-2xl p-6 md:p-10">

          <div className="overflow-hidden h-[90px] rounded-3xl border border-white/10 bg-black flex items-center justify-center">

            <div className="flex gap-10 animate-pulse">

              {slotNames
                .slice(0, 8)
                .map(
                  (
                    name,
                    index
                  ) => (

                    <div
                      key={index}
                      className="uppercase font-black whitespace-nowrap"
                      style={{
                        fontSize:
                          "clamp(20px, 5vw, 42px)",
                        color:
                          BREEZE_GREEN,
                      }}
                    >

                      {name}

                    </div>

                  )
                )}

            </div>

          </div>

          {/* BUTTONS */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">

            <button
              disabled={
                loading
              }
              onClick={() =>
                spinForWinner(
                  "third"
                )
              }
              className="
                py-4
                rounded-2xl
                bg-white
                text-black
                font-black
                uppercase
              "
            >

              Spin 3rd Place

            </button>

            <button
              disabled={
                loading
              }
              onClick={() =>
                spinForWinner(
                  "second"
                )
              }
              className="
                py-4
                rounded-2xl
                bg-white
                text-black
                font-black
                uppercase
              "
            >

              Spin 2nd Place

            </button>

            <button
              disabled={
                loading
              }
              onClick={() =>
                spinForWinner(
                  "first"
                )
              }
              className="
                py-4
                rounded-2xl
                bg-[#8DFF00]
                text-black
                font-black
                uppercase
              "
            >

              Spin 1st Place

            </button>

          </div>

        </div>

        {/* WINNERS */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* 3RD */}
          <WinnerCard
            title="3rd Place"
            winner={thirdPlace}
            color="#ffffff"
          />

          {/* 2ND */}
          <WinnerCard
            title="2nd Place"
            winner={secondPlace}
            color="#cccccc"
          />

          {/* 1ST */}
          <WinnerCard
            title="1st Place"
            winner={firstPlace}
            color={BREEZE_GREEN}
          />

        </div>

        {/* RULE */}
        <div className="mt-12 rounded-[30px] border border-red-500/20 bg-red-500/10 p-6 text-center">

          <p className="uppercase tracking-[3px] text-red-300 text-xs">

            LIVE CLAIM RULE

          </p>

          <p className="mt-4 text-white/80 leading-relaxed">

            Winners must be present in
            Kent Breeze LIVE when
            their name is called.

            <br />
            <br />

            If the selected entrant
            is not in the live,
            the prize is forfeited
            and a redraw will happen.

          </p>

        </div>

        {/* SAVE */}
        <button
          onClick={saveWinners}
          className="
            mt-12
            w-full
            py-5
            rounded-3xl
            bg-[#8DFF00]
            text-black
            font-black
            uppercase
            tracking-[4px]
          "
        >

          Save Winners

        </button>

      </div>

    </main>
  );
}

function WinnerCard({
  title,
  winner,
  color,
}: any) {

  return (

    <div
      className="
        rounded-[30px]
        overflow-hidden
        border
        border-white/10
        bg-white/5
      "
    >

      {winner ? (

        <>
          <img
            src={
              winner.photo_url
            }
            alt={
              winner.name
            }
            className="w-full aspect-square object-cover"
          />

          <div className="p-5 text-center">

            <p
              className="uppercase tracking-[3px] text-xs"
              style={{
                color,
              }}
            >
              {title}
            </p>

            <h2
              className="mt-3 uppercase font-black"
              style={{
                fontSize:
                  "clamp(28px, 5vw, 42px)",
              }}
            >

              {winner.name}

            </h2>

          </div>
        </>
      ) : (

        <div className="aspect-square flex items-center justify-center text-white/30 uppercase text-sm">

          Waiting...

        </div>
      )}

    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const BREEZE_GREEN = "#8DFF00";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "YOUR_ANON_KEY"
);

export default function PrizedPetsAdminV2Page() {

  const [entries, setEntries] =
    useState<any[]>([]);

  const [carousel, setCarousel] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [drawStage,
    setDrawStage] =
    useState<
      "third" |
      "second" |
      "first"
    >("third");

  const [thirdPlace,
    setThirdPlace] =
    useState<any>(null);

  const [secondPlace,
    setSecondPlace] =
    useState<any>(null);

  const [firstPlace,
    setFirstPlace] =
    useState<any>(null);

  const [currentDraw,
    setCurrentDraw] =
    useState("");

  useEffect(() => {

    loadEntries();

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

  const loadEntries =
    async () => {

      const { data } =
        await supabase
          .from(
            "prized_pets_entries"
          )
          .select("*");

      if (!data) return;

      setEntries(data);

      const repeated =
        [
          ...data,
          ...data,
          ...data,
          ...data,
          ...data,
        ];

      setCarousel(
        repeated
      );

    };

  const getAvailableEntries =
    () => {

      return entries.filter(
        (entry) =>
          entry.id !==
            thirdPlace?.id &&
          entry.id !==
            secondPlace?.id &&
          entry.id !==
            firstPlace?.id
      );

    };  const spinForWinner =
    async () => {

      const available =
        getAvailableEntries();

      if (
        available.length === 0
      )
        return;

      setLoading(true);

      const winnerIndex =
        Math.floor(
          Math.random() *
          available.length
        );

      const winner =
        available[
          winnerIndex
        ];

      const repeated =
        [
          ...available,
          ...available,
          ...available,
          ...available,
          ...available,
          ...available,
          ...available,
        ];

      let frame = 0;

      const interval =
        setInterval(() => {

          frame++;

          const shuffled =
            [...repeated]
              .sort(
                () =>
                  Math.random() -
                  0.5
              );

          setCarousel(
            shuffled
          );

          if (
            frame > 80
          ) {

            clearInterval(
              interval
            );

            const snapArray =
              [
                ...available.slice(
                  0,
                  12
                ),

                winner,

                ...available.slice(
                  12,
                  24
                ),
              ];

            setCarousel(
              snapArray
            );

            if (
              drawStage ===
              "third"
            ) {

              setThirdPlace(
                winner
              );

              setDrawStage(
                "second"
              );

            } else if (
              drawStage ===
              "second"
            ) {

              setSecondPlace(
                winner
              );

              setDrawStage(
                "first"
              );

            } else {

              setFirstPlace(
                winner
              );

            }

            setLoading(
              false
            );

          }

        }, 75);

    };

  const saveWinners =
    async () => {

      if (
        !firstPlace ||
        !secondPlace ||
        !thirdPlace
      ) {

        alert(
          "Draw all winners first."
        );

        return;

      }

      const { error } =
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

      if (error) {

        alert(
          error.message
        );

        return;

      }

      alert(
        "Winners Saved!"
      );

    };
    return (
  <div className="p-10 text-white">
    Admin V2 Under Construction
  </div>
);

}
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SPOTS = [
  "top-20 left-10",
  "top-32 right-10",
  "top-1/2 left-6",
  "top-1/2 right-6",
  "bottom-20 left-10",
  "bottom-20 right-10",
  "bottom-40 left-1/4",
  "bottom-40 right-1/4",
];

export default function FindKai() {

  const pathname =
    usePathname();

  const [found,
    setFound] =
    useState(false);

  const [showKai,
    setShowKai] =
    useState(false);

  const [spot,
    setSpot] =
    useState("");

  useEffect(() => {

    const today =
      new Date()
        .toDateString();

    const storedDate =
      localStorage.getItem(
        "kai-date"
      );

    if (
      storedDate !==
      today
    ) {

      const pages = [
        "/",
        "/prized-pets",
        "/tiktok-stars",
      ];

      const randomPage =
        pages[
          Math.floor(
            Math.random() *
            pages.length
          )
        ];

      const randomSpot =
        SPOTS[
          Math.floor(
            Math.random() *
            SPOTS.length
          )
        ];

      localStorage.setItem(
        "kai-date",
        today
      );

      localStorage.setItem(
        "kai-page",
        randomPage
      );

      localStorage.setItem(
        "kai-spot",
        randomSpot
      );

      localStorage.removeItem(
        "kai-found"
      );

    }

    const page =
      localStorage.getItem(
        "kai-page"
      );

    const hidingSpot =
      localStorage.getItem(
        "kai-spot"
      );

    const foundToday =
      localStorage.getItem(
        "kai-found"
      );

    setSpot(
      hidingSpot || ""
    );

    if (
      pathname === page &&
      foundToday !== "yes"
    ) {

      setShowKai(
        true
      );

    }

  }, [pathname]);

  function foundKai() {

    localStorage.setItem(
      "kai-found",
      "yes"
    );

    setShowKai(
      false
    );

    setFound(
      true
    );

  }

  if (
    !showKai &&
    !found
  ) {
    return null;
  }

  return (
    <>
      {showKai && (

        <button
          onClick={
            foundKai
          }
          className={`
            fixed
            z-50
            opacity-90
            hover:scale-110
            transition
            ${spot}
          `}
        >

          <img
            src="/kai.png"
            alt="Kai"
            className="w-[60px]"
          />

        </button>

      )}

      {found && (

        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/70
          "
        >

          <div
            className="
              bg-black
              border
              border-[#8DFF00]
              rounded-3xl
              p-8
              text-center
              max-w-md
            "
          >

            <img
              src="/kai.png"
              alt="Kai"
              className="
                w-24
                mx-auto
                mb-4
              "
            />

            <h2
              className="
                text-3xl
                font-black
                text-[#8DFF00]
              "
            >
              YOU FOUND KAI!
            </h2>

            <div
              className="
                mt-4
                text-4xl
                font-black
                text-[#8DFF00]
              "
            >
              KAI10
            </div>

            <p className="mt-4">
              Use this code for
              10% off.
            </p>

            <button
              onClick={() =>
                setFound(false)
              }
              className="
                mt-6
                px-6
                py-3
                rounded-xl
                bg-[#8DFF00]
                text-black
                font-black
              "
            >
              CLOSE
            </button>

          </div>

        </div>

      )}

    </>
  );

}
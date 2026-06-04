"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function FindKai() {
  const pathname = usePathname();

  const [showKai, setShowKai] = useState(false);
  const [found, setFound] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();

    const storedDate =
      localStorage.getItem("kai-date");

    const storedPage =
      localStorage.getItem("kai-page");

    const foundToday =
      localStorage.getItem("kai-found");

    if (storedDate !== today) {
      const pages = [
        "/",
        "/prized-pets",
        "/tiktok-stars",
      ];

      const randomPage =
        pages[
          Math.floor(
            Math.random() * pages.length
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

      localStorage.removeItem(
        "kai-found"
      );
    }

    const page =
      localStorage.getItem("kai-page");

    if (
      page === pathname &&
      foundToday !== "yes"
    ) {
      setShowKai(true);
    }

  }, [pathname]);

  function foundKai() {
    localStorage.setItem(
      "kai-found",
      "yes"
    );

    setFound(true);
    setShowKai(false);
  }

  if (!showKai && !found) {
    return null;
  }

  return (
    <>
      {showKai && (
        <button
          onClick={foundKai}
          className="
            fixed
            bottom-10
            right-10
            z-50
            hover:scale-110
            transition
          "
        >
          <img
            src="/kai.png"
            alt="Kai"
            className="w-20"
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

            <p className="mt-4">
              Use code:
            </p>

            <div
              className="
                mt-2
                text-4xl
                font-black
                text-[#8DFF00]
              "
            >
              KAI10
            </div>

            <p className="mt-4">
              for 10% off your order.
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
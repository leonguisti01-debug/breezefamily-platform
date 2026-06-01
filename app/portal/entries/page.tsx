"use client";

import { useRouter } from "next/navigation";

const BREEZE_GREEN = "#8DFF00";

export default function EntriesPage() {

  const router = useRouter();

  return (

    <main
      className="
        min-h-screen
        bg-black
        text-white
        px-6
        py-12
      "
    >

      <div
        className="
          max-w-4xl
          mx-auto
        "
      >

        <div
          className="
            text-center
            mb-12
          "
        >

          <h1
            className="
              text-4xl
              md:text-6xl
              font-black
              uppercase
            "
          >
            My
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
            Entries
          </h2>

        </div>

        {/* PRIZED PETS */}

        <div
          className="
            mb-6
            rounded-[24px]
            border
            border-white/10
            bg-white/5
            p-6
          "
        >

          <h3
            className="
              text-2xl
              font-black
              mb-4
            "
          >
            🐾 Prized Pets
          </h3>

          <p
            className="
              text-white/60
            "
          >
            Entry history will
            appear here.
          </p>

        </div>

        {/* FAMILY MEMBERS */}

        <div
          className="
            mb-6
            rounded-[24px]
            border
            border-white/10
            bg-white/5
            p-6
          "
        >

          <h3
            className="
              text-2xl
              font-black
              mb-4
            "
          >
            👨‍👩‍👧 Family Members
          </h3>

          <p
            className="
              text-white/60
            "
          >
            Entry history will
            appear here.
          </p>

        </div>

        {/* TIKTOK STARS */}

        <div
          className="
            mb-6
            rounded-[24px]
            border
            border-white/10
            bg-white/5
            p-6
          "
        >

          <h3
            className="
              text-2xl
              font-black
              mb-4
            "
          >
            ⭐ TikTok Stars
          </h3>

          <p
            className="
              text-white/60
            "
          >
            Entry history will
            appear here.
          </p>

        </div>

        <button
          onClick={() =>
            router.push(
              "/portal"
            )
          }
          className="
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
          Back To Portal
        </button>

      </div>

    </main>

  );

}
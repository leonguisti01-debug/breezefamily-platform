"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PetsDrawLoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = () => {

    if (
      email.toLowerCase() ===
        "dekentbrown@gmail.com" &&
      password ===
        "Breeze2026"
    ) {

      router.push(
        "/pets-draw"
      );

      return;
    }

    alert(
      "Nice try. You are not Kent."
    );
  };

  return (
    <main
      className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
        px-4
      "
    >

      <div
        className="
          w-full
          max-w-md
          rounded-[32px]
          border
          border-[#8DFF00]/20
          bg-white/5
          p-8
        "
      >

        <h1
          className="
            text-4xl
            font-black
            text-center
            mb-2
          "
        >
          PET DRAW LOGIN
        </h1>

        <p
          className="
            text-center
            text-white/60
            mb-8
          "
        >
          Kent's Secret Area
        </p>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="
              w-full
              p-4
              rounded-2xl
              bg-black/40
              border
              border-white/10
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="
              w-full
              p-4
              rounded-2xl
              bg-black/40
              border
              border-white/10
            "
          />

          <button
            onClick={
              handleLogin
            }
            className="
              w-full
              py-4
              rounded-2xl
              bg-[#8DFF00]
              text-black
              font-black
            "
          >
            LOGIN
          </button>

        </div>

      </div>

    </main>
  );
}
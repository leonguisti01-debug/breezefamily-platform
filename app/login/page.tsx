"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const BREEZE_GREEN = "#8DFF00";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleLogin =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      setError("");

      try {

        setLoading(true);

        const {
          error,
        } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (error) {

          throw error;

        }

        router.push(
          "/portal"
        );

      } catch (err: any) {

        setError(
          err.message ||
          "Login failed."
        );

      } finally {

        setLoading(false);

      }

    };

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
          max-w-2xl
          mx-auto
        "
      >

        <div
          className="
            text-center
            mb-10
          "
        >

          <h1
            className="
              text-5xl
              md:text-7xl
              font-black
              uppercase
            "
          >
            Welcome
          </h1>

          <h2
            className="
              text-5xl
              md:text-7xl
              font-black
              uppercase
            "
            style={{
              color:
                BREEZE_GREEN,
            }}
          >
            Back
          </h2>

        </div>

        <div
          className="
            rounded-[32px]
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
            p-6
            md:p-10
          "
        >

          {error && (

            <div
              className="
                mb-6
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/10
                p-4
                text-red-300
              "
            >
              {error}
            </div>

          )}

          <form
            onSubmit={
              handleLogin
            }
            className="
              space-y-5
            "
          >

            <input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-2xl
                bg-black/40
                border
                border-white/10
                px-5
                py-4
                text-white
              "
            />

            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-2xl
                bg-black/40
                border
                border-white/10
                px-5
                py-4
                text-white
              "
            />

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                py-5
                rounded-2xl
                font-black
                uppercase
                text-black
              "
              style={{
                background:
                  BREEZE_GREEN,
              }}
            >
              {loading
                ? "LOGGING IN..."
                : "LOGIN"}
            </button>

          </form>

        </div>

      </div>

    </main>

  );

}
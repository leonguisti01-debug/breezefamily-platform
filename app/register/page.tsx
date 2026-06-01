"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const BREEZE_GREEN = "#8DFF00";

export default function RegisterPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [cellphone, setCellphone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const handleRegister =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      setError("");

      if (
        password !==
        confirmPassword
      ) {

        setError(
          "Passwords do not match."
        );

        return;
      }

      if (
        password.length < 6
      ) {

        setError(
          "Password must be at least 6 characters."
        );

        return;
      }

      try {

        setLoading(true);

        const {
          data,
          error: authError,
        } =
          await supabase.auth.signUp({
            email,
            password,
          });

        if (authError) {

          throw authError;

        }

        if (
          !data.user
        ) {

          throw new Error(
            "Unable to create account."
          );

        }

        const {
          error: memberError,
        } =
          await supabase
            .from(
              "members"
            )
            .insert([
              {
                auth_user_id:
                  data.user.id,

                full_name:
                  fullName,

                email,

                cellphone,
              },
            ]);

        if (
          memberError
        ) {

          throw memberError;

        }

        router.push(
          "/portal"
        );

      } catch (err: any) {

        setError(
          err.message ||
          "Registration failed."
        );

      } finally {

        setLoading(false);

      }

    };  return (

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
              leading-none
            "
          >
            Join The
          </h1>

          <h2
            className="
              text-5xl
              md:text-7xl
              font-black
              uppercase
              leading-none
            "
            style={{
              color:
                BREEZE_GREEN,
            }}
          >
            Family
          </h2>

          <p
            className="
              mt-6
              text-white/60
              text-lg
            "
          >
            Create your Breeze
            Family account and
            manage all your
            competition entries
            in one place.
          </p>

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
              handleRegister
            }
            className="
              space-y-5
            "
          >

            <input
              type="text"
              required
              placeholder="Full Name"
              value={fullName}
              onChange={(e) =>
                setFullName(
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
              type="text"
              required
              placeholder="Cellphone Number"
              value={cellphone}
              onChange={(e) =>
                setCellphone(
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

            <input
              type="password"
              required
              placeholder="Confirm Password"
              value={
                confirmPassword
              }
              onChange={(e) =>
                setConfirmPassword(
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
            />            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                py-5
                rounded-2xl
                font-black
                uppercase
                text-black
                transition
                hover:scale-[1.02]
              "
              style={{
                background:
                  BREEZE_GREEN,
              }}
            >
              {loading
                ? "CREATING ACCOUNT..."
                : "JOIN THE FAMILY"}
            </button>

          </form>

          <div
            className="
              mt-8
              pt-8
              border-t
              border-white/10
              text-center
            "
          >

            <p
              className="
                text-white/60
              "
            >
              Already a member?
            </p>

            <button
              onClick={() =>
                router.push(
                  "/login"
                )
              }
              className="
                mt-4
                font-black
                uppercase
                tracking-wide
              "
              style={{
                color:
                  BREEZE_GREEN,
              }}
            >
              Login Here
            </button>

          </div>

        </div>

      </div>

    </main>

  );

}
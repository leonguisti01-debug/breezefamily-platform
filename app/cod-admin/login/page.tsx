"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CodAdminLogin() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setLoading(true);

    const {
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {

      alert(error.message);

      return;
    }

    router.push(
      "/cod-admin"
    );
  }

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div
        className="
          w-full
          max-w-md
          border
          border-[#8DFF00]/20
          rounded-[30px]
          p-8
        "
      >

        <h1 className="text-4xl font-black">
          COD ADMIN
        </h1>

        <p className="mt-2 text-white/60">
          Tournament Management Portal
        </p>

        <form
          onSubmit={handleLogin}
          className="grid gap-4 mt-8"
        >

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            placeholder="Email"
            className="bg-black border border-white/20 rounded-xl p-4"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            placeholder="Password"
            className="bg-black border border-white/20 rounded-xl p-4"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="
              bg-[#8DFF00]
              text-black
              font-black
              p-4
              rounded-xl
            "
          >
            {loading
              ? "LOGGING IN..."
              : "LOGIN"}
          </button>

        </form>

      </div>

    </main>

  );
}
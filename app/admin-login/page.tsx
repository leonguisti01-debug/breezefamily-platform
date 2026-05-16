"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    setErrorMessage("");

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setErrorMessage(error.message);

      setLoading(false);

      return;
    }

    router.push("/admin");
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 text-white overflow-hidden relative"
      style={{
        background:
          "radial-gradient(circle at top, rgba(50,255,50,0.18), transparent 35%), #050505",
      }}
    >
      {/* GLOW EFFECTS */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-green-500/20 blur-[180px] rounded-full"></div>

      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-lime-400/20 blur-[180px] rounded-full"></div>

      {/* LOGIN CARD */}
      <div className="relative z-20 w-full max-w-md rounded-3xl border border-green-400/20 bg-black/40 backdrop-blur-2xl p-8 md:p-10 shadow-[0_0_60px_rgba(0,255,120,0.08)]">

        {/* LOGO */}
        <div className="flex justify-center mb-8">

          <img
            src="/breeze-logo.png"
            alt="Breeze Family"
            className="w-24 h-24 object-contain drop-shadow-[0_0_40px_rgba(0,255,120,0.45)]"
          />

        </div>

        {/* TITLE */}
        <div className="text-center">

          <p className="uppercase tracking-[4px] text-green-300 text-sm">
            Secure Access
          </p>

          <h1 className="mt-4 text-4xl md:text-5xl font-black uppercase">
            Admin Login
          </h1>

        </div>

        {/* ERROR */}
        {errorMessage && (
          <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
            {errorMessage}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-6"
        >

          {/* EMAIL */}
          <div>

            <label className="block mb-2 text-sm uppercase tracking-[3px] text-white/60">
              Email Address
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter Email Address"
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none focus:border-green-400"
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="block mb-2 text-sm uppercase tracking-[3px] text-white/60">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter Password"
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none focus:border-green-400"
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-400 to-lime-300 text-black font-black text-lg shadow-[0_0_50px_rgba(0,255,120,0.35)] hover:scale-[1.02] transition duration-300 disabled:opacity-50"
          >
            {loading
              ? "Signing In..."
              : "Login To Admin"}
          </button>

        </form>

      </div>

    </main>
  );
}
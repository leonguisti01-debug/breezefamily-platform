"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {

  const router = useRouter();

  const [password, setPassword] = useState("");

  const handleLogin = () => {

    if (password === "Breeze2026") {

      localStorage.setItem("admin-auth", "true");

      router.push("/admin");

    } else {

      alert("Incorrect password.");

    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-500/20 blur-[140px] rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      </div>

      {/* LOGIN BOX */}
      <div className="w-full max-w-md rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl p-10">

        <h1 className="text-5xl font-black text-pink-400 mb-8 text-center">
          ADMIN LOGIN
        </h1>

        <div className="space-y-5">

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-5 rounded-2xl bg-black/40 border border-white/10 text-white"
          />

          <button
            onClick={handleLogin}
            className="w-full p-5 rounded-2xl bg-pink-500 hover:bg-pink-400 transition text-white font-black text-lg"
          >
            LOGIN
          </button>

        </div>

      </div>

    </main>
  );
}
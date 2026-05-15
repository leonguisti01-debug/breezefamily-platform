"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Season2AdminLoginPage() {

  const router = useRouter();

  const [password, setPassword] = useState("");

  const login = () => {

    if (password === "Finale2026") {

      localStorage.setItem("season2-admin-auth", "true");

      router.push("/season-2-admin");

    } else {

      alert("Incorrect password");

    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl p-10">

        <h1 className="text-4xl font-black text-cyan-400 text-center">
          SEASON 2 ADMIN
        </h1>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-8 px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none"
        />

        <button
          onClick={login}
          className="w-full mt-6 px-5 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition font-black"
        >
          LOGIN
        </button>

      </div>

    </main>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const BREEZE_GREEN = "#8DFF00";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function JoinTheFamilyPage() {

  const [fullName,
    setFullName] =
    useState("");

  const [email,
    setEmail] =
    useState("");

  const [phone,
    setPhone] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const [success,
    setSuccess] =
    useState("");

  const [error,
    setError] =
    useState("");

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      setLoading(true);

      setError("");

      setSuccess("");

      const { error } =
        await supabase
          .from(
            "family_members"
          )
          .insert([
            {
              full_name:
                fullName,
              email,
              phone,
              password,
            },
          ]);

      if (error) {

        setError(
          error.message
        );

        setLoading(false);

        return;
      }

      setSuccess(
        "Welcome to the Breeze Family!"
      );

      setFullName("");

      setEmail("");

      setPhone("");

      setPassword("");

      setLoading(false);
    };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* BACKGROUND */}
      <div
        className="absolute top-[-300px] left-[-300px] w-[700px] h-[700px] blur-[220px] rounded-full"
        style={{
          background:
            `${BREEZE_GREEN}20`,
        }}
      />

      <div
        className="absolute bottom-[-300px] right-[-300px] w-[700px] h-[700px] blur-[220px] rounded-full"
        style={{
          background:
            `${BREEZE_GREEN}15`,
        }}
      />

      {/* GRID */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize:
            "70px 70px",
        }}
      />

      {/* HERO */}
      <section className="relative z-20 px-4 pt-32 pb-20">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
          >

            <p
              className="uppercase tracking-[5px] text-xs font-black"
              style={{
                color:
                  BREEZE_GREEN,
              }}
            >

              BECOME PART OF THE MOVEMENT

            </p>

            <h1
              className="mt-6 uppercase italic font-black leading-[0.88]"
              style={{
                fontFamily:
                  "Bebas Neue, sans-serif",
                fontSize:
                  "clamp(70px, 10vw, 170px)",
              }}
            >

              <span className="block text-white">

                JOIN

              </span>

              <span
                className="block"
                style={{
                  color:
                    BREEZE_GREEN,
                }}
              >

                THE FAMILY

              </span>

            </h1>

            <p
              className="mt-8 text-white/75 leading-relaxed max-w-[560px]"
              style={{
                fontSize:
                  "clamp(18px, 1.5vw, 26px)",
              }}
            >

              Create your free Breeze Family account to unlock
              exclusive competitions, live experiences, giveaways,
              merch drops and featured community content.

            </p>

          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.2,
            }}
          >

            <div className="rounded-[40px] border border-[#8DFF00]/30 bg-white/5 backdrop-blur-2xl p-6 md:p-10 shadow-[0_0_60px_rgba(141,255,0,0.08)]">

              <h2
                className="uppercase italic font-black text-center leading-none"
                style={{
                  fontFamily:
                    "Bebas Neue, sans-serif",
                  fontSize:
                    "clamp(50px, 8vw, 90px)",
                }}
              >

                CREATE
                <span
                  className="block"
                  style={{
                    color:
                      BREEZE_GREEN,
                  }}
                >
                  ACCOUNT
                </span>

              </h2>

              {success && (

                <div className="mt-6 p-4 rounded-2xl bg-[#8DFF00]/10 border border-[#8DFF00]/20 text-[#8DFF00] text-sm">

                  {success}

                </div>

              )}

              {error && (

                <div className="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-400/20 text-red-300 text-sm">

                  {error}

                </div>

              )}

              <form
                onSubmit={
                  handleSubmit
                }
                className="mt-10 space-y-4"
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
                  className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-[#8DFF00]"
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
                  className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-[#8DFF00]"
                />

                <input
                  type="tel"
                  required
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value
                    )
                  }
                  className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-[#8DFF00]"
                />

                <input
                  type="password"
                  required
                  placeholder="Create Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 outline-none focus:border-[#8DFF00]"
                />

                <button
                  type="submit"
                  disabled={
                    loading
                  }
                  className="w-full py-4 rounded-2xl bg-[#8DFF00] text-black font-black uppercase tracking-[4px] hover:scale-[1.02] transition shadow-[0_0_40px_rgba(141,255,0,0.35)]"
                >

                  {loading
                    ? "CREATING ACCOUNT..."
                    : "JOIN THE FAMILY"}

                </button>

              </form>

              <p className="mt-6 text-center text-white/50 text-sm leading-relaxed">

                By creating an account you agree to receive
                updates, giveaways and Breeze Family news.

              </p>

            </div>

          </motion.div>

        </div>

      </section>

    </main>
  );
}
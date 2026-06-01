"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const BREEZE_GREEN = "#8DFF00";

export default function PortalPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [memberName, setMemberName] =
    useState("");

  useEffect(() => {

    const loadUser =
      async () => {

        const {
          data: { user },
        } =
          await supabase.auth.getUser();

        if (!user) {

          router.push("/login");

          return;

        }

        const {
          data,
        } =
          await supabase
            .from("members")
            .select("*")
            .eq(
              "auth_user_id",
              user.id
            )
            .single();

        if (data) {

          setMemberName(
            data.full_name
          );

        }

        setLoading(false);

      };

    loadUser();

  }, [router]);

  const logout =
    async () => {

      await supabase.auth.signOut();

      router.push("/");

    };

  if (loading) {

    return (

      <main
        className="
          min-h-screen
          bg-black
          text-white
          flex
          items-center
          justify-center
        "
      >
        Loading...
      </main>

    );

  }

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
          max-w-3xl
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
              text-4xl
              md:text-6xl
              font-black
              uppercase
            "
          >
            Welcome Back
          </h1>

          <h2
            className="
              text-3xl
              md:text-5xl
              font-black
              uppercase
            "
            style={{
              color:
                BREEZE_GREEN,
            }}
          >
            {memberName}
          </h2>

        </div>

        <div className="space-y-4">

          <button
            onClick={() =>
              router.push(
                "/prized-pets"
              )
            }
            className="
              w-full
              p-6
              rounded-[24px]
              border
              border-white/10
              bg-white/5
              text-left
              hover:border-[#8DFF00]
              transition
            "
          >
            🐾 Prized Pets
          </button>

          <button
            onClick={() =>
              router.push(
                "/family-members"
              )
            }
            className="
              w-full
              p-6
              rounded-[24px]
              border
              border-white/10
              bg-white/5
              text-left
              hover:border-[#8DFF00]
              transition
            "
          >
            👨‍👩‍👧 Family Members
          </button>

          <button
            onClick={() =>
              router.push(
                "/tiktok-stars"
              )
            }
            className="
              w-full
              p-6
              rounded-[24px]
              border
              border-white/10
              bg-white/5
              text-left
              hover:border-[#8DFF00]
              transition
            "
          >
            ⭐ TikTok Stars
          </button>

          <button
            onClick={logout}
            className="
              w-full
              p-6
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
            Logout
          </button>

        </div>

      </div>

    </main>

  );

}
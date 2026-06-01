"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const BREEZE_GREEN = "#8DFF00";

export default function ProfilePage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [member, setMember] =
    useState<any>(null);

  useEffect(() => {

    const loadProfile =
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
          error,
        } = await supabase
          .from("members")
          .select("*")
          .eq(
            "auth_user_id",
            user.id
          )
          .single();

        if (!error && data) {

          setMember(data);

        }

        setLoading(false);

      };

    loadProfile();

  }, [router]);

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
        Loading Profile...
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
            Profile
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
            md:p-8
          "
        >

          <div className="mb-6">

            <p className="text-white/50 text-sm uppercase">
              Full Name
            </p>

            <p className="text-xl font-bold">
              {member?.full_name}
            </p>

          </div>

          <div className="mb-6">

            <p className="text-white/50 text-sm uppercase">
              Email
            </p>

            <p className="text-xl font-bold">
              {member?.email}
            </p>

          </div>

          <div className="mb-6">

            <p className="text-white/50 text-sm uppercase">
              Cellphone
            </p>

            <p className="text-xl font-bold">
              {member?.cellphone}
            </p>

          </div>

          <div>

            <p className="text-white/50 text-sm uppercase">
              Member Since
            </p>

            <p className="text-xl font-bold">
              {member?.created_at
                ? new Date(
                    member.created_at
                  ).toLocaleDateString()
                : "-"}
            </p>

          </div>

        </div>

        <button
          onClick={() =>
            router.push(
              "/portal"
            )
          }
          className="
            mt-6
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
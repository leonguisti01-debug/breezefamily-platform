"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const BREEZE_GREEN = "#8DFF00";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminKidsPage() {

  const router = useRouter();

  const [entries, setEntries] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [filter, setFilter] =
    useState("all");

  useEffect(() => {

    fetchEntries();

  }, []);

  const fetchEntries =
    async () => {

      const {
        data,
        error,
      } = await supabase
        .from("contestants")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      if (!error && data) {

        setEntries(data);

      }

      setLoading(false);

    };

  const updateStatus =
    async (
      id: number,
      status: string
    ) => {

      await supabase
        .from("contestants")
        .update({
          status,
        })
        .eq("id", id);

      fetchEntries();

    };

  const filteredEntries =
    filter === "all"
      ? entries
      : entries.filter(
          (entry) =>
            entry.status === filter
        );

  return (

    <main
      className="
        min-h-screen
        bg-black
        text-white
        px-4
        py-20
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between
            mb-10
          "
        >

          <div>

            <p
              className="
                uppercase
                tracking-[4px]
                text-xs
              "
              style={{
                color:
                  BREEZE_GREEN,
              }}
            >
              Admin
            </p>

            <h1
              className="
                text-5xl
                md:text-7xl
                font-black
                uppercase
              "
            >
              Kids Edition
            </h1>

          </div>

          <button
            onClick={() =>
              router.push(
                "/admin-v2"
              )
            }
            className="
              px-6
              py-4
              rounded-2xl
              font-black
              text-black
            "
            style={{
              background:
                BREEZE_GREEN,
              }}
          >
            Back
          </button>

        </div>

        {/* FILTERS */}

        <div
          className="
            flex
            flex-wrap
            gap-3
            mb-10
          "
        >

          {[
            "all",
            "pending",
            "accepted",
            "rejected",
          ].map(
            (status) => (

              <button
                key={status}
                onClick={() =>
                  setFilter(
                    status
                  )
                }
                className={`
                  px-5
                  py-3
                  rounded-2xl
                  font-black
                  uppercase
                  ${
                    filter === status
                      ? "text-black"
                      : "text-white"
                  }
                `}
                style={{
                  background:
                    filter === status
                      ? BREEZE_GREEN
                      : "#1a1a1a",
                }}
              >
                {status}
              </button>

            )
          )}

        </div>

        {/* GRID */}

        {loading ? (

          <div className="text-center py-20">

            Loading Entries...

          </div>

        ) : (

          <div
            className="
              grid
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-5
            "
          >

            {filteredEntries.map(
              (entry) => (

                <div
                  key={entry.id}
                  className="
                    rounded-[30px]
                    overflow-hidden
                    border
                    border-white/10
                    bg-white/5
                  "
                >

                  <img
                    src={
                      entry.photo_url
                    }
                    alt={
                      entry.full_name
                    }
                    className="
                      w-full
                      h-[300px]
                      object-cover
                    "
                  />

                  <div
                    className="
                      p-5
                    "
                  >

                    <h2
                      className="
                        text-2xl
                        font-black
                        uppercase
                      "
                    >
                      {
                        entry.full_name
                      }
                    </h2>

                    <p className="mt-2 text-white/70">
                      Age: {entry.age}
                    </p>

                    <p className="text-white/70">
                      {
                        entry.talent_category
                      }
                    </p>

                    <p
                      className="
                        mt-2
                        text-[#8DFF00]
                        text-sm
                      "
                    >
                      {
                        entry.tiktok_username
                      }
                    </p>

                    <div
                      className="
                        mt-4
                        text-xs
                        uppercase
                        tracking-[3px]
                        text-white/50
                      "
                    >
                      Status:
                      {" "}
                      {
                        entry.status ||
                        "pending"
                      }
                    </div>

                    <div
                      className="
                        mt-5
                        grid
                        gap-2
                      "
                    >

                      <button
                        onClick={() =>
                          updateStatus(
                            entry.id,
                            "accepted"
                          )
                        }
                        className="
                          py-3
                          rounded-xl
                          bg-green-500
                          text-black
                          font-black
                        "
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            entry.id,
                            "pending"
                          )
                        }
                        className="
                          py-3
                          rounded-xl
                          bg-yellow-500
                          text-black
                          font-black
                        "
                      >
                        Pending
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            entry.id,
                            "rejected"
                          )
                        }
                        className="
                          py-3
                          rounded-xl
                          bg-red-500
                          text-white
                          font-black
                        "
                      >
                        Reject
                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </main>

  );

}
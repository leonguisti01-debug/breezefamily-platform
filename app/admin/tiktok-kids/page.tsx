"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Contestant = {
  id: number;
  full_name: string | null;
  age: string | null;
  tiktok_username: string | null;
  parent_full_name: string | null;
  parent_phone: string | null;
  parent_email: string | null;
  contact_number: string | null;
  talent_category: string | null;
  audition_status:
    | "waiting"
    | "through"
    | "reserve"
    | "out"
    | null;
};

export default function TikTokKidsAdminPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    checkAccess();
  }, []);

  async function checkAccess() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/admin/login");
      return;
    }

    const { data: admin } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", user.email)
      .single();

    if (
      !admin ||
      !admin.active ||
      (
        admin.role !== "super_admin" &&
        admin.role !== "admin"
      )
    ) {
      alert("Access Denied");
      router.push("/admin/login");
      return;
    }

    setUserEmail(user.email || "");

    await loadContestants();

    setLoading(false);
  }

  async function loadContestants() {
    const { data } = await supabase
      .from("contestants")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    setContestants(data || []);
  }

  async function updateStatus(
    id: number,
    status:
      | "waiting"
      | "through"
      | "reserve"
      | "out"
  ) {
    await supabase
      .from("contestants")
      .update({
        audition_status: status,
      })
      .eq("id", id);

    loadContestants();
  }

  async function exportThrough() {
    const finalists = contestants.filter(
      (c) => c.audition_status === "through"
    );

    const rows = [
      [
        "Name",
        "Age",
        "TikTok",
        "Parent",
        "Phone",
      ],
      ...finalists.map((c) => [
        c.full_name || "",
        c.age || "",
        c.tiktok_username || "",
        c.parent_full_name || "",
        c.parent_phone || "",
      ]),
    ];

    const csv = rows
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(
      [csv],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "tiktok-kids-through.csv";

    link.click();

    window.URL.revokeObjectURL(url);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  const filteredContestants = useMemo(() => {
    return contestants.filter((c) => {
      const matchesSearch =
        (
          c.full_name || ""
        )
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        (
          c.tiktok_username || ""
        )
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        (
          c.parent_full_name || ""
        )
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        (
          c.parent_phone || ""
        )
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const status =
        c.audition_status ||
        "waiting";

      const matchesFilter =
        filter === "all"
          ? true
          : status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });
  }, [
    contestants,
    search,
    filter,
  ]);

  const waiting =
    contestants.filter(
      (c) =>
        !c.audition_status ||
        c.audition_status ===
          "waiting"
    ).length;

  const through =
    contestants.filter(
      (c) =>
        c.audition_status ===
        "through"
    ).length;

  const reserve =
    contestants.filter(
      (c) =>
        c.audition_status ===
        "reserve"
    ).length;

  const out =
    contestants.filter(
      (c) =>
        c.audition_status ===
        "out"
    ).length;

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-black">
              TIKTOK KIDS ADMIN
            </h1>

            <p className="text-white/50 mt-2">
              {userEmail}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={exportThrough}
              className="bg-[#8DFF00] text-black font-black px-5 py-3 rounded-xl"
            >
              EXPORT THROUGH
            </button>

            <button
              onClick={logout}
              className="bg-red-600 px-5 py-3 rounded-xl font-bold"
            >
              LOGOUT
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-4 mb-8">

          <div className="border border-white/10 rounded-2xl p-5">
            <div className="text-white/50">
              Total
            </div>
            <div className="text-4xl font-black">
              {contestants.length}
            </div>
          </div>

          <div className="border border-white/10 rounded-2xl p-5">
            <div className="text-white/50">
              Waiting
            </div>
            <div className="text-4xl font-black">
              {waiting}
            </div>
          </div>

          <div className="border border-green-500/20 rounded-2xl p-5">
            <div className="text-green-400">
              Through
            </div>
            <div className="text-4xl font-black text-green-400">
              {through}
            </div>
          </div>

          <div className="border border-yellow-500/20 rounded-2xl p-5">
            <div className="text-yellow-400">
              Reserve
            </div>
            <div className="text-4xl font-black text-yellow-400">
              {reserve}
            </div>
          </div>

          <div className="border border-red-500/20 rounded-2xl p-5">
            <div className="text-red-400">
              Out
            </div>
            <div className="text-4xl font-black text-red-400">
              {out}
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search name, TikTok, parent or phone..."
            className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-4 py-3"
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value
              )
            }
            className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3"
          >
            <option value="all">
              All
            </option>
            <option value="waiting">
              Waiting
            </option>
            <option value="through">
              Through
            </option>
            <option value="reserve">
              Reserve
            </option>
            <option value="out">
              Out
            </option>
          </select>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

          {filteredContestants.map(
            (
              contestant
            ) => (
              <div
                key={
                  contestant.id
                }
                className="border border-white/10 rounded-2xl p-5"
              >
                <div className="font-black text-xl mb-4">
                  {
                    contestant.full_name
                  }
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    Age:{" "}
                    {
                      contestant.age
                    }
                  </div>

                  <div>
                    TikTok:{" "}
                    {
                      contestant.tiktok_username
                    }
                  </div>

                  <div>
                    Parent:{" "}
                    {
                      contestant.parent_full_name
                    }
                  </div>

                  <div>
                    Phone:{" "}
                    {
                      contestant.parent_phone
                    }
                  </div>

                  <div>
                    Category:{" "}
                    {
                      contestant.talent_category
                    }
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">

                  <button
                    onClick={() =>
                      updateStatus(
                        contestant.id,
                        "through"
                      )
                    }
                    className="bg-green-600 px-3 py-2 rounded-lg font-bold"
                  >
                    THROUGH
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        contestant.id,
                        "reserve"
                      )
                    }
                    className="bg-yellow-500 text-black px-3 py-2 rounded-lg font-bold"
                  >
                    RESERVE
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        contestant.id,
                        "out"
                      )
                    }
                    className="bg-red-600 px-3 py-2 rounded-lg font-bold"
                  >
                    OUT
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        contestant.id,
                        "waiting"
                      )
                    }
                    className="bg-zinc-700 px-3 py-2 rounded-lg font-bold"
                  >
                    RESET
                  </button>

                </div>
              </div>
            )
          )}

        </div>

      </div>
    </main>
  );
}
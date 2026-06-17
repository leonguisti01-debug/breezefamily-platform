"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Contestant = {
  id: number;
  full_name: string | null;
  age: string | null;
  photo_url: string | null;
  tiktok_username: string | null;
  parent_full_name: string | null;
  parent_phone: string | null;
  parent_email: string | null;
  contact_number: string | null;
  talent_category: string | null;
  mentor: string | null;
  audition_status:
    | "waiting"
    | "through"
    | "out"
    | null;
};

export default function TikTokKidsAdminPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [userEmail, setUserEmail] =
    useState("");

  const [contestants, setContestants] =
    useState<Contestant[]>([]);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");

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

    const { data: admin } =
      await supabase
        .from("admin_users")
        .select("*")
        .eq("email", user.email)
        .single();

    if (
      !admin ||
      !admin.active ||
      (
        admin.role !== "admin" &&
        admin.role !== "super_admin"
      )
    ) {
      alert("Access Denied");
      router.push("/admin/login");
      return;
    }

    setUserEmail(
      user.email || ""
    );

    await loadContestants();

    setLoading(false);
  }

  async function loadContestants() {
    const { data, error } =
      await supabase
        .from("contestants")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      console.error(error);
      return;
    }

    setContestants(data || []);
  }

  async function updateMentor(
    id: number,
    mentor: string
  ) {
    const { error } =
      await supabase
        .from("contestants")
        .update({
          mentor,
        })
        .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setContestants((current) =>
      current.map((c) =>
        c.id === id
          ? {
              ...c,
              mentor,
            }
          : c
      )
    );
  }

  async function updateStatus(
    contestant: Contestant,
    status: "through" | "out"
  ) {
    if (
      status === "through" &&
      !contestant.mentor
    ) {
      alert(
        "Please select a mentor first."
      );
      return;
    }

    const { error } =
      await supabase
        .from("contestants")
        .update({
          audition_status:
            status,
        })
        .eq(
          "id",
          contestant.id
        );

    if (error) {
      alert(error.message);
      return;
    }

    setContestants((current) =>
      current.map((c) =>
        c.id === contestant.id
          ? {
              ...c,
              audition_status:
                status,
            }
          : c
      )
    );
  }

  async function exportPass() {
    const passedContestants =
      contestants.filter(
        (c) =>
          c.audition_status ===
          "through"
      );

    const rows = [
      [
        "Name",
        "Age",
        "Mentor",
        "TikTok",
        "Parent",
        "Phone",
      ],

      ...passedContestants.map(
        (c) => [
          c.full_name || "",
          c.age || "",
          c.mentor || "",
          c.tiktok_username ||
            "",
          c.parent_full_name ||
            "",
          c.parent_phone || "",
        ]
      ),
    ];

    const csv = rows
      .map((row) =>
        row.join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csv],
      {
        type:
          "text/csv;charset=utf-8;",
      }
    );

    const url =
      window.URL.createObjectURL(
        blob
      );

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "passed-contestants.csv";

    document.body.appendChild(
      link
    );

    link.click();

    document.body.removeChild(
      link
    );

    window.URL.revokeObjectURL(
      url
    );
  }

  async function logout() {
    await supabase.auth.signOut();

    router.push(
      "/admin/login"
    );
  }

  const filteredContestants =
    useMemo(() => {
      return contestants.filter(
        (contestant) => {
          const matchesSearch =
            (
              contestant.full_name ||
              ""
            )
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            (
              contestant.tiktok_username ||
              ""
            )
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            (
              contestant.parent_full_name ||
              ""
            )
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const currentStatus =
            contestant.audition_status ||
            "waiting";

          const matchesFilter =
            filter === "all"
              ? true
              : currentStatus ===
                filter;

          return (
            matchesSearch &&
            matchesFilter
          );
        }
      );
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

  const passed =
    contestants.filter(
      (c) =>
        c.audition_status ===
        "through"
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
  }  return (
    <main className="min-h-screen bg-black text-white p-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between gap-5 mb-10">

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
              onClick={exportPass}
              className="bg-[#8DFF00] text-black font-black px-5 py-3 rounded-xl"
            >
              EXPORT PASS
            </button>

            <button
              onClick={logout}
              className="bg-red-600 text-white font-black px-5 py-3 rounded-xl"
            >
              LOGOUT
            </button>

          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">

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
              Passed
            </div>

            <div className="text-4xl font-black text-green-400">
              {passed}
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
            placeholder="Search contestant..."
            className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-4 py-3"
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value
              )
            }
            className="bg-zinc-900 text-white border border-white/10 rounded-xl px-4 py-3"
          >
            <option value="all">
              All
            </option>

            <option value="waiting">
              Waiting
            </option>

            <option value="through">
              Passed
            </option>

            <option value="out">
              Out
            </option>

          </select>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

          {filteredContestants.map(
            (contestant) => (

              <div
                key={contestant.id}
                className="border border-white/10 rounded-2xl overflow-hidden bg-black"
              >

                {contestant.photo_url ? (

                  <img
                    src={contestant.photo_url}
                    alt={
                      contestant.full_name ||
                      ""
                    }
                    className="w-full h-72 object-cover"
                  />

                ) : (

                  <div className="w-full h-72 bg-zinc-900 flex items-center justify-center text-white/30">
                    No Photo
                  </div>

                )}

                <div className="p-5">

                  <h2 className="text-2xl font-black mb-4">
                    {
                      contestant.full_name
                    }
                  </h2>

                  <div className="space-y-2 text-white/80">

                    <div>
                      Age:{" "}
                      {
                        contestant.age
                      }
                    </div>

                    <div>
                      Category:{" "}
                      {
                        contestant.talent_category
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

                  </div>

                  <div className="mt-6">

                    <label className="block text-white/50 text-sm mb-2 uppercase">
                      Mentor
                    </label>

                    <select
                      value={
                        contestant.mentor ||
                        ""
                      }
                      onChange={(e) =>
                        updateMentor(
                          contestant.id,
                          e.target.value
                        )
                      }
                      className="w-full bg-zinc-900 text-white border border-white/10 rounded-xl px-4 py-3"
                    >
                      <option value="">
                        Select Mentor
                      </option>

                      <option value="billy">
                        Billy
                      </option>

                      <option value="global">
                        Global
                      </option>

                      <option value="kent">
                        Kent
                      </option>

                      <option value="moi">
                        Moi
                      </option>

                      <option value="makoya">
                        Makoya
                      </option>

                      <option value="terry">
                        Terry
                      </option>

                    </select>

                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-6">

                    <button
                      onClick={() =>
                        updateStatus(
                          contestant,
                          "through"
                        )
                      }
                      style={{
                        backgroundColor:
                          contestant.audition_status ===
                          "through"
                            ? "#16a34a"
                            : "#27272a",
                        color: "#ffffff",
                        padding:
                          "14px",
                        borderRadius:
                          "12px",
                        fontWeight:
                          "900",
                      }}
                    >
                      PASS
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          contestant,
                          "out"
                        )
                      }
                      style={{
                        backgroundColor:
                          contestant.audition_status ===
                          "out"
                            ? "#dc2626"
                            : "#27272a",
                        color: "#ffffff",
                        padding:
                          "14px",
                        borderRadius:
                          "12px",
                        fontWeight:
                          "900",
                      }}
                    >
                      OUT
                    </button>

                  </div>

                  <div className="mt-4 text-center">

                    <span
                      style={{
                        backgroundColor:
                          contestant.audition_status ===
                          "through"
                            ? "#16a34a"
                            : contestant.audition_status ===
                              "out"
                            ? "#dc2626"
                            : "#3f3f46",
                        color:
                          "#ffffff",
                        padding:
                          "8px 14px",
                        borderRadius:
                          "999px",
                        fontWeight:
                          "900",
                        display:
                          "inline-block",
                      }}
                    >
                      {contestant.audition_status ===
                      "through"
                        ? "PASS"
                        : contestant.audition_status ===
                          "out"
                        ? "OUT"
                        : "WAITING"}
                    </span>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </main>
  );
}
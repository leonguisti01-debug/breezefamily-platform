"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const BREEZE_GREEN = "#8DFF00";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const MENTORS = [
  "Billy",
  "Kent",
  "Global",
  "Moi",
  "Piwe",
  "Terry",
];

const STATUS_OPTIONS = [
  "waiting",
  "through",
  "reserve",
  "out",
  "withdrawn",
];

type Contestant = {
  id: number;
  full_name: string | null;
  age: string | null;
  photo_url: string | null;

  audition_status: string | null;
  mentor: string | null;

  performance_date: string | null;

  golden_buzzer: boolean | null;
  golden_buzzer_by: string | null;

  audition_notes: string | null;

  last_updated_by: string | null;
  last_updated_at: string | null;

  created_at: string | null;
};

export default function AdminKidsPage() {
  const router = useRouter();

  const [entries, setEntries] =
    useState<Contestant[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  const [savingId, setSavingId] =
    useState<number | null>(null);

  const [currentUser, setCurrentUser] =
    useState<string>("admin");

  const [editRows, setEditRows] =
    useState<Record<number, any>>({});

  function generateWednesdays() {
    const dates: string[] = [];

    const today = new Date();

    const date = new Date(today);

    while (date.getDay() !== 3) {
      date.setDate(date.getDate() + 1);
    }

    for (let i = 0; i < 52; i++) {
      const d = new Date(date);

      d.setDate(date.getDate() + i * 7);

      dates.push(
        d.toISOString().split("T")[0]
      );
    }

    return dates;
  }

  const WEDNESDAYS =
    generateWednesdays();

  useEffect(() => {
    loadPage();
  }, []);

  async function loadPage() {
    setLoading(true);

    const {
      data: authData,
    } = await supabase.auth.getUser();

    if (
      authData?.user?.email
    ) {
      setCurrentUser(
        authData.user.email
      );
    }

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
      setEntries(
        data as Contestant[]
      );

      const editData:
        Record<number, any> = {};

      data.forEach(
        (entry: any) => {
          editData[entry.id] = {
            audition_status:
              entry.audition_status ||
              "waiting",

            mentor:
              entry.mentor || "",

            performance_date:
              entry.performance_date ||
              "",

            golden_buzzer:
              entry.golden_buzzer ||
              false,

            audition_notes:
              entry.audition_notes ||
              "",
          };
        }
      );

      setEditRows(editData);
    }

    setLoading(false);
  }

  function updateRow(
    id: number,
    field: string,
    value: any
  ) {
    setEditRows(
      (prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          [field]: value,
        },
      })
    );
  }

  async function saveRow(
    id: number
  ) {
    try {
      setSavingId(id);

      const row =
        editRows[id];

      await supabase
        .from("contestants")
        .update({
          audition_status:
            row.audition_status,

          mentor:
            row.mentor || null,

          performance_date:
            row.performance_date ||
            null,

          audition_notes:
            row.audition_notes,

          golden_buzzer:
            row.golden_buzzer,

          golden_buzzer_by:
            row.golden_buzzer
              ? row.mentor
              : null,

          last_updated_by:
            currentUser,

          last_updated_at:
            new Date()
              .toISOString(),
        })
        .eq("id", id);

      await loadPage();
    } finally {
      setSavingId(null);
    }
  }

  async function withdrawRow(
    id: number
  ) {
    await supabase
      .from("contestants")
      .update({
        audition_status:
          "withdrawn",

        performance_date:
          null,

        last_updated_by:
          currentUser,

        last_updated_at:
          new Date()
            .toISOString(),
      })
      .eq("id", id);

    loadPage();
  }

  async function deleteRow(
    id: number
  ) {
    const ok =
      window.confirm(
        "Delete contestant permanently?"
      );

    if (!ok) return;

    await supabase
      .from("contestants")
      .delete()
      .eq("id", id);

    loadPage();
  }

  const filteredEntries =
    useMemo(() => {
      let result =
        [...entries];

      if (
        filter !== "all"
      ) {
        result =
          result.filter(
            (entry) =>
              entry.audition_status ===
              filter
          );
      }

      if (
        search.trim()
      ) {
        result =
          result.filter(
            (entry) =>
              (
                entry.full_name ||
                ""
              )
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
          );
      }

      return result;
    }, [
      entries,
      filter,
      search,
    ]);

  function getCountForDate(
    date: string
  ) {
    return entries.filter(
      (entry) =>
        entry.performance_date ===
        date
    ).length;
  }

  const stats = {
    total:
      entries.length,

    waiting:
      entries.filter(
        (e) =>
          e.audition_status ===
          "waiting"
      ).length,

    through:
      entries.filter(
        (e) =>
          e.audition_status ===
          "through"
      ).length,

    reserve:
      entries.filter(
        (e) =>
          e.audition_status ===
          "reserve"
      ).length,

    out:
      entries.filter(
        (e) =>
          e.audition_status ===
          "out"
      ).length,
  };  return (
    <main className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-[1800px] mx-auto">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-8">
          <div>
            <p
              className="uppercase tracking-[4px] text-xs"
              style={{ color: BREEZE_GREEN }}
            >
              Admin
            </p>

            <h1 className="text-4xl md:text-6xl font-black uppercase">
              Kids Edition Control Panel
            </h1>
          </div>

          <button
            onClick={() => router.push("/admin-v2")}
            className="px-6 py-3 rounded-xl font-black text-black"
            style={{ background: BREEZE_GREEN }}
          >
            Back
          </button>
        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-5 gap-3 mb-8">

          <div className="bg-zinc-900 rounded-xl p-4">
            <div className="text-zinc-400 text-sm">
              TOTAL
            </div>
            <div className="text-3xl font-black">
              {stats.total}
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl p-4">
            <div className="text-zinc-400 text-sm">
              WAITING
            </div>
            <div className="text-3xl font-black">
              {stats.waiting}
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl p-4">
            <div className="text-zinc-400 text-sm">
              THROUGH
            </div>
            <div className="text-3xl font-black">
              {stats.through}
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl p-4">
            <div className="text-zinc-400 text-sm">
              RESERVE
            </div>
            <div className="text-3xl font-black">
              {stats.reserve}
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl p-4">
            <div className="text-zinc-400 text-sm">
              OUT
            </div>
            <div className="text-3xl font-black">
              {stats.out}
            </div>
          </div>

        </div>

        {/* SEARCH */}

        <div className="mb-6">
          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search contestant..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3"
          />
        </div>

        {/* FILTERS */}

        <div className="flex flex-wrap gap-2 mb-8">

          {[
            "all",
            "waiting",
            "through",
            "reserve",
            "out",
            "withdrawn",
          ].map((item) => (
            <button
              key={item}
              onClick={() =>
                setFilter(item)
              }
              className={`px-4 py-2 rounded-xl font-bold uppercase ${
                filter === item
                  ? "text-black"
                  : "text-white"
              }`}
              style={{
                background:
                  filter === item
                    ? BREEZE_GREEN
                    : "#181818",
              }}
            >
              {item}
            </button>
          ))}

        </div>

        {/* WEDNESDAY COUNTS */}

        <div className="bg-zinc-900 rounded-xl p-4 mb-8">

          <h2 className="font-black mb-4">
            Wednesday Capacity
          </h2>

          <div className="grid md:grid-cols-4 gap-2">

            {WEDNESDAYS.slice(
              0,
              12
            ).map((date) => {
              const count =
                getCountForDate(
                  date
                );

              return (
                <div
                  key={date}
                  className="flex justify-between border border-zinc-800 rounded-lg p-2"
                >
                  <span>
                    {date}
                  </span>

                  <span
                    className={
                      count >= 25
                        ? "text-red-400"
                        : count >= 20
                        ? "text-yellow-400"
                        : "text-green-400"
                    }
                  >
                    {count}/25
                  </span>
                </div>
              );
            })}

          </div>

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead>

              <tr className="border-b border-zinc-800 text-left">

                <th className="p-3">
                  Photo
                </th>

                <th className="p-3">
                  Name
                </th>

                <th className="p-3">
                  Age
                </th>

                <th className="p-3">
                  Status
                </th>

                <th className="p-3">
                  Mentor
                </th>

                <th className="p-3">
                  Wednesday
                </th>

                <th className="p-3">
                  GB
                </th>

                <th className="p-3">
                  Notes
                </th>

                <th className="p-3">
                  Updated By
                </th>

                <th className="p-3">
                  Save
                </th>

                <th className="p-3">
                  Withdraw
                </th>

                <th className="p-3">
                  Delete
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td
                    colSpan={12}
                    className="p-8 text-center"
                  >
                    Loading...
                  </td>
                </tr>

              ) : (

                filteredEntries.map(
                  (entry) => {

                    const edit =
                      editRows[
                        entry.id
                      ] || {};

                    return (

                      <tr
                        key={entry.id}
                        className="border-b border-zinc-900"
                      >

                        <td className="p-2">

                          <img
                            src={
                              entry.photo_url ||
                              "/placeholder.jpg"
                            }
                            alt=""
                            className="w-14 h-14 rounded object-cover"
                          />

                        </td>

                        <td className="p-2 font-bold">
                          {entry.full_name}
                        </td>

                        <td className="p-2">
                          {entry.age}
                        </td>

                        <td className="p-2">

                          <select
                            value={
                              edit.audition_status ||
                              "waiting"
                            }
                            onChange={(
                              e
                            ) =>
                              updateRow(
                                entry.id,
                                "audition_status",
                                e.target.value
                              )
                            }
                            className="bg-zinc-900 border border-zinc-700 rounded p-2"
                          >
                            {STATUS_OPTIONS.map(
                              (
                                status
                              ) => (
                                <option
                                  key={
                                    status
                                  }
                                  value={
                                    status
                                  }
                                >
                                  {
                                    status
                                  }
                                </option>
                              )
                            )}
                          </select>

                        </td>

                        <td className="p-2">

                          <select
                            value={
                              edit.mentor ||
                              ""
                            }
                            onChange={(
                              e
                            ) =>
                              updateRow(
                                entry.id,
                                "mentor",
                                e.target.value
                              )
                            }
                            className="bg-zinc-900 border border-zinc-700 rounded p-2"
                          >
                            <option value="">
                              Select
                            </option>

                            {MENTORS.map(
                              (
                                mentor
                              ) => (
                                <option
                                  key={
                                    mentor
                                  }
                                  value={
                                    mentor
                                  }
                                >
                                  {
                                    mentor
                                  }
                                </option>
                              )
                            )}
                          </select>

                        </td>

                        <td className="p-2">

                          <select
                            value={
                              edit.performance_date ||
                              ""
                            }
                            onChange={(
                              e
                            ) =>
                              updateRow(
                                entry.id,
                                "performance_date",
                                e.target.value
                              )
                            }
                            className="bg-zinc-900 border border-zinc-700 rounded p-2"
                          >
                            <option value="">
                              Not Scheduled
                            </option>

                            {WEDNESDAYS.map(
                              (
                                date
                              ) => (
                                <option
                                  key={
                                    date
                                  }
                                  value={
                                    date
                                  }
                                >
                                  {
                                    date
                                  }
                                </option>
                              )
                            )}
                          </select>

                        </td>

                        <td className="p-2 text-center">

                          <input
                            type="checkbox"
                            checked={
                              edit.golden_buzzer ||
                              false
                            }
                            onChange={(
                              e
                            ) =>
                              updateRow(
                                entry.id,
                                "golden_buzzer",
                                e.target.checked
                              )
                            }
                          />

                        </td>

                        <td className="p-2">

                          <input
                            value={
                              edit.audition_notes ||
                              ""
                            }
                            onChange={(
                              e
                            ) =>
                              updateRow(
                                entry.id,
                                "audition_notes",
                                e.target.value
                              )
                            }
                            className="bg-zinc-900 border border-zinc-700 rounded p-2 w-full"
                          />

                        </td>

                        <td className="p-2 text-xs text-zinc-400">
                          {entry.last_updated_by ||
                            "-"}
                        </td>

                        <td className="p-2">

                          <button
                            onClick={() =>
                              saveRow(
                                entry.id
                              )
                            }
                            disabled={
                              savingId ===
                              entry.id
                            }
                            className="px-3 py-2 rounded font-bold text-black"
                            style={{
                              background:
                                BREEZE_GREEN,
                            }}
                          >
                            Save
                          </button>

                        </td>

                        <td className="p-2">

                          <button
                            onClick={() =>
                              withdrawRow(
                                entry.id
                              )
                            }
                            className="px-3 py-2 rounded bg-yellow-500 text-black font-bold"
                          >
                            Withdraw
                          </button>

                        </td>

                        <td className="p-2">

                          <button
                            onClick={() =>
                              deleteRow(
                                entry.id
                              )
                            }
                            className="px-3 py-2 rounded bg-red-600 text-white font-bold"
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    );
                  }
                )

              )}

            </tbody>

          </table>

        </div>

      </div>
    </main>
  );
}
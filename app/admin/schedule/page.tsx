"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Contestant = {
  id: number;
  full_name: string | null;
  mentor: string | null;
  audition_status: string | null;
};

type Schedule = {
  id: number;
  contestant_id: number;
  performance_date: string;
};

const WEDNESDAYS = [
  "2026-07-08",
  "2026-07-15",
  "2026-07-22",
  "2026-07-29",
  "2026-08-05",
  "2026-08-12",
  "2026-08-19",
  "2026-08-26",
];

export default function ScheduleAdminPage() {
  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);

    const { data: contestantData } = await supabase
      .from("contestants")
      .select("id, full_name, mentor, audition_status")
      .order("full_name");

    const { data: scheduleData } = await supabase
      .from("performance_schedule")
      .select("*");

    setContestants(contestantData || []);
    setSchedule(scheduleData || []);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function saveSchedule(
    contestantId: number,
    performanceDate: string
  ) {
    const existing = schedule.find(
      (s) => s.contestant_id === contestantId
    );

    if (existing) {
      await supabase
        .from("performance_schedule")
        .update({
          performance_date: performanceDate,
        })
        .eq("id", existing.id);
    } else {
      await supabase
        .from("performance_schedule")
        .insert({
          contestant_id: contestantId,
          performance_date: performanceDate,
        });
    }

    loadData();
  }

  const filtered = useMemo(() => {
    return contestants.filter((c) =>
      (c.full_name || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [contestants, search]);

  function getContestantDate(id: number) {
    return (
      schedule.find((s) => s.contestant_id === id)
        ?.performance_date || ""
    );
  }

  function getCountForDate(date: string) {
    return schedule.filter(
      (s) => s.performance_date === date
    ).length;
  }

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Kids Edition Performance Scheduler
        </h1>

        <input
          type="text"
          placeholder="Search contestant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 rounded border border-zinc-700 bg-zinc-900 p-3"
        />

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3">
            Wednesday Capacity
          </h2>

          <div className="space-y-2">
            {WEDNESDAYS.map((date) => {
              const count = getCountForDate(date);

              return (
                <div
                  key={date}
                  className="flex justify-between border-b border-zinc-800 py-2"
                >
                  <span>{date}</span>

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

        <div className="border border-zinc-800 rounded-lg overflow-hidden">

          <div className="grid grid-cols-4 gap-4 bg-zinc-900 p-3 font-bold">
            <div>Contestant</div>
            <div>Mentor</div>
            <div>Status</div>
            <div>Performance Date</div>
          </div>

          {loading ? (
            <div className="p-6 text-zinc-500">
              Loading...
            </div>
          ) : (
            filtered.map((contestant) => (
              <div
                key={contestant.id}
                className="grid grid-cols-4 gap-4 p-3 border-t border-zinc-800 items-center"
              >
                <div>
                  {contestant.full_name}
                </div>

                <div>
                  {contestant.mentor || "-"}
                </div>

                <div>
                  {contestant.audition_status || "-"}
                </div>

                <div>
                  <select
                    value={getContestantDate(
                      contestant.id
                    )}
                    onChange={(e) =>
                      saveSchedule(
                        contestant.id,
                        e.target.value
                      )
                    }
                    className="bg-zinc-900 border border-zinc-700 rounded p-2 w-full"
                  >
                    <option value="">
                      Select Wednesday
                    </option>

                    {WEDNESDAYS.map((date) => (
                      <option
                        key={date}
                        value={date}
                      >
                        {date}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </main>
  );
}
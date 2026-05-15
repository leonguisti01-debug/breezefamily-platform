"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [contestants, setContestants] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {

    const auth = localStorage.getItem("admin-auth");

    if (auth === "true") {

      setAuthorized(true);

      await fetchContestants();

    } else {

      router.push("/admin-login");

    }

    setLoading(false);
  };

  const fetchContestants = async () => {

    const { data, error } = await supabase
      .from("contestants")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {

      console.log(error);

    } else {

      setContestants(data || []);

    }
  };

  const updateStatus = async (
    id: number,
    status: string
  ) => {

    const { error } = await supabase
      .from("contestants")
      .update({
        status,
        status_updated_at: new Date().toISOString(),
        approved: status === "APPROVED",
      })
      .eq("id", id);

    if (error) {

      console.log(error);

    } else {

      fetchContestants();

    }
  };

  const logout = () => {

    localStorage.removeItem("admin-auth");

    router.push("/admin-login");
  };

  if (loading) {

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <div className="text-center">

          <h1 className="text-5xl font-black text-pink-400 animate-pulse">
            Loading Admin...
          </h1>

        </div>

      </main>
    );
  }

  if (!authorized) {
    return null;
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">

      {/* HEADER */}
      <div className="mb-12 flex items-center justify-between">

        <div>

          <h1 className="text-6xl font-black text-lime-400">
            ADMIN DASHBOARD
          </h1>

          <p className="mt-4 text-gray-400 text-xl">
            Breeze Family Competition Management
          </p>

        </div>

        <button
          onClick={logout}
          className="px-6 py-4 rounded-2xl bg-red-500 hover:bg-red-400 transition font-black"
        >
          LOGOUT
        </button>

      </div>

      {/* TABLE */}
      <div className="rounded-[40px] border border-white/10 bg-white/5 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-white/5">

              <tr className="text-left">

                <th className="p-5">ID</th>
                <th className="p-5">Contestant</th>
                <th className="p-5">Category</th>
                <th className="p-5">Votes</th>
                <th className="p-5">Status</th>
                <th className="p-5">Updated</th>
                <th className="p-5">Actions</th>

              </tr>

            </thead>

            <tbody>

              {contestants.map((contestant) => (

                <tr
                  key={contestant.id}
                  className="border-t border-white/5 hover:bg-white/5 align-top"
                >

                  <td className="p-5 text-gray-400">
                    {contestant.id}
                  </td>

                  <td className="p-5">

                    <div className="font-bold text-pink-400">
                      {contestant.child_name}
                    </div>

                    <div className="text-sm text-gray-500 mt-1">
                      {contestant.parent_name}
                    </div>

                  </td>

                  <td className="p-5">
                    {contestant.category}
                  </td>

                  <td className="p-5">
                    {contestant.votes || 0}
                  </td>

                  <td className="p-5">

                    <span className="font-bold">

                      {contestant.status || "PENDING"}

                    </span>

                  </td>

                  <td className="p-5 text-sm text-gray-400">

                    {contestant.status_updated_at
                      ? new Date(
                          contestant.status_updated_at
                        ).toLocaleString()
                      : "-"}

                  </td>

                  <td className="p-5">

                    <div className="flex flex-wrap gap-2">

                      <button
                        onClick={() =>
                          updateStatus(
                            contestant.id,
                            "APPROVED"
                          )
                        }
                        className="px-4 py-2 rounded-xl bg-lime-400 text-black font-bold"
                      >
                        APPROVE
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            contestant.id,
                            "DISQUALIFIED"
                          )
                        }
                        className="px-4 py-2 rounded-xl bg-red-500 text-white font-bold"
                      >
                        DISQUALIFY
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            contestant.id,
                            "PASSED"
                          )
                        }
                        className="px-4 py-2 rounded-xl bg-cyan-500 text-white font-bold"
                      >
                        PASS
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            contestant.id,
                            "VOTED OUT"
                          )
                        }
                        className="px-4 py-2 rounded-xl bg-yellow-500 text-black font-bold"
                      >
                        VOTED OUT
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}
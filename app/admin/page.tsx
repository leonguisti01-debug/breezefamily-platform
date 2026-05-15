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

  const approveContestant = async (id: number) => {

    const { error } = await supabase
      .from("contestants")
      .update({ approved: true })
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

          <p className="mt-5 text-gray-400">
            Preparing dashboard
          </p>

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

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

          <h2 className="text-5xl font-black text-pink-400">
            {contestants.length}
          </h2>

          <p className="mt-3 text-gray-300">
            Total Entries
          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

          <h2 className="text-5xl font-black text-cyan-400">
            LIVE
          </h2>

          <p className="mt-3 text-gray-300">
            Competition Status
          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

          <h2 className="text-5xl font-black text-lime-400">
            2026
          </h2>

          <p className="mt-3 text-gray-300">
            Season
          </p>

        </div>

      </div>

      {/* TABLE */}
      <div className="rounded-[40px] border border-white/10 bg-white/5 overflow-hidden">

        <div className="p-8 border-b border-white/10">

          <h2 className="text-3xl font-black text-white">
            Contestant Entries
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-white/5">

              <tr className="text-left">

                <th className="p-5">ID</th>
                <th className="p-5">Child Name</th>
                <th className="p-5">Age</th>
                <th className="p-5">Parent</th>
                <th className="p-5">Category</th>
                <th className="p-5">Email</th>
                <th className="p-5">Status</th>
                <th className="p-5">Action</th>

              </tr>

            </thead>

            <tbody>

              {contestants.map((contestant) => (

                <tr
                  key={contestant.id}
                  className="border-t border-white/5 hover:bg-white/5"
                >

                  <td className="p-5 text-gray-400">
                    {contestant.id}
                  </td>

                  <td className="p-5 font-bold text-pink-400">
                    {contestant.child_name}
                  </td>

                  <td className="p-5">
                    {contestant.age}
                  </td>

                  <td className="p-5">
                    {contestant.parent_name}
                  </td>

                  <td className="p-5">
                    {contestant.category}
                  </td>

                  <td className="p-5">
                    {contestant.email}
                  </td>

                  <td className="p-5">

                    {contestant.approved ? (
                      <span className="text-lime-400 font-bold">
                        APPROVED
                      </span>
                    ) : (
                      <span className="text-yellow-400 font-bold">
                        PENDING
                      </span>
                    )}

                  </td>

                  <td className="p-5">

                    {!contestant.approved && (
                      <button
                        onClick={() => approveContestant(contestant.id)}
                        className="px-5 py-3 rounded-xl bg-lime-400 text-black font-bold hover:scale-105 transition"
                      >
                        APPROVE
                      </button>
                    )}

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
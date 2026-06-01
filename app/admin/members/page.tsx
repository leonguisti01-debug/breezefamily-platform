"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const BREEZE_GREEN = "#8DFF00";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminMembersPage() {

  const router = useRouter();

  const [members, setMembers] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchMembers();

  }, []);

  const fetchMembers =
    async () => {

      const {
        data,
        error,
      } = await supabase
        .from("members")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      if (!error && data) {

        setMembers(data);

      }

      setLoading(false);

    };

  const updateRole =
    async (
      id: number,
      role: string
    ) => {

      await supabase
        .from("members")
        .update({
          role,
        })
        .eq("id", id);

      fetchMembers();

    };

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

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
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
              Members
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

        <div
          className="
            rounded-[30px]
            border
            border-white/10
            overflow-hidden
          "
        >

          {loading ? (

            <div
              className="
                p-10
                text-center
              "
            >
              Loading...
            </div>

          ) : (

            <div
              className="
                overflow-x-auto
              "
            >

              <table
                className="
                  w-full
                "
              >

                <thead>

                  <tr
                    className="
                      bg-white/5
                    "
                  >

                    <th className="p-4 text-left">
                      Name
                    </th>

                    <th className="p-4 text-left">
                      Email
                    </th>

                    <th className="p-4 text-left">
                      Cellphone
                    </th>

                    <th className="p-4 text-left">
                      Joined
                    </th>

                    <th className="p-4 text-left">
                      Role
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {members.map(
                    (member) => (

                      <tr
                        key={
                          member.id
                        }
                        className="
                          border-t
                          border-white/10
                        "
                      >

                        <td className="p-4">
                          {
                            member.full_name
                          }
                        </td>

                        <td className="p-4">
                          {
                            member.email
                          }
                        </td>

                        <td className="p-4">
                          {
                            member.cellphone
                          }
                        </td>

                        <td className="p-4">
                          {member.created_at
                            ? new Date(
                                member.created_at
                              ).toLocaleDateString()
                            : "-"}
                        </td>

                        <td className="p-4">

                          <select
                            value={
                              member.role ||
                              "member"
                            }
                            onChange={(
                              e
                            ) =>
                              updateRole(
                                member.id,
                                e.target.value
                              )
                            }
                            className="
                              bg-black
                              border
                              border-white/20
                              rounded-xl
                              px-3
                              py-2
                            "
                          >

                            <option value="member">
                              Member
                            </option>

                            <option value="admin">
                              Admin
                            </option>

                          </select>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </main>

  );

}
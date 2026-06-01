"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const BREEZE_GREEN = "#8DFF00";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminMarketingPage() {

  const router = useRouter();

  const [contacts, setContacts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchContacts();

  }, []);

  const fetchContacts =
    async () => {

      const {
        data,
        error,
      } = await supabase
        .from("marketing_contacts")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      if (!error && data) {

        setContacts(data);

      }

      setLoading(false);

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
              Marketing
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
                      Phone
                    </th>

                    <th className="p-4 text-left">
                      Date Added
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {contacts.map(
                    (contact) => (

                      <tr
                        key={
                          contact.id
                        }
                        className="
                          border-t
                          border-white/10
                        "
                      >

                        <td className="p-4">
                          {
                            contact.full_name ||
                            contact.name
                          }
                        </td>

                        <td className="p-4">
                          {
                            contact.email
                          }
                        </td>

                        <td className="p-4">
                          {
                            contact.phone ||
                            contact.cellphone
                          }
                        </td>

                        <td className="p-4">
                          {contact.created_at
                            ? new Date(
                                contact.created_at
                              ).toLocaleDateString()
                            : "-"}
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
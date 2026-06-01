"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const BREEZE_GREEN = "#8DFF00";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminStatsPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState({
      members: 0,
      contacts: 0,
      contestants: 0,
      familyMembers: 0,
      pets: 0,
      merchProducts: 0,
      siteHits: 0,
    });

  useEffect(() => {

    loadStats();

  }, []);

  const loadStats =
    async () => {

      try {

        const [
          members,
          contacts,
          contestants,
          familyMembers,
          pets,
          merchProducts,
          hits,
        ] = await Promise.all([

          supabase
            .from("members")
            .select("*", {
              count: "exact",
              head: true,
            }),

          supabase
            .from("marketing_contacts")
            .select("*", {
              count: "exact",
              head: true,
            }),

          supabase
            .from("contestants")
            .select("*", {
              count: "exact",
              head: true,
            }),

          supabase
            .from("family_members")
            .select("*", {
              count: "exact",
              head: true,
            }),

          supabase
            .from("prized_pets_entries")
            .select("*", {
              count: "exact",
              head: true,
            }),

          supabase
            .from("merch_products")
            .select("*", {
              count: "exact",
              head: true,
            }),

          supabase
            .from("site_hits")
            .select("*", {
              count: "exact",
              head: true,
            }),

        ]);

        setStats({

          members:
            members.count || 0,

          contacts:
            contacts.count || 0,

          contestants:
            contestants.count || 0,

          familyMembers:
            familyMembers.count || 0,

          pets:
            pets.count || 0,

          merchProducts:
            merchProducts.count || 0,

          siteHits:
            hits.count || 0,

        });

      } catch (error) {

        console.error(error);

      }

      setLoading(false);

    };

  const StatCard =
    ({
      title,
      value,
    }: {
      title: string;
      value: number;
    }) => (

      <div
        className="
          rounded-[30px]
          border
          border-[#8DFF00]/20
          bg-white/5
          p-6
        "
      >

        <p
          className="
            text-white/50
            uppercase
            text-xs
            tracking-[3px]
          "
        >
          {title}
        </p>

        <h2
          className="
            mt-4
            text-5xl
            font-black
          "
        >
          {value}
        </h2>

      </div>

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
              Statistics
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

        {loading ? (

          <div className="text-center py-20">

            Loading Statistics...

          </div>

        ) : (

          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-3
              xl:grid-cols-4
              gap-5
            "
          >

            <StatCard
              title="Members"
              value={
                stats.members
              }
            />

            <StatCard
              title="Marketing Contacts"
              value={
                stats.contacts
              }
            />

            <StatCard
              title="Kids Entries"
              value={
                stats.contestants
              }
            />

            <StatCard
              title="Family Members"
              value={
                stats.familyMembers
              }
            />

            <StatCard
              title="Prized Pets"
              value={
                stats.pets
              }
            />

            <StatCard
              title="Merch Products"
              value={
                stats.merchProducts
              }
            />

            <StatCard
              title="Site Hits"
              value={
                stats.siteHits
              }
            />

          </div>

        )}

      </div>

    </main>

  );

}
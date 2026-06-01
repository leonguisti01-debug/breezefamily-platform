"use client";

import { useRouter } from "next/navigation";

const BREEZE_GREEN = "#8DFF00";

export default function AdminV2Page() {

  const router = useRouter();

  const cards = [
    {
      title: "Kids Edition",
      icon: "⭐",
      route: "/admin/kids",
    },
    {
      title: "Top 10 Finalists",
      icon: "🏆",
      route: "/admin/top10",
    },
    {
      title: "Fan Favourite Judges",
      icon: "🎤",
      route: "/admin/judges",
    },
    {
      title: "Merch Manager",
      icon: "🛒",
      route: "/merch/merch-manager-v2",
    },
    {
      title: "Members",
      icon: "👥",
      route: "/admin/members",
    },
    {
      title: "Marketing Contacts",
      icon: "📧",
      route: "/admin/marketing",
    },
    {
      title: "Statistics",
      icon: "📊",
      route: "/admin/stats",
    },
    {
      title: "Settings",
      icon: "⚙️",
      route: "/admin/settings",
    },
  ];

  return (

    <main className="min-h-screen bg-black text-white px-4 py-20">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="text-center">

          <p
            className="uppercase tracking-[5px] text-xs"
            style={{
              color: BREEZE_GREEN,
            }}
          >
            Breeze Family
          </p>

          <h1
            className="
              mt-4
              text-5xl
              md:text-7xl
              font-black
              uppercase
            "
          >
            Admin
          </h1>

          <h2
            className="
              text-5xl
              md:text-7xl
              font-black
              uppercase
            "
            style={{
              color: BREEZE_GREEN,
            }}
          >
            Control Centre
          </h2>

        </div>

        {/* QUICK STATS */}

        <div
          className="
            mt-12
            grid
            grid-cols-2
            md:grid-cols-4
            gap-4
          "
        >

          <div className="rounded-[24px] bg-white/5 border border-white/10 p-6 text-center">
            <div className="text-white/50 text-sm uppercase">
              Members
            </div>
            <div className="text-4xl font-black mt-2">
              --
            </div>
          </div>

          <div className="rounded-[24px] bg-white/5 border border-white/10 p-6 text-center">
            <div className="text-white/50 text-sm uppercase">
              Contacts
            </div>
            <div className="text-4xl font-black mt-2">
              --
            </div>
          </div>

          <div className="rounded-[24px] bg-white/5 border border-white/10 p-6 text-center">
            <div className="text-white/50 text-sm uppercase">
              Entries
            </div>
            <div className="text-4xl font-black mt-2">
              --
            </div>
          </div>

          <div className="rounded-[24px] bg-white/5 border border-white/10 p-6 text-center">
            <div className="text-white/50 text-sm uppercase">
              Site Hits
            </div>
            <div className="text-4xl font-black mt-2">
              --
            </div>
          </div>

        </div>

        {/* ADMIN CARDS */}

        <div
          className="
            mt-12
            grid
            md:grid-cols-2
            xl:grid-cols-4
            gap-5
          "
        >

          {cards.map((card) => (

            <button
              key={card.title}
              onClick={() =>
                router.push(card.route)
              }
              className="
                rounded-[30px]
                border
                border-[#8DFF00]/20
                bg-white/5
                p-8
                text-left
                transition
                hover:border-[#8DFF00]
                hover:bg-white/10
              "
            >

              <div className="text-5xl">
                {card.icon}
              </div>

              <h3
                className="
                  mt-5
                  text-2xl
                  font-black
                  uppercase
                "
              >
                {card.title}
              </h3>

            </button>

          ))}

        </div>

      </div>

    </main>

  );

}
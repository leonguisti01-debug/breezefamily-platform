"use client";

export default function AdminV2Page() {
  const contestants = [
    {
      id: 1,
      name: "Emma Smith",
      username: "@emmasings",
      age: 12,
      mentor: "Kent",
      stage: "Quarter Finals",
      status: "In Competition",
    },
    {
      id: 2,
      name: "Liam Jones",
      username: "@liamdances",
      age: 10,
      mentor: "Billy",
      stage: "Quarter Finals",
      status: "In Competition",
    },
    {
      id: 3,
      name: "Sarah Brown",
      username: "@sarahvoice",
      age: 14,
      mentor: "Moi",
      stage: "Top 20",
      status: "Qualified",
    },
    {
      id: 4,
      name: "John Adams",
      username: "@johnmoves",
      age: 11,
      mentor: "Global",
      stage: "Top 20",
      status: "Qualified",
    },
    {
      id: 5,
      name: "Megan Lee",
      username: "@megansings",
      age: 13,
      mentor: "Terry",
      stage: "Top 20",
      status: "In Competition",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f6fa]">

      <div className="grid lg:grid-cols-[250px_1fr_320px] min-h-screen">

        {/* SIDEBAR */}

        <aside className="bg-[#0f172a] text-white">

          <div className="p-7 border-b border-white/10">

            <h1 className="text-4xl font-bold">
              Breeze
            </h1>

            <p className="text-[#8DFF00] mt-1 text-sm font-medium">
              CONTROL CENTER
            </p>

          </div>

          <div className="p-4">

            <SidebarItem active label="Dashboard" />

            <SidebarItem label="Contestants" />
            <SidebarItem label="Mentors" />
            <SidebarItem label="Auditions" />
            <SidebarItem label="Stages" />
            <SidebarItem label="Live Shows" />
            <SidebarItem label="Voting" />
            <SidebarItem label="Scores" />
            <SidebarItem label="Mentor Assignment" />

            <div className="h-4" />

            <SidebarItem label="Content" />
            <SidebarItem label="Announcements" />
            <SidebarItem label="Users & Roles" />
            <SidebarItem label="Settings" />
            <SidebarItem label="Reports" />

          </div>

        </aside>

        {/* MAIN */}

        <main className="p-8">

          {/* HEADER */}

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-4xl font-bold text-[#111827]">
                Dashboard
              </h2>

              <p className="text-zinc-500 mt-2">
                Overview of the Breeze Family platform
              </p>

            </div>

            <button className="bg-[#8DFF00] text-black font-semibold px-5 py-3 rounded-xl">
              + Announcement
            </button>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

            <StatCard
              title="Total Contestants"
              value="142"
            />

            <StatCard
              title="Qualified"
              value="48"
            />

            <StatCard
              title="In Competition"
              value="36"
            />

            <StatCard
              title="Eliminated"
              value="12"
            />

          </div>

          {/* CONTESTANT CARD */}

          <div className="bg-white rounded-[28px] border border-zinc-200 overflow-hidden">

            <div className="p-6 border-b border-zinc-200">

              <div className="flex items-center justify-between">

                <h3 className="text-2xl font-semibold text-[#111827]">
                  Contestants Overview
                </h3>

                <div className="flex gap-3">

                  <input
                    placeholder="Search contestant..."
                    className="w-64 border border-zinc-200 rounded-xl px-4 py-3 outline-none"
                  />

                  <button className="border border-zinc-200 rounded-xl px-5 py-3">
                    Filter
                  </button>

                  <button className="bg-[#8DFF00] rounded-xl px-5 py-3 font-semibold text-black">
                    + Add Contestant
                  </button>

                </div>

              </div>

              <div className="flex gap-8 mt-6 text-sm">

                <span className="font-semibold text-[#8DFF00]">
                  All 142
                </span>

                <span className="text-zinc-500">
                  Auditions 94
                </span>

                <span className="text-zinc-500">
                  Qualified 48
                </span>

                <span className="text-zinc-500">
                  In Competition 36
                </span>

                <span className="text-zinc-500">
                  Eliminated 12
                </span>

              </div>

            </div>

            <table className="w-full">

              <thead>

                <tr className="text-left text-zinc-500 text-sm border-b border-zinc-200">

                  <th className="p-5">#</th>
                  <th className="p-5">Contestant</th>
                  <th className="p-5">Age</th>
                  <th className="p-5">Mentor</th>
                  <th className="p-5">Current Stage</th>
                  <th className="p-5">Status</th>

                </tr>

              </thead>

              <tbody>

                {contestants.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-zinc-100 hover:bg-zinc-50"
                  >

                    <td className="p-5">
                      {c.id}
                    </td>

                    <td className="p-5">

                      <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-full bg-zinc-300" />

                        <div>

                          <p className="font-semibold">
                            {c.name}
                          </p>

                          <p className="text-sm text-zinc-500">
                            {c.username}
                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="p-5">
                      {c.age}
                    </td>

                    <td className="p-5">
                      {c.mentor}
                    </td>

                    <td className="p-5">
                      {c.stage}
                    </td>

                    <td className="p-5">

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                        {c.status}
                      </span>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>          {/* MENTOR OVERVIEW */}

          <div className="bg-white rounded-[28px] border border-zinc-200 p-6 mt-8">

            <h3 className="text-2xl font-semibold text-[#111827] mb-5">
              Mentor Overview
            </h3>

            <div className="grid md:grid-cols-3 xl:grid-cols-6 gap-4">

              <MentorCard name="Billy" count="7" />
              <MentorCard name="Kent" count="6" />
              <MentorCard name="Moi" count="6" />
              <MentorCard name="Makoya" count="6" />
              <MentorCard name="Terry" count="6" />
              <MentorCard name="Global" count="5" />

            </div>

          </div>

        </main>

        {/* RIGHT SIDEBAR */}

        <aside className="p-6 space-y-6">

          <div className="bg-white rounded-[28px] border border-zinc-200 p-6">

            <h3 className="font-semibold text-xl mb-5 text-[#111827]">
              Competition Timeline
            </h3>

            <TimelineItem
              title="Auditions"
              status="Completed"
            />

            <TimelineItem
              title="Top 48 Reveal"
              status="Completed"
            />

            <TimelineItem
              title="Bootcamp"
              status="Completed"
            />

            <TimelineItem
              title="Top 20 Reveal"
              status="In Progress"
            />

            <TimelineItem
              title="Grand Finale"
              status="Upcoming"
            />

          </div>

          <div className="bg-white rounded-[28px] border border-zinc-200 p-6">

            <h3 className="font-semibold text-xl mb-4 text-[#111827]">
              Upcoming Event
            </h3>

            <div className="rounded-2xl bg-gradient-to-br from-[#8DFF00] to-[#5fb400] text-black p-5">

              <p className="text-xs font-bold uppercase">
                Next Stage
              </p>

              <p className="text-4xl font-bold mt-2">
                Top 20
              </p>

            </div>

            <p className="font-semibold mt-4">
              TikTok Stars Quarter Finals
            </p>

            <p className="text-sm text-zinc-500 mt-2">
              Contestant scoring and mentor evaluations.
            </p>

          </div>

          <div className="bg-white rounded-[28px] border border-zinc-200 p-6">

            <h3 className="font-semibold text-xl mb-4 text-[#111827]">
              Quick Actions
            </h3>

            <div className="grid grid-cols-2 gap-3">

              <QuickButton label="Add Contestant" />
              <QuickButton label="Assign Mentor" />
              <QuickButton label="Announcement" />
              <QuickButton label="Upload Media" />
              <QuickButton label="Reports" />
              <QuickButton label="Members" />

            </div>

          </div>

        </aside>

      </div>

    </div>
  );
}

/* COMPONENTS */

function SidebarItem({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`w-full text-left px-4 py-3 rounded-xl transition ${
        active
          ? "bg-[#8DFF00] text-black font-semibold"
          : "hover:bg-white/5"
      }`}
    >
      {label}
    </button>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-[28px] border border-zinc-200 p-6">

      <p className="text-zinc-500 text-sm">
        {title}
      </p>

      <h2 className="text-5xl font-bold text-[#111827] mt-3">
        {value}
      </h2>

    </div>
  );
}

function MentorCard({
  name,
  count,
}: {
  name: string;
  count: string;
}) {
  return (
    <div className="border border-zinc-200 rounded-2xl p-4 bg-zinc-50">

      <div className="w-14 h-14 rounded-full bg-zinc-300 mb-3" />

      <p className="font-semibold">
        {name}
      </p>

      <p className="text-sm text-zinc-500">
        {count} Contestants
      </p>

    </div>
  );
}

function TimelineItem({
  title,
  status,
}: {
  title: string;
  status: string;
}) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-zinc-100 last:border-0">

      <span className="text-[#111827]">
        {title}
      </span>

      <span
        className={`text-xs px-3 py-1 rounded-full ${
          status === "Completed"
            ? "bg-green-100 text-green-700"
            : status === "In Progress"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-zinc-100 text-zinc-600"
        }`}
      >
        {status}
      </span>

    </div>
  );
}

function QuickButton({
  label,
}: {
  label: string;
}) {
  return (
    <button className="border border-zinc-200 rounded-xl p-3 text-sm font-medium hover:bg-zinc-50">
      {label}
    </button>
  );
}
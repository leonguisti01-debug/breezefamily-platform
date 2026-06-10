"use client";

const achievements = [
  {
    image: "/achievements/first-steps.png",
    title: "FIRST STEPS",
    description: "Complete your profile",
  },
  {
    image: "/achievements/community-member.png",
    title: "COMMUNITY MEMBER",
    description: "Add your Discord username",
  },
  {
    image: "/achievements/pet-lover.png",
    title: "PET LOVER",
    description: "Upload your first prized pet",
  },
  {
    image: "/achievements/rising-star.png",
    title: "RISING STAR",
    description: "Reach 100 Breeze Points",
  },
  {
    image: "/achievements/competitor.png",
    title: "COMPETITOR",
    description: "Submit your first KOTW clip",
  },
  {
    image: "/achievements/legend-rank.png",
    title: "LEGEND",
    description: "Reach Legend Rank",
  },
];

export default function AchievementsPage() {
  return (
    <main className="min-h-screen bg-black pt-[20px] pb-10">

      {/* HERO */}

      <section className="max-w-[1200px] mx-auto px-3 mb-6">

        <div
          className="
            rounded-[24px]
            border
            border-[#8DFF00]/20
            overflow-hidden
            bg-gradient-to-r
            from-black
            via-[#101900]
            to-black
          "
        >

          <div className="py-12 text-center">

            <h1
              className="
                text-4xl
                md:text-7xl
                font-black
                uppercase
                text-white
              "
            >
              ACHIEVEMENTS
            </h1>

            <p
              className="
                text-white/70
                mt-3
                text-sm
                md:text-base
              "
            >
              Unlock badges. Earn respect. Level up.
            </p>

          </div>

        </div>

      </section>

      {/* TROPHY ROOM */}

      <section className="max-w-[1200px] mx-auto px-3">

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

          {achievements.map((achievement) => (

            <div
              key={achievement.title}
              className="
                rounded-[24px]
                border
                border-white/10
                bg-[#050505]
                overflow-hidden
                transition
                hover:border-[#8DFF00]/50
                hover:scale-[1.02]
              "
            >

              <div className="p-4">

                <img
                  src={achievement.image}
                  alt={achievement.title}
                  className="
                    w-full
                    h-auto
                    object-contain
                  "
                />

                <div className="pt-4 text-center">

                  <h2
                    className="
                      text-sm
                      md:text-lg
                      font-black
                      uppercase
                      text-white
                    "
                  >
                    {achievement.title}
                  </h2>

                  <p
                    className="
                      mt-2
                      text-white/60
                      text-xs
                      md:text-sm
                    "
                  >
                    {achievement.description}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* COMING SOON */}

      <section className="max-w-[1200px] mx-auto px-3 mt-8">

        <div
          className="
            rounded-[24px]
            border
            border-[#8DFF00]/20
            bg-[#050505]
            p-8
            text-center
          "
        >

          <h2
            className="
              text-2xl
              md:text-4xl
              font-black
              uppercase
              text-white
            "
          >
            More Achievements
            <span className="text-[#8DFF00]">
              {" "}Coming Soon
            </span>
          </h2>

          <p
            className="
              text-white/60
              mt-3
            "
          >
            Keep participating in Breeze Family events,
            competitions and community activities to unlock
            future badges.
          </p>

        </div>

      </section>

    </main>
  );
}
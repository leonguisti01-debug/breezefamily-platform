export default function CallOfDutyPage() {
  return (
    <main className="min-h-screen bg-black text-white pb-20">

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-6 pt-6">

        <div
          className="
            relative
            overflow-hidden
            rounded-[30px]
            border
            border-[#8DFF00]/20
            min-h-[500px]
          "
        >

          <img
            src="/cod-hero.jpg"
            alt="Call Of Duty Tournament"
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-black
              via-black/70
              to-black/20
            "
          />

          <div
            className="
              relative
              z-10
              p-8
              md:p-16
              max-w-3xl
            "
          >

            <div
              className="
                text-[#8DFF00]
                font-black
                uppercase
                tracking-[4px]
              "
            >
              Breeze Family Esports
            </div>

            <h1
              className="
                mt-4
                text-5xl
                md:text-8xl
                font-black
                uppercase
                leading-none
              "
            >
              Call Of Duty
            </h1>

            <h2
              className="
                text-3xl
                md:text-5xl
                font-black
                text-[#8DFF00]
                mt-2
              "
            >
              Tournament
            </h2>

            <div
              className="
                mt-8
                inline-block
                px-6
                py-4
                rounded-2xl
                border
                border-[#8DFF00]
                bg-black/50
              "
            >

              <div className="text-white/60 uppercase text-sm">
                Prize Pool
              </div>

              <div className="text-[#8DFF00] text-5xl font-black">
                R5 000
              </div>

            </div>

            <p
              className="
                mt-8
                text-white/80
                text-lg
                max-w-xl
              "
            >
              Assemble your squad, battle against the best,
              and compete for your share of the prize pool.
            </p>

            <a
              href="#register"
              className="
                inline-block
                mt-8
                bg-[#8DFF00]
                text-black
                font-black
                px-8
                py-4
                rounded-full
                hover:scale-105
                transition
              "
            >
              REGISTER NOW
            </a>

          </div>

        </div>

      </section>

      {/* INFO CARDS */}

      <section className="max-w-7xl mx-auto px-6 mt-8">

        <div className="grid md:grid-cols-3 gap-6">

          <div
            className="
              border
              border-[#8DFF00]/20
              rounded-[24px]
              p-8
              text-center
            "
          >
            <div className="text-[#8DFF00] text-3xl font-black">
              FREE
            </div>

            <div className="mt-2 text-white/70">
              Entry Fee
            </div>
          </div>

          <div
            className="
              border
              border-[#8DFF00]/20
              rounded-[24px]
              p-8
              text-center
            "
          >
            <div className="text-[#8DFF00] text-3xl font-black">
              SA
            </div>

            <div className="mt-2 text-white/70">
              South Africa
            </div>
          </div>

          <div
            className="
              border
              border-[#8DFF00]/20
              rounded-[24px]
              p-8
              text-center
            "
          >
            <div className="text-[#8DFF00] text-3xl font-black">
              CROSSPLAY
            </div>

            <div className="mt-2 text-white/70">
              All Platforms
            </div>
          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}

      <section className="max-w-7xl mx-auto px-6 mt-12">

        <h2 className="text-4xl font-black">
          HOW IT WORKS
        </h2>

        <div className="grid md:grid-cols-4 gap-6 mt-8">

          {[
            "Register",
            "Receive Details",
            "Compete",
            "Win Cash",
          ].map((step, index) => (
            <div
              key={index}
              className="
                border
                border-[#8DFF00]/20
                rounded-[24px]
                p-6
              "
            >
              <div className="text-[#8DFF00] text-4xl font-black">
                {index + 1}
              </div>

              <div className="mt-3 font-bold">
                {step}
              </div>
            </div>
          ))}

        </div>

      </section>

      {/* REGISTRATION */}

      <section
        id="register"
        className="
          max-w-4xl
          mx-auto
          px-6
          mt-16
        "
      >

        <div
          className="
            border
            border-[#8DFF00]/20
            rounded-[30px]
            p-8
          "
        >

          <h2 className="text-4xl font-black">
            REGISTER YOUR TEAM
          </h2>

          <p className="mt-3 text-white/70">
            Enter your team details below.
          </p>

          <form className="grid gap-4 mt-8">

            <input
              type="text"
              placeholder="Team Name"
              className="bg-black border border-white/20 rounded-xl p-4"
            />

            <input
              type="text"
              placeholder="Captain Name"
              className="bg-black border border-white/20 rounded-xl p-4"
            />

            <input
              type="tel"
              placeholder="Captain Contact Number"
              className="bg-black border border-white/20 rounded-xl p-4"
            />

            <input
              type="email"
              placeholder="Captain Email"
              className="bg-black border border-white/20 rounded-xl p-4"
            />

            <button
              type="submit"
              className="
                bg-[#8DFF00]
                text-black
                font-black
                p-4
                rounded-xl
                mt-4
              "
            >
              REGISTER TEAM
            </button>

          </form>

        </div>

      </section>

    </main>
  );
}
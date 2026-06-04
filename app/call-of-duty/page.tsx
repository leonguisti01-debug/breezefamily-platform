export default function CallOfDutyPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}

      <section className="max-w-6xl mx-auto px-6 pt-8">

        <div
          className="
            rounded-[30px]
            overflow-hidden
            border
            border-[#8DFF00]/20
            bg-gradient-to-br
            from-black
            via-[#111]
            to-black
          "
        >

          <div className="p-8 md:p-16">

            <div className="text-[#8DFF00] font-black tracking-[4px] uppercase">
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
                mt-2
                text-3xl
                md:text-5xl
                font-black
                text-[#8DFF00]
              "
            >
              Tournament
            </h2>

            <p
              className="
                mt-6
                text-white/80
                text-lg
                max-w-2xl
              "
            >
              Assemble your squad, battle against the best,
              and compete for your share of the prize pool.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <a
                href="#register"
                className="
                  bg-[#8DFF00]
                  text-black
                  font-black
                  px-8
                  py-4
                  rounded-full
                "
              >
                REGISTER NOW
              </a>

              <a
                href="#details"
                className="
                  border
                  border-[#8DFF00]
                  text-[#8DFF00]
                  font-black
                  px-8
                  py-4
                  rounded-full
                "
              >
                VIEW DETAILS
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* PRIZE */}

      <section className="max-w-6xl mx-auto px-6 mt-8">

        <div
          className="
            rounded-[30px]
            border
            border-[#8DFF00]/20
            p-8
            text-center
          "
        >

          <div className="text-white/60 uppercase tracking-[4px]">
            Total Prize Pool
          </div>

          <div
            className="
              text-[#8DFF00]
              text-5xl
              md:text-7xl
              font-black
              mt-4
            "
          >
            R5 000
          </div>

        </div>

      </section>

      {/* DETAILS */}

      <section
        id="details"
        className="max-w-6xl mx-auto px-6 mt-8"
      >

        <div className="grid md:grid-cols-2 gap-6">

          <div
            className="
              rounded-[24px]
              border
              border-[#8DFF00]/20
              p-6
            "
          >
            <h3 className="text-2xl font-black mb-4">
              Tournament Details
            </h3>

            <div className="space-y-3 text-white/80">

              <div>Game: Call of Duty</div>
              <div>Format: To Be Announced</div>
              <div>Platform: Cross Platform</div>
              <div>Entry Fee: FREE</div>
              <div>Region: South Africa</div>

            </div>

          </div>

          <div
            className="
              rounded-[24px]
              border
              border-[#8DFF00]/20
              p-6
            "
          >
            <h3 className="text-2xl font-black mb-4">
              How It Works
            </h3>

            <div className="space-y-3 text-white/80">

              <div>1. Register your squad.</div>
              <div>2. Tournament brackets released.</div>
              <div>3. Compete and advance.</div>
              <div>4. Battle for the championship.</div>

            </div>

          </div>

        </div>

      </section>

      {/* REGISTRATION */}

      <section
        id="register"
        className="max-w-4xl mx-auto px-6 mt-12 pb-20"
      >

        <div
          className="
            rounded-[30px]
            border
            border-[#8DFF00]/20
            p-8
          "
        >

          <h2 className="text-4xl font-black">
            Register Your Team
          </h2>

          <p className="text-white/70 mt-3">
            Complete the form below to enter.
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

            <input
              type="text"
              placeholder="Player 2"
              className="bg-black border border-white/20 rounded-xl p-4"
            />

            <input
              type="text"
              placeholder="Player 3"
              className="bg-black border border-white/20 rounded-xl p-4"
            />

            <input
              type="text"
              placeholder="Player 4"
              className="bg-black border border-white/20 rounded-xl p-4"
            />

            <button
              type="submit"
              className="
                mt-4
                bg-[#8DFF00]
                text-black
                font-black
                p-4
                rounded-xl
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
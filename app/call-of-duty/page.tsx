"use client";

import { useState } from "react";

export default function CallOfDutyPage() {
  const [playerName, setPlayerName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [activisionId, setActivisionId] = useState("");
  const [platform, setPlatform] = useState("PC");
  const [teamId, setTeamId] = useState("");
  const [agreedRules, setAgreedRules] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!agreedRules) {
      alert("Please accept the rules.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "/api/cod-register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            player_name: playerName,
            whatsapp,
            email,
            activision_id:
              activisionId,
            platform,
            team_id: Number(teamId),
            agreed_rules:
              agreedRules,
          }),
        }
      );

      const data =
        await res.json();

      if (!data.success) {
        alert(
          data.error ||
            "Registration failed"
        );
        return;
      }

      alert(
        "Registration submitted successfully."
      );

      setPlayerName("");
      setWhatsapp("");
      setEmail("");
      setActivisionId("");
      setTeamId("");
      setAgreedRules(false);

    } catch (error) {
      console.error(error);
      alert(
        "Something went wrong."
      );
    }

    setLoading(false);
  }

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

      {/* PART 2 FOLLOWS */}      {/* HOW IT WORKS */}

      <section className="max-w-7xl mx-auto px-6 mt-12">

        <h2 className="text-4xl font-black">
          HOW IT WORKS
        </h2>

        <div className="grid md:grid-cols-4 gap-6 mt-8">

          {[
            "Register",
            "Await Approval",
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
            REGISTER FOR WARZONE QUADS
          </h2>

          <p className="mt-3 text-white/70">
            Join Team 1 - 38 and await approval from tournament admins.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid gap-4 mt-8"
          >

            <input
              value={playerName}
              onChange={(e) =>
                setPlayerName(
                  e.target.value
                )
              }
              placeholder="Full Name"
              className="bg-black border border-white/20 rounded-xl p-4"
              required
            />

            <input
              value={whatsapp}
              onChange={(e) =>
                setWhatsapp(
                  e.target.value
                )
              }
              placeholder="WhatsApp Number"
              className="bg-black border border-white/20 rounded-xl p-4"
              required
            />

            <input
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="Email Address"
              className="bg-black border border-white/20 rounded-xl p-4"
              required
            />

            <input
              value={activisionId}
              onChange={(e) =>
                setActivisionId(
                  e.target.value
                )
              }
              placeholder="Activision ID"
              className="bg-black border border-white/20 rounded-xl p-4"
              required
            />

            <select
              value={platform}
              onChange={(e) =>
                setPlatform(
                  e.target.value
                )
              }
              className="bg-black border border-white/20 rounded-xl p-4"
            >
              <option value="PC">
                PC
              </option>

              <option value="PlayStation">
                PlayStation
              </option>

              <option value="Xbox">
                Xbox
              </option>
            </select>

            <select
              value={teamId}
              onChange={(e) =>
                setTeamId(
                  e.target.value
                )
              }
              className="bg-black border border-white/20 rounded-xl p-4"
              required
            >
              <option value="">
                Select Team
              </option>

              {Array.from(
                { length: 38 },
                (_, i) => (
                  <option
                    key={i + 1}
                    value={i + 1}
                  >
                    Team {i + 1}
                  </option>
                )
              )}
            </select>

            <div
              className="
                border
                border-[#8DFF00]/20
                rounded-2xl
                p-6
                mt-4
              "
            >

              <h3 className="text-[#8DFF00] font-black text-xl">
                TOURNAMENT RULES
              </h3>

              <ul className="mt-4 space-y-2 text-white/80 text-sm">

                <li>
                  • No cheating, hacking, scripts or exploits.
                </li>

                <li>
                  • Toxic behaviour may result in removal.
                </li>

                <li>
                  • Teams may be disqualified for misconduct.
                </li>

                <li>
                  • Players must be reachable on WhatsApp.
                </li>

                <li>
                  • Admin decisions are final.
                </li>

              </ul>

            </div>

            <label className="flex gap-3 items-start mt-2">

              <input
                type="checkbox"
                checked={
                  agreedRules
                }
                onChange={(e) =>
                  setAgreedRules(
                    e.target.checked
                  )
                }
              />

              <span>
                I agree to the tournament rules.
              </span>

            </label>

            <button
              type="submit"
              disabled={loading}
              className="
                bg-[#8DFF00]
                text-black
                font-black
                p-4
                rounded-xl
                mt-4
              "
            >
              {loading
                ? "REGISTERING..."
                : "REGISTER FOR TOURNAMENT"}
            </button>

          </form>

        </div>

      </section>

    </main>
  );
}
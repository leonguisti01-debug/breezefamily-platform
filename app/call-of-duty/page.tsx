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
    <main className="min-h-screen bg-black text-white">

      <section className="max-w-4xl mx-auto px-6 py-12">

        <h1 className="text-5xl font-black">
          CALL OF DUTY
        </h1>

        <p className="mt-4 text-white/70">
          R5 000 Prize Pool
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 mt-10"
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

          <label className="flex gap-3 items-start">

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
              I agree to the
              tournament rules.
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
            "
          >
            {loading
              ? "REGISTERING..."
              : "REGISTER"}
          </button>

        </form>

      </section>

    </main>
  );
}
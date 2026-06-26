"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

export default function CallOfDutyPage() {

  const [playerName, setPlayerName] =
    useState("");

  const [whatsapp, setWhatsapp] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [clanTag, setClanTag] =
  useState("");

  const [gamertag, setGamertag] =
  useState("");

  const [platform, setPlatform] =
    useState("PC");

  const [teamId, setTeamId] =
    useState("");

  const [agreedRules, setAgreedRules] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [players, setPlayers] =
  useState<any[]>([]);

const [results, setResults] =
  useState<any[]>([]);
const ENTRIES_OPEN = false;

  useEffect(() => {

  loadPlayers();
  loadResults();

}, []);

  async function loadPlayers() {

  const { data } =
    await supabase
      .from("cod_players")
      .select("*")
      .eq("status", "approved")
      .order("team_id");

  setPlayers(data || []);

}

async function loadResults() {

  const { data } =
    await supabase
      .from("cod_tournament_results")
.select("*")
.eq("published", true)
.order("position");

  setResults(data || []);

}

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    if (!agreedRules) {

      alert(
        "Please accept the rules."
      );

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
            player_name:
              playerName,
            whatsapp,
            email,
            clan_tag:
  clanTag,

gamertag:
  gamertag,
            platform,
            team_id:
              Number(teamId),
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
      setClanTag("");
setGamertag("");
      setTeamId("");
      setAgreedRules(false);

      await loadPlayers();

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

            {/* TOURNAMENT INFO BAR */}

      <section className="max-w-7xl mx-auto px-6 mt-6">

        <div className="overflow-hidden rounded-[18px] border border-white/10">

          <img
            src="/cod-info-bar.png"
            alt="Tournament Information"
            className="w-full h-auto object-cover"
          />

        </div>

      </section>

      {/* TOURNAMENT OVERVIEW */}

      <section className="max-w-7xl mx-auto px-6 mt-6">

        <div className="overflow-hidden rounded-[18px] border border-white/10">

          <img
            src="/cod-overview.png"
            alt="Tournament Overview"
            className="w-full h-auto object-cover"
          />

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

  {ENTRIES_OPEN ? (

    <div
      className="
        bg-white/5
        border
        border-[#8DFF00]/20
        rounded-[24px]
        p-8
        backdrop-blur-sm
      "
    >

      <h2 className="text-4xl font-black">
        REGISTER FOR WARZONE QUADS
      </h2>

      <p className="mt-3 text-white/70">
        Select a team and join the tournament.
      </p>

      {/* KEEP YOUR EXISTING FORM HERE */}

    </div>

  ) : (

    <div
      className="
        bg-white/5
        border
        border-red-500
        rounded-[24px]
        p-10
        text-center
      "
    >

      <div className="text-6xl mb-4">
        🔒
      </div>

      <h2 className="text-5xl font-black text-red-500">
        ENTRIES CLOSED
      </h2>

      <p className="mt-6 text-xl text-white/80">
        Registration for the
        <span className="text-[#8DFF00] font-bold">
          {" "}Warzone Quads Tournament{" "}
        </span>
        has now closed.
      </p>

      <p className="mt-4 text-white/60">
        Thank you to everyone who entered.
        
      </p>

    </div>

  )}

</section>

{/* TOURNAMENT WINNERS */}

{results.length > 0 && (

<section className="max-w-7xl mx-auto px-6 mt-20">

<h2 className="text-5xl font-black mb-8 text-center">

🏆 TOURNAMENT WINNERS

</h2>

<div className="grid md:grid-cols-3 gap-8">

{results.map((winner) => {

const teamPlayers =
players.filter(
(player)=>
player.team_id===winner.team_id
);

const medal =
winner.position===1
? "🥇"
: winner.position===2
? "🥈"
: "🥉";

return(

<div
key={winner.position}
className="border border-[#8DFF00]/20 rounded-[28px] p-8 bg-white/5 text-center"
>

<div className="text-6xl">
{medal}
</div>

<div className="text-3xl font-black mt-4">

TEAM {winner.team_id}

</div>

<div className="mt-6 space-y-2">

{teamPlayers.map(player=>(

<div key={player.id}>

{player.gamertag}

</div>

))}

</div>

<div className="mt-8 text-[#8DFF00] text-2xl font-black">

{winner.prize}

</div>

</div>

);

})}

</div>

</section>

)}
      {/* TOURNAMENT TEAMS */}

      <section className="max-w-7xl mx-auto px-6 mt-20">

        <h2 className="text-4xl font-black mb-8">
  LIVE TEAM REGISTRATION
</h2>

        <div className="grid md:grid-cols-4 gap-6">

          {Array.from(
            { length: 38 },
            (_, i) => {

              const teamNumber =
                i + 1;

              const teamPlayers =
                players.filter(
                  (player) =>
                    player.team_id ===
                    teamNumber
                );

              return (

                <div
                  key={teamNumber}
                  className="
                    border
                    border-[#8DFF00]/20
                    rounded-[24px]
                    p-5
                    bg-black
                  "
                >

                  <div className="flex justify-between items-center">

                    <h3 className="font-black text-xl">
                      TEAM {teamNumber}
                    </h3>

                    <div className="text-[#8DFF00] font-bold">

                      {teamPlayers.length >= 4
                        ? "FULL"
                        : `${teamPlayers.length}/4`}

                    </div>

                  </div>

                  <div className="mt-4 space-y-2">

                    {[0, 1, 2, 3].map(
                      (slot) => {

                        const player =
                          teamPlayers[
                            slot
                          ];

                        return (

                          <div
                            key={slot}
                            className="
                              border
                              border-white/10
                              rounded-lg
                              p-3
                              text-sm
                            "
                          >

                            {player
  ? player.gamertag
  : "--"}

                          </div>

                        );

                      }
                    )}

                  </div>

                </div>

              );

            }
          )}

        </div>

      </section>

    </main>
  );
}
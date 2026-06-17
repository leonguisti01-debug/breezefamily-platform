"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

function CountdownToSeven() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();

      const target = new Date();
      target.setHours(19, 0, 0, 0);

      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTimeLeft({
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        ),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center gap-4">
      <div className="rounded-2xl bg-black/60 border border-pink-500/30 px-6 py-4 min-w-[90px]">
        <div className="text-4xl font-black text-white">
          {String(timeLeft.hours).padStart(2, "0")}
        </div>
        <div className="text-xs uppercase text-zinc-400">Hours</div>
      </div>

      <div className="rounded-2xl bg-black/60 border border-blue-500/30 px-6 py-4 min-w-[90px]">
        <div className="text-4xl font-black text-white">
          {String(timeLeft.minutes).padStart(2, "0")}
        </div>
        <div className="text-xs uppercase text-zinc-400">Minutes</div>
      </div>

      <div className="rounded-2xl bg-black/60 border border-yellow-500/30 px-6 py-4 min-w-[90px]">
        <div className="text-4xl font-black text-white">
          {String(timeLeft.seconds).padStart(2, "0")}
        </div>
        <div className="text-xs uppercase text-zinc-400">Seconds</div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black pt-[20px] pb-10">

      {/* HERO */}

<section className="w-full max-w-[900px] mx-auto px-3 mb-4">

  <div className="relative overflow-hidden rounded-[18px] border border-white/10">

    <img
      src="/hero-banner.png"
      alt="Breeze Family"
      className="w-full h-auto object-cover"
    />

    <Link
  href="/merch"
  className="
    absolute
    left-4
    bottom-4

    px-3
    py-2

    md:left-6
    md:bottom-8

    md:px-5
    md:py-3

    rounded-full

    bg-black/85
    border
    border-[#8DFF00]

    text-[#8DFF00]
    text-[11px]
    md:text-sm

    font-black
    uppercase
    whitespace-nowrap

    hover:bg-[#8DFF00]
    hover:text-black

    transition-all
    duration-300
  "
>
  SHOP MERCH
</Link>

  </div>

</section>

{/* TikTok Stars Kids Edition Countdown */}
<section className="w-full max-w-5xl mx-auto px-4 mt-6 mb-6">
  <div className="relative overflow-hidden rounded-3xl border border-pink-500/30 bg-gradient-to-r from-pink-500/10 via-blue-500/10 to-yellow-500/10 p-8 text-center">
    
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]" />

    <div className="relative z-10">
      <p className="text-sm uppercase tracking-[0.3em] text-pink-300 mb-2">
        Tonight at 7:00 PM
      </p>

      <h2 className="text-3xl md:text-5xl font-black mb-3">
        TikTok Stars Kids Edition
      </h2>

      <p className="text-xl md:text-2xl text-yellow-300 font-bold mb-6">
        Episode 1 Starts In
      </p>

      <CountdownToSeven />

      <div className="mt-6 text-zinc-300">
        Meet the contestants • Watch the performances • Vote for your favourites
      </div>
    </div>
  </div>
</section>

{/* COD TOURNAMENT */}

      <section className="w-full max-w-[900px] mx-auto px-3 mb-4">

        <Link href="/call-of-duty">

          <div className="group overflow-hidden rounded-[18px] border border-white/10 hover:border-[#8DFF00]/50 transition">

            <img
              src="/cod-banner.png"
              alt="COD Tournament"
              className="
                w-full
                h-auto
                object-cover
                transition
                duration-300
                group-hover:scale-105
              "
            />

          </div>

        </Link>

      </section>

      {/* ROW 1 */}

      <section className="w-full max-w-[900px] mx-auto px-3 mb-4">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          <Link href="/kids-edition/register">

            <div className="group overflow-hidden rounded-[18px] border border-white/10 hover:border-[#8DFF00]/50 transition">

              <img
                src="/tiktok-stars.png"
                alt="TikTok Stars"
                className="
                  w-full
                  h-auto
                  object-cover
                  transition
                  duration-300
                  group-hover:scale-105
                "
              />

            </div>

          </Link>

          <div className="overflow-hidden rounded-[18px] border border-white/10">

            <img
              src="/find-kai.png"
              alt="Find Kai"
              className="
                w-full
                h-auto
                object-cover
              "
            />

          </div>

          <a
            href="https://discord.gg/"
            target="_blank"
            rel="noopener noreferrer"
          >

            <div className="group overflow-hidden rounded-[18px] border border-white/10 hover:border-[#8DFF00]/50 transition">

              <img
                src="/discord.png"
                alt="Discord"
                className="
                  w-full
                  h-auto
                  object-cover
                  transition
                  duration-300
                  group-hover:scale-105
                "
              />

            </div>

          </a>

        </div>

      </section>

      {/* ROW 2 */}

      <section className="w-full max-w-[900px] mx-auto px-3 mb-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          <Link href="/register">

            <div className="group overflow-hidden rounded-[18px] border border-white/10 hover:border-[#8DFF00]/50 transition">

              <img
                src="/why-join.png"
                alt="Why Join"
                className="
                  w-full
                  h-auto
                  object-cover
                  transition
                  duration-300
                  group-hover:scale-105
                "
              />

            </div>

          </Link>

          <Link href="/leaderboard">

            <div className="group overflow-hidden rounded-[18px] border border-white/10 hover:border-[#8DFF00]/50 transition">

              <img
                src="/breeze-points.png"
                alt="Breeze Points"
                className="
                  w-full
                  h-auto
                  object-cover
                  transition
                  duration-300
                  group-hover:scale-105
                "
              />

            </div>

          </Link>

        </div>

      </section>

      {/* ROW 3 */}

      <section className="w-full max-w-[900px] mx-auto px-3">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

          <Link href="/prized-pets">

            <div className="group overflow-hidden rounded-[18px] border border-white/10 hover:border-[#8DFF00]/50 transition">

              <img
                src="/prized-pets.png"
                alt="Prized Pets"
                className="
                  w-full
                  h-auto
                  object-cover
                  transition
                  duration-300
                  group-hover:scale-105
                "
              />

            </div>

          </Link>

          <Link href="/leaderboard">

            <div className="group overflow-hidden rounded-[18px] border border-white/10 hover:border-[#8DFF00]/50 transition">

              <img
                src="/leaderboard.png"
                alt="Leaderboard"
                className="
                  w-full
                  h-auto
                  object-cover
                  transition
                  duration-300
                  group-hover:scale-105
                "
              />

            </div>

          </Link>

          <Link href="/achievements">

            <div className="group overflow-hidden rounded-[18px] border border-white/10 hover:border-[#8DFF00]/50 transition">

              <img
                src="/achievements.png"
                alt="Achievements"
                className="
                  w-full
                  h-auto
                  object-cover
                  transition
                  duration-300
                  group-hover:scale-105
                "
              />

            </div>

          </Link>

          <Link href="/profile">

            <div className="group overflow-hidden rounded-[18px] border border-white/10 hover:border-[#8DFF00]/50 transition">

              <img
                src="/profile.png"
                alt="Profile"
                className="
                  w-full
                  h-auto
                  object-cover
                  transition
                  duration-300
                  group-hover:scale-105
                "
              />

            </div>

          </Link>

        </div>

      </section>

    </main>
  );
}
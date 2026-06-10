"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black pt-[80px] pb-10">

      {/* HERO */}

      <section className="w-full max-w-[900px] mx-auto px-3 mb-4">

        <div className="overflow-hidden rounded-[18px] border border-white/10">

          <img
            src="/hero-banner.png"
            alt="Breeze Family"
            className="w-full h-auto object-cover"
          />

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
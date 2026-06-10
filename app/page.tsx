import Link from "next/link";
export default function HomePageV2() {
  return (
    <main className="min-h-screen bg-black text-white pb-12">

<Link href="/kids-edition/register">
  <img
    src="/tiktok-stars-kids-banner.jpg"
    alt="TikTok Stars Kids Edition"
    className="
      w-full
      rounded-[24px]
      border
      border-white/10
      hover:scale-[1.01]
      transition
      cursor-pointer
    "
  />
</Link>

      {/* KAI ALERT */}

      <section className="max-w-6xl mx-auto px-6 pt-6">

        <div
          className="
            relative
            h-[120px]
            md:h-[100px]
            rounded-[30px]
            overflow-visible
            border
            border-[#8DFF00]/20
            bg-gradient-to-r
            from-black
            via-[#111]
            to-black
          "
        >

          <div
            className="
              absolute
              left-4
              md:left-6
              top-1/2
              -translate-y-1/2
              bg-black/90
              border
              border-[#8DFF00]/20
              rounded-[20px]
              px-4
              py-3
              md:px-5
              md:py-3
              z-20
              max-w-[180px]
              md:max-w-none
            "
          >

            <h3 className="text-[#8DFF00] text-base md:text-lg font-black">
              KAI IS HIDING...
            </h3>

            <p className="text-white/80 text-xs md:text-sm mt-1">
              Find him and get
              <span className="text-[#8DFF00] font-bold">
                {" "}10% off!
              </span>
            </p>

          </div>

          <img
            src="/Kai.png"
            alt="Kai"
            className="
              absolute
              right-4
              md:right-16
              -top-6
              md:-top-14
              z-30
              w-[120px]
              md:w-[180px]
              drop-shadow-[0_15px_40px_rgba(141,255,0,0.35)]
            "
          />

        </div>
        <div className="absolute inset-0 flex items-center justify-center">
  <a
    href="YOUR_DISCORD_LINK"
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-full bg-[#8cc63f] px-10 py-5 text-xl font-bold text-black shadow-lg transition-all hover:scale-105"
  >
    JOIN OUR COMMUNITY
  </a>
</div>

      </section>

      {/* PELLEGRINI VALLEY */}

<section className="max-w-6xl mx-auto px-6 mt-8">

  <div
    className="
      relative
      overflow-hidden
      rounded-[30px]
      border
      border-[#8DFF00]/20
      group
    "
  >

    <img
      src="/pv-banner.jpg"
      alt="Pellegrini Valley"
      className="
        w-full
        h-auto
        block
      "
    />

    <div
      className="
        absolute
        inset-0
        bg-gradient-to-r
        from-black/80
        via-black/20
        to-transparent
      "
    />

    <div
      className="
        absolute
        left-6
        md:left-10
        top-1/2
        -translate-y-1/2
        z-10
      "
    >

      <div
        className="
          text-[#8DFF00]
          text-sm
          md:text-lg
          font-bold
          uppercase
          tracking-[4px]
        "
      >
        GTA ROLEPLAY SERVER
      </div>

      <h2
        className="
          text-3xl
          md:text-6xl
          font-black
          mt-2
          uppercase
        "
      >
        Pellegrini Valley
      </h2>

      <p
        className="
          text-white/80
          mt-3
          max-w-md
          text-sm
          md:text-lg
        "
      >
        Live your story. Leave your legacy.
      </p>

      <a
        href="https://discord.gg/cKbz3nQDV"
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex
          mt-5
          bg-[#8DFF00]
          text-black
          font-black
          px-6
          py-3
          rounded-full
          hover:scale-105
          transition
        "
      >
        JOIN DISCORD
      </a>

    </div>

  </div>

</section>

      {/* HERO */}

      <section className="max-w-6xl mx-auto px-6 mt-8">

        <div
          className="
            grid
            lg:grid-cols-2
            rounded-[30px]
            overflow-hidden
            border
            border-[#8DFF00]/20
          "
        >

          <div className="bg-black p-8 lg:p-10 flex flex-col justify-center">

            <h1
              className="
                uppercase
                font-black
                leading-[0.9]
              "
            >

              <span className="block text-5xl lg:text-7xl">
                THE
              </span>

              <span className="block text-5xl lg:text-7xl">
                BREEZE
              </span>

              <span
                className="
                  block
                  text-4xl
                  lg:text-6xl
                  italic
                  text-[#8DFF00]
                "
              >
                FAMILY
              </span>

            </h1>

            <p className="mt-5 text-white/70 text-lg">
              Competitions • Pets • Kids • Merch • Entertainment
            </p>

            <div className="flex flex-wrap gap-3 mt-8">

              <a
                href="/tiktok-stars"
                className="
                  bg-[#8DFF00]
                  text-black
                  font-black
                  px-6
                  py-3
                  rounded-full
                  text-sm
                "
              >
                ENTER KIDS EDITION
              </a>

              <a
                href="/merch"
                className="
                  border
                  border-[#8DFF00]
                  text-[#8DFF00]
                  font-black
                  px-6
                  py-3
                  rounded-full
                  text-sm
                "
              >
                SHOP MERCH
              </a>

            </div>

          </div>

          <div className="relative min-h-[420px] bg-black">

            <img
              src="/hero-main.jpg"
              alt="Breeze Family"
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
                object-top
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-black
                via-black/20
                to-transparent
              "
            />

          </div>

        </div>

      </section>

    </main>
  );
}
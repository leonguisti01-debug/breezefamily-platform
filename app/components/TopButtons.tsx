import Link from "next/link";

export default function TopButtons() {
  return (
    <header className="relative z-50 w-full px-6 py-8 border-b border-green-500/10 backdrop-blur-xl bg-black/20">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-5">

          <img
            src="/breeze-logo.png"
            alt="Breeze Family"
            className="w-[90px] md:w-[110px]"
          />

          <div>

            <h1 className="text-3xl md:text-5xl font-black leading-none">

              <span className="text-green-300">
                BREEZE
              </span>{" "}

              <span className="text-lime-200">
                FAMILY
              </span>

            </h1>

            <p className="text-xs md:text-sm tracking-[5px] uppercase text-white/70 mt-2">
              Entertainment • Media • Merch
            </p>

          </div>

        </Link>

        {/* MENU */}
        <nav className="flex flex-wrap justify-center gap-8 md:gap-10 text-xs md:text-sm uppercase font-bold tracking-[2px]">

          <Link
            href="/"
            className="hover:text-green-300 transition duration-300"
          >
            Home
          </Link>

          <Link
            href="/kids-edition"
            className="hover:text-green-300 transition duration-300"
          >
            Kids Edition
          </Link>

          <Link
            href="/season-2-finale"
            className="hover:text-green-300 transition duration-300"
          >
            Season 2
          </Link>

          <Link
            href="/fan-favorite-judge"
            className="hover:text-green-300 transition duration-300"
          >
            Favorite Judge Vote
          </Link>

          <Link
            href="/shop"
            className="hover:text-green-300 transition duration-300"
          >
            Shop
          </Link>

          <Link
            href="/login"
            className="px-5 py-2 rounded-full border border-green-400/30 bg-green-500/10 hover:bg-green-500/20 transition duration-300"
          >
            Login
          </Link>

        </nav>

      </div>

    </header>
  );
}
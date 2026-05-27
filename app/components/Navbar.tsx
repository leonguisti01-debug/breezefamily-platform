"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BREEZE_GREEN = "#8DFF00";

export default function Navbar() {

  const pathname =
    usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-2 md:px-4 pt-3">

      <div className="w-full max-w-[1400px] mx-auto h-[56px] rounded-[12px] border border-white/10 bg-black/90 backdrop-blur-2xl flex items-center justify-between px-4 md:px-6 overflow-hidden">

        {/* LEFT */}
        <div className="flex items-center gap-4 md:gap-8 min-w-0">

          {/* LOGO */}
          <Link href="/" className="shrink-0">

            <img
              src="/breeze-logo-new.png"
              alt="Breeze Family"
              className="h-8 md:h-9 w-auto object-contain"
            />

          </Link>

          {/* NAVIGATION */}
          <nav className="flex items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar">

            {/* HOME */}
            <Link href="/">

              <div className="relative pb-1">

                <span
                  className={`
                    text-[10px]
                    md:text-[11px]
                    uppercase
                    tracking-[2px]
                    font-bold
                    whitespace-nowrap
                    transition
                    ${
                      pathname === "/"
                        ? "text-white"
                        : "text-white/80 hover:text-[#8DFF00]"
                    }
                  `}
                >

                  Home

                </span>

                {pathname === "/" && (

                  <div className="absolute left-0 bottom-0 w-full h-[2px] bg-[#8DFF00] rounded-full" />

                )}

              </div>

            </Link>

            {/* PRIZED PETS */}
            <Link href="/prized-pets">

              <div className="relative pb-1">

                <span
                  className={`
                    text-[10px]
                    md:text-[11px]
                    uppercase
                    tracking-[2px]
                    font-bold
                    whitespace-nowrap
                    transition
                    ${
                      pathname === "/prized-pets"
                        ? "text-white"
                        : "text-white/80 hover:text-[#8DFF00]"
                    }
                  `}
                >

                  Prized Pets

                </span>

                {pathname === "/prized-pets" && (

                  <div className="absolute left-0 bottom-0 w-full h-[2px] bg-[#8DFF00] rounded-full" />

                )}

              </div>

            </Link>

            {/* TIKTOK STARS */}
            <Link href="/tiktok-stars">

              <div className="relative pb-1">

                <span
                  className={`
                    text-[10px]
                    md:text-[11px]
                    uppercase
                    tracking-[2px]
                    font-bold
                    whitespace-nowrap
                    transition
                    ${
                      pathname === "/tiktok-stars"
                        ? "text-white"
                        : "text-white/80 hover:text-[#8DFF00]"
                    }
                  `}
                >

                  TikTok Stars

                </span>

                {pathname === "/tiktok-stars" && (

                  <div className="absolute left-0 bottom-0 w-full h-[2px] bg-[#8DFF00] rounded-full" />

                )}

              </div>

            </Link>

            {/* MERCH */}
            <Link href="/merch">

              <div className="relative pb-1">

                <span
                  className={`
                    text-[10px]
                    md:text-[11px]
                    uppercase
                    tracking-[2px]
                    font-bold
                    whitespace-nowrap
                    transition
                    ${
                      pathname === "/merch"
                        ? "text-white"
                        : "text-white/80 hover:text-[#8DFF00]"
                    }
                  `}
                >

                  Merch

                </span>

                {pathname === "/merch" && (

                  <div className="absolute left-0 bottom-0 w-full h-[2px] bg-[#8DFF00] rounded-full" />

                )}

              </div>

            </Link>

            {/* HIGHLIGHTS */}
            <Link href="/highlights">

              <div className="relative pb-1">

                <span
                  className={`
                    text-[10px]
                    md:text-[11px]
                    uppercase
                    tracking-[2px]
                    font-bold
                    whitespace-nowrap
                    transition
                    ${
                      pathname === "/highlights"
                        ? "text-white"
                        : "text-white/80 hover:text-[#8DFF00]"
                    }
                  `}
                >

                  Highlights

                </span>

                {pathname === "/highlights" && (

                  <div className="absolute left-0 bottom-0 w-full h-[2px] bg-[#8DFF00] rounded-full" />

                )}

              </div>

            </Link>

            {/* ABOUT */}
            <Link href="/about">

              <div className="relative pb-1">

                <span
                  className={`
                    text-[10px]
                    md:text-[11px]
                    uppercase
                    tracking-[2px]
                    font-bold
                    whitespace-nowrap
                    transition
                    ${
                      pathname === "/about"
                        ? "text-white"
                        : "text-white/80 hover:text-[#8DFF00]"
                    }
                  `}
                >

                  About

                </span>

                {pathname === "/about" && (

                  <div className="absolute left-0 bottom-0 w-full h-[2px] bg-[#8DFF00] rounded-full" />

                )}

              </div>

            </Link>

            {/* CONTACT */}
            <Link href="/contact">

              <div className="relative pb-1">

                <span
                  className={`
                    text-[10px]
                    md:text-[11px]
                    uppercase
                    tracking-[2px]
                    font-bold
                    whitespace-nowrap
                    transition
                    ${
                      pathname === "/contact"
                        ? "text-white"
                        : "text-white/80 hover:text-[#8DFF00]"
                    }
                  `}
                >

                  Contact

                </span>

                {pathname === "/contact" && (

                  <div className="absolute left-0 bottom-0 w-full h-[2px] bg-[#8DFF00] rounded-full" />

                )}

              </div>

            </Link>

          </nav>

        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center gap-4 shrink-0">

          {/* SOCIALS */}
          <div className="flex items-center gap-3">

            <a
              href="https://www.tiktok.com/@itskentbreezy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/tiktok-icon.png"
                alt="TikTok"
                className="w-4 h-4 object-contain opacity-80 hover:opacity-100 transition"
              />
            </a>

            <a
              href="https://www.instagram.com/itskentbreezy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/instagram-icon.png"
                alt="Instagram"
                className="w-4 h-4 object-contain opacity-80 hover:opacity-100 transition"
              />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/youtube-icon.png"
                alt="YouTube"
                className="w-4 h-4 object-contain opacity-80 hover:opacity-100 transition"
              />
            </a>

            <a
              href="https://whatsapp.com/channel/0029VbD9d4P9sBI9ue1ekp2z"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/whatsapp-icon.png"
                alt="WhatsApp"
                className="w-4 h-4 object-contain opacity-80 hover:opacity-100 transition"
              />
            </a>

          </div>

          {/* JOIN BUTTON */}
          <Link href="/register">

            <button
              className="
                bg-[#8DFF00]
                text-black
                uppercase
                font-black
                tracking-[2px]
                text-[10px]
                px-5
                h-[38px]
                rounded-full
                hover:scale-105
                transition
                shadow-[0_0_30px_rgba(141,255,0,0.35)]
                whitespace-nowrap
              "
            >

              JOIN THE FAMILY

            </button>

          </Link>

        </div>

      </div>

    </header>
  );
}
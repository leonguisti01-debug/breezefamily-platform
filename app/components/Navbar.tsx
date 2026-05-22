"use client";

import Link from "next/link";

const BREEZE_GREEN = "#8DFF00";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-2 md:px-4 pt-3">

      <div className="w-full max-w-[1260px] mx-auto h-[56px] rounded-[12px] border border-white/10 bg-black/90 backdrop-blur-2xl flex items-center justify-between px-4 md:px-6 overflow-hidden">

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

            <Link href="/">
              <span className="text-white text-[10px] md:text-[11px] uppercase tracking-[2px] font-bold whitespace-nowrap hover:text-[#8DFF00] transition">
                Home
              </span>
            </Link>

            {/* PRIZED PETS */}
            <Link href="/prized-pets">
              <span className="text-white/80 hover:text-[#8DFF00] text-[10px] md:text-[11px] uppercase tracking-[2px] font-bold whitespace-nowrap transition">
                Prized Pets
              </span>
            </Link>

            <Link href="/tiktok-stars">
              <span className="text-white/80 hover:text-[#8DFF00] text-[10px] md:text-[11px] uppercase tracking-[2px] font-bold whitespace-nowrap transition">
                TikTok Stars
              </span>
            </Link>

            <Link href="/merch">
              <span className="text-white/80 hover:text-[#8DFF00] text-[10px] md:text-[11px] uppercase tracking-[2px] font-bold whitespace-nowrap transition">
                Merch
              </span>
            </Link>

            <Link href="/highlights">
              <span className="text-white/80 hover:text-[#8DFF00] text-[10px] md:text-[11px] uppercase tracking-[2px] font-bold whitespace-nowrap transition">
                Highlights
              </span>
            </Link>

            <Link href="/about">
              <span className="text-white/80 hover:text-[#8DFF00] text-[10px] md:text-[11px] uppercase tracking-[2px] font-bold whitespace-nowrap transition">
                About
              </span>
            </Link>

            <Link href="/contact">
              <span className="text-white/80 hover:text-[#8DFF00] text-[10px] md:text-[11px] uppercase tracking-[2px] font-bold whitespace-nowrap transition">
                Contact
              </span>
            </Link>

          </nav>

        </div>

        {/* SOCIALS */}
        <div className="hidden md:flex items-center gap-3 shrink-0">

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

      </div>

    </header>
  );
}
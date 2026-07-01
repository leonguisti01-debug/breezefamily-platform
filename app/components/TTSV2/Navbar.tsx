"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="tts-navbar">
      <div className="tts-navbar-inner">

        <Link href="/" className="tts-brand">
          TikTok Stars
        </Link>

        <nav className="tts-nav">
          <a href="#about">About</a>
          <a href="#judges">Judges</a>
          <a href="#prizes">Prizes</a>
          <a href="#enter">Enter</a>
        </nav>

        <a href="#enter" className="tts-enter-btn">
          ENTER NOW
        </a>

      </div>
    </header>
  );
}
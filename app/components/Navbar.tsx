"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const BREEZE_GREEN = "#8DFF00";

export default function Navbar() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const navItems = [
    {
      href: "/",
      label: "Home",
    },
    {
  href: "/call-of-duty",
  label: "COD Tournament",
},
    {
      href: "/prized-pets",
      label: "Prized Pets",
    },
    {
      href: "/tiktok-stars",
      label: "TikTok Stars",
    },
    {
      href: "/merch",
      label: "Merch",
    },
    {
      href: "/highlights",
      label: "Highlights",
    },
    {
      href: "/about",
      label: "About",
    },
    {
      href: "/contact",
      label: "Contact",
    },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-2 md:px-4 pt-3">

      <div className="w-full max-w-[1400px] mx-auto rounded-[12px] border border-white/10 bg-black/90 backdrop-blur-2xl">

        <div className="h-[56px] flex items-center justify-between px-4 md:px-6">

          {/* LOGO */}
          <Link href="/" className="shrink-0">

            <img
              src="/breeze-logo-new.png"
              alt="Breeze Family"
              className="h-8 md:h-9 w-auto object-contain"
            />

          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">

            {navItems.map((item) => (

              <Link
                key={item.href}
                href={item.href}
              >

                <div className="relative pb-1">

                  <span
                    className={`
                      text-[11px]
                      uppercase
                      tracking-[2px]
                      font-bold
                      whitespace-nowrap
                      transition
                      ${
                        pathname === item.href
                          ? "text-white"
                          : "text-white/80 hover:text-[#8DFF00]"
                      }
                    `}
                  >

                    {item.label}

                  </span>

                  {pathname === item.href && (

                    <div
                      className="
                        absolute
                        left-0
                        bottom-0
                        w-full
                        h-[2px]
                        bg-[#8DFF00]
                        rounded-full
                      "
                    />

                  )}

                </div>

              </Link>

            ))}

          </nav>

          {/* DESKTOP RIGHT */}
          <div className="hidden md:flex items-center gap-3">

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

            <Link href="/register">

              <button
                className="
                  bg-[#8DFF00]
                  text-black
                  uppercase
                  font-black
                  tracking-[1px]
                  text-[10px]
                  px-5
                  h-[38px]
                  rounded-full
                  hover:scale-105
                  transition
                  shadow-[0_0_30px_rgba(141,255,0,0.35)]
                "
              >

                JOIN THE FAMILY

              </button>

            </Link>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() =>
              setMobileMenuOpen(
                !mobileMenuOpen
              )
            }
            className="md:hidden text-white text-3xl font-bold"
          >

            ☰

          </button>

        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (

          <div
            className="
              md:hidden
              border-t
              border-white/10
              p-5
            "
          >

            <div className="flex flex-col gap-5">

              {navItems.map((item) => (

                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setMobileMenuOpen(
                      false
                    )
                  }
                >

                  <span
                    className={`
                      uppercase
                      tracking-[2px]
                      font-bold
                      ${
                        pathname === item.href
                          ? "text-[#8DFF00]"
                          : "text-white"
                      }
                    `}
                  >

                    {item.label}

                  </span>

                </Link>

              ))}

              <div className="flex items-center gap-4 pt-2">

                <a
                  href="https://www.tiktok.com/@itskentbreezy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/tiktok-icon.png"
                    alt="TikTok"
                    className="w-5 h-5"
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
                    className="w-5 h-5"
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
                    className="w-5 h-5"
                  />
                </a>

              </div>

              <Link
                href="/register"
                onClick={() =>
                  setMobileMenuOpen(
                    false
                  )
                }
              >

                <button
                  className="
                    w-full
                    h-[44px]
                    bg-[#8DFF00]
                    text-black
                    uppercase
                    font-black
                    rounded-full
                    shadow-[0_0_30px_rgba(141,255,0,0.35)]
                  "
                >

                  JOIN THE FAMILY

                </button>

              </Link>

            </div>

          </div>

        )}

      </div>

    </header>
  );
}
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type NavChild = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [loggedIn, setLoggedIn] =
    useState(false);

  const [openDropdown, setOpenDropdown] =
    useState<string | null>(null);

  const [openMobileDropdown, setOpenMobileDropdown] =
    useState<string | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setLoggedIn(!!user);
  };

  const logout = async () => {
    await supabase.auth.signOut();

    setLoggedIn(false);

    router.push("/");

    router.refresh();
  };

  const navItems: NavItem[] = [
    {
      label: "Home",
      href: "/",
    },

    {
  label: "TikTok Stars",
  children: [
    {
      label: "Kids Edition",
      href: "/kids-edition",
    },
    {
      label: "TikTok Stars",
      href: "/tiktok-stars",
    },
    {
      label: "TikTok Admin",
      href: "/admin/tiktok-kids",
    },
  ],
},

    {
      label: "Game Night",
      children: [
        {
          label: "Prized Pets",
          href: "/prized-pets",
        },
        {
          label: "Scavenger Hunt Olympics",
          href: "/scavenger-hunt",
        },
      ],
    },

    {
      label: "COD",
      children: [
        {
          label: "COD Tournament",
          href: "/call-of-duty",
        },
        {
          label: "COD Admin",
          href: "/cod-admin/login",
        },
      ],
    },

    {
      label: "Merch",
      href: "/merch",
    },

    {
      label: "More",
      children: [
        {
          label: "Leaderboard",
          href: "/leaderboard",
        },
        {
          label: "YOU MATTER",
          href: "/mental-health",
        },
      ],
    },

    {
      label: "Become A Sponsor",
      href: "/become-a-sponsor",
    },
  ];

  const isDropdownActive = (
    children: NavChild[]
  ) => {
    return children.some(
      (child) => pathname === child.href
    );
  };

  return (    <header className="fixed top-0 left-0 w-full z-50 px-2 md:px-4 pt-3">

      <div className="w-full max-w-[1400px] mx-auto rounded-[12px] border border-white/10 bg-black/90 backdrop-blur-2xl">

        <div className="h-[56px] flex items-center justify-between px-4 md:px-6">

          <Link
            href="/"
            className="shrink-0"
          >
            <img
              src="/breeze-logo-new.png"
              alt="Breeze Family"
              className="h-8 md:h-9 w-auto object-contain"
            />
          </Link>

          {/* DESKTOP NAV */}

          <nav className="hidden md:flex items-center gap-6">

            {navItems.map((item) => {

              if (item.children) {
                const active =
                  isDropdownActive(item.children);

                return (
                  <div
                    key={item.label}
                    className="relative"
                  >

                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.label
                            ? null
                            : item.label
                        )
                      }
                      className={`
                        text-[11px]
                        uppercase
                        tracking-[2px]
                        font-bold
                        whitespace-nowrap
                        transition
                        ${
                          active
                            ? "text-white"
                            : "text-white/80 hover:text-[#8DFF00]"
                        }
                      `}
                    >
                      {item.label} ▼
                    </button>

                    {openDropdown === item.label && (

                      <div
                        className="
                          absolute
                          top-full
                          left-0
                          mt-2
                          min-w-[230px]
                          rounded-xl
                          border
                          border-white/10
                          bg-black/95
                          backdrop-blur-xl
                          overflow-hidden
                          z-50
                        "
                      >

                        {item.children.map((child) => (

                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() =>
                              setOpenDropdown(null)
                            }
                            className={`
                              block
                              px-4
                              py-3
                              text-[11px]
                              uppercase
                              tracking-[2px]
                              transition
                              ${
                                pathname === child.href
                                  ? "text-[#8DFF00] bg-white/5"
                                  : "text-white/80 hover:text-[#8DFF00] hover:bg-white/5"
                              }
                            `}
                          >
                            {child.label}
                          </Link>

                        ))}

                      </div>

                    )}

                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href!}
                >
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
                </Link>
              );

            })}

          </nav>

          {/* RIGHT SIDE */}

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

            {!loggedIn ? (
              <>
                <Link href="/login">
                  <button
                    className="
                      border
                      border-[#8DFF00]
                      text-[#8DFF00]
                      uppercase
                      font-black
                      tracking-[1px]
                      text-[10px]
                      px-5
                      h-[38px]
                      rounded-full
                    "
                  >
                    LOGIN
                  </button>
                </Link>

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
              </>
            ) : (
              <>
                <Link href="/profile">
                  <button
                    className="
                      border
                      border-[#8DFF00]
                      text-[#8DFF00]
                      uppercase
                      font-black
                      tracking-[1px]
                      text-[10px]
                      px-5
                      h-[38px]
                      rounded-full
                    "
                  >
                    MY ACCOUNT
                  </button>
                </Link>

                <button
                  onClick={logout}
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
                  "
                >
                  LOGOUT
                </button>
              </>
            )}

          </div>

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

              {navItems.map((item) => {

                if (item.children) {
                  return (
                    <div key={item.label}>

                      <button
                        onClick={() =>
                          setOpenMobileDropdown(
                            openMobileDropdown === item.label
                              ? null
                              : item.label
                          )
                        }
                        className="
                          w-full
                          text-left
                          uppercase
                          tracking-[2px]
                          font-bold
                          text-white
                        "
                      >
                        {item.label} ▼
                      </button>

                      {openMobileDropdown === item.label && (

                        <div className="pl-4 pt-3 flex flex-col gap-3">

                          {item.children.map((child) => (

                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() =>
                                setMobileMenuOpen(false)
                              }
                            >
                              <span className="text-white/80">
                                {child.label}
                              </span>
                            </Link>

                          ))}

                        </div>

                      )}

                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href!}
                    onClick={() =>
                      setMobileMenuOpen(false)
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
                );

              })}

              {!loggedIn ? (
                <>
                  <Link href="/login">
                    <button
                      className="
                        w-full
                        h-[44px]
                        border
                        border-[#8DFF00]
                        text-[#8DFF00]
                        uppercase
                        font-black
                        rounded-full
                      "
                    >
                      LOGIN
                    </button>
                  </Link>

                  <Link href="/register">
                    <button
                      className="
                        w-full
                        h-[44px]
                        bg-[#8DFF00]
                        text-black
                        uppercase
                        font-black
                        rounded-full
                      "
                    >
                      JOIN THE FAMILY
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/profile">
                    <button
                      className="
                        w-full
                        h-[44px]
                        border
                        border-[#8DFF00]
                        text-[#8DFF00]
                        uppercase
                        font-black
                        rounded-full
                      "
                    >
                      MY ACCOUNT
                    </button>
                  </Link>

                  <button
                    onClick={logout}
                    className="
                      w-full
                      h-[44px]
                      bg-[#8DFF00]
                      text-black
                      uppercase
                      font-black
                      rounded-full
                    "
                  >
                    LOGOUT
                  </button>
                </>
              )}

            </div>

          </div>

        )}

      </div>

    </header>
  );
}
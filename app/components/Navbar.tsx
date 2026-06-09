"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const BREEZE_GREEN = "#8DFF00";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [loggedIn, setLoggedIn] =
    useState(false);

  const [isAdmin, setIsAdmin] =
    useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoggedIn(false);
      setIsAdmin(false);
      return;
    }

    setLoggedIn(true);

    const { data: member } =
      await supabase
        .from("members")
        .select("role")
        .eq(
          "auth_user_id",
          user.id
        )
        .single();

    if (
      member?.role ===
      "admin"
    ) {
      setIsAdmin(true);
    }
  };

  const logout =
    async () => {

      await supabase.auth.signOut();

      router.push("/");

      router.refresh();
    };

  const publicNavItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/call-of-duty",
    label: "COD Tournament",
  },
  {
    href: "/cod-admin/login",
    label: "COD Admin",
  },
  {
    href: "/tiktok-stars",
    label: "TikTok Stars",
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

  const memberNavItems = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/portal",
      label: "Portal",
    },
    {
      href: "/prized-pets",
      label: "Prized Pets",
    },
    {
      href: "/achievements",
      label: "Achievements",
    },
    {
      href: "/leaderboard",
      label: "Leaderboard",
    },
    {
      href: "/profile",
      label: "Profile",
    },
    {
      href: "/tiktok-stars",
      label: "TikTok Stars",
    },
  ];

  const navItems =
    loggedIn
      ? memberNavItems
      : publicNavItems;

  if (
    loggedIn &&
    isAdmin
  ) {
    navItems.splice(
      2,
      0,
      {
        href:
          "/cod-admin",
        label:
          "COD Admin",
      }
    );
  }  return (
    <header className="fixed top-0 left-0 w-full z-50 px-2 md:px-4 pt-3">

      <div className="w-full max-w-[1400px] mx-auto rounded-[12px] border border-white/10 bg-black/90 backdrop-blur-2xl">

        <div className="h-[56px] flex items-center justify-between px-4 md:px-6">

          <Link href="/" className="shrink-0">

            <img
              src="/breeze-logo-new.png"
              alt="Breeze Family"
              className="h-8 md:h-9 w-auto object-contain"
            />

          </Link>

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

              {!loggedIn ? (

                <>
                  <Link
                    href="/login"
                    onClick={() =>
                      setMobileMenuOpen(
                        false
                      )
                    }
                  >
                    <span className="uppercase tracking-[2px] font-bold text-[#8DFF00]">
                      Login
                    </span>
                  </Link>

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
                      "
                    >
                      JOIN THE FAMILY
                    </button>

                  </Link>
                </>

              ) : (

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

              )}

            </div>

          </div>

        )}

      </div>

    </header>
  );
}
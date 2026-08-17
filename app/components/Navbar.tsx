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

type AdminRole = "admin" | "super_admin" | null;

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [loggedIn, setLoggedIn] =
    useState(false);

  const [adminRole, setAdminRole] =
    useState<AdminRole>(null);

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

    if (!user) {
      setLoggedIn(false);
      setAdminRole(null);
      return;
    }

    setLoggedIn(true);

    const { data: admin } = await supabase
      .from("admin_users")
      .select("role, active")
      .eq("email", user.email)
      .maybeSingle();

    if (
      admin &&
      admin.active === true &&
      (admin.role === "admin" ||
        admin.role === "super_admin")
    ) {
      setAdminRole(admin.role);
    } else {
      setAdminRole(null);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();

    setLoggedIn(false);
    setAdminRole(null);

    router.push("/");
    router.refresh();
  };

  /*
   * =========================================================
   * PUBLIC NAVIGATION
   * =========================================================
   */

  const publicNavItems: NavItem[] = [
    {
      label: "Home",
      href: "/",
    },

    {
      label: "TikTok Stars",
      children: [
        {
          label: "TikTok Stars",
          href: "/tiktok-stars",
        },
        {
          label: "Rules",
          href: "/documents/tiktok-stars-kids-rules.pdf",
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

  /*
   * =========================================================
   * ADMIN NAVIGATION
   * =========================================================
   */

  const adminNavItems: NavItem[] = [];

  if (adminRole === "admin" || adminRole === "super_admin") {
    adminNavItems.push(
      {
        label: "TikTok Admin",
        href: "/admin/tiktok-kids",
      },
      {
        label: "Battle Judging",
        href: "/admin/tiktok-kids/battles",
      }
    );
  }

  if (adminRole === "super_admin") {
    adminNavItems.push({
      label: "Round Manager",
      href: "/admin/tiktok-kids/rounds",
    });
  }

  const isDropdownActive = (
    children: NavChild[]
  ) => {
    return children.some(
      (child) => pathname === child.href
    );
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-2 md:px-4 pt-3">

      <div className="w-full max-w-[1400px] mx-auto rounded-[12px] border border-white/10 bg-black/90 backdrop-blur-2xl">

        <div className="h-[56px] flex items-center justify-between px-4 md:px-6">

          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            href="/"
            className="shrink-0"
          >
            <img
              src="/breeze-logo-new.png"
              alt="Breeze Family"
              className="h-16 md:h-[72px] w-auto object-contain"
            />
          </Link>


          {/* =================================================
              DESKTOP NAV
          ================================================= */}

          <nav className="hidden md:flex items-center gap-6">

            {publicNavItems.map((item) => {

              if (item.children) {
                const active =
                  isDropdownActive(
                    item.children
                  );

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
                          min-w-[250px]
                          rounded-xl
                          border
                          border-white/10
                          bg-black/95
                          backdrop-blur-xl
                          overflow-hidden
                          z-50
                        "
                      >

                        {item.children.map(
                          (child) => (

                            child.href.endsWith(".pdf") ? (

                              <a
                                key={child.href}
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() =>
                                  setOpenDropdown(null)
                                }
                                className="
                                  block
                                  px-4
                                  py-3
                                  text-[11px]
                                  uppercase
                                  tracking-[2px]
                                  transition
                                  text-white/80
                                  hover:text-[#8DFF00]
                                  hover:bg-white/5
                                "
                              >
                                {child.label}
                              </a>

                            ) : (

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

                            )

                          )
                        )}

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


            {/* =================================================
                ADMIN NAVIGATION
            ================================================= */}

            {adminNavItems.length > 0 && (

              <div className="relative">

                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "Admin"
                        ? null
                        : "Admin"
                    )
                  }
                  className="
                    text-[11px]
                    uppercase
                    tracking-[2px]
                    font-black
                    whitespace-nowrap
                    text-cyan-400
                    hover:text-cyan-300
                    transition
                  "
                >
                  Admin ▼
                </button>

                {openDropdown === "Admin" && (

                  <div
                    className="
                      absolute
                      top-full
                      right-0
                      mt-2
                      min-w-[220px]
                      rounded-xl
                      border
                      border-cyan-400/20
                      bg-black/95
                      backdrop-blur-xl
                      overflow-hidden
                      z-50
                    "
                  >

                    {adminNavItems.map(
                      (child) => (

                        <Link
                          key={child.href}
                          href={child.href!}
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
                                ? "text-cyan-400 bg-white/5 font-black"
                                : "text-white/80 hover:text-cyan-400 hover:bg-white/5"
                            }
                          `}
                        >
                          {child.label}
                        </Link>

                      )
                    )}

                  </div>

                )}

              </div>

            )}

          </nav>


          {/* =================================================
              RIGHT SIDE DESKTOP
          ================================================= */}

          <div className="hidden md:flex items-center gap-3">

            {/* SOCIAL ICONS */}

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


            {/* =================================================
                ADMIN LOGIN
            ================================================= */}

            <Link href="/admin/login">

              <button
                className="
                  border
                  border-cyan-400
                  text-cyan-400
                  uppercase
                  font-black
                  tracking-[1px]
                  text-[9px]
                  px-4
                  h-[34px]
                  rounded-full
                  hover:bg-cyan-400
                  hover:text-black
                  transition
                "
              >
                ADMIN LOGIN
              </button>

            </Link>


            {/* =================================================
                MEMBER LOGIN
            ================================================= */}

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


          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            onClick={() =>
              setMobileMenuOpen(
                !mobileMenuOpen
              )
            }
            className="
              md:hidden
              text-white
              text-3xl
              font-bold
            "
          >
            ☰
          </button>

        </div>


        {/* ===================================================
            MOBILE MENU
        =================================================== */}

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


              {/* =================================================
                  PUBLIC MOBILE NAV
              ================================================= */}

              {publicNavItems.map((item) => {

                if (item.children) {

                  return (
                    <div
                      key={item.label}
                    >

                      <button
                        onClick={() =>
                          setOpenMobileDropdown(
                            openMobileDropdown ===
                              item.label
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


                      {openMobileDropdown ===
                        item.label && (

                        <div className="pl-4 pt-3 flex flex-col gap-3">

                          {item.children.map(
                            (child) => (

                              child.href.endsWith(".pdf") ? (

                                <a
                                  key={child.href}
                                  href={child.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() =>
                                    setMobileMenuOpen(
                                      false
                                    )
                                  }
                                >
                                  <span className="text-white/80">
                                    {child.label}
                                  </span>
                                </a>

                              ) : (

                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() =>
                                    setMobileMenuOpen(
                                      false
                                    )
                                  }
                                >
                                  <span
                                    className={
                                      pathname ===
                                      child.href
                                        ? "text-[#8DFF00]"
                                        : "text-white/80"
                                    }
                                  >
                                    {child.label}
                                  </span>
                                </Link>

                              )

                            )
                          )}

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
                );

              })}


              {/* =================================================
                  MOBILE ADMIN NAV
              ================================================= */}

              {adminNavItems.length > 0 && (

                <div className="border-t border-cyan-400/20 pt-5">

                  <button
                    onClick={() =>
                      setOpenMobileDropdown(
                        openMobileDropdown ===
                          "Admin"
                          ? null
                          : "Admin"
                      )
                    }
                    className="
                      w-full
                      text-left
                      uppercase
                      tracking-[2px]
                      font-black
                      text-cyan-400
                    "
                  >
                    Admin ▼
                  </button>


                  {openMobileDropdown ===
                    "Admin" && (

                    <div className="pl-4 pt-3 flex flex-col gap-3">

                      {adminNavItems.map(
                        (child) => (

                          <Link
                            key={child.href}
                            href={child.href!}
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
                                  pathname ===
                                  child.href
                                    ? "text-cyan-400"
                                    : "text-white/80"
                                }
                              `}
                            >
                              {child.label}
                            </span>
                          </Link>

                        )
                      )}

                    </div>

                  )}

                </div>

              )}


              {/* =================================================
                  MOBILE ADMIN LOGIN
              ================================================= */}

              <div className="border-t border-white/10 pt-5">

                <Link
                  href="/admin/login"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                >

                  <button
                    className="
                      w-full
                      h-[44px]
                      border
                      border-cyan-400
                      text-cyan-400
                      uppercase
                      font-black
                      rounded-full
                      hover:bg-cyan-400
                      hover:text-black
                      transition
                    "
                  >
                    ADMIN LOGIN
                  </button>

                </Link>

              </div>


              {/* =================================================
                  MOBILE MEMBER LOGIN
              ================================================= */}

              {!loggedIn ? (

                <>

                  <Link
                    href="/login"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                  >

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


                  <Link
                    href="/register"
                    onClick={() =>
                      setMobileMenuOpen(false)
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

                <>

                  <Link
                    href="/profile"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                  >

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
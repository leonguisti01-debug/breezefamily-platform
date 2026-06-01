"use client";

import { useRouter } from "next/navigation";

const BREEZE_GREEN = "#8DFF00";

export default function AdminSettingsPage() {

  const router = useRouter();

  return (

    <main
      className="
        min-h-screen
        bg-black
        text-white
        px-4
        py-20
      "
    >

      <div
        className="
          max-w-5xl
          mx-auto
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            mb-10
          "
        >

          <div>

            <p
              className="
                uppercase
                tracking-[4px]
                text-xs
              "
              style={{
                color:
                  BREEZE_GREEN,
              }}
            >
              Admin
            </p>

            <h1
              className="
                text-5xl
                md:text-7xl
                font-black
                uppercase
              "
            >
              Settings
            </h1>

          </div>

          <button
            onClick={() =>
              router.push(
                "/admin-v2"
              )
            }
            className="
              px-6
              py-4
              rounded-2xl
              font-black
              text-black
            "
            style={{
              background:
                BREEZE_GREEN,
              }}
          >
            Back
          </button>

        </div>

        <div
          className="
            grid
            md:grid-cols-2
            gap-5
          "
        >

          <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-black uppercase">
              Competition Controls
            </h2>

            <p className="mt-3 text-white/60">
              Future home for opening and closing voting,
              entries and competitions.
            </p>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-black uppercase">
              Website Controls
            </h2>

            <p className="mt-3 text-white/60">
              Future home for homepage banners,
              announcements and notices.
            </p>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-black uppercase">
              Member Controls
            </h2>

            <p className="mt-3 text-white/60">
              Future home for member management
              and permissions.
            </p>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-black uppercase">
              System Settings
            </h2>

            <p className="mt-3 text-white/60">
              Future home for platform-wide
              settings.
            </p>
          </div>

        </div>

      </div>

    </main>

  );

}
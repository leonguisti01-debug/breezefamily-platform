"use client";

export default function Background() {
  return (
    <>
      {/* Base */}
      <div className="fixed inset-0 -z-50 bg-[#050505]" />

      {/* Top glow */}
      <div className="fixed inset-0 -z-40 overflow-hidden">
        <div
          className="absolute -top-[25rem] left-1/2 h-[55rem] w-[55rem] -translate-x-1/2 rounded-full blur-[180px] opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(141,255,0,.18) 0%, rgba(141,255,0,0) 70%)",
          }}
        />
      </div>

      {/* Left ambient light */}
      <div className="fixed inset-0 -z-40 overflow-hidden">
        <div
          className="absolute top-40 -left-72 h-[38rem] w-[38rem] rounded-full blur-[170px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(141,255,0,.12) 0%, rgba(141,255,0,0) 70%)",
          }}
        />
      </div>

      {/* Right ambient light */}
      <div className="fixed inset-0 -z-40 overflow-hidden">
        <div
          className="absolute bottom-0 -right-72 h-[42rem] w-[42rem] rounded-full blur-[170px] opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(141,255,0,.10) 0%, rgba(141,255,0,0) 70%)",
          }}
        />
      </div>

      {/* Aurora beam */}
      <div className="fixed inset-0 -z-30 overflow-hidden">
        <div
          className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 opacity-30"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(141,255,0,.35), transparent)",
            filter: "blur(2px)",
          }}
        />
      </div>

      {/* Grid */}
      <div
        className="fixed inset-0 -z-20 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Noise */}
      <div
        className="fixed inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "7px 7px",
        }}
      />
    </>
  );
}
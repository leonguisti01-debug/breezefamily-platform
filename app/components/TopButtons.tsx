import Link from "next/link";

export default function TopButtons() {

  return (
    <div className="fixed top-6 left-6 right-6 z-50 flex justify-between">

      {/* HOME */}
      <Link
        href="/"
        className="px-6 py-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 hover:border-pink-500 transition font-black text-white"
      >
        HOME
      </Link>

      {/* ADMIN */}
      <Link
        href="/admin-login"
        className="px-6 py-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 hover:border-cyan-400 transition font-black text-white"
      >
        ADMIN
      </Link>

    </div>
  );
}
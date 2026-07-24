import Image from "next/image";

export default function EliminationPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto max-w-[500px] px-4 py-6">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-black">
          <div className="absolute inset-0">
            <Image
              src="/images/elimination/hero-bg.jpg"
              alt=""
              fill
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-black/45" />
          </div>

          <div className="relative px-5 py-8">
            <div className="relative h-56">
              <Image
                src="/images/elimination/glove-pink.png"
                alt="Pink Glove"
                width={180}
                height={180}
                className="absolute left-0 top-6"
              />
              <Image
                src="/images/elimination/glove-blue.png"
                alt="Blue Glove"
                width={180}
                height={180}
                className="absolute right-0 top-6"
              />
              <Image
                src="/images/elimination/vs.png"
                alt="VS"
                width={110}
                height={110}
                className="absolute left-1/2 top-14 -translate-x-1/2"
              />
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-black">ELIMINATION BATTLES</h2>
              <h1 className="mt-2 text-6xl font-black text-cyan-400">
                EPISODE 1
              </h1>
              <p className="mt-3 text-sm text-white/70">
                20 CONTESTANTS • 10 EPIC BATTLES •
                <span className="ml-2 font-bold text-pink-500">
                  ONLY 10 MOVE FORWARD
                </span>
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-3xl border border-pink-500/40 bg-[#0b0b0b] p-4">
          <div className="grid grid-cols-3 items-center">
            <div className="text-cyan-400 font-black">BATTLES GO LIVE</div>
            <div className="text-center">
              <div className="font-bold">WEDNESDAY</div>
              <div className="text-sm text-white/70">7 MAY 2026</div>
            </div>
            <div className="text-right text-2xl font-black">19:00</div>
          </div>
        </section>

        <section className="mt-8 text-center">
          <h2 className="text-3xl font-black">More coming next version…</h2>
        </section>
      </div>
    </main>
  );
}

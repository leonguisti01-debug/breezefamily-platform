export default function PWADemoPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">

      {/* Header */}
      <div className="bg-[#8DFF00] text-black p-4">
        <h1 className="text-xl font-bold">
          TikTok Stars
        </h1>
        <p className="text-sm">
          Mobile App Demo
        </p>
      </div>

      {/* Hero */}
      <section className="p-6 text-center">
        <h2 className="text-3xl font-bold mb-3">
          Season 3
        </h2>

        <p className="text-zinc-400 mb-6">
          Vote for your favourite contestant
        </p>

        <div className="bg-zinc-900 rounded-2xl p-5">
          <div className="text-4xl font-bold text-[#8DFF00]">
            R70 000
          </div>

          <div className="text-sm text-zinc-400 mt-2">
            Prize Pool
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="px-6 space-y-4">

        <button className="w-full bg-[#8DFF00] text-black font-bold py-4 rounded-xl">
          Vote Now
        </button>

        <button className="w-full bg-zinc-900 py-4 rounded-xl">
          Contestants
        </button>

        <button className="w-full bg-zinc-900 py-4 rounded-xl">
          Latest Results
        </button>

      </section>

      {/* Contestant Card */}
      <section className="p-6 flex-1">

        <div className="bg-zinc-900 rounded-2xl overflow-hidden">

          <div className="h-48 bg-zinc-800 flex items-center justify-center">
            Contestant Photo
          </div>

          <div className="p-4">
            <h3 className="font-bold text-lg">
              Jessica M
            </h3>

            <p className="text-zinc-400">
              Singer
            </p>
          </div>

        </div>

      </section>

      {/* Bottom Nav */}
      <nav className="sticky bottom-0 bg-zinc-950 border-t border-zinc-800">

        <div className="grid grid-cols-4 text-center">

          <button className="p-4 text-[#8DFF00]">
            Home
          </button>

          <button className="p-4">
            Contestants
          </button>

          <button className="p-4">
            Vote
          </button>

          <button className="p-4">
            Profile
          </button>

        </div>

      </nav>

    </main>
  );
}
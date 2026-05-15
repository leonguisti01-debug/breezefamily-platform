import Link from "next/link";
        {/* BUTTONS */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* SEASON 2 */}
          <Link
            href="/season-2-finale"
            className="group rounded-[40px] border border-cyan-500/20 bg-cyan-500/10 backdrop-blur-xl p-12 hover:-translate-y-2 hover:border-cyan-400 transition duration-300 shadow-[0_0_50px_rgba(0,255,255,0.15)]"
          >

            <div className="text-6xl mb-6">
              ⭐
            </div>

            <h2 className="text-4xl font-black text-cyan-400 leading-tight">

              TikTok Stars
              <br />
              Season 2 Finale

            </h2>

            <p className="mt-6 text-gray-300 text-lg">

              Vote for the Top 10 finalists.

            </p>

          </Link>

          {/* KIDS EDITION */}
          <Link
            href="/kids-edition"
            className="group rounded-[40px] border border-pink-500/20 bg-pink-500/10 backdrop-blur-xl p-12 hover:-translate-y-2 hover:border-pink-400 transition duration-300 shadow-[0_0_50px_rgba(255,0,150,0.15)]"
          >

            <div className="text-6xl mb-6">
              🎤
            </div>

            <h2 className="text-4xl font-black text-pink-400 leading-tight">

              TikTok Stars
              <br />
              Kids Edition

            </h2>

            <p className="mt-6 text-gray-300 text-lg">

              Entries are officially open now.

            </p>

          </Link>

        </div>

      </div>

    </main>
  );
}
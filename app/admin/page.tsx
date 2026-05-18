{/* JUDGES */}
<section className="mt-24">

  <div className="flex justify-between items-center">

    <h2 className="text-4xl font-black uppercase">
      Fan Favorite Judges
    </h2>

    <button
      onClick={
        resetJudgeVotes
      }
      className="px-6 py-4 rounded-2xl bg-pink-500 text-white font-black uppercase"
    >
      Reset Judge Votes
    </button>

  </div>

  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

    {judges.map(
      (judge) => (
        <div
          key={judge.id}
          className="rounded-3xl overflow-hidden bg-white/5 border border-white/10"
        >

          {/* VIDEO / IMAGE */}
          <div className="w-full bg-black overflow-hidden">

            {judge.video_url ? (

              <video
                src={
                  judge.video_url
                }
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full h-auto max-h-[750px] object-contain"
              />

            ) : judge.image_url ? (

              <img
                src={
                  judge.image_url
                }
                alt={
                  judge.name
                }
                className="w-full aspect-square object-cover"
              />

            ) : (

              <div className="w-full aspect-square bg-black flex items-center justify-center text-white/30">
                No Media
              </div>

            )}

          </div>

          <div className="p-6">

            <h3 className="text-3xl font-black uppercase">
              {judge.name}
            </h3>

            <p className="mt-3 text-pink-300 font-bold">
              Votes:
              {" "}
              {
                judge.votes || 0
              }
            </p>

            {/* UPLOAD PHOTO */}
            <label className="mt-6 block">

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  uploadJudgeImage(
                    e,
                    judge.id
                  )
                }
                className="hidden"
              />

              <div className="cursor-pointer py-3 rounded-2xl bg-white text-black text-center font-black uppercase">
                Upload Photo
              </div>

            </label>

            <div className="mt-6 grid gap-3">

              <button
                onClick={() =>
                  updateJudgeStatus(
                    judge.id,
                    "safe",
                    false
                  )
                }
                className="py-3 rounded-2xl bg-green-500"
              >
                Safe
              </button>

              <button
                onClick={() =>
                  updateJudgeStatus(
                    judge.id,
                    "eliminated",
                    true
                  )
                }
                className="py-3 rounded-2xl bg-red-500"
              >
                Eliminated
              </button>

              <button
                onClick={() =>
                  updateJudgeStatus(
                    judge.id,
                    "re-instated",
                    false
                  )
                }
                className="py-3 rounded-2xl bg-cyan-500"
              >
                Re-Instated
              </button>

              <button
                onClick={() =>
                  updateJudgeStatus(
                    judge.id,
                    "disqualified",
                    true
                  )
                }
                className="py-3 rounded-2xl bg-pink-500"
              >
                Disqualified
              </button>

            </div>

          </div>

        </div>
      )
    )}

  </div>

</section>
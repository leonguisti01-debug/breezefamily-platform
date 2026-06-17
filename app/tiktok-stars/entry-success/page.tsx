export default function EntrySuccessPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-5">

      <div className="max-w-2xl w-full text-center rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-10">

        <div className="w-24 h-24 mx-auto rounded-full bg-pink-500 flex items-center justify-center text-5xl font-black">
          ✓
        </div>

        <h1
          className="mt-8 uppercase italic font-black"
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "clamp(60px,8vw,100px)",
            lineHeight: "0.9",
          }}
        >
          ENTRY
          <span className="block text-cyan-400">
            RECEIVED
          </span>
        </h1>

        <p className="mt-6 text-white/70 text-lg">
          Thank you for entering
          TikTok Stars Season 2 - Kids Edition.
        </p>

        <p className="mt-4 text-white/50">
          Your entry has been successfully submitted
          and is now awaiting review.
        </p>

        <a
          href="/tiktok-stars"
          className="inline-block mt-10 px-8 py-4 rounded-2xl bg-pink-500 font-black uppercase"
        >
          Return Home
        </a>

      </div>

    </main>
  );
}
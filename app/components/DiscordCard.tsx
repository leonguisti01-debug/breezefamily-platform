export default function DiscordCard() {
  return (
    <div className="bg-white/5 border border-[#8DFF00]/20 rounded-[28px] p-8">

      <h3 className="text-2xl font-black mb-2">
        💬 Discord Hub
      </h3>

      <p className="text-white/60 mb-5">
        Join the conversation and stay connected with the family.
      </p>

      <a
        href="https://discord.gg/cKbz3nQDV"
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-block
          px-6
          py-3
          rounded-full
          bg-[#8DFF00]
          text-black
          font-black
        "
      >
        JOIN DISCORD
      </a>

    </div>
  );
}
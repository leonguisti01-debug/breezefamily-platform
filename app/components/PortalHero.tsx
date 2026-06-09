export default function PortalHero({
  memberName,
}: {
  memberName: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-[#8DFF00]/20 mb-8">

      <img
        src="/portal_main.jpg"
        alt="Portal Banner"
        className="w-full h-[250px] md:h-[420px] object-cover"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute inset-0 flex items-center">

        <div className="p-8 md:p-12">

          <p className="uppercase tracking-[4px] text-[#8DFF00] text-sm font-bold">
            The Breeze Family
          </p>

          <h1 className="text-4xl md:text-7xl font-black uppercase mt-2">
            Welcome Back
          </h1>

          <h2 className="text-2xl md:text-5xl font-black text-[#8DFF00] mt-2">
            {memberName}
          </h2>

          <p className="text-white/70 mt-4 max-w-xl">
            Home of tournaments, family, rewards,
            community events and everything Breeze.
          </p>

        </div>

      </div>

    </div>
  );
}
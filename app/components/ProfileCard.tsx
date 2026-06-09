export default function ProfileCard({
  memberName,
}: {
  memberName: string;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-[28px] p-8">

      <div className="flex items-center gap-5">

        <div className="w-24 h-24 rounded-full bg-[#8DFF00]/20 border border-[#8DFF00]/30 flex items-center justify-center text-4xl font-black text-[#8DFF00]">

          {memberName?.charAt(0)}

        </div>

        <div>

          <p className="text-white/50 uppercase text-sm">
            Breeze Family Member
          </p>

          <h3 className="text-2xl font-black">
            {memberName}
          </h3>

          <p className="text-white/50">
            Level 1 Member
          </p>

        </div>

      </div>

      <div className="mt-6">

        <button
          className="
            px-5
            py-3
            rounded-full
            bg-[#8DFF00]
            text-black
            font-black
          "
        >
          EDIT PROFILE
        </button>

      </div>

    </div>
  );
}
import { useRouter } from "next/navigation";

export default function QuickLinks() {
  const router = useRouter();

  return (
    <div>

      <h3 className="text-2xl font-black mb-6">
        Quick Access
      </h3>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <LinkCard
          title="Prized Pets"
          icon="🐾"
          onClick={() => router.push("/prized-pets")}
        />

        <LinkCard
          title="Family Members"
          icon="👨‍👩‍👧"
          onClick={() => router.push("/family-members")}
        />

        <LinkCard
          title="TikTok Stars"
          icon="⭐"
          onClick={() => router.push("/tiktok-stars")}
        />

        <LinkCard
          title="Kill Of The Week"
          icon="🎬"
          onClick={() => router.push("/kill-of-the-week")}
        />

      </div>

    </div>
  );
}

function LinkCard({
  title,
  icon,
  onClick,
}: {
  title: string;
  icon: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer
        rounded-[24px]
        bg-white/5
        border
        border-white/10
        p-6
        hover:border-[#8DFF00]
        transition
      "
    >
      <div className="text-4xl mb-3">
        {icon}
      </div>

      <h4 className="font-black">
        {title}
      </h4>
    </div>
  );
}
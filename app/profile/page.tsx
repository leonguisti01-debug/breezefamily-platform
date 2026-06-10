"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const BREEZE_GREEN = "#8DFF00";

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [discord, setDiscord] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [favoriteGame, setFavoriteGame] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [rank, setRank] = useState("BRONZE");
const [points, setPoints] = useState(0);
const [streak, setStreak] = useState(0);

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("members")
        .select("*")
        .eq("auth_user_id", user.id)
        .single();

      if (data) {
  setFullName(data.full_name || "");
  setBio(data.bio || "");
  setDiscord(data.discord_username || "");
  setTiktok(data.tiktok_username || "");
  setFavoriteGame(data.favorite_game || "");
  setAvatarUrl(data.avatar_url || "");

  setRank(data.rank || "BRONZE");
  setPoints(data.breeze_points || 0);
  setStreak(data.login_streak || 0);
}

      setLoading(false);
    };

    loadProfile();
  }, [router]);

  const uploadAvatar = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setUploading(true);

      const file = event.target.files?.[0];

      if (!file) {
        setUploading(false);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const fileExt =
        file.name.split(".").pop();

      const fileName =
        `${user.id}.${fileExt}`;

      const filePath =
        fileName;

      await supabase.storage
        .from("avatars")
        .upload(
          filePath,
          file,
          {
            upsert: true,
          }
        );

      const {
        data: publicUrlData,
      } = supabase.storage
        .from("avatars")
        .getPublicUrl(
          filePath
        );

      const publicUrl =
        publicUrlData.publicUrl;

      setAvatarUrl(
        publicUrl
      );

      await supabase
        .from("members")
        .update({
          avatar_url:
            publicUrl,
        })
        .eq(
          "auth_user_id",
          user.id
        );

      alert(
        "Profile photo uploaded!"
      );

    } catch (error) {

      console.error(
        error
      );

      alert(
        "Upload failed."
      );

    }

    setUploading(false);
  };

  const saveProfile =
    async () => {

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      await supabase
        .from("members")
        .update({
          bio,
          discord_username:
            discord,
          tiktok_username:
            tiktok,
          favorite_game:
            favoriteGame,
        })
        .eq(
          "auth_user_id",
          user.id
        );

      alert(
        "Profile Saved"
      );

    };
const getRankImage = () => {
  switch (rank?.toUpperCase()) {
    case "LEGEND":
      return "/ranks/legend.png";
    case "PLATINUM":
      return "/ranks/platinum.png";
    case "GOLD":
      return "/ranks/gold.png";
    case "SILVER":
      return "/ranks/silver.png";
    default:
      return "/ranks/bronze.png";
  }
};
  if (loading) {

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );

  }

  return (
    <main
      className="
        min-h-screen
        text-white
        px-4
        md:px-8
        py-8
      "
      style={{
        background:
          "radial-gradient(circle at top, rgba(141,255,0,0.10), #000 50%)",
      }}
    >
      <div className="max-w-4xl mx-auto">
<div
  className="
    rounded-[32px]
    border
    border-[#8DFF00]/20
    bg-white/5
    p-8
    mb-6
  "
>
  <div className="text-center">

    <img
      src={getRankImage()}
      alt={rank}
      className="
        w-[220px]
        mx-auto
        mb-4
      "
    />

    <h1
      className="
        text-4xl
        md:text-6xl
        font-black
        uppercase
        text-white
      "
    >
      {fullName}
    </h1>

    <div
      className="
        text-[#8DFF00]
        text-2xl
        font-bold
        uppercase
        mt-2
      "
    >
      {rank}
    </div>

    <div
      className="
        text-6xl
        font-black
        mt-6
      "
    >
      {points}
    </div>

    <div className="text-white/50">
      Breeze Points
    </div>

    <div
      className="
        mt-6
        inline-block
        px-6
        py-3
        rounded-full
        bg-[#8DFF00]/10
        border
        border-[#8DFF00]/20
      "
    >
      Login Streak: {streak} Days
    </div>

  </div>
</div>
        <div className="mb-8">

          <button
            onClick={() =>
              router.push(
                "/portal"
              )
            }
            className="
              px-5
              py-3
              rounded-full
              bg-white/10
              border
              border-white/10
            "
          >
            ← Back To Portal
          </button>

        </div>

        <div
          className="
            rounded-[32px]
            border
            border-[#8DFF00]/20
            bg-white/5
            p-8
          "
        >

          <div
            className="
              flex
              flex-col
              md:flex-row
              gap-8
              items-center
              mb-8
            "
          >            <div>

              {avatarUrl ? (

                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="
                    w-32
                    h-32
                    rounded-full
                    object-cover
                    border
                    border-[#8DFF00]/40
                  "
                />

              ) : (

                <div
                  className="
                    w-32
                    h-32
                    rounded-full
                    bg-[#8DFF00]/20
                    border
                    border-[#8DFF00]/30
                    flex
                    items-center
                    justify-center
                    text-5xl
                    font-black
                    text-[#8DFF00]
                  "
                >
                  {fullName?.charAt(0)}
                </div>

              )}

            </div>

            <div className="flex-1">

              <h1 className="text-4xl font-black">
                {fullName}
              </h1>

              <p className="text-white/50 mb-4">
                Breeze Family Member
              </p>

              <label
                className="
                  inline-block
                  px-5
                  py-3
                  rounded-full
                  bg-[#8DFF00]
                  text-black
                  font-black
                  cursor-pointer
                "
              >
                {uploading
                  ? "UPLOADING..."
                  : "UPLOAD PHOTO"}

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    uploadAvatar
                  }
                  className="hidden"
                />
              </label>

            </div>

          </div>

          <div className="space-y-6">

            <div>

              <label className="block text-sm text-white/60 mb-2">
                Bio
              </label>

              <textarea
                value={bio}
                onChange={(e) =>
                  setBio(
                    e.target.value
                  )
                }
                rows={4}
                className="
                  w-full
                  rounded-[20px]
                  bg-black/40
                  border
                  border-white/10
                  p-4
                "
              />

            </div>

            <div>

              <label className="block text-sm text-white/60 mb-2">
                Discord Username
              </label>

              <input
                value={discord}
                onChange={(e) =>
                  setDiscord(
                    e.target.value
                  )
                }
                className="
                  w-full
                  rounded-[20px]
                  bg-black/40
                  border
                  border-white/10
                  p-4
                "
              />

            </div>

            <div>

              <label className="block text-sm text-white/60 mb-2">
                TikTok Username
              </label>

              <input
                value={tiktok}
                onChange={(e) =>
                  setTiktok(
                    e.target.value
                  )
                }
                className="
                  w-full
                  rounded-[20px]
                  bg-black/40
                  border
                  border-white/10
                  p-4
                "
              />

            </div>

            <div>

              <label className="block text-sm text-white/60 mb-2">
                Favourite Game
              </label>

              <input
                value={favoriteGame}
                onChange={(e) =>
                  setFavoriteGame(
                    e.target.value
                  )
                }
                className="
                  w-full
                  rounded-[20px]
                  bg-black/40
                  border
                  border-white/10
                  p-4
                "
              />

            </div>

            <button
              onClick={
                saveProfile
              }
              className="
                px-8
                py-4
                rounded-full
                font-black
                text-black
              "
              style={{
                background:
                  BREEZE_GREEN,
              }}
            >
              SAVE PROFILE
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}
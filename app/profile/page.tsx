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

      const { data, error } = await supabase.storage
  .from("avatars")
  .upload(filePath, file, {
    upsert: true,
  });

console.log("UPLOAD DATA", data);
console.log("UPLOAD ERROR", error);

if (error) {
  alert(error.message);
  throw error;
}

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
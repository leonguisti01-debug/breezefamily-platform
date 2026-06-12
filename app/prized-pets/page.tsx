"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PrizedPetsPage() {
  const router = useRouter();

  const [member, setMember] =
    useState<any>(null);

  const [entries, setEntries] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [entriesLoading,
    setEntriesLoading] =
    useState(true);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const [petName, setPetName] =
    useState("");

  const [petPhoto,
    setPetPhoto] =
    useState<File | null>(
      null
    );

  const [selectedImage,
    setSelectedImage] =
    useState<any | null>(
      null
    );

const [showKentModal,
  setShowKentModal] =
  useState(false);

  const [winner, setWinner] =
  useState<any>(null);

const [silver, setSilver] =
  useState<any>(null);

const [bronze, setBronze] =
  useState<any>(null);

  useEffect(() => {
  loadMember();
  fetchEntries();
}, []);

  const loadMember =
    async () => {

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const {
        data: memberData,
      } =
        await supabase
          .from("members")
          .select("*")
          .eq(
            "auth_user_id",
            user.id
          )
          .single();

      if (!memberData) {
        router.push("/portal");
        return;
      }

      setMember(
        memberData
      );
    };

  const fetchEntries =
    async () => {

      setEntriesLoading(
        true
      );
      const loadWinners =
  async () => {

    const { data } =
      await supabase
        .from(
          "pet_weekly_winners"
        )
        .select("*")
        .order(
          "week_number",
          {
            ascending:
              false,
          }
        );

    if (!data?.length)
      return;

    setWinner(
      data.find(
        (x) =>
          x.position ===
          "winner"
      )
    );

    setSilver(
      data.find(
        (x) =>
          x.position ===
          "runner_up"
      )
    );

    setBronze(
      data.find(
        (x) =>
          x.position ===
          "third_place"
      )
    );
  };

      const { data } =
        await supabase
          .from(
            "prized_pets_entries"
          )
          .select("*")
          .order(
            "created_at",
            {
              ascending:
                false,
            }
          );

      setEntries(
        data || []
      );

      setEntriesLoading(
        false
      );
    };

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      if (
        !member ||
        !petPhoto
      ) {
        return;
      }

      setLoading(true);
      setError("");
      setSuccess("");

      const fileName =
        `${Date.now()}-${petPhoto.name}`;

      const {
        error:
          uploadError,
      } =
        await supabase.storage
          .from(
            "prized-pets"
          )
          .upload(
            fileName,
            petPhoto
          );

      if (
        uploadError
      ) {

        setError(
          uploadError.message
        );

        setLoading(
          false
        );

        return;
      }

      const {
        data: {
          publicUrl,
        },
      } =
        supabase.storage
          .from(
            "prized-pets"
          )
          .getPublicUrl(
            fileName
          );

      const {
        error:
          insertError,
      } =
        await supabase
          .from(
            "prized_pets_entries"
          )
          .insert([
            {
              member_id:
                member.id,
              name:
                member.full_name,
              pet_name:
                petName,
              photo_url:
                publicUrl,
            },
          ]);

      if (
        insertError
      ) {

        setError(
          insertError.message
        );

        setLoading(
          false
        );

        return;
      }

      const {
        data:
          petAchievement,
      } =
        await supabase
          .from(
            "achievements"
          )
          .select("*")
          .eq(
            "badge_name",
            "Pet Lover"
          )
          .single();

      if (
        petAchievement
      ) {

        const {
          data:
            existing,
        } =
          await supabase
            .from(
              "member_achievements"
            )
            .select("*")
            .eq(
              "member_id",
              member.id
            )
            .eq(
              "achievement_id",
              petAchievement.id
            );

        if (
          !existing ||
          existing.length === 0
        ) {

          await supabase
            .from(
              "member_achievements"
            )
            .insert({
              member_id:
                member.id,
              achievement_id:
                petAchievement.id,
            });

        }
      }

      await supabase
        .from(
          "activity_feed"
        )
        .insert({
          member_id:
            member.id,
          activity_type:
            "pet_entry",
          activity_text:
            `${member.full_name} entered a pet into Prized Pets`,
        });

      setSuccess(
        "Pet submitted successfully!"
      );

      setPetName("");
      setPetPhoto(null);

      fetchEntries();

      setLoading(false);
    };  return (
    <main
      className="min-h-screen bg-black text-white px-4 py-24"
      style={{
        background:
          "radial-gradient(circle at top, rgba(141,255,0,0.10), #000 50%)",
      }}
    >
      <div className="max-w-7xl mx-auto">

        <div className="mb-10 text-center">

          <h1 className="text-5xl md:text-6xl font-black mb-4">
            🐾 PRIZED PETS
          </h1>

          <p className="text-white/60">
            Share your favourite companion with the Breeze Family.
          </p>

        </div>

        <div className="max-w-2xl mx-auto mb-12">

          <div className="rounded-[32px] border border-[#8DFF00]/20 bg-white/5 p-8">

            <div className="mb-6">

              <p className="text-white/50 text-sm">
                Logged in as
              </p>

              <h2 className="text-2xl font-black text-[#8DFF00]">
                {member?.full_name}
              </h2>

            </div>

            {success && (
              <div className="mb-4 p-4 rounded-2xl bg-[#8DFF00]/20 border border-[#8DFF00]/30">
                {success}
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 rounded-2xl bg-red-500/20 border border-red-500/30">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <input
                type="text"
                required
                placeholder="Pet Name"
                value={petName}
                onChange={(e) =>
                  setPetName(
                    e.target.value
                  )
                }
                className="
                  w-full
                  p-4
                  rounded-2xl
                  bg-black/40
                  border
                  border-white/10
                "
              />

              <input
                type="file"
                required
                accept="image/*"
                onChange={(e) =>
                  setPetPhoto(
                    e.target.files?.[0] ||
                      null
                  )
                }
                className="
                  w-full
                  p-4
                  rounded-2xl
                  bg-black/40
                  border
                  border-white/10
                "
              />

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  py-4
                  rounded-2xl
                  bg-[#8DFF00]
                  text-black
                  font-black
                  uppercase
                "
              >
                {loading
                  ? "Submitting..."
                  : "Submit Pet"}
              </button>

            </form>

          </div>

        </div>
        <div className="text-center mb-10">

  <button
    onClick={() =>
      setShowKentModal(
        true
      )
    }
    className="
      px-10
      py-5
      rounded-full
      bg-[#8DFF00]
      text-black
      text-2xl
      font-black
    "
  >
    KOM ONS DOEN DIT!!
  </button>

</div>

        <div className="mb-8">

          <h2 className="text-4xl font-black">
            Latest Pets
          </h2>

        </div>

        {entriesLoading ? (

          <div className="text-center text-white/50">
            Loading pets...
          </div>

        ) : entries.length === 0 ? (

          <div className="text-center text-white/50">
            No pets submitted yet.
          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {entries.map((pet) => (

              <div
                key={pet.id}
                className="
                  rounded-[28px]
                  overflow-hidden
                  border
                  border-white/10
                  bg-white/5
                "
              >

                <button
                  onClick={() =>
                    setSelectedImage(
                      pet
                    )
                  }
                  className="w-full"
                >

                  <img
                    src={pet.photo_url}
                    alt={pet.pet_name}
                    className="
                      w-full
                      h-[320px]
                      object-cover
                    "
                  />

                </button>

                <div className="p-5">

                  <h3 className="text-2xl font-black">
                    {pet.pet_name}
                  </h3>

                  <p className="text-white/60 mt-2">
                    Owner: {pet.name}
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

        {selectedImage && (

          <div
            className="
              fixed
              inset-0
              bg-black/90
              z-[999]
              flex
              items-center
              justify-center
              p-4
            "
            onClick={() =>
              setSelectedImage(
                null
              )
            }
          >

            <div className="max-w-5xl w-full">

              <img
                src={
                  selectedImage.photo_url
                }
                alt={
                  selectedImage.pet_name
                }
                className="
                  w-full
                  max-h-[85vh]
                  object-contain
                  rounded-3xl
                "
              />

              <div className="text-center mt-4">

                <h3 className="text-3xl font-black">
                  {
                    selectedImage.pet_name
                  }
                </h3>

                <p className="text-white/60">
                  Owner:{" "}
                  {
                    selectedImage.name
                  }
                </p>

              </div>

            </div>

          </div>

        )}

      </div>
{showKentModal && (

  <div
    className="
      fixed
      inset-0
      bg-black/90
      z-[9999]
      flex
      items-center
      justify-center
      p-4
    "
  >

    <div
      className="
        max-w-md
        w-full
        rounded-[32px]
        bg-[#111]
        border
        border-[#8DFF00]/20
        p-8
        text-center
      "
    >

      <h2 className="text-3xl font-black mb-4">
        ARE YOU REALLY KENT?
      </h2>

      <p className="text-white/60 mb-8">
        This area is for the official Pet Draw.
      </p>

      <div className="flex gap-4">

        <button
          onClick={() =>
            setShowKentModal(
              false
            )
          }
          className="
            flex-1
            py-4
            rounded-full
            bg-white/10
          "
        >
          NO
        </button>

        <button
          onClick={() =>
            router.push(
              "/pets-draw-login"
            )
          }
          className="
            flex-1
            py-4
            rounded-full
            bg-[#8DFF00]
            text-black
            font-black
          "
        >
          YES
        </button>

      </div>

    </div>

  </div>

)}
    </main>
  );
}
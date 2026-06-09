"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import HallOfFame from "./components/HallOfFame";

const BREEZE_GREEN = "#8DFF00";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PrizedPetsPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [entriesLoading,
    setEntriesLoading] =
    useState(true);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const [entries, setEntries] =
    useState<any[]>([]);

  const [winners, setWinners] =
    useState<any[]>([]);

  const [selectedImage,
    setSelectedImage] =
    useState<any | null>(
      null
    );

  const [member,
    setMember] =
    useState<any | null>(
      null
    );

  const [petName,
    setPetName] =
    useState("");

  const [petPhoto,
    setPetPhoto] =
    useState<File | null>(
      null
    );

  useEffect(() => {
    loadMember();
    fetchEntries();
    fetchWinners();
  }, []);

  const loadMember =
    async () => {

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

        console.log("USER", user);

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

      if (
        !memberData
      ) {
        router.push("/portal");
        return;
      }

      setMember(
        memberData
      );
    };

  const fetchEntries =
    async () => {

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

      if (data) {
        setEntries(data);
      }

      setEntriesLoading(
        false
      );
    };

  const fetchWinners =
    async () => {

      const { data } =
        await supabase
          .from(
            "prized_pets_winners"
          )
          .select("*")
          .order(
            "created_at",
            {
              ascending:
                false,
            }
          );

      if (data) {
        setWinners(data);
      }
    };

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      if (!member) {
        alert(
          "Please login."
        );
        return;
      }

      setLoading(true);
      setError("");
      setSuccess("");

      let photoUrl = "";

      if (petPhoto) {

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

        photoUrl =
          publicUrl;
      }

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
                photoUrl,
              created_at:
                new Date().toISOString(),
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
          .single();      if (
        petAchievement
      ) {

        const {
          data:
            existingBadge,
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
          !existingBadge ||
          existingBadge.length === 0
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
        "Your pet has officially been entered into Prized Pets!"
      );

      setPetName("");
      setPetPhoto(null);

      setLoading(false);

      fetchEntries();
    };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-x-hidden">

      <HallOfFame />

      <section className="relative z-20 px-4 pt-16">

        <div className="max-w-3xl mx-auto">

          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[34px] p-5">

            <div className="mb-6">

              <p className="text-white/50 text-sm">
                Logged in as
              </p>

              <h2 className="text-3xl font-black text-[#8DFF00]">
                {member?.full_name}
              </h2>

            </div>

            {success && (
              <div className="mb-4 p-4 rounded-xl bg-[#8DFF00]/20 border border-[#8DFF00]/30">
                {success}
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 rounded-xl bg-red-500/20 border border-red-500/30">
                {error}
              </div>
            )}

            <form
              onSubmit={
                handleSubmit
              }
              className="mt-8 space-y-4"
            >

              <input
                type="text"
                required
                placeholder="Pet Name"
                value={petName}
                onChange={(
                  e
                ) =>
                  setPetName(
                    e.target.value
                  )
                }
                className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10"
              />

              <input
                type="file"
                accept="image/*"
                required
                onChange={(
                  e
                ) =>
                  setPetPhoto(
                    e.target
                      .files?.[0] ||
                      null
                  )
                }
                className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10"
              />

              <button
                type="submit"
                disabled={
                  loading
                }
                className="w-full py-4 rounded-2xl bg-[#8DFF00] text-black font-black uppercase tracking-[4px]"
              >
                {loading
                  ? "Submitting..."
                  : "Submit Entry"}
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* KEEP THE REST OF YOUR EXISTING GALLERY, MODAL AND HALL OF FAME CODE EXACTLY AS IT IS BELOW THIS POINT */}

    </main>
  );
}
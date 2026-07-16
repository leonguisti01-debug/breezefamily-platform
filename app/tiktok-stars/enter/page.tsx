"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const PINK = "#ec4899";
const CYAN = "#22d3ee";
const ENTRIES_CLOSE_DATE = new Date("2026-07-19T12:00:00+02:00");

export default function TikTokStarsEntryPage() {
  const router = useRouter();
  const entriesClosed =
  new Date() >= ENTRIES_CLOSE_DATE;

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [photo, setPhoto] = useState<File | null>(null);

  const [form, setForm] = useState({
    full_name: "",
    age: "",
    talent_category: "Singing",
    tiktok_username: "",

    parent_full_name: "",
    parent_id_number: "",
    parent_phone: "",
    parent_email: "",

    guardian_consent: false,
    popia_accepted: false,
    media_release: false,
    indemnity_accepted: false,
  });

  const updateField = (
    field: string,
    value: any
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = () => {
    setError("");

    if (step === 1) {
      if (
        !form.full_name ||
        !form.age ||
        !form.talent_category
      ) {
        setError(
          "Please complete all contestant details."
        );
        return;
      }

      if (!photo) {
        setError(
          "Please upload a contestant photo."
        );
        return;
      }

      setStep(2);
      return;
    }

    if (step === 2) {
      if (
        !form.parent_full_name ||
        !form.parent_id_number ||
        !form.parent_phone ||
        !form.parent_email
      ) {
        setError(
          "Please complete all parent details."
        );
        return;
      }

      setStep(3);
    }
  };

  const previousStep = () => {
    setError("");
    setStep((s) => s - 1);
  };

  const submitEntry = async () => {
    try {
      setLoading(true);
      setError("");

      if (
        !form.guardian_consent ||
        !form.popia_accepted ||
        !form.media_release ||
        !form.indemnity_accepted
      ) {
        throw new Error(
          "Please accept all declarations before submitting."
        );
      }

      if (!photo) {
        throw new Error(
          "Contestant photo is required."
        );
      }

      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
      ];

      if (
        !allowedTypes.includes(photo.type)
      ) {
        throw new Error(
          "Only JPG/JPEG files are allowed."
        );
      }

      if (
        photo.size >
        2 * 1024 * 1024
      ) {
        throw new Error(
          "Photo must be under 2MB."
        );
      }

// duplicate check

const { data: existingContestant } =
  await supabase
    .from("contestants")
    .select("id")
    .eq("parent_phone", form.parent_phone.trim())
    .eq("full_name", form.full_name.trim())
    .maybeSingle();

if (existingContestant) {
  throw new Error(
    "An entry has already been submitted for this contestant using this cellphone number."
  );
}
      const fileName =
        `${Date.now()}-${photo.name}`;

      const {
        error: uploadError,
      } = await supabase.storage
        .from("contestant-photos")
        .upload(fileName, photo);

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("contestant-photos")
        .getPublicUrl(fileName);

        const { error: insertError } =
  await supabase
    .from("contestants")
    .insert([
      {
        full_name: form.full_name,

        age: form.age,

        talent_category:
          form.talent_category,

        tiktok_username:
          form.tiktok_username,

        photo_url:
          publicUrl,

        parent_full_name:
          form.parent_full_name,

        parent_id_number:
          form.parent_id_number,

        parent_phone:
          form.parent_phone,

        parent_email:
          form.parent_email,

        guardian_consent:
          form.guardian_consent,

        popia_accepted:
          form.popia_accepted,

        media_release:
          form.media_release,

        indemnity_accepted:
          form.indemnity_accepted,

        status: "approved",

audition_status:
  "waiting",
      },
    ]);

if (insertError) {
  throw insertError;
}

await supabase
  .from("contestants")
  .update({
    status: "approved",
  })
  .eq(
    "photo_url",
    publicUrl
  );
await fetch("/api/discord", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    full_name: form.full_name,
    age: form.age,
    talent_category:
      form.talent_category,
    tiktok_username:
      form.tiktok_username,
    parent_phone:
      form.parent_phone,
    photo_url: publicUrl,
    status: "approved",
  }),
});
      router.push(
        "/tiktok-stars/entry-success"
      );
    } catch (err: any) {
      setError(
        err.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  if (entriesClosed) {
  return (
    <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-6">

      <div className="max-w-2xl text-center">

        <div className="text-8xl mb-8">
          🔒
        </div>

        <h1 className="text-6xl font-black text-pink-500 uppercase">
          Entries Closed
        </h1>

        <p className="mt-8 text-2xl text-white/80">
          Entries for TikTok Stars Kids Edition have now closed.
        </p>

        <p className="mt-4 text-white/50">
          Thank you to every contestant and family who entered.
          Successful contestants will be contacted soon.
        </p>

      </div>

    </main>
  );
}
  return (
    
    <main className="min-h-screen bg-[#050816] text-white">

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">

        <div className="absolute top-20 left-[-120px] w-[320px] h-[320px] rounded-full bg-pink-500/20 blur-[120px]" />

        <div className="absolute top-40 right-[-120px] w-[320px] h-[320px] rounded-full bg-cyan-500/20 blur-[120px]" />

      </div>

      <section className="relative z-20 px-5 py-20">

        <div className="max-w-3xl mx-auto">

          <div className="text-center">

            <p className="uppercase tracking-[5px] text-cyan-400 text-xs font-black">
              TikTok Stars Season 2
            </p>

            <h1
              className="mt-4 uppercase italic font-black leading-none"
              style={{
                fontFamily:
                  "Bebas Neue, sans-serif",
                fontSize:
                  "clamp(60px,9vw,120px)",
              }}
            >
              KIDS
              <span className="block text-pink-500">
                EDITION
              </span>
            </h1>

            <p className="mt-4 text-white/70">
              Complete the entry form
              below to enter the
              competition.
            </p>

          </div>

          <div className="mt-10 flex items-center justify-center gap-3">

            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-black ${
                step >= 1
                  ? "bg-pink-500"
                  : "bg-white/10"
              }`}
            >
              1
            </div>

            <div className="w-12 h-1 bg-white/20" />

            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-black ${
                step >= 2
                  ? "bg-cyan-500"
                  : "bg-white/10"
              }`}
            >
              2
            </div>

            <div className="w-12 h-1 bg-white/20" />

            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-black ${
                step >= 3
                  ? "bg-pink-500"
                  : "bg-white/10"
              }`}
            >
              3
            </div>

          </div>

          <div className="mt-10 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-10">

              <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
                {error}
              </div>

            {/* STEP 1 */}

            {step === 1 && (
              <div className="space-y-5">

                <h2 className="text-3xl font-black uppercase">
                  Contestant Details
                </h2>

                <input
                  type="text"
                  placeholder="Contestant Full Name"
                  value={form.full_name}
                  onChange={(e) =>
                    updateField(
                      "full_name",
                      e.target.value
                    )
                  }
                  className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10"
                />

                <input
                  type="number"
                  min="2"
                  max="17"
                  placeholder="Age"
                  value={form.age}
                  onChange={(e) =>
                    updateField(
                      "age",
                      e.target.value
                    )
                  }
                  className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10"
                />

                <select
                  value={
                    form.talent_category
                  }
                  onChange={(e) =>
                    updateField(
                      "talent_category",
                      e.target.value
                    )
                  }
                  className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10"
                >
                  <option>Singing</option>
                  <option>Dancing</option>
                  <option>Comedy</option>
                  <option>Acting</option>
                  <option>Magic</option>
                  <option>Instrumental</option>
                  <option>Art</option>
                  <option>Poetry</option>
                  <option>Other</option>
                </select>

                <input
                  type="text"
                  placeholder="@TikTok Username"
                  value={
                    form.tiktok_username
                  }
                  onChange={(e) =>
                    updateField(
                      "tiktok_username",
                      e.target.value
                    )
                  }
                  className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10"
                />

                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">

                  <label className="block mb-3 text-sm font-black uppercase text-cyan-400">
                    Contestant Photo *
                  </label>

                  <input
                    type="file"
                    accept=".jpg,.jpeg,image/jpeg"
                    onChange={(e) =>
                      setPhoto(
                        e.target
                          .files?.[0] || null
                      )
                    }
                    className="w-full"
                  />

                  <p className="mt-3 text-sm text-white/50">
                    JPG / JPEG only.
                    Maximum size 2MB.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full py-5 rounded-2xl font-black uppercase text-black"
                  style={{
                    background: PINK,
                  }}
                >
                  Next Step
                </button>

              </div>
            )}

            {/* STEP 2 */}

            {step === 2 && (
              <div className="space-y-5">

                <h2 className="text-3xl font-black uppercase">
                  Parent Details
                </h2>

                <input
                  type="text"
                  placeholder="Parent Full Name"
                  value={
                    form.parent_full_name
                  }
                  onChange={(e) =>
                    updateField(
                      "parent_full_name",
                      e.target.value
                    )
                  }
                  className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10"
                />

                <input
                  type="text"
                  placeholder="Parent ID Number"
                  value={
                    form.parent_id_number
                  }
                  onChange={(e) =>
                    updateField(
                      "parent_id_number",
                      e.target.value
                    )
                  }
                  className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10"
                />

                <input
                  type="text"
                  placeholder="Parent Phone Number"
                  value={
                    form.parent_phone
                  }
                  onChange={(e) =>
                    updateField(
                      "parent_phone",
                      e.target.value
                    )
                  }
                  className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10"
                />

                <input
                  type="email"
                  placeholder="Parent Email"
                  value={
                    form.parent_email
                  }
                  onChange={(e) =>
                    updateField(
                      "parent_email",
                      e.target.value
                    )
                  }
                  className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10"
                />

                <div className="grid grid-cols-2 gap-4">

                  <button
                    type="button"
                    onClick={
                      previousStep
                    }
                    className="py-5 rounded-2xl border border-white/10"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="py-5 rounded-2xl font-black uppercase text-black"
                    style={{
                      background: CYAN,
                    }}
                  >
                    Next
                  </button>

                </div>

              </div>
            )}

            {/* STEP 3 */}

            {step === 3 && (
              <div className="space-y-5">

                <h2 className="text-3xl font-black uppercase">
                  Consent & Submit
                </h2>

                <label className="flex gap-4 items-start rounded-2xl border border-white/10 bg-black/30 p-4">
                  <input
                    type="checkbox"
                    checked={
                      form.guardian_consent
                    }
                    onChange={(e) =>
                      updateField(
                        "guardian_consent",
                        e.target.checked
                      )
                    }
                  />
                  <span>
                    I confirm that I am
                    the parent or legal
                    guardian.
                  </span>
                </label>

                <label className="flex gap-4 items-start rounded-2xl border border-white/10 bg-black/30 p-4">
                  <input
                    type="checkbox"
                    checked={
                      form.popia_accepted
                    }
                    onChange={(e) =>
                      updateField(
                        "popia_accepted",
                        e.target.checked
                      )
                    }
                  />
                  <span>
                    I accept the POPIA
                    policy.
                  </span>
                </label>

                <label className="flex gap-4 items-start rounded-2xl border border-white/10 bg-black/30 p-4">
                  <input
                    type="checkbox"
                    checked={
                      form.media_release
                    }
                    onChange={(e) =>
                      updateField(
                        "media_release",
                        e.target.checked
                      )
                    }
                  />
                  <span>
                    I consent to media
                    usage and promotion.
                  </span>
                </label>

                <label className="flex gap-4 items-start rounded-2xl border border-white/10 bg-black/30 p-4">
                  <input
                    type="checkbox"
                    checked={
                      form.indemnity_accepted
                    }
                    onChange={(e) =>
                      updateField(
                        "indemnity_accepted",
                        e.target.checked
                      )
                    }
                  />
                  <span>
                    I accept the
                    competition rules and
                    indemnity agreement.
                  </span>
                </label>

                <div className="grid grid-cols-2 gap-4">

                  <button
                    type="button"
                    onClick={
                      previousStep
                    }
                    className="py-5 rounded-2xl border border-white/10"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={
                      submitEntry
                    }
                    className="py-5 rounded-2xl font-black uppercase text-black"
                    style={{
                      background: PINK,
                    }}
                  >
                    {loading
                      ? "Submitting..."
                      : "Enter Competition"}
                  </button>

                </div>

              </div>
              
            )}

        </div>

      </div>

      </section>

    </main>
  );
}
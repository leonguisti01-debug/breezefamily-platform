"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const BREEZE_GREEN = "#8DFF00";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function RegisterPageV2() {

  /* =========================
     LEGAL GATE
  ========================= */

  const [showLegalGate, setShowLegalGate] =
    useState(true);

  const [pdfDownloaded, setPdfDownloaded] =
    useState(false);

  const [parentConsent, setParentConsent] =
    useState(false);

  /* =========================
     SYSTEM
  ========================= */

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =========================
     FORM
  ========================= */

  const [fullName, setFullName] =
    useState("");

  const [age, setAge] =
    useState("");

  const [parentFullName,
    setParentFullName] =
    useState("");

  const [parentIdNumber,
    setParentIdNumber] =
    useState("");

  const [parentPhone,
    setParentPhone] =
    useState("");

  const [parentEmail,
    setParentEmail] =
    useState("");

  const [talent,
    setTalent] =
    useState("Singing");

  const [tiktokUsername,
    setTiktokUsername] =
    useState("");

  const [photo,
    setPhoto] =
    useState<File | null>(null);

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      /* AGE VALIDATION */

      if (
        Number(age) < 2 ||
        Number(age) > 17
      ) {

        throw new Error(
          "Kids Edition is only open to contestants aged 2 to 17."
        );

      }

      /* PHOTO VALIDATION */

      if (!photo) {

        throw new Error(
          "Please upload a photo."
        );

      }

      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
      ];

      if (
        !allowedTypes.includes(
          photo.type
        )
      ) {

        throw new Error(
          "Only JPG/JPEG images are allowed."
        );

      }

      if (
        photo.size >
        2 * 1024 * 1024
      ) {

        throw new Error(
          "Image must be smaller than 2MB."
        );

      }

      /* PHOTO UPLOAD */

      const fileName =
        `${Date.now()}-${photo.name}`;

      let photoUrl = "";

      const {
        error: uploadError
      } = await supabase.storage
        .from(
          "contestant-photos"
        )
        .upload(
          fileName,
          photo
        );

      if (uploadError) {

        throw uploadError;

      }

      const {
        data: {
          publicUrl
        }
      } = supabase.storage
        .from(
          "contestant-photos"
        )
        .getPublicUrl(
          fileName
        );

      photoUrl = publicUrl;

      /* SAVE CONTESTANT */

      const {
        error: contestantError
      } = await supabase
        .from(
          "contestants"
        )
        .insert([
          {
            full_name:
              fullName,

            age,

            parent_full_name:
              parentFullName,

            parent_id_number:
              parentIdNumber,

            parent_phone:
              parentPhone,

            parent_email:
              parentEmail,

            talent_category:
              talent,

            tiktok_username:
              tiktokUsername,

            photo_url:
              photoUrl,

            popia_accepted:
              true,

            indemnity_accepted:
              true,

            status:
              "pending",

            created_at:
              new Date().toISOString(),
          },
        ]);

      if (
        contestantError
      ) {

        throw contestantError;

      }

      /* SAVE MARKETING CONTACT */

      await supabase
        .from(
          "marketing_contacts"
        )
        .insert([
          {
            full_name:
              parentFullName,

            cellphone:
              parentPhone,

            email:
              parentEmail,

            source:
              "Kids Edition",

            notes:
              "TikTok Stars Entry",
          },
        ]);
      /* SUCCESS */

      setSuccess(true);

      setFullName("");

      setAge("");

      setParentFullName("");

      setParentIdNumber("");

      setParentPhone("");

      setParentEmail("");

      setTiktokUsername("");

      setTalent("Singing");

      setPhoto(null);

    } catch (err: any) {

      setError(
        err.message ||
        "Something went wrong."
      );

    } finally {

      setLoading(false);

    }

  };

  /* =========================
     SUCCESS SCREEN
  ========================= */

  if (success) {

    return (

      <main
        className="
          min-h-screen
          bg-black
          text-white
          flex
          items-center
          justify-center
          px-6
        "
      >

        <div
          className="
            max-w-2xl
            w-full
            text-center
            border
            border-white/10
            rounded-[32px]
            bg-white/5
            backdrop-blur-xl
            p-10
          "
        >

          <div
            className="
              w-20
              h-20
              mx-auto
              rounded-full
              flex
              items-center
              justify-center
              text-black
              text-4xl
              font-black
            "
            style={{
              background:
                BREEZE_GREEN,
            }}
          >
            ✓
          </div>

          <h1
            className="
              mt-8
              text-4xl
              md:text-6xl
              font-black
              uppercase
            "
          >
            Entry Received
          </h1>

          <p
            className="
              mt-6
              text-white/70
              text-lg
              leading-relaxed
            "
          >
            Thank you for entering
            TikTok Stars Kids Edition.

            <br />
            <br />

            Your application has
            been received and is
            awaiting review by the
            Breeze Family team.
          </p>

          <a
            href="https://www.tiktok.com/@itskentbreezy"
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-10
              inline-block
              px-8
              py-4
              rounded-2xl
              font-black
              uppercase
              text-black
            "
            style={{
              background:
                BREEZE_GREEN,
            }}
          >
            Follow @itskentbreezy
          </a>

        </div>

      </main>

    );

  }

  return (

    <main
      className="
        min-h-screen
        bg-black
        text-white
      "
    >

      {/* LEGAL GATE */}

      {showLegalGate && (

        <div
          className="
            fixed
            inset-0
            z-[999]
            bg-black/90
            backdrop-blur-md
            flex
            items-center
            justify-center
            p-6
          "
        >

          <div
            className="
              w-full
              max-w-3xl
              rounded-[32px]
              border
              border-white/10
              bg-[#0b0b0b]
              p-6
              md:p-10
              max-h-[90vh]
              overflow-y-auto
            "
          >

            <h2
              className="
                text-center
                text-4xl
                md:text-6xl
                font-black
                uppercase
              "
            >
              Parent Consent
            </h2>

            <p
              className="
                mt-6
                text-center
                text-white/70
              "
            >
              Before continuing,
              please download and
              review the indemnity
              document and confirm
              you are the legal
              parent or guardian.
            </p>

            <a
              href="/kids-indemnity.pdf"
              target="_blank"
              onClick={() =>
                setPdfDownloaded(
                  true
                )
              }
              className="
                mt-8
                block
                w-full
                py-5
                rounded-2xl
                text-center
                font-black
                uppercase
                text-black
              "
              style={{
                background:
                  BREEZE_GREEN,
              }}
            >
              Download Indemnity PDF
            </a>
                        <div
              className="
                mt-8
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-5
              "
            >

              <label
                className="
                  flex
                  items-start
                  gap-4
                  cursor-pointer
                "
              >

                <input
                  type="checkbox"
                  checked={pdfDownloaded}
                  onChange={(e) =>
                    setPdfDownloaded(
                      e.target.checked
                    )
                  }
                  className="
                    mt-1
                    w-5
                    h-5
                  "
                />

                <span
                  className="
                    text-white/80
                  "
                >
                  I have downloaded
                  and reviewed the
                  indemnity document.
                </span>

              </label>

            </div>

            <div
              className="
                mt-4
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-5
              "
            >

              <label
                className="
                  flex
                  items-start
                  gap-4
                  cursor-pointer
                "
              >

                <input
                  type="checkbox"
                  checked={
                    parentConsent
                  }
                  onChange={(e) =>
                    setParentConsent(
                      e.target.checked
                    )
                  }
                  className="
                    mt-1
                    w-5
                    h-5
                  "
                />

                <span
                  className="
                    text-white/80
                  "
                >
                  I confirm that I
                  am the parent or
                  legal guardian and
                  I consent to the
                  contestant
                  participating in
                  TikTok Stars Kids
                  Edition.
                </span>

              </label>

            </div>

            <button
              type="button"
              disabled={
                !pdfDownloaded ||
                !parentConsent
              }
              onClick={() =>
                setShowLegalGate(
                  false
                )
              }
              className={`
                mt-8
                w-full
                py-5
                rounded-2xl
                font-black
                uppercase
                transition

                ${
                  pdfDownloaded &&
                  parentConsent
                    ? ""
                    : "opacity-50 cursor-not-allowed"
                }
              `}
              style={{
                background:
                  pdfDownloaded &&
                  parentConsent
                    ? BREEZE_GREEN
                    : "#444",
                color:
                  pdfDownloaded &&
                  parentConsent
                    ? "#000"
                    : "#aaa",
              }}
            >
              Continue To Entry Form
            </button>

          </div>

        </div>

      )}

      {/* PAGE */}

      <section
        className="
          px-6
          pt-24
          pb-24
        "
      >

        <div
          className="
            max-w-4xl
            mx-auto
          "
        >

          <h1
            className="
              text-center
              text-5xl
              md:text-7xl
              font-black
              uppercase
            "
          >
            TikTok Stars

            <br />

            <span
              style={{
                color:
                  BREEZE_GREEN,
              }}
            >
              Kids Edition
            </span>

          </h1>

          <p
            className="
              mt-6
              text-center
              text-white/60
              max-w-2xl
              mx-auto
            "
          >
            Enter now for your
            chance to become the
            next TikTok Stars Kids
            Edition champion.
          </p>

          {error && (

            <div
              className="
                mt-8
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/10
                p-5
                text-red-300
              "
            >

              {error}

            </div>

          )}

          <div
            className="
              mt-10
              rounded-[32px]
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              p-6
              md:p-10
            "
          >

            <form
              onSubmit={
                handleSubmit
              }
              className="
                space-y-6
              "
            >              <input
                type="text"
                required
                placeholder="Contestant Full Name"
                value={fullName}
                onChange={(e) =>
                  setFullName(
                    e.target.value
                  )
                }
                className="
                  w-full
                  px-5
                  py-4
                  rounded-2xl
                  bg-black/40
                  border
                  border-white/10
                  text-white
                "
              />

              <input
                type="number"
                required
                min="2"
                max="17"
                placeholder="Age"
                value={age}
                onChange={(e) =>
                  setAge(
                    e.target.value
                  )
                }
                className="
                  w-full
                  px-5
                  py-4
                  rounded-2xl
                  bg-black/40
                  border
                  border-white/10
                  text-white
                "
              />

              <input
                type="text"
                required
                placeholder="Parent / Guardian Full Name"
                value={
                  parentFullName
                }
                onChange={(e) =>
                  setParentFullName(
                    e.target.value
                  )
                }
                className="
                  w-full
                  px-5
                  py-4
                  rounded-2xl
                  bg-black/40
                  border
                  border-white/10
                  text-white
                "
              />

              <input
                type="text"
                required
                placeholder="Parent ID Number"
                value={
                  parentIdNumber
                }
                onChange={(e) =>
                  setParentIdNumber(
                    e.target.value
                  )
                }
                className="
                  w-full
                  px-5
                  py-4
                  rounded-2xl
                  bg-black/40
                  border
                  border-white/10
                  text-white
                "
              />

              <input
                type="text"
                required
                placeholder="Parent Contact Number"
                value={parentPhone}
                onChange={(e) =>
                  setParentPhone(
                    e.target.value
                  )
                }
                className="
                  w-full
                  px-5
                  py-4
                  rounded-2xl
                  bg-black/40
                  border
                  border-white/10
                  text-white
                "
              />

              <input
                type="email"
                required
                placeholder="Parent Email Address"
                value={parentEmail}
                onChange={(e) =>
                  setParentEmail(
                    e.target.value
                  )
                }
                className="
                  w-full
                  px-5
                  py-4
                  rounded-2xl
                  bg-black/40
                  border
                  border-white/10
                  text-white
                "
              />

              <input
                type="text"
                required
                placeholder="@TikTok Username"
                value={
                  tiktokUsername
                }
                onChange={(e) =>
                  setTiktokUsername(
                    e.target.value
                  )
                }
                className="
                  w-full
                  px-5
                  py-4
                  rounded-2xl
                  bg-black/40
                  border
                  border-white/10
                  text-white
                "
              />

              <select
                value={talent}
                onChange={(e) =>
                  setTalent(
                    e.target.value
                  )
                }
                className="
                  w-full
                  px-5
                  py-4
                  rounded-2xl
                  bg-black/40
                  border
                  border-white/10
                  text-white
                "
              >
                <option>
                  Singing
                </option>

                <option>
                  Dancing
                </option>

                <option>
                  Comedy
                </option>

                <option>
                  Instrument
                </option>

                <option>
                  Other
                </option>

              </select>

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/30
                  p-5
                "
              >

                <label
                  className="
                    block
                    text-sm
                    uppercase
                    font-black
                    mb-3
                  "
                  style={{
                    color:
                      BREEZE_GREEN,
                  }}
                >
                  Upload Contestant Photo
                </label>

                <input
                  type="file"
                  required
                  accept=".jpg,.jpeg,image/jpeg"
                  onChange={(e) =>
                    setPhoto(
                      e.target
                        .files?.[0] ||
                        null
                    )
                  }
                  className="
                    w-full
                    text-white
                  "
                />

                <p
                  className="
                    mt-3
                    text-sm
                    text-white/60
                  "
                >
                  JPG / JPEG only.
                  Maximum file size:
                  2MB.
                </p>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  py-5
                  rounded-2xl
                  font-black
                  uppercase
                  text-black
                  transition
                "
                style={{
                  background:
                    BREEZE_GREEN,
                }}
              >
                {loading
                  ? "UPLOADING PHOTO... PLEASE WAIT"
                  : "SUBMIT ENTRY"}
              </button>

            </form>

          </div>

        </div>

      </section>

    </main>

  );

}
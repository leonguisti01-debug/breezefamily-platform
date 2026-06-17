"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function BecomeASponsorPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    contact_number: "",
    email: "",
    sponsorship_amount: "",
    sponsorship_type: "TikTok Stars",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("sponsor_applications")
      .insert([
        {
          full_name: form.full_name,
          contact_number: form.contact_number,
          email: form.email,
          sponsorship_amount: Number(form.sponsorship_amount),
          sponsorship_type: form.sponsorship_type,
        },
      ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <h1 className="text-5xl font-black mb-6 text-[#8DFF00]">
            THANK YOU!
          </h1>

          <p className="text-lg text-white/80">
            Thank you for your sponsorship enquiry.
          </p>

          <p className="text-white/60 mt-3">
            A member of the Breeze Family team will contact you shortly to
            discuss your sponsorship.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">

      <section className="max-w-4xl mx-auto px-6 py-20">

        <div className="text-center mb-12">

          <p className="uppercase tracking-[5px] text-cyan-400 text-xs font-black">
            Partner With Us
          </p>

          <h1
            className="uppercase italic font-black mt-4"
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "clamp(60px,8vw,120px)",
            }}
          >
            Become A Sponsor
          </h1>

          <p className="max-w-2xl mx-auto text-white/70 mt-4">
            Support the Breeze Family community and help us create bigger
            prizes, bigger opportunities and bigger events.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6"
        >

          <div>
            <label className="block mb-2 font-semibold">
              Full Name
            </label>

            <input
              required
              className="w-full rounded-xl bg-black border border-white/20 p-4"
              value={form.full_name}
              onChange={(e) =>
                setForm({ ...form, full_name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Contact Number
            </label>

            <input
              required
              className="w-full rounded-xl bg-black border border-white/20 p-4"
              value={form.contact_number}
              onChange={(e) =>
                setForm({ ...form, contact_number: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Email Address
            </label>

            <input
              type="email"
              className="w-full rounded-xl bg-black border border-white/20 p-4"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Sponsorship Amount (R)
            </label>

            <input
              required
              type="number"
              min="1"
              className="w-full rounded-xl bg-black border border-white/20 p-4"
              value={form.sponsorship_amount}
              onChange={(e) =>
                setForm({
                  ...form,
                  sponsorship_amount: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              What Would You Like To Sponsor?
            </label>

            <select
              className="w-full rounded-xl bg-black border border-white/20 p-4"
              value={form.sponsorship_type}
              onChange={(e) =>
                setForm({
                  ...form,
                  sponsorship_type: e.target.value,
                })
              }
            >
              <option>TikTok Stars</option>
              <option>Judge Prize</option>
              <option>Pets Prize</option>
              <option>Scavenger Hunt</option>
            </select>
          </div>

          <button
            disabled={loading}
            className="w-full bg-[#8DFF00] text-black font-black py-4 rounded-xl hover:scale-[1.02] transition"
          >
            {loading
              ? "SUBMITTING..."
              : "SUBMIT SPONSORSHIP"}
          </button>

        </form>

      </section>

    </main>
  );
}
"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function KidsEdition() {

  const [formData, setFormData] = useState({
    child_name: "",
    age: "",
    parent_name: "",
    email: "",
    phone: "",
    category: "",
    description: "",
  });

  const [image, setImage] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = "";

    if (image) {

      const fileName = `${Date.now()}-${image.name}`;

      const { error: uploadError } = await supabase
        .storage
        .from("contestants")
        .upload(fileName, image);

      if (uploadError) {
        alert(uploadError.message);
        return;
      }

      const { data } = supabase
        .storage
        .from("contestants")
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    const { error } = await supabase
      .from("contestants")
      .insert([
        {
          child_name: formData.child_name,
          age: Number(formData.age),
          parent_name: formData.parent_name,
          email: formData.email,
          phone: formData.phone,
          category: formData.category,
          description: formData.description,
          image_url: imageUrl,
        },
      ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Entry submitted successfully!");

      setFormData({
        child_name: "",
        age: "",
        parent_name: "",
        email: "",
        phone: "",
        category: "",
        description: "",
      });

      setImage(null);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-black text-pink-400 mb-10">
          ENTER NOW
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl p-10"
        >

          <input
            type="text"
            name="child_name"
            placeholder="Child Name"
            value={formData.child_name}
            onChange={handleChange}
            className="w-full p-5 rounded-2xl bg-black/40 border border-white/10 text-white"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-5 rounded-2xl bg-black/40 border border-white/10 text-white"
          />

          <input
            type="text"
            name="parent_name"
            placeholder="Parent / Guardian Name"
            value={formData.parent_name}
            onChange={handleChange}
            className="w-full p-5 rounded-2xl bg-black/40 border border-white/10 text-white"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-5 rounded-2xl bg-black/40 border border-white/10 text-white"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-5 rounded-2xl bg-black/40 border border-white/10 text-white"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-5 rounded-2xl bg-black/40 border border-white/10 text-white"
          >
            <option value="">Select Category</option>
            <option>Singing</option>
            <option>Dancing</option>
            <option>Comedy</option>
            <option>Acting</option>
            <option>Other</option>
          </select>

          <textarea
            name="description"
            placeholder="Tell us about the contestant..."
            rows={5}
            value={formData.description}
            onChange={handleChange}
            className="w-full p-5 rounded-2xl bg-black/40 border border-white/10 text-white"
          />

          {/* IMAGE */}
          <div>

            <label className="block mb-3 text-pink-400 font-bold">
              Upload Contestant Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files?.[0] || null)
              }
              className="w-full p-4 rounded-2xl bg-black/40 border border-white/10"
            />

          </div>

          <button
            type="submit"
            className="w-full p-5 rounded-2xl bg-pink-500 hover:bg-pink-400 transition text-white font-black text-lg"
          >
            SUBMIT ENTRY
          </button>

        </form>

      </div>

    </main>
  );
}
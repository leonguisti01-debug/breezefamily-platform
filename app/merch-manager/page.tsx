"use client";

import { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",

  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function MerchManagerPage() {

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [image, setImage] =
    useState<File | null>(null);

  const [items, setItems] = useState<any[]>([]);

  const fetchItems = async () => {

    const { data } = await supabase
      .from("merch_items")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (data) {
      setItems(data);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const uploadMerch = async () => {

    if (!image) return;

    const fileName =
      `${Date.now()}-${image.name}`;

    await supabase.storage
      .from("merch-images")
      .upload(fileName, image);

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("merch-images")
      .getPublicUrl(fileName);

    await supabase
      .from("merch_items")
      .insert([
        {
          title,
          description,
          image_url: publicUrl,
          active: true,
        },
      ]);

    setTitle("");

    setDescription("");

    setImage(null);

    fetchItems();
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-32">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl md:text-7xl font-black uppercase text-center">
          Merch Manager
        </h1>

        {/* FORM */}
        <div className="mt-16 rounded-3xl border border-green-400/20 bg-black/40 backdrop-blur-xl p-8">

          <div className="grid gap-6">

            <input
              type="text"
              placeholder="Merch Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="rounded-2xl bg-black/40 border border-white/10 px-5 py-4"
            />

            <textarea
              placeholder="Merch Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="rounded-2xl bg-black/40 border border-white/10 px-5 py-4 min-h-[140px]"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(
                  e.target.files?.[0] || null
                )
              }
            />

            <button
              onClick={uploadMerch}
              className="py-4 rounded-2xl bg-gradient-to-r from-green-400 to-lime-300 text-black font-black uppercase"
            >
              Upload Merch
            </button>

          </div>

        </div>

        {/* ITEMS */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

          {items.map((item) => (

            <div
              key={item.id}
              className="rounded-3xl overflow-hidden border border-green-400/20 bg-black/40"
            >

              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-[420px] object-cover"
              />

              <div className="p-6">

                <h2 className="text-2xl font-black uppercase">
                  {item.title}
                </h2>

                <p className="mt-3 text-white/60">
                  {item.description}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </main>
  );
}
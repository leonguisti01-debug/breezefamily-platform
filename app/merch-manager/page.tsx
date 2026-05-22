"use client";

import { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",

  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

const BREEZE_GREEN = "#8DFF00";

export default function MerchManagerPage() {

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [price, setPrice] = useState("");

  const [image, setImage] =
    useState<File | null>(null);

  const [items, setItems] = useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

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

    if (!image || !title) return;

    setLoading(true);

    const fileName =
      `${Date.now()}-${image.name}`;

    const { error: uploadError } =
      await supabase.storage
        .from("merch-images")
        .upload(fileName, image);

    if (uploadError) {

      alert(uploadError.message);

      setLoading(false);

      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("merch-images")
      .getPublicUrl(fileName);

    const { error } = await supabase
      .from("merch_items")
      .insert([
        {
          title,
          description,
          price,
          image_url: publicUrl,
          active: true,
          created_at:
            new Date().toISOString(),
        },
      ]);

    if (error) {

      alert(error.message);

      setLoading(false);

      return;
    }

    setTitle("");

    setDescription("");

    setPrice("");

    setImage(null);

    fetchItems();

    setLoading(false);
  };

  const deleteItem = async (
    id: number
  ) => {

    const confirmed = window.confirm(
      "Delete this merch item?"
    );

    if (!confirmed) return;

    await supabase
      .from("merch_items")
      .delete()
      .eq("id", id);

    fetchItems();
  };

  const toggleActive = async (
    id: number,
    current: boolean
  ) => {

    await supabase
      .from("merch_items")
      .update({
        active: !current,
      })
      .eq("id", id);

    fetchItems();
  };

  return (
    <main className="min-h-screen bg-black text-white px-4 md:px-6 py-28">

      {/* BACKGROUND */}
      <div
        className="fixed top-[-300px] left-[-300px] w-[700px] h-[700px] blur-[220px] rounded-full pointer-events-none"
        style={{
          background: `${BREEZE_GREEN}18`,
        }}
      />

      <div
        className="fixed bottom-[-300px] right-[-300px] w-[700px] h-[700px] blur-[220px] rounded-full pointer-events-none"
        style={{
          background: `${BREEZE_GREEN}10`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-20">

        {/* TITLE */}
        <div className="text-center">

          <p
            className="uppercase tracking-[5px] text-xs"
            style={{
              color: BREEZE_GREEN,
            }}
          >
            ADMIN PANEL
          </p>

          <h1
            className="mt-4 uppercase italic font-black"
            style={{
              fontFamily:
                "Bebas Neue, sans-serif",
              fontSize:
                "clamp(60px, 10vw, 140px)",
              lineHeight: "0.82",
            }}
          >

            MERCH
            <span
              className="block"
              style={{
                color: BREEZE_GREEN,
              }}
            >
              MANAGER
            </span>

          </h1>

        </div>

        {/* FORM */}
        <div className="mt-16 rounded-[34px] border border-[#8DFF00]/20 bg-white/5 backdrop-blur-2xl p-6 md:p-10">

          <div className="grid gap-5">

            <input
              type="text"
              placeholder="Merch Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="
                rounded-2xl
                bg-black/40
                border
                border-white/10
                px-5
                py-4
                text-white
                placeholder:text-white/40
                focus:outline-none
                focus:border-[#8DFF00]
              "
            />

            <textarea
              placeholder="Merch Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="
                rounded-2xl
                bg-black/40
                border
                border-white/10
                px-5
                py-4
                min-h-[140px]
                text-white
                placeholder:text-white/40
                focus:outline-none
                focus:border-[#8DFF00]
              "
            />

            <input
              type="text"
              placeholder="Price (Example: R399)"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              className="
                rounded-2xl
                bg-black/40
                border
                border-white/10
                px-5
                py-4
                text-white
                placeholder:text-white/40
                focus:outline-none
                focus:border-[#8DFF00]
              "
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(
                  e.target.files?.[0] || null
                )
              }
              className="
                rounded-2xl
                bg-black/40
                border
                border-white/10
                px-5
                py-4
              "
            />

            <button
              onClick={uploadMerch}
              disabled={loading}
              className="
                py-4
                rounded-2xl
                bg-[#8DFF00]
                text-black
                font-black
                uppercase
                tracking-[4px]
                hover:scale-[1.01]
                transition
                duration-300
              "
            >

              {loading
                ? "Uploading..."
                : "Upload Merch"}

            </button>

          </div>

        </div>

        {/* ITEMS */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">

          {items.map((item) => (

            <div
              key={item.id}
              className="
                rounded-[30px]
                overflow-hidden
                border
                border-[#8DFF00]/20
                bg-white/5
                backdrop-blur-2xl
              "
            >

              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-[320px] object-cover"
              />

              <div className="p-6">

                <h2
                  className="uppercase font-black"
                  style={{
                    fontSize: "28px",
                    lineHeight: "1",
                  }}
                >
                  {item.title}
                </h2>

                {item.price && (

                  <p
                    className="mt-3 font-bold"
                    style={{
                      color: BREEZE_GREEN,
                    }}
                  >
                    {item.price}
                  </p>

                )}

                <p className="mt-4 text-white/60 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* ACTIONS */}
                <div className="mt-6 flex flex-col gap-3">

                  <button
                    onClick={() =>
                      toggleActive(
                        item.id,
                        item.active
                      )
                    }
                    className={`
                      py-3
                      rounded-xl
                      font-black
                      uppercase
                      tracking-[2px]
                      transition
                      ${
                        item.active
                          ? "bg-yellow-400 text-black"
                          : "bg-green-400 text-black"
                      }
                    `}
                  >

                    {item.active
                      ? "Disable Item"
                      : "Enable Item"}

                  </button>

                  <button
                    onClick={() =>
                      deleteItem(item.id)
                    }
                    className="
                      py-3
                      rounded-xl
                      bg-red-500
                      text-white
                      font-black
                      uppercase
                      tracking-[2px]
                    "
                  >

                    Delete Item

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}
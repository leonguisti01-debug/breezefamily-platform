"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const BREEZE_GREEN = "#8DFF00";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

const categories = [
  "My Merch",
  "Tech",
  "Fun Stuff",
  "Affiliated",
  "Sponsors",
];

export default function MerchManagerPage() {

  const [products,
    setProducts] =
    useState<any[]>([]);

  const [loading,
    setLoading] =
    useState(false);

  const [editingId,
    setEditingId] =
    useState<number | null>(
      null
    );

  const [imagePreview,
    setImagePreview] =
    useState("");

  const [image,
    setImage] =
    useState<File | null>(
      null
    );

  const [form,
    setForm] =
    useState({
      name: "",
      description: "",
      price: "",
      category:
        "My Merch",
      featured: false,
    });

  useEffect(() => {

    fetchProducts();

  }, []);

  /* FETCH */
  const fetchProducts =
    async () => {

      const { data } =
        await supabase
          .from(
            "merch_products"
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

        setProducts(data);
      }
    };

  /* GROUPED */
  const groupedProducts =
    useMemo(() => {

      return categories.map(
        (category) => ({

          category,

          items:
            products.filter(
              (
                product
              ) =>
                product.category ===
                category
            ),

        })
      );

    }, [products]);

  /* INPUT */
  const handleChange =
    (
      key: string,
      value: any
    ) => {

      setForm(
        (
          prev
        ) => ({
          ...prev,
          [key]:
            value,
        })
      );
    };

  /* RESET */
  const resetForm =
    () => {

      setForm({
        name: "",
        description:
          "",
        price: "",
        category:
          "My Merch",
        featured:
          false,
      });

      setImage(null);

      setImagePreview("");

      setEditingId(
        null
      );
    };

  /* SAVE */
  const saveProduct =
    async () => {

      if (
        !form.name
      )
        return;

      setLoading(true);

      let imageUrl = "";

      /* IMAGE */
      if (image) {

        const fileName =
          `${Date.now()}-${image.name}`;

        await supabase.storage
          .from(
            "merch-images"
          )
          .upload(
            fileName,
            image
          );

        const {
          data: {
            publicUrl,
          },
        } =
          supabase.storage
            .from(
              "merch-images"
            )
            .getPublicUrl(
              fileName
            );

        imageUrl =
          publicUrl;
      }

      /* UPDATE */
      if (
        editingId
      ) {

        await supabase
          .from(
            "merch_products"
          )
          .update({
            name:
              form.name,
            description:
              form.description,
            price:
              form.price,
            category:
              form.category,
            featured:
              form.featured,
            ...(imageUrl && {
              image_url:
                imageUrl,
            }),
          })
          .eq(
            "id",
            editingId
          );

      } else {

        /* CREATE */
        await supabase
          .from(
            "merch_products"
          )
          .insert([
            {
              name:
                form.name,
              description:
                form.description,
              price:
                form.price,
              category:
                form.category,
              featured:
                form.featured,
              image_url:
                imageUrl,
              status:
                "active",
            },
          ]);
      }

      resetForm();

      fetchProducts();

      setLoading(false);
    };

  /* EDIT */
  const editProduct =
    (
      product: any
    ) => {

      setEditingId(
        product.id
      );

      setForm({
        name:
          product.name,
        description:
          product.description,
        price:
          product.price,
        category:
          product.category,
        featured:
          product.featured,
      });

      setImagePreview(
        product.image_url
      );

      window.scrollTo({
        top: 0,
        behavior:
          "smooth",
      });
    };

  /* DELETE */
  const deleteProduct =
    async (
      id: number
    ) => {

      const confirmed =
        window.confirm(
          "Delete product?"
        );

      if (
        !confirmed
      )
        return;

      await supabase
        .from(
          "merch_products"
        )
        .delete()
        .eq(
          "id",
          id
        );

      fetchProducts();
    };

  /* STATUS */
  const toggleStatus =
    async (
      id: number,
      current:
        string
    ) => {

      await supabase
        .from(
          "merch_products"
        )
        .update({
          status:
            current ===
            "active"
              ? "hidden"
              : "active",
        })
        .eq(
          "id",
          id
        );

      fetchProducts();
    };

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden px-4 py-24 relative">

      {/* BACKGROUND */}
      <div
        className="fixed top-[-250px] left-[-250px] w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none"
        style={{
          background:
            `${BREEZE_GREEN}12`,
        }}
      />

      <div
        className="fixed bottom-[-250px] right-[-250px] w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none"
        style={{
          background:
            `${BREEZE_GREEN}08`,
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center">

          <p
            className="uppercase tracking-[4px] text-[10px]"
            style={{
              color:
                BREEZE_GREEN,
            }}
          >
            Breeze Family
          </p>

          <h1
            className="mt-4 uppercase italic font-black"
            style={{
              fontFamily:
                "Bebas Neue, sans-serif",
              fontSize:
                "clamp(60px, 14vw, 140px)",
              lineHeight:
                "0.82",
            }}
          >

            MERCH
            <span
              className="block"
              style={{
                color:
                  BREEZE_GREEN,
              }}
            >
              MANAGER
            </span>

          </h1>

        </div>

        {/* FORM */}
        <div className="mt-12 rounded-[30px] border border-[#8DFF00]/20 bg-white/5 backdrop-blur-2xl p-5">

          <div className="space-y-4">

            {/* PREVIEW */}
            {imagePreview && (

              <div className="aspect-square rounded-[26px] overflow-hidden bg-black">

                <img
                  src={
                    imagePreview
                  }
                  alt="Preview"
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />

              </div>

            )}

            {/* NAME */}
            <input
              type="text"
              placeholder="Product Name"
              value={
                form.name
              }
              onChange={(
                e
              ) =>
                handleChange(
                  "name",
                  e.target
                    .value
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
              "
            />

            {/* DESCRIPTION */}
            <textarea
              placeholder="Description"
              value={
                form.description
              }
              onChange={(
                e
              ) =>
                handleChange(
                  "description",
                  e.target
                    .value
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
                min-h-[120px]
              "
            />

            {/* PRICE */}
            <input
              type="text"
              placeholder="Price"
              value={
                form.price
              }
              onChange={(
                e
              ) =>
                handleChange(
                  "price",
                  e.target
                    .value
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
              "
            />

            {/* CATEGORY */}
            <select
              value={
                form.category
              }
              onChange={(
                e
              ) =>
                handleChange(
                  "category",
                  e.target
                    .value
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
              "
            >

              {categories.map(
                (
                  category
                ) => (

                  <option
                    key={
                      category
                    }
                    value={
                      category
                    }
                  >

                    {category}

                  </option>

                )
              )}

            </select>

            {/* FEATURED */}
            <label className="flex items-center gap-3 px-2">

              <input
                type="checkbox"
                checked={
                  form.featured
                }
                onChange={(
                  e
                ) =>
                  handleChange(
                    "featured",
                    e.target
                      .checked
                  )
                }
              />

              <span className="uppercase text-xs tracking-[3px]">

                Featured Product

              </span>

            </label>

            {/* IMAGE */}
            <input
              type="file"
              accept="image/*"
              onChange={(
                e
              ) => {

                const file =
                  e.target
                    .files?.[0];

                if (
                  file
                ) {

                  setImage(
                    file
                  );

                  setImagePreview(
                    URL.createObjectURL(
                      file
                    )
                  );
                }
              }}
              className="
                w-full
                px-5
                py-4
                rounded-2xl
                bg-black/40
                border
                border-white/10
              "
            />

            {/* BUTTON */}
            <button
              onClick={
                saveProduct
              }
              disabled={
                loading
              }
              className="
                w-full
                py-4
                rounded-2xl
                bg-[#8DFF00]
                text-black
                font-black
                uppercase
                tracking-[4px]
              "
            >

              {loading
                ? "Saving..."
                : editingId
                ? "Update Product"
                : "Create Product"}

            </button>

          </div>

        </div>

        {/* DIVISIONS */}
        <div className="mt-16 space-y-16">

          {groupedProducts.map(
            (
              section
            ) => (

              <div
                key={
                  section.category
                }
              >

                {/* HEADER */}
                <div className="mb-6">

                  <p
                    className="uppercase tracking-[4px] text-[10px]"
                    style={{
                      color:
                        BREEZE_GREEN,
                    }}
                  >
                    Division
                  </p>

                  <h2
                    className="mt-2 uppercase italic font-black"
                    style={{
                      fontFamily:
                        "Bebas Neue, sans-serif",
                      fontSize:
                        "clamp(38px, 8vw, 70px)",
                      lineHeight:
                        "0.9",
                    }}
                  >

                    {
                      section.category
                    }

                  </h2>

                </div>

                {/* EMPTY */}
                {section.items
                  .length ===
                  0 ? (

                  <div className="rounded-[26px] border border-white/10 bg-white/5 p-8 text-center uppercase tracking-[4px] text-xs text-white/40">

                    No Products

                  </div>

                ) : (

                  <div className="grid grid-cols-2 gap-4">

                    {section.items.map(
                      (
                        product
                      ) => (

                        <div
                          key={
                            product.id
                          }
                          className="
                            rounded-[26px]
                            overflow-hidden
                            border
                            border-white/10
                            bg-white/5
                            backdrop-blur-xl
                          "
                        >

                          {/* IMAGE */}
                          <div className="aspect-square bg-black overflow-hidden relative">

                            {product.image_url ? (

                              <img
                                src={
                                  product.image_url
                                }
                                alt={
                                  product.name
                                }
                                loading="lazy"
                                className="
                                  w-full
                                  h-full
                                  object-cover
                                "
                              />

                            ) : (

                              <div className="w-full h-full flex items-center justify-center text-white/30 text-xs uppercase">

                                No Image

                              </div>

                            )}

                            {/* STATUS */}
                            <div
                              className={`
                                absolute
                                top-3
                                left-3
                                px-3
                                py-1
                                rounded-full
                                text-[8px]
                                uppercase
                                tracking-[2px]
                                font-black
                                ${
                                  product.status ===
                                  "active"
                                    ? "bg-[#8DFF00] text-black"
                                    : "bg-red-500 text-white"
                                }
                              `}
                            >

                              {
                                product.status
                              }

                            </div>

                            {/* FEATURED */}
                            {product.featured && (

                              <div
                                className="
                                  absolute
                                  top-3
                                  right-3
                                  px-3
                                  py-1
                                  rounded-full
                                  text-[8px]
                                  uppercase
                                  tracking-[2px]
                                  font-black
                                  bg-white
                                  text-black
                                "
                              >

                                Featured

                              </div>

                            )}

                          </div>

                          {/* CONTENT */}
                          <div className="p-4">

                            <h3
                              className="uppercase font-black leading-tight"
                              style={{
                                fontSize:
                                  "clamp(16px, 4vw, 24px)",
                              }}
                            >

                              {
                                product.name
                              }

                            </h3>

                            <p
                              className="mt-2 font-black"
                              style={{
                                color:
                                  BREEZE_GREEN,
                              }}
                            >

                              {
                                product.price
                              }

                            </p>

                            <p className="mt-2 text-white/60 text-xs line-clamp-3">

                              {
                                product.description
                              }

                            </p>

                            {/* ACTIONS */}
                            <div className="mt-4 grid grid-cols-2 gap-2">

                              <button
                                onClick={() =>
                                  editProduct(
                                    product
                                  )
                                }
                                className="
                                  py-3
                                  rounded-xl
                                  bg-white
                                  text-black
                                  text-[10px]
                                  uppercase
                                  tracking-[2px]
                                  font-black
                                "
                              >

                                Edit

                              </button>

                              <button
                                onClick={() =>
                                  deleteProduct(
                                    product.id
                                  )
                                }
                                className="
                                  py-3
                                  rounded-xl
                                  bg-red-500
                                  text-white
                                  text-[10px]
                                  uppercase
                                  tracking-[2px]
                                  font-black
                                "
                              >

                                Delete

                              </button>

                            </div>

                            <button
                              onClick={() =>
                                toggleStatus(
                                  product.id,
                                  product.status
                                )
                              }
                              className={`
                                mt-2
                                w-full
                                py-3
                                rounded-xl
                                text-[10px]
                                uppercase
                                tracking-[2px]
                                font-black
                                ${
                                  product.status ===
                                  "active"
                                    ? "bg-yellow-400 text-black"
                                    : "bg-[#8DFF00] text-black"
                                }
                              `}
                            >

                              {product.status ===
                              "active"
                                ? "Hide Product"
                                : "Activate Product"}

                            </button>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                )}

              </div>

            )
          )}

        </div>

      </div>

    </main>
  );
}
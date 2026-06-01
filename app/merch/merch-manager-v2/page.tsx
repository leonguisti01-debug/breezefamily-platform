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

export default function MerchManagerV2Page() {

  const [products, setProducts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [imagePreview,
    setImagePreview] =
    useState("");

  const [image,
    setImage] =
    useState<File | null>(null);

  const [form,
    setForm] =
    useState({
      name: "",
      description: "",
      price: "",
      category: "My Merch",
      featured: false,
      has_sizes: false,
      sizes: "",
    });

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts =
    async () => {

      const {
        data,
      } = await supabase
        .from("merch_products")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      if (data) {

        setProducts(data);

      }

    };

  const groupedProducts =
    useMemo(() => {

      return categories.map(
        (category) => ({

          category,

          items:
            products.filter(
              (product) =>
                product.category ===
                category
            ),

        })
      );

    }, [products]);

  const handleChange =
    (
      key: string,
      value: any
    ) => {

      setForm(
        (prev) => ({
          ...prev,
          [key]: value,
        })
      );

    };

  const resetForm =
    () => {

      setForm({
        name: "",
        description: "",
        price: "",
        category: "My Merch",
        featured: false,
        has_sizes: false,
        sizes: "",
      });

      setImage(null);

      setImagePreview("");

      setEditingId(null);

    };

  const saveProduct =
    async () => {

      try {

        if (!form.name) {

          alert(
            "Product name required"
          );

          return;

        }

        setLoading(true);

        let imageUrl = "";

        if (image) {

          const fileName =
            `${Date.now()}-${image.name}`;

          const {
            error,
          } =
            await supabase.storage
              .from(
                "merch-images"
              )
              .upload(
                fileName,
                image
              );

          if (error) {

            alert(
              error.message
            );

            setLoading(false);

            return;

          }

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

        }        const payload = {
          name: form.name,
          description:
            form.description,
          price: form.price,
          category:
            form.category,
          featured:
            form.featured,
          has_sizes:
            form.has_sizes,
          sizes:
            form.sizes,
          image_url:
            imageUrl,
          status:
            "active",
        };

        if (editingId) {

          const { error } =
            await supabase
              .from(
                "merch_products"
              )
              .update({
                ...payload,
                ...(imageUrl && {
                  image_url:
                    imageUrl,
                }),
              })
              .eq(
                "id",
                editingId
              );

          if (error) {

            alert(
              error.message
            );

            setLoading(false);

            return;

          }

        } else {

          const { error } =
            await supabase
              .from(
                "merch_products"
              )
              .insert([
                payload,
              ]);

          if (error) {

            alert(
              error.message
            );

            setLoading(false);

            return;

          }

        }

        resetForm();

        fetchProducts();

        alert(
          "Product saved successfully"
        );

        setLoading(false);

      } catch (err: any) {

        alert(
          err.message
        );

        setLoading(false);

      }

    };

  return (

    <main
      className="
        min-h-screen
        bg-black
        text-white
        px-4
        py-24
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
        "
      >

        <div
          className="
            text-center
            mb-12
          "
        >

          <h1
            className="
              text-5xl
              md:text-7xl
              font-black
              uppercase
            "
          >
            Merch
          </h1>

          <h2
            className="
              text-5xl
              md:text-7xl
              font-black
              uppercase
            "
            style={{
              color:
                BREEZE_GREEN,
            }}
          >
            Manager V2
          </h2>

        </div>

        <div
          className="
            rounded-[30px]
            border
            border-[#8DFF00]/20
            bg-white/5
            p-6
          "
        >

          <div
            className="
              space-y-4
            "
          >

            {imagePreview && (

              <img
                src={
                  imagePreview
                }
                alt=""
                className="
                  w-full
                  max-w-[300px]
                  rounded-2xl
                "
              />

            )}

            <input
              type="text"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) =>
                handleChange(
                  "name",
                  e.target.value
                )
              }
              className="
                w-full
                p-4
                rounded-2xl
                bg-black/40
              "
            />

            <textarea
              placeholder="Description"
              value={
                form.description
              }
              onChange={(e) =>
                handleChange(
                  "description",
                  e.target.value
                )
              }
              className="
                w-full
                p-4
                rounded-2xl
                bg-black/40
                min-h-[120px]
              "
            />

            <input
              type="text"
              placeholder="Price"
              value={
                form.price
              }
              onChange={(e) =>
                handleChange(
                  "price",
                  e.target.value
                )
              }
              className="
                w-full
                p-4
                rounded-2xl
                bg-black/40
              "
            />

            <select
              value={
                form.category
              }
              onChange={(e) =>
                handleChange(
                  "category",
                  e.target.value
                )
              }
              className="
                w-full
                p-4
                rounded-2xl
                bg-black/40
              "
            >

              {categories.map(
                (category) => (

                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>

                )
              )}

            </select>

            <label
              className="
                flex
                items-center
                gap-3
              "
            >

              <input
                type="checkbox"
                checked={
                  form.featured
                }
                onChange={(e) =>
                  handleChange(
                    "featured",
                    e.target.checked
                  )
                }
              />

              Featured Product

            </label>

            <label
              className="
                flex
                items-center
                gap-3
              "
            >

              <input
                type="checkbox"
                checked={
                  form.has_sizes
                }
                onChange={(e) =>
                  handleChange(
                    "has_sizes",
                    e.target.checked
                  )
                }
              />

              Product Has Sizes

            </label>

            {form.has_sizes && (

              <input
                type="text"
                placeholder="S,M,L,XL,XXL"
                value={
                  form.sizes
                }
                onChange={(e) =>
                  handleChange(
                    "sizes",
                    e.target.value
                  )
                }
                className="
                  w-full
                  p-4
                  rounded-2xl
                  bg-black/40
                "
              />

            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {

                const file =
                  e.target.files?.[0];

                if (file) {

                  setImage(file);

                  setImagePreview(
                    URL.createObjectURL(
                      file
                    )
                  );

                }

              }}
            />

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
                font-black
                uppercase
                text-black
                bg-[#8DFF00]
              "
            >

              {loading
                ? "Saving..."
                : editingId
                ? "Update Product"
                : "Create Product"}

            </button>

          </div>

        </div>        {/* PRODUCTS */}

        <div className="mt-16">

          {groupedProducts.map(
            (group) => (

              <div
                key={
                  group.category
                }
                className="mb-14"
              >

                <h2
                  className="
                    text-3xl
                    font-black
                    uppercase
                    mb-6
                  "
                  style={{
                    color:
                      BREEZE_GREEN,
                  }}
                >
                  {group.category}
                </h2>

                {group.items
                  .length === 0 ? (

                  <div
                    className="
                      text-white/40
                      text-sm
                    "
                  >
                    No products in
                    this category.
                  </div>

                ) : (

                  <div
                    className="
                      grid
                      grid-cols-2
                      md:grid-cols-3
                      xl:grid-cols-5
                      gap-5
                    "
                  >

                    {group.items.map(
                      (
                        product
                      ) => (

                        <div
                          key={
                            product.id
                          }
                          className="
                            rounded-[24px]
                            overflow-hidden
                            border
                            border-white/10
                            bg-white/5
                          "
                        >

                          <div
                            className="
                              relative
                            "
                          >

                            <img
                              src={
                                product.image_url
                              }
                              alt={
                                product.name
                              }
                              className="
                                w-full
                                h-[220px]
                                object-cover
                              "
                            />

                            {product.featured && (

                              <div
                                className="
                                  absolute
                                  top-3
                                  right-3
                                  bg-[#8DFF00]
                                  text-black
                                  text-xs
                                  font-black
                                  px-3
                                  py-1
                                  rounded-full
                                "
                              >
                                Featured
                              </div>

                            )}

                          </div>

                          <div
                            className="
                              p-4
                            "
                          >

                            <h3
                              className="
                                font-black
                                text-lg
                              "
                            >
                              {product.name}
                            </h3>

                            <p
                              className="
                                text-white/60
                                text-sm
                                mt-2
                              "
                            >
                              {
                                product.description
                              }
                            </p>

                            <div
                              className="
                                mt-3
                                font-black
                                text-[#8DFF00]
                              "
                            >
                              R
                              {product.price}
                            </div>

                            {product.has_sizes && (

                              <div
                                className="
                                  mt-3
                                  text-xs
                                  text-white/60
                                "
                              >
                                Sizes:
                                {" "}
                                {
                                  product.sizes
                                }
                              </div>

                            )}

                            <div
                              className="
                                mt-4
                                flex
                                flex-col
                                gap-2
                              "
                            >

                              <button
                                onClick={() => {

                                  setEditingId(
                                    product.id
                                  );

                                  setForm({
                                    name:
                                      product.name || "",
                                    description:
                                      product.description || "",
                                    price:
                                      product.price || "",
                                    category:
                                      product.category || "My Merch",
                                    featured:
                                      product.featured || false,
                                    has_sizes:
                                      product.has_sizes || false,
                                    sizes:
                                      product.sizes || "",
                                  });

                                  setImagePreview(
                                    product.image_url || ""
                                  );

                                  window.scrollTo({
                                    top: 0,
                                    behavior:
                                      "smooth",
                                  });

                                }}
                                className="
                                  py-2
                                  rounded-xl
                                  bg-[#8DFF00]
                                  text-black
                                  font-black
                                "
                              >
                                Edit
                              </button>

                              <button
                                onClick={async () => {

                                  await supabase
                                    .from(
                                      "merch_products"
                                    )
                                    .update({
                                      status:
                                        product.status === "active"
                                          ? "hidden"
                                          : "active",
                                    })
                                    .eq(
                                      "id",
                                      product.id
                                    );

                                  fetchProducts();

                                }}
                                className="
                                  py-2
                                  rounded-xl
                                  bg-white/10
                                "
                              >
                                {product.status ===
                                "active"
                                  ? "Hide"
                                  : "Show"}
                              </button>

                              <button
                                onClick={async () => {

                                  const ok =
                                    window.confirm(
                                      "Delete product?"
                                    );

                                  if (!ok)
                                    return;

                                  await supabase
                                    .from(
                                      "merch_products"
                                    )
                                    .delete()
                                    .eq(
                                      "id",
                                      product.id
                                    );

                                  fetchProducts();

                                }}
                                className="
                                  py-2
                                  rounded-xl
                                  bg-red-500/20
                                "
                              >
                                Delete
                              </button>

                            </div>

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
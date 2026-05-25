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

  /* FETCH PRODUCTS */
  const fetchProducts =
    async () => {

      console.log(
        "Fetching products..."
      );

      const {
        data,
        error,
      } =
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

      console.log(
        "FETCH DATA:",
        data
      );

      console.log(
        "FETCH ERROR:",
        error
      );

      if (error) {

        alert(
          error.message
        );

        return;
      }

      if (data) {

        setProducts(data);
      }
    };

  /* GROUP PRODUCTS */
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

  /* HANDLE INPUT */
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

  /* SAVE PRODUCT */
  const saveProduct =
    async () => {

      try {

        if (!form.name) {

          alert(
            "Please add a product name"
          );

          return;
        }

        setLoading(true);

        let imageUrl = "";

        /* IMAGE */
        if (image) {

          const fileName =
            `${Date.now()}-${image.name}`;

          console.log(
            "Uploading image..."
          );

          const {
            data:
              uploadData,
            error:
              uploadError,
          } =
            await supabase.storage
              .from(
                "merch-images"
              )
              .upload(
                fileName,
                image
              );

          console.log(
            "UPLOAD DATA:",
            uploadData
          );

          console.log(
            "UPLOAD ERROR:",
            uploadError
          );

          if (
            uploadError
          ) {

            alert(
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
                "merch-images"
              )
              .getPublicUrl(
                fileName
              );

          imageUrl =
            publicUrl;
        }

        console.log(
          "Creating product..."
        );

        const payload = {
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
        };

        console.log(
          "PAYLOAD:",
          payload
        );

        /* UPDATE */
        if (
          editingId
        ) {

          const {
            error,
          } =
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

          console.log(
            "UPDATE ERROR:",
            error
          );

          if (
            error
          ) {

            alert(
              error.message
            );

            setLoading(
              false
            );

            return;
          }

        } else {

          const {
            data,
            error,
          } =
            await supabase
              .from(
                "merch_products"
              )
              .insert([
                payload,
              ])
              .select();

          console.log(
            "INSERT DATA:",
            data
          );

          console.log(
            "INSERT ERROR:",
            error
          );

          if (
            error
          ) {

            alert(
              error.message
            );

            setLoading(
              false
            );

            return;
          }
        }

        alert(
          "Product created successfully!"
        );

        resetForm();

        fetchProducts();

        setLoading(false);

      } catch (
        err: any
      ) {

        console.error(
          err
        );

        alert(
          err.message
        );

        setLoading(false);
      }
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

      const {
        error,
      } =
        await supabase
          .from(
            "merch_products"
          )
          .delete()
          .eq(
            "id",
            id
          );

      console.log(
        "DELETE ERROR:",
        error
      );

      fetchProducts();
    };

  /* TOGGLE STATUS */
  const toggleStatus =
    async (
      id: number,
      current:
        string
    ) => {

      const {
        error,
      } =
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

      console.log(
        "STATUS ERROR:",
        error
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

      </div>

    </main>
  );
}
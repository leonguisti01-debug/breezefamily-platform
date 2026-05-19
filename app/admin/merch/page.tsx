"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function MerchAdminPage() {

  const [products,
    setProducts] =
    useState<any[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  /* FETCH PRODUCTS */
  const fetchProducts =
    async () => {

      const {
        data,
        error
      } = await supabase
        .from("merch_products")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      if (error) {

        console.log(error);

        return;
      }

      if (data) {

        setProducts(data);

      }

      setLoading(false);
    };

  /* ADD PRODUCT */
  const addProduct =
    async () => {

      const {
        error
      } = await supabase
        .from("merch_products")
        .insert([
          {
            name: "New Product",
            price: "R0",
            category: "Merch",
            status: "active",
          },
        ]);

      if (error) {

        console.log(error);

        alert(
          "Failed to add product."
        );

        return;
      }

      alert(
        "Product added!"
      );

      fetchProducts();
    };

  /* UPDATE */
  const updateField =
    async (
      id: number,
      field: string,
      value: string
    ) => {

      await supabase
        .from("merch_products")
        .update({
          [field]: value,
        })
        .eq("id", id);

      fetchProducts();
    };

  /* TOGGLE STATUS */
  const toggleStatus =
    async (
      id: number,
      currentStatus: string
    ) => {

      const newStatus =
        currentStatus === "active"
          ? "hidden"
          : "active";

      await supabase
        .from("merch_products")
        .update({
          status: newStatus,
        })
        .eq("id", id);

      fetchProducts();
    };

  /* UPLOAD IMAGE */
  const uploadImage =
    async (
      e: any,
      productId: number
    ) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const fileName =
        `${Date.now()}-${file.name}`;

      const {
        error: uploadError
      } = await supabase.storage
        .from("merch")
        .upload(
          fileName,
          file
        );

      if (uploadError) {

        console.log(uploadError);

        alert(
          "Upload failed."
        );

        return;
      }

      const {
        data: publicUrlData,
      } = supabase.storage
        .from("merch")
        .getPublicUrl(
          fileName
        );

      await supabase
        .from("merch_products")
        .update({
          image_url:
            publicUrlData.publicUrl,
        })
        .eq(
          "id",
          productId
        );

      alert(
        "Image uploaded!"
      );

      fetchProducts();
    };

  if (loading) {

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <h1 className="text-4xl font-black uppercase">
          Loading Merch Admin...
        </h1>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

          <div>

            <p className="uppercase tracking-[4px] text-green-300 text-sm">
              Breeze Family
            </p>

            <h1 className="mt-4 text-5xl md:text-7xl font-black uppercase">
              Merch Admin
            </h1>

          </div>

          <button
            onClick={addProduct}
            className="px-8 py-5 rounded-2xl bg-green-400 text-black font-black uppercase"
          >

            Add Product

          </button>

        </div>

        {/* PRODUCTS */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

          {products.map(
            (product) => (
              <div
                key={product.id}
                className="rounded-3xl overflow-hidden bg-white/5 border border-white/10"
              >

                {/* IMAGE */}
                {product.image_url ? (

                  <img
                    src={
                      product.image_url
                    }
                    alt={
                      product.name
                    }
                    className="w-full aspect-square object-cover"
                  />

                ) : (

                  <div className="w-full aspect-square bg-black flex items-center justify-center text-white/30">
                    No Image
                  </div>

                )}

                <div className="p-6">

                  {/* NAME */}
                  <input
                    type="text"
                    defaultValue={
                      product.name
                    }
                    onBlur={(e) =>
                      updateField(
                        product.id,
                        "name",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-4 rounded-2xl bg-black border border-white/10 text-white"
                  />

                  {/* PRICE */}
                  <input
                    type="text"
                    defaultValue={
                      product.price
                    }
                    onBlur={(e) =>
                      updateField(
                        product.id,
                        "price",
                        e.target.value
                      )
                    }
                    className="mt-4 w-full px-4 py-4 rounded-2xl bg-black border border-white/10 text-white"
                  />

                  {/* CATEGORY */}
                  <input
                    type="text"
                    defaultValue={
                      product.category
                    }
                    onBlur={(e) =>
                      updateField(
                        product.id,
                        "category",
                        e.target.value
                      )
                    }
                    className="mt-4 w-full px-4 py-4 rounded-2xl bg-black border border-white/10 text-white"
                  />

                  {/* IMAGE */}
                  <label className="mt-6 block">

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        uploadImage(
                          e,
                          product.id
                        )
                      }
                      className="hidden"
                    />

                    <div className="cursor-pointer py-4 rounded-2xl bg-white text-black text-center font-black uppercase">

                      Upload Product Photo

                    </div>

                  </label>

                  {/* STATUS */}
                  <button
                    onClick={() =>
                      toggleStatus(
                        product.id,
                        product.status
                      )
                    }
                    className={`mt-6 w-full py-4 rounded-2xl font-black uppercase ${
                      product.status ===
                      "active"
                        ? "bg-green-400 text-black"
                        : "bg-red-500 text-white"
                    }`}
                  >

                    {product.status ===
                    "active"
                      ? "Visible On Store"
                      : "Hidden From Store"}

                  </button>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </main>
  );
}
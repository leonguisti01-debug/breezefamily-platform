"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "YOUR_SUPABASE_ANON_KEY"
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

      const { data } =
        await supabase
          .from("merch_products")
          .select("*")
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      if (data)
        setProducts(data);

      setLoading(false);
    };

  /* UPDATE PRICE */
  const updatePrice =
    async (
      id: number,
      price: string
    ) => {

      await supabase
        .from("merch_products")
        .update({
          price,
        })
        .eq("id", id);

      fetchProducts();

      alert("Price updated!");
    };

  /* UPDATE NAME */
  const updateName =
    async (
      id: number,
      name: string
    ) => {

      await supabase
        .from("merch_products")
        .update({
          name,
        })
        .eq("id", id);

      fetchProducts();

      alert("Name updated!");
    };

  /* UPDATE CATEGORY */
  const updateCategory =
    async (
      id: number,
      category: string
    ) => {

      await supabase
        .from("merch_products")
        .update({
          category,
        })
        .eq("id", id);

      fetchProducts();

      alert("Category updated!");
    };

  /* TOGGLE PRODUCT */
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

  /* UPLOAD PRODUCT IMAGE */
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

      await supabase.storage
        .from("merch")
        .upload(
          fileName,
          file
        );

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

      fetchProducts();

      alert("Image uploaded!");
    };

  /* ADD PRODUCT */
  const addProduct =
    async () => {

      await supabase
        .from("merch_products")
        .insert({
          name: "New Product",
          price: "R0",
          category: "Merch",
          status: "active",
        });

      fetchProducts();

      alert("Product added!");
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
            className="px-8 py-5 rounded-2xl bg-green-400 text-black font-black uppercase hover:opacity-90 transition duration-300"
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
                  <div>

                    <p className="uppercase text-xs tracking-[3px] text-white/50">
                      Product Name
                    </p>

                    <input
                      type="text"
                      defaultValue={
                        product.name
                      }
                      onBlur={(e) =>
                        updateName(
                          product.id,
                          e.target.value
                        )
                      }
                      className="mt-3 w-full px-4 py-4 rounded-2xl bg-black border border-white/10 text-white"
                    />

                  </div>

                  {/* PRICE */}
                  <div className="mt-6">

                    <p className="uppercase text-xs tracking-[3px] text-white/50">
                      Price
                    </p>

                    <input
                      type="text"
                      defaultValue={
                        product.price
                      }
                      onBlur={(e) =>
                        updatePrice(
                          product.id,
                          e.target.value
                        )
                      }
                      className="mt-3 w-full px-4 py-4 rounded-2xl bg-black border border-white/10 text-white"
                    />

                  </div>

                  {/* CATEGORY */}
                  <div className="mt-6">

                    <p className="uppercase text-xs tracking-[3px] text-white/50">
                      Category
                    </p>

                    <input
                      type="text"
                      defaultValue={
                        product.category
                      }
                      onBlur={(e) =>
                        updateCategory(
                          product.id,
                          e.target.value
                        )
                      }
                      className="mt-3 w-full px-4 py-4 rounded-2xl bg-black border border-white/10 text-white"
                    />

                  </div>

                  {/* IMAGE UPLOAD */}
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
                    className={`mt-6 w-full py-4 rounded-2xl font-black uppercase transition duration-300 ${
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
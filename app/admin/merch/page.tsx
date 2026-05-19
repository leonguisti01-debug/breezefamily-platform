"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function MerchPage() {

  const [products,
    setProducts] =
    useState<any[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  const [cartCount,
    setCartCount] =
    useState(0);

  useEffect(() => {

    fetchProducts();
    loadCartCount();

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
        .eq(
          "status",
          "active"
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      if (error) {

        console.log(error);

      }

      if (data) {

        setProducts(data);

      }

      setLoading(false);
    };

  /* LOAD CART COUNT */
  const loadCartCount =
    () => {

      const cart =
        JSON.parse(
          localStorage.getItem(
            "cart"
          ) || "[]"
        );

      setCartCount(
        cart.length
      );
    };

  /* ADD TO CART */
  const addToCart =
    (product: any) => {

      const cart =
        JSON.parse(
          localStorage.getItem(
            "cart"
          ) || "[]"
        );

      const existing =
        cart.find(
          (item: any) =>
            item.id ===
            product.id
        );

      if (existing) {

        existing.quantity += 1;

      } else {

        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image_url:
            product.image_url,
          quantity: 1,
        });
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );

      loadCartCount();

      alert(
        `${product.name} added to cart`
      );
    };

  if (loading) {

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <h1 className="text-4xl font-black uppercase">
          Loading Store...
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
              Merch Store
            </h1>

          </div>

          {/* CART BUTTON */}
          <Link
            href="/cart"
            className="inline-flex items-center justify-center px-8 py-5 rounded-2xl bg-green-400 text-black font-black uppercase hover:opacity-90 transition duration-300"
          >

            Cart ({cartCount})

          </Link>

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
                  <h2 className="text-3xl font-black uppercase">
                    {product.name}
                  </h2>

                  {/* CATEGORY */}
                  <p className="mt-3 uppercase tracking-[3px] text-sm text-white/50">
                    {product.category}
                  </p>

                  {/* PRICE */}
                  <p className="mt-6 text-4xl font-black text-green-300">
                    {product.price}
                  </p>

                  {/* BUTTON */}
                  <button
                    onClick={() =>
                      addToCart(
                        product
                      )
                    }
                    className="mt-8 w-full py-4 rounded-2xl bg-green-400 text-black font-black uppercase hover:opacity-90 transition duration-300"
                  >

                    Add To Cart

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
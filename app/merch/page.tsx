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

      const { data } =
        await supabase
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

      if (data)
        setProducts(data);

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
          Loading Merch...
        </h1>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* HERO */}
      <section className="relative px-6 py-24 border-b border-white/10">

        <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto text-center">

          <div className="flex justify-end mb-8">

            <Link
              href="/cart"
              className="px-8 py-4 rounded-2xl bg-green-400 text-black font-black uppercase hover:opacity-90 transition duration-300"
            >

              Cart ({cartCount})

            </Link>

          </div>

          <p className="uppercase tracking-[6px] text-green-300 text-sm font-bold">
            Breeze Family
          </p>

          <h1 className="mt-6 text-6xl md:text-8xl font-black uppercase leading-none">
            Merch Store
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-white/70 text-lg leading-relaxed">
            Official Breeze Family merchandise collection.
            Premium streetwear, lifestyle essentials and
            limited edition drops.
          </p>

        </div>

      </section>

      {/* PRODUCTS */}
      <section className="px-6 py-20">

        <div className="max-w-7xl mx-auto">

          <div className="flex items-center justify-between mb-12">

            <div>

              <p className="uppercase tracking-[4px] text-green-300 text-sm">
                Collection
              </p>

              <h2 className="mt-3 text-5xl font-black uppercase">
                Featured Products
              </h2>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

            {products.map(
              (
                product
              ) => (
                <div
                  key={product.id}
                  className="group rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-green-400/30 transition duration-500"
                >

                  {/* IMAGE */}
                  <div className="relative overflow-hidden bg-black aspect-square">

                    {product.image_url ? (

                      <img
                        src={
                          product.image_url
                        }
                        alt={
                          product.name
                        }
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      />

                    ) : (

                      <div className="w-full h-full flex items-center justify-center text-white/30">
                        No Image
                      </div>

                    )}

                    <div className="absolute top-5 left-5 px-4 py-2 rounded-full bg-green-400 text-black text-xs font-black uppercase tracking-[2px]">
                      Breeze Family
                    </div>

                  </div>

                  {/* CONTENT */}
                  <div className="p-6">

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <h3 className="text-2xl font-black uppercase leading-tight">
                          {product.name}
                        </h3>

                        <p className="mt-3 text-white/60 text-sm uppercase tracking-[3px]">
                          {product.category}
                        </p>

                      </div>

                      <div className="text-2xl font-black text-green-300 whitespace-nowrap">
                        {product.price}
                      </div>

                    </div>

                    {/* ADD TO CART */}
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

      </section>

      {/* BANNER */}
      <section className="px-6 pb-24">

        <div className="max-w-7xl mx-auto rounded-[40px] overflow-hidden border border-white/10 bg-gradient-to-r from-green-500/20 to-black">

          <div className="px-10 py-20 text-center">

            <p className="uppercase tracking-[4px] text-green-300 text-sm">
              Limited Release
            </p>

            <h2 className="mt-5 text-5xl md:text-7xl font-black uppercase leading-tight">
              Wear The Movement
            </h2>

            <p className="mt-8 max-w-3xl mx-auto text-white/70 text-lg leading-relaxed">

              Exclusive merchandise designed for the
              Breeze Family community.

              <br />
              <br />

              More products and collaborations launching soon.

            </p>

          </div>

        </div>

      </section>

    </main>
  );
}
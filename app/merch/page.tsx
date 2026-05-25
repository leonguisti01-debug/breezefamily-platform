"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const BREEZE_GREEN = "#8DFF00";

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
        cart.reduce(
          (
            total: number,
            item: any
          ) =>
            total +
            item.quantity,
          0
        )
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
          category:
            product.category,
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

  /* CATEGORIES */
  const categories = [
    "My Merch",
    "Tech",
    "Fun Stuff",
    "Affiliated",
    "Sponsors",
  ];

  /* GROUP PRODUCTS */
  const groupedProducts =
    useMemo(() => {

      return categories.map(
        (category) => ({

          title: category,

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

  if (loading) {

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <h1
          className="uppercase font-black"
          style={{
            fontSize:
              "clamp(24px, 6vw, 40px)",
          }}
        >
          Loading Store...
        </h1>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* BACKGROUND */}
      <div
        className="fixed top-[-300px] left-[-300px] w-[400px] h-[400px] blur-[160px] rounded-full pointer-events-none"
        style={{
          background: `${BREEZE_GREEN}10`,
        }}
      />

      <div
        className="fixed bottom-[-300px] right-[-300px] w-[400px] h-[400px] blur-[160px] rounded-full pointer-events-none"
        style={{
          background: `${BREEZE_GREEN}08`,
        }}
      />

      {/* HERO */}
      <section className="relative px-4 pt-20 pb-8">

        <div className="max-w-7xl mx-auto">

          {/* TOP BAR */}
          <div className="flex items-start justify-between gap-4 mb-8">

            <div>

              <p
                className="uppercase tracking-[3px] text-[10px]"
                style={{
                  color: BREEZE_GREEN,
                }}
              >
                Breeze Family
              </p>

              <h1
                className="uppercase italic font-black mt-2"
                style={{
                  fontFamily:
                    "Bebas Neue, sans-serif",
                  fontSize:
                    "clamp(42px, 11vw, 90px)",
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
                  STORE
                </span>

              </h1>

            </div>

            <Link
              href="/cart"
              className="
                shrink-0
                px-4
                py-2.5
                rounded-xl
                bg-[#8DFF00]
                text-black
                font-black
                uppercase
                text-[10px]
                tracking-[1px]
              "
            >

              Cart ({cartCount})

            </Link>

          </div>

          {/* DESCRIPTION */}
          <p className="text-white/50 leading-relaxed max-w-xl text-xs">

            Official Breeze Family products,
            lifestyle items, collaborations,
            tech gear and exclusive drops.

          </p>

        </div>

      </section>

      {/* STORE */}
      <section className="px-3 pb-24">

        <div className="max-w-7xl mx-auto">

          {groupedProducts.map(
            (section, index) => (

              <div
                key={index}
                className="mb-12"
              >

                {/* CATEGORY HEADER */}
                <div className="mb-4">

                  <p
                    className="uppercase tracking-[3px] text-[9px]"
                    style={{
                      color: BREEZE_GREEN,
                    }}
                  >
                    Collection
                  </p>

                  <h2
                    className="uppercase italic font-black mt-1"
                    style={{
                      fontFamily:
                        "Bebas Neue, sans-serif",
                      fontSize:
                        "clamp(28px, 7vw, 50px)",
                      lineHeight: "0.9",
                    }}
                  >

                    {section.title}

                  </h2>

                </div>

                {/* EMPTY */}
                {section.items.length ===
                0 ? (

                  <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-8 text-center text-white/40 uppercase tracking-[3px] text-[10px]">

                    Products Coming Soon

                  </div>

                ) : (

                  /* SMALLER MOBILE GRID */
                  <div className="grid grid-cols-2 gap-3">

                    {section.items.map(
                      (
                        product
                      ) => (

                        <div
                          key={
                            product.id
                          }
                          className="
                            rounded-[20px]
                            overflow-hidden
                            border
                            border-white/10
                            bg-white/5
                            backdrop-blur-xl
                          "
                        >

                          {/* IMAGE */}
                          <div className="relative bg-black aspect-square overflow-hidden">

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

                              <div className="w-full h-full flex items-center justify-center text-white/30 text-[9px] uppercase">

                                No Image

                              </div>

                            )}

                            {/* CATEGORY TAG */}
                            <div
                              className="
                                absolute
                                top-2
                                left-2
                                px-2
                                py-1
                                rounded-full
                                text-[7px]
                                font-black
                                uppercase
                                tracking-[1px]
                                bg-black/70
                                backdrop-blur-xl
                              "
                              style={{
                                color:
                                  BREEZE_GREEN,
                                border:
                                  `1px solid ${BREEZE_GREEN}40`,
                              }}
                            >

                              {product.category}

                            </div>

                          </div>

                          {/* CONTENT */}
                          <div className="p-2.5">

                            <h3
                              className="
                                uppercase
                                font-black
                                leading-tight
                                line-clamp-2
                              "
                              style={{
                                fontSize:
                                  "clamp(11px, 3vw, 14px)",
                              }}
                            >

                              {
                                product.name
                              }

                            </h3>

                            {/* PRICE */}
                            <p
                              className="mt-1 font-black"
                              style={{
                                color:
                                  BREEZE_GREEN,
                                fontSize:
                                  "clamp(11px, 3vw, 14px)",
                              }}
                            >

                              {
                                product.price
                              }

                            </p>

                            {/* BUTTON */}
                            <button
                              onClick={() =>
                                addToCart(
                                  product
                                )
                              }
                              className="
                                mt-2
                                w-full
                                py-2
                                rounded-xl
                                bg-[#8DFF00]
                                text-black
                                font-black
                                uppercase
                                text-[9px]
                                tracking-[1px]
                                active:scale-95
                                transition
                              "
                            >

                              Add

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

      </section>

    </main>
  );
}
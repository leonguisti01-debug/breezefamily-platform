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

  /* FETCH */
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

  /* CART */
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

  /* FEATURED */
  const featuredProduct =
    products[0];

  /* GROUP */
  const groupedProducts =
    useMemo(() => {

      const categories = [
        "My Merch",
        "Tech",
        "Fun Stuff",
        "Affiliated",
        "Sponsors",
      ];

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
    <main className="min-h-screen bg-black text-white overflow-x-hidden relative">

      {/* BACKGROUND */}
      <div
        className="fixed top-[-300px] left-[-300px] w-[500px] h-[500px] blur-[180px] rounded-full pointer-events-none"
        style={{
          background:
            `${BREEZE_GREEN}15`,
        }}
      />

      <div
        className="fixed bottom-[-300px] right-[-300px] w-[500px] h-[500px] blur-[180px] rounded-full pointer-events-none"
        style={{
          background:
            `${BREEZE_GREEN}10`,
        }}
      />

      {/* HERO */}
      <section className="relative z-20 px-5 pt-24 md:pt-32 pb-20">

        <div className="max-w-7xl mx-auto">

          {/* TOP */}
          <div className="flex items-center justify-between gap-4 flex-wrap">

            <div>

              <p
                className="uppercase tracking-[4px] text-[10px] font-black"
                style={{
                  color:
                    BREEZE_GREEN,
                }}
              >

                OFFICIAL BREEZE FAMILY STORE

              </p>

              <h1
                className="
                  mt-3
                  uppercase
                  italic
                  font-black
                  leading-[0.85]
                "
                style={{
                  fontFamily:
                    "Bebas Neue, sans-serif",
                  fontSize:
                    "clamp(70px, 12vw, 170px)",
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

                  DROP

                </span>

              </h1>

            </div>

            {/* CART */}
            <Link
              href="/cart"
              className="
                shrink-0
                px-6
                py-4
                rounded-2xl
                bg-[#8DFF00]
                text-black
                font-black
                uppercase
                tracking-[2px]
                text-xs
                shadow-[0_0_30px_rgba(141,255,0,0.35)]
              "
            >

              CART ({cartCount})

            </Link>

          </div>

          {/* DESC */}
          <p className="mt-8 text-white/60 leading-relaxed max-w-2xl text-sm md:text-lg">

            Official Breeze Family merchandise,
            limited drops, collaborations and exclusive
            creator collections.

          </p>

        </div>

      </section>

      {/* FEATURED PRODUCT */}
      {featuredProduct && (

        <section className="relative z-20 px-5 pb-20">

          <div className="max-w-7xl mx-auto">

            <div
              className="
                relative
                overflow-hidden
                rounded-[40px]
                border
                border-white/10
                bg-white/5
                backdrop-blur-2xl
              "
            >

              <div className="grid lg:grid-cols-2 items-center">

                {/* IMAGE */}
                <div className="relative min-h-[420px] md:min-h-[650px]">

                  <img
                    src={
                      featuredProduct.image_url
                    }
                    alt={
                      featuredProduct.name
                    }
                    className="
                      absolute
                      inset-0
                      w-full
                      h-full
                      object-cover
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

                </div>

                {/* CONTENT */}
                <div className="p-8 md:p-14">

                  <p
                    className="uppercase tracking-[4px] text-[10px] font-black"
                    style={{
                      color:
                        BREEZE_GREEN,
                    }}
                  >

                    FEATURED DROP

                  </p>

                  <h2
                    className="
                      mt-5
                      uppercase
                      italic
                      font-black
                      leading-[0.9]
                    "
                    style={{
                      fontFamily:
                        "Bebas Neue, sans-serif",
                      fontSize:
                        "clamp(60px, 8vw, 120px)",
                    }}
                  >

                    {
                      featuredProduct.name
                    }

                  </h2>

                  <p className="mt-6 text-white/60 leading-relaxed text-sm md:text-lg">

                    Premium Breeze Family merchandise
                    designed for the movement.
                    Limited availability while stock lasts.

                  </p>

                  <h3
                    className="mt-8 font-black"
                    style={{
                      fontSize:
                        "clamp(40px, 5vw, 70px)",
                    }}
                  >

                    R{
                      featuredProduct.price
                    }

                  </h3>

                  <button
                    onClick={() =>
                      addToCart(
                        featuredProduct
                      )
                    }
                    className="
                      mt-8
                      px-10
                      py-5
                      rounded-2xl
                      bg-[#8DFF00]
                      text-black
                      font-black
                      uppercase
                      tracking-[3px]
                      text-sm
                      hover:scale-[1.02]
                      transition
                      shadow-[0_0_40px_rgba(141,255,0,0.35)]
                    "
                  >

                    BUY NOW

                  </button>

                </div>

              </div>

            </div>

          </div>

        </section>

      )}

      {/* COLLECTIONS */}
      <section className="relative z-20 px-5 pb-28">

        <div className="max-w-7xl mx-auto space-y-16">

          {groupedProducts.map(
            (
              section,
              index
            ) => {

              if (
                section.items
                  .length === 0
              )
                return null;

              return (

                <div
                  key={index}
                >

                  {/* TITLE */}
                  <div className="flex items-end justify-between gap-4 flex-wrap">

                    <div>

                      <p
                        className="uppercase tracking-[4px] text-[10px] font-black"
                        style={{
                          color:
                            BREEZE_GREEN,
                        }}
                      >

                        COLLECTION

                      </p>

                      <h2
                        className="
                          mt-2
                          uppercase
                          italic
                          font-black
                          leading-none
                        "
                        style={{
                          fontFamily:
                            "Bebas Neue, sans-serif",
                          fontSize:
                            "clamp(50px, 7vw, 100px)",
                        }}
                      >

                        {
                          section.title
                        }

                      </h2>

                    </div>

                    <div
                      className="
                        px-5
                        py-3
                        rounded-full
                        bg-white/5
                        border
                        border-white/10
                        uppercase
                        text-[10px]
                        tracking-[2px]
                        font-black
                      "
                    >

                      {
                        section.items
                          .length
                      } Products

                    </div>

                  </div>

                  {/* PRODUCTS */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {section.items.map(
                      (
                        product
                      ) => (

                        <div
                          key={
                            product.id
                          }
                          className="
                            group
                            relative
                            overflow-hidden
                            rounded-[32px]
                            border
                            border-white/10
                            bg-white/5
                            backdrop-blur-xl
                          "
                        >

                          {/* IMAGE */}
                          <div className="relative h-[360px] overflow-hidden">

                            <img
                              src={
                                product.image_url
                              }
                              alt={
                                product.name
                              }
                              className="
                                w-full
                                h-full
                                object-cover
                                group-hover:scale-105
                                transition
                                duration-500
                              "
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                          </div>

                          {/* CONTENT */}
                          <div className="p-6">

                            <h3
                              className="
                                uppercase
                                italic
                                font-black
                                leading-none
                              "
                              style={{
                                fontFamily:
                                  "Bebas Neue, sans-serif",
                                fontSize:
                                  "clamp(36px, 5vw, 60px)",
                              }}
                            >

                              {
                                product.name
                              }

                            </h3>

                            <div className="flex items-center justify-between mt-6 gap-4">

                              <p
                                className="font-black"
                                style={{
                                  fontSize:
                                    "clamp(24px, 4vw, 36px)",
                                }}
                              >

                                R{
                                  product.price
                                }

                              </p>

                              <button
                                onClick={() =>
                                  addToCart(
                                    product
                                  )
                                }
                                className="
                                  px-6
                                  py-3
                                  rounded-xl
                                  bg-[#8DFF00]
                                  text-black
                                  font-black
                                  uppercase
                                  tracking-[2px]
                                  text-xs
                                  hover:scale-105
                                  transition
                                "
                              >

                                BUY NOW

                              </button>

                            </div>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                </div>

              );
            }
          )}

        </div>

      </section>

    </main>
  );
}
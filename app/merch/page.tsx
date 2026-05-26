"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const BREEZE_GREEN = "#8DFF00";

const APPAREL_SIZES = [
  "S",
  "M",
  "L",
  "XL",
  "2XL",
  "3XL",
];

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

  const [selectedSizes,
    setSelectedSizes] =
    useState<Record<string, string>>({});

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

  /* APPAREL CHECK */
  const isApparel =
    (product: any) => {

      const name =
        product.name?.toLowerCase() || "";

      return (
        name.includes("hoodie") ||
        name.includes("shirt") ||
        name.includes("tee")
      );
    };

  /* ADD TO CART */
  const addToCart =
    (product: any) => {

      const apparel =
        isApparel(product);

      const selectedSize =
        selectedSizes[
          product.id
        ];

      if (
        apparel &&
        !selectedSize
      ) {

        alert(
          "Please select a size."
        );

        return;
      }

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
              product.id &&
            item.size ===
              selectedSize
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
          size:
            selectedSize || null,
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

  /* GROUP */
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

      {/* BG */}
      <div
        className="fixed top-[-300px] left-[-300px] w-[400px] h-[400px] blur-[160px] rounded-full pointer-events-none"
        style={{
          background:
            `${BREEZE_GREEN}10`,
        }}
      />

      <div
        className="fixed bottom-[-300px] right-[-300px] w-[400px] h-[400px] blur-[160px] rounded-full pointer-events-none"
        style={{
          background:
            `${BREEZE_GREEN}08`,
        }}
      />

      {/* HERO */}
      <section className="relative px-4 pt-20 pb-10">

        <div className="max-w-7xl mx-auto">

          {/* TOP */}
          <div className="flex items-start justify-between gap-4">

            <div>

              <p
                className="uppercase tracking-[3px] text-[10px]"
                style={{
                  color:
                    BREEZE_GREEN,
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

          {/* DESC */}
          <p className="mt-5 text-white/50 leading-relaxed text-xs max-w-md">

            Browse collections, collaborations,
            exclusive drops and official
            Breeze Family merchandise.

          </p>

        </div>

      </section>

      {/* COLLECTIONS */}
      <section className="px-4 pb-24">

        <div className="max-w-7xl mx-auto space-y-5">

          {groupedProducts.map(
            (
              section,
              index
            ) => {

              const preview =
                section.items.slice(
                  0,
                  4
                );

              return (

                <div
                  key={index}
                  className="
                    block
                    rounded-[28px]
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-xl
                    overflow-hidden
                  "
                >

                  <Link
                    href={`/merch/${encodeURIComponent(
                      section.title
                    )}`}
                  >

                    <div className="p-5">

                      {/* TOP */}
                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <p
                            className="uppercase tracking-[3px] text-[9px]"
                            style={{
                              color:
                                BREEZE_GREEN,
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
                                "clamp(32px, 8vw, 60px)",
                              lineHeight:
                                "0.9",
                            }}
                          >

                            {
                              section.title
                            }

                          </h2>

                        </div>

                        <div
                          className="
                            px-3
                            py-2
                            rounded-full
                            bg-[#8DFF00]
                            text-black
                            text-[10px]
                            uppercase
                            tracking-[1px]
                            font-black
                            shrink-0
                          "
                        >

                          {
                            section.items
                              .length
                          } Products

                        </div>

                      </div>

                      {/* PREVIEW */}
                      <div className="mt-5 flex items-start gap-3 overflow-x-auto no-scrollbar">

                        {preview.length ===
                        0 ? (

                          <div className="text-white/30 uppercase text-[10px] tracking-[2px] py-6">

                            Products Coming Soon

                          </div>

                        ) : (

                          preview.map(
                            (
                              product
                            ) => {

                              const apparel =
                                isApparel(
                                  product
                                );

                              return (

                                <div
                                  key={
                                    product.id
                                  }
                                  className="
                                    shrink-0
                                    w-[90px]
                                  "
                                >

                                  <div className="w-[90px] h-[90px] rounded-[22px] overflow-hidden bg-black border border-white/10">

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

                                      <div className="w-full h-full flex items-center justify-center text-white/30 text-[8px] uppercase">

                                        No Image

                                      </div>

                                    )}

                                  </div>

                                  <p className="mt-2 text-[9px] uppercase leading-tight font-black line-clamp-2 text-white/70">

                                    {
                                      product.name
                                    }

                                  </p>

                                  {/* SIZE SELECTOR */}
                                  {apparel && (

                                    <div className="mt-2 flex flex-wrap gap-1">

                                      {APPAREL_SIZES.map(
                                        (
                                          size
                                        ) => (

                                          <button
                                            key={
                                              size
                                            }
                                            onClick={(
                                              e
                                            ) => {

                                              e.preventDefault();

                                              setSelectedSizes(
                                                (
                                                  prev
                                                ) => ({
                                                  ...prev,
                                                  [product.id]:
                                                    size,
                                                })
                                              );
                                            }}
                                            className={`
                                              px-1.5
                                              py-1
                                              rounded-md
                                              text-[7px]
                                              font-black
                                              border
                                              uppercase
                                              ${
                                                selectedSizes[
                                                  product.id
                                                ] ===
                                                size
                                                  ? "bg-[#8DFF00] text-black border-[#8DFF00]"
                                                  : "bg-black text-white border-white/10"
                                              }
                                            `}
                                          >

                                            {
                                              size
                                            }

                                          </button>

                                        )
                                      )}

                                    </div>

                                  )}

                                  {/* ADD */}
                                  <button
                                    onClick={(
                                      e
                                    ) => {

                                      e.preventDefault();

                                      addToCart(
                                        product
                                      );
                                    }}
                                    className="
                                      mt-2
                                      w-full
                                      py-2
                                      rounded-xl
                                      bg-[#8DFF00]
                                      text-black
                                      font-black
                                      uppercase
                                      text-[8px]
                                      tracking-[1px]
                                    "
                                  >

                                    Add

                                  </button>

                                </div>

                              );
                            }
                          )

                        )}

                      </div>

                    </div>

                  </Link>

                </div>

              );
            }
          )}

        </div>

      </section>

    </main>
  );
}
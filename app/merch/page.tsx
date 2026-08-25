"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const CATEGORIES = [
  "All",
  "My Merch",
  "Tech",
  "Fun Stuff",
  "Affiliated",
  "Sponsors",
];

type Product = {
  id: number;
  name: string;
  price: string;
  image_url: string;
  category: string;
  description?: string;
  sizes?: string[];
  has_sizes?: boolean;
};

export default function MerchPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [cartCount, setCartCount] = useState(0);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [addedProductId, setAddedProductId] =
    useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
    loadCartCount();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("merch_products")
      .select("*")
      .eq("status", "active")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Error loading merch:", error);
    }

    setProducts((data || []) as Product[]);
    setLoading(false);
  }

  function loadCartCount() {
    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const count = cart.reduce(
      (total: number, item: any) =>
        total + item.quantity,
      0
    );

    setCartCount(count);
  }

  function openProduct(product: Product) {
    setSelectedProduct(product);

    // IMPORTANT:
    // Never automatically select the first size.
    // Customer must choose their own size.
    setSelectedSize("");

    setQuantity(1);
  }

  function closeProduct() {
    setSelectedProduct(null);
    setSelectedSize("");
    setQuantity(1);
  }

  function addToCart(
    product: Product,
    qty = 1,
    size = ""
  ) {
    /*
      Extra safety:
      A sized product cannot be added
      unless a size was deliberately selected.
    */
    if (product.has_sizes && !size) {
      openProduct(product);
      return;
    }

    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existing = cart.find(
      (item: any) =>
        item.id === product.id &&
        item.size === size
    );

    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        category: product.category,
        quantity: qty,
        size,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    loadCartCount();

    setAddedProductId(product.id);

    window.setTimeout(() => {
      setAddedProductId(null);
    }, 1200);
  }

  function handleCardAdd(product: Product) {
    /*
      Any product marked has_sizes
      must first open the product modal.
    */
    if (product.has_sizes) {
      openProduct(product);
      return;
    }

    addToCart(product);
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        category === "All" ||
        product.category === category;

      const query = search.trim().toLowerCase();

      const searchMatch =
        !query ||
        product.name
          ?.toLowerCase()
          .includes(query) ||
        product.category
          ?.toLowerCase()
          .includes(query) ||
        product.description
          ?.toLowerCase()
          .includes(query);

      return categoryMatch && searchMatch;
    });
  }, [products, category, search]);

  const productRequiresSize =
    selectedProduct?.has_sizes === true;

  const productHasSizeOptions =
    productRequiresSize &&
    Array.isArray(selectedProduct?.sizes) &&
    selectedProduct.sizes.length > 0;

  const canAddSelectedProduct =
    !productRequiresSize ||
    (productHasSizeOptions &&
      selectedSize !== "");

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#8DFF00]" />

          <div className="text-xs font-black uppercase tracking-[0.25em] text-white/40">
            Loading Store
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-48 h-[500px] w-[500px] rounded-full bg-[#8DFF00]/10 blur-[140px]" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-[1450px] px-5 py-10 sm:px-6 lg:px-8 lg:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#8DFF00]/25 bg-[#8DFF00]/5 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-[#8DFF00]" />

                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#8DFF00]">
                  Official Breeze Family Merch
                </span>
              </div>

              <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                Wear The
                <br />

                <span className="text-[#8DFF00]">
                  Family.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-white/50 sm:text-base">
                More than merch. You&apos;re part of
                something.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#shop"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#8DFF00] px-6 text-xs font-black uppercase tracking-wide text-black transition hover:bg-white"
              >
                Shop Collection
              </a>

              <Link
                href="/cart"
                className="inline-flex h-12 items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-5 text-xs font-black uppercase tracking-wide transition hover:bg-white/[0.07]"
              >
                Cart

                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#8DFF00] px-2 text-[10px] text-black">
                  {cartCount}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section
        id="shop"
        className="scroll-mt-24"
      >
        <div className="mx-auto max-w-[1450px] px-5 py-10 sm:px-6 lg:px-8">
          {/* HEADER */}
          <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#8DFF00]">
                Shop The Collection
              </div>

              <h2 className="text-3xl font-black uppercase tracking-[-0.03em] sm:text-4xl">
                Find Your Gear.
              </h2>
            </div>

            {/* SEARCH */}
            <div className="relative w-full md:w-[330px]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search products..."
                className="h-12 w-full rounded-xl border border-white/10 bg-[#0D0D0D] pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#8DFF00]/40"
              />
            </div>
          </div>

          {/* FILTERS */}
          <div className="mb-8 flex gap-2 overflow-x-auto border-y border-white/10 py-3">
            {CATEGORIES.map((item) => {
              const active =
                category === item;

              return (
                <button
                  key={item}
                  onClick={() =>
                    setCategory(item)
                  }
                  className={`shrink-0 rounded-full px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.08em] transition ${
                    active
                      ? "bg-[#8DFF00] text-black"
                      : "border border-white/10 bg-[#0D0D0D] text-white/60 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* PRODUCTS */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map(
                (product) => (
                  <article
                    key={product.id}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0D0D0D] transition duration-300 hover:-translate-y-1 hover:border-white/20"
                  >
                    {/* PRODUCT IMAGE */}
                    <button
                      onClick={() =>
                        openProduct(product)
                      }
                      className="relative block w-full overflow-hidden bg-[#111]"
                    >
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                      />

                      <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/70 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-white/70">
                        {product.category}
                      </span>
                    </button>

                    {/* PRODUCT DETAILS */}
                    <div className="p-4">
                      <button
                        onClick={() =>
                          openProduct(product)
                        }
                        className="block w-full text-left"
                      >
                        <h3 className="text-sm font-black uppercase leading-5">
                          {product.name}
                        </h3>
                      </button>

                      <div className="mt-2 text-xl font-black text-[#8DFF00]">
                        R{product.price}
                      </div>

                      <button
                        onClick={() =>
                          handleCardAdd(product)
                        }
                        className={`mt-4 h-11 w-full rounded-xl text-[10px] font-black uppercase tracking-[0.08em] transition ${
                          addedProductId ===
                          product.id
                            ? "bg-white text-black"
                            : "bg-[#8DFF00] text-black hover:bg-white"
                        }`}
                      >
                        {addedProductId ===
                        product.id
                          ? "Added"
                          : product.has_sizes
                          ? "Select Size"
                          : "Add To Cart"}
                      </button>
                    </div>
                  </article>
                )
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center">
              <h3 className="text-lg font-black uppercase">
                No Products Found
              </h3>

              <p className="mt-2 text-sm text-white/40">
                Try another category or search.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-5 rounded-full bg-[#8DFF00] px-5 py-2.5 text-xs font-black uppercase text-black"
              >
                View All
              </button>
            </div>
          )}
        </div>
      </section>

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (
              e.target === e.currentTarget
            ) {
              closeProduct();
            }
          }}
        >
          <div className="max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0D0D0D] shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
            <div className="grid lg:grid-cols-2">
              {/* IMAGE */}
              <div className="overflow-hidden bg-[#111]">
                <img
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                  className="aspect-square h-full w-full object-cover"
                />
              </div>

              {/* DETAILS */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8DFF00]">
                      {
                        selectedProduct.category
                      }
                    </div>

                    <h2 className="mt-3 text-3xl font-black uppercase leading-[0.95] tracking-[-0.04em]">
                      {selectedProduct.name}
                    </h2>
                  </div>

                  <button
                    onClick={closeProduct}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black text-xl text-white transition hover:bg-white hover:text-black"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>

                <div className="mt-4 text-3xl font-black text-[#8DFF00]">
                  R{selectedProduct.price}
                </div>

                {selectedProduct.description && (
                  <p className="mt-5 text-sm leading-6 text-white/50">
                    {
                      selectedProduct.description
                    }
                  </p>
                )}

                {/* SIZE SELECTION */}
                {productRequiresSize && (
                  <div className="mt-7 border-t border-white/10 pt-6">
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <div className="text-xs font-black uppercase tracking-[0.08em]">
                        Select Your Size
                      </div>

                      {selectedSize && (
                        <div className="text-xs font-bold text-[#8DFF00]">
                          {selectedSize}
                        </div>
                      )}
                    </div>

                    {productHasSizeOptions ? (
                      <>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.sizes!.map(
                            (size) => (
                              <button
                                key={size}
                                onClick={() =>
                                  setSelectedSize(
                                    size
                                  )
                                }
                                className={`min-w-[56px] rounded-xl border px-4 py-3 text-xs font-black uppercase transition ${
                                  selectedSize ===
                                  size
                                    ? "border-[#8DFF00] bg-[#8DFF00] text-black"
                                    : "border-white/10 bg-black text-white/60 hover:border-white/30 hover:text-white"
                                }`}
                              >
                                {size}
                              </button>
                            )
                          )}
                        </div>

                        {!selectedSize && (
                          <p className="mt-3 text-xs text-white/35">
                            Please choose a size
                            before adding this item
                            to your cart.
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="rounded-xl border border-[#8DFF00]/20 bg-[#8DFF00]/5 p-4 text-sm text-white/60">
                        This product requires a
                        size, but no sizes are
                        currently available.
                      </div>
                    )}
                  </div>
                )}

                {/* QUANTITY */}
                <div className="mt-7 border-t border-white/10 pt-6">
                  <div className="mb-3 text-xs font-black uppercase tracking-[0.08em]">
                    Quantity
                  </div>

                  <div className="flex w-fit overflow-hidden rounded-xl border border-white/10 bg-black">
                    <button
                      onClick={() =>
                        setQuantity(
                          Math.max(
                            1,
                            quantity - 1
                          )
                        )
                      }
                      className="h-11 w-11 text-lg text-white/60 transition hover:bg-white/10 hover:text-white"
                    >
                      −
                    </button>

                    <div className="flex h-11 w-12 items-center justify-center border-x border-white/10 font-black">
                      {quantity}
                    </div>

                    <button
                      onClick={() =>
                        setQuantity(
                          quantity + 1
                        )
                      }
                      className="h-11 w-11 text-lg text-white/60 transition hover:bg-white/10 hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* ADD TO CART */}
                <button
                  onClick={() => {
                    if (
                      !canAddSelectedProduct
                    ) {
                      return;
                    }

                    addToCart(
                      selectedProduct,
                      quantity,
                      selectedSize
                    );

                    closeProduct();
                  }}
                  disabled={
                    !canAddSelectedProduct
                  }
                  className="mt-8 h-14 w-full rounded-xl bg-[#8DFF00] text-sm font-black uppercase tracking-[0.06em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/25"
                >
                  {productRequiresSize &&
                  !selectedSize
                    ? "Select A Size"
                    : `Add To Cart · R${(
                        Number(
                          selectedProduct.price
                        ) * quantity
                      ).toLocaleString(
                        "en-ZA"
                      )}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
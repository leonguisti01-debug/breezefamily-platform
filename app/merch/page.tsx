"use client";

import { useEffect, useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

const CLOTHING_SIZES = ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"];

const COLLECTIONS = ["Hoodies", "Tees", "Caps", "Mugs", "Accessories"];

type Product = {
  id: number;
  name: string;
  price: string;
  image_url: string;
  image_gallery?: string[];
  category: string;
  description?: string;
  featured?: boolean;
  has_sizes?: boolean;
  sizes?: string[];
  breeze_points?: number;
  limited_drop?: boolean;
};

function ProductCard({
  product,
  cardSizes,
  setCardSizes,
  openProduct,
  addToCart,
}: {
  product: Product;
  cardSizes: Record<number, string>;
  setCardSizes: Dispatch<SetStateAction<Record<number, string>>>;
  openProduct: (product: Product) => void;
  addToCart: (product: Product, qty?: number, size?: string) => void;
}) {
  const displaySizes = product.sizes?.length ? product.sizes : CLOTHING_SIZES;

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#101010] shadow-2xl shadow-black/30 transition duration-300 hover:-translate-y-1 hover:border-[#8DFF00]/50">
      <button
        onClick={() => openProduct(product)}
        className="relative block w-full overflow-hidden bg-white/5"
      >
        <img
          src={product.image_url}
          alt={product.name}
          className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/80 to-transparent p-4">
          {product.limited_drop ? (
            <span className="rounded-full bg-red-500 px-3 py-1 text-[10px] font-black uppercase tracking-[1px] text-white">
              Limited Drop
            </span>
          ) : (
            <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[1px] text-white backdrop-blur">
              {product.category}
            </span>
          )}

          <span className="rounded-full bg-black/60 px-3 py-1 text-[10px] font-black uppercase tracking-[1px] text-white/80 backdrop-blur">
            {product.breeze_points || 0} pts
          </span>
        </div>
      </button>

      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="min-h-[40px] text-sm font-black uppercase leading-tight text-white">
            {product.name}
          </h3>

          <div className="shrink-0 text-xl font-black text-[#8DFF00]">
            R{product.price}
          </div>
        </div>

        {product.has_sizes && (
          <select
            value={cardSizes[product.id] || displaySizes[0] || "M"}
            onChange={(e) =>
              setCardSizes((prev) => ({
                ...prev,
                [product.id]: e.target.value,
              }))
            }
            className="mt-4 h-11 w-full rounded-xl border border-white/10 bg-black px-3 text-sm font-bold text-white outline-none transition focus:border-[#8DFF00]"
          >
            {displaySizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={() => addToCart(product, 1, cardSizes[product.id])}
          className="mt-4 h-12 w-full rounded-xl bg-[#8DFF00] text-xs font-black uppercase tracking-[1.5px] text-black transition hover:bg-white active:scale-[0.98]"
        >
          Add To Cart
        </button>
      </div>
    </article>
  );
}

export default function MerchPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cardSizes, setCardSizes] = useState<Record<number, string>>({});

  useEffect(() => {
    fetchProducts();
    loadCartCount();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("merch_products")
      .select("*")
      .eq("status", "active")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (data) {
      setProducts(data as Product[]);

      const defaults: Record<number, string> = {};

      data.forEach((product: any) => {
        if (product.has_sizes) {
          defaults[product.id] = product.sizes?.[0] || "M";
        }
      });

      setCardSizes(defaults);
    }

    setLoading(false);
  };

  const loadCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    setCartCount(
      cart.reduce((total: number, item: any) => total + item.quantity, 0)
    );
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedImage(product.image_url);
    setQuantity(1);
    setSelectedSize(product.has_sizes ? product.sizes?.[0] || "M" : "");
  };

  const closeProduct = () => {
    setSelectedProduct(null);
    setSelectedImage("");
    setSelectedSize("");
    setQuantity(1);
  };

  const addToCart = (product: Product, qty = 1, size?: string) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const chosenSize = size || selectedSize || null;

    const existing = cart.find(
      (item: any) => item.id === product.id && item.size === chosenSize
    );

    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        quantity: qty,
        category: product.category,
        size: chosenSize,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartCount();
  };

  const featuredProduct = products.find((p) => p.featured) || products[0];
  const categories = ["All", ...COLLECTIONS];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;

    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  const bestSellers = products.slice(0, 8);
  const modalGallery = selectedProduct
    ? [selectedProduct.image_url, ...(selectedProduct.image_gallery || [])]
    : [];

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] text-white">
        <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto mb-6 h-14 w-14 animate-spin rounded-full border-4 border-white/10 border-t-[#8DFF00]" />
            <h1 className="text-4xl font-black uppercase">Loading Store</h1>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="relative min-h-[88vh] overflow-hidden">
        {featuredProduct && (
          <img
            src={featuredProduct.image_url}
            alt={featuredProduct.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/78 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-6 py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[4px] text-[#8DFF00]">
              Official Breeze Merch
            </p>

            <h1 className="mt-5 max-w-[900px] text-[64px] font-black uppercase leading-[0.86] tracking-normal text-white sm:text-[96px] lg:text-[142px]">
              Wear The Family
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">
              Premium everyday gear, limited drops and family-first pieces made
              for the Breeze crew.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() =>
                  document
                    .getElementById("all-products")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="h-14 rounded-xl bg-[#8DFF00] px-7 text-sm font-black uppercase tracking-[1.5px] text-black transition hover:bg-white"
              >
                Shop Collection
              </button>

              <Link
                href="/cart"
                className="inline-flex h-14 items-center rounded-xl border border-white/20 bg-white/5 px-7 text-sm font-black uppercase tracking-[1.5px] text-white transition hover:border-white/40 hover:bg-white/10"
              >
                Cart ({cartCount})
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[4px] text-[#8DFF00]">
                Browse
              </p>
              <h2 className="mt-3 text-4xl font-black uppercase leading-none md:text-6xl">
                Shop By Collection
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-white/55">
              Choose a category and jump straight into the pieces made for that
              part of the family fit.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {COLLECTIONS.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="group relative h-[190px] overflow-hidden rounded-2xl border border-white/10 bg-[#111] p-5 text-left transition hover:-translate-y-1 hover:border-[#8DFF00]/60"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(141,255,0,0.18),transparent_38%)] opacity-0 transition group-hover:opacity-100" />
                <div className="relative flex h-full flex-col justify-between">
                  <span className="text-xs font-black uppercase tracking-[2px] text-white/45">
                    Collection
                  </span>
                  <h3 className="text-2xl font-black uppercase leading-none">
                    {category}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="text-4xl font-black uppercase leading-none md:text-6xl">
              Best Sellers
            </h2>

            <div className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[2px] text-white/75">
              Earn Breeze Points
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                cardSizes={cardSizes}
                setCardSizes={setCardSizes}
                openProduct={openProduct}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="all-products" className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-6">
            <h2 className="text-4xl font-black uppercase leading-none md:text-6xl">
              All Products
            </h2>

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`h-11 rounded-full px-5 text-xs font-black uppercase tracking-[1.5px] transition ${
                    selectedCategory === category
                      ? "bg-[#8DFF00] text-black"
                      : "border border-white/10 bg-white/5 text-white/75 hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {filteredProducts.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  cardSizes={cardSizes}
                  setCardSizes={setCardSizes}
                  openProduct={openProduct}
                  addToCart={addToCart}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
              <h3 className="text-2xl font-black uppercase">Nothing here yet</h3>
              <p className="mt-3 text-white/55">
                Try another collection or add products to this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101010]">
            <div className="grid gap-0 lg:grid-cols-[1.15fr_1fr]">
              <div className="p-8 md:p-10">
                <p className="text-xs font-black uppercase tracking-[4px] text-[#8DFF00]">
                  Members Perk
                </p>
                <h2 className="mt-4 text-4xl font-black uppercase leading-none md:text-6xl">
                  Earn Breeze Points
                </h2>
                <p className="mt-5 max-w-xl text-white/60">
                  Every merch order helps build up points you can use on future
                  drops.
                </p>
              </div>

              <div className="grid grid-cols-2 border-t border-white/10 lg:border-l lg:border-t-0">
                {["Buy Merch", "Earn Points", "Redeem Points", "Save Money"].map(
                  (item, index) => (
                    <div
                      key={item}
                      className="border-b border-r border-white/10 p-6 last:border-r-0"
                    >
                      <div className="mb-8 text-sm font-black text-[#8DFF00]">
                        0{index + 1}
                      </div>
                      <div className="font-black uppercase">{item}</div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedProduct && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/88 p-4 backdrop-blur-xl">
          <div className="max-h-[92vh] w-full max-w-5xl overflow-auto rounded-2xl border border-white/10 bg-[#101010] shadow-2xl shadow-black">
            <div className="grid lg:grid-cols-2">
              <div className="bg-black">
                <img
                  src={selectedImage}
                  alt={selectedProduct.name}
                  className="aspect-square w-full object-cover lg:h-full"
                />

                {modalGallery.length > 1 && (
                  <div className="grid grid-cols-5 gap-2 p-3">
                    {modalGallery.map((image) => (
                      <button
                        key={image}
                        onClick={() => setSelectedImage(image)}
                        className={`overflow-hidden rounded-lg border ${
                          selectedImage === image
                            ? "border-[#8DFF00]"
                            : "border-white/10"
                        }`}
                      >
                        <img
                          src={image}
                          alt=""
                          className="aspect-square w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[2px] text-white/60">
                    {selectedProduct.category}
                  </span>

                  <button
                    onClick={closeProduct}
                    className="h-10 rounded-full border border-white/10 px-4 text-xs font-black uppercase tracking-[1.5px] text-white/60 transition hover:border-white/30 hover:text-white"
                  >
                    Close
                  </button>
                </div>

                <h2 className="mt-6 text-4xl font-black uppercase leading-none md:text-5xl">
                  {selectedProduct.name}
                </h2>

                <div className="mt-4 text-4xl font-black text-[#8DFF00]">
                  R{selectedProduct.price}
                </div>

                {selectedProduct.description && (
                  <p className="mt-6 leading-7 text-white/60">
                    {selectedProduct.description}
                  </p>
                )}

                {selectedProduct.has_sizes && (
                  <div className="mt-8">
                    <div className="mb-3 text-xs font-black uppercase tracking-[2px] text-white/45">
                      Size
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(selectedProduct.sizes?.length
                        ? selectedProduct.sizes
                        : CLOTHING_SIZES
                      ).map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`h-11 min-w-12 rounded-xl border px-4 text-sm font-black transition ${
                            selectedSize === size
                              ? "border-[#8DFF00] bg-[#8DFF00] text-black"
                              : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8">
                  <div className="mb-3 text-xs font-black uppercase tracking-[2px] text-white/45">
                    Quantity
                  </div>
                  <div className="flex w-fit overflow-hidden rounded-xl border border-white/10 bg-black">
                    <button
                      onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                      className="h-12 w-12 text-xl font-black text-white/70 hover:bg-white/10"
                    >
                      -
                    </button>
                    <div className="flex h-12 w-14 items-center justify-center font-black">
                      {quantity}
                    </div>
                    <button
                      onClick={() => setQuantity((current) => current + 1)}
                      className="h-12 w-12 text-xl font-black text-white/70 hover:bg-white/10"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToCart(selectedProduct, quantity, selectedSize);
                    closeProduct();
                  }}
                  className="mt-8 h-14 w-full rounded-xl bg-[#8DFF00] text-sm font-black uppercase tracking-[1.5px] text-black transition hover:bg-white active:scale-[0.98]"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

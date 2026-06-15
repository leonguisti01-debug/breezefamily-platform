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

  const [selectedSize, setSelectedSize] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  useEffect(() => {
    fetchProducts();
    loadCartCount();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase
      .from("merch_products")
      .select("*")
      .eq("status", "active")
      .order("created_at", {
        ascending: false,
      });

    setProducts(
      (data || []) as Product[]
    );

    setLoading(false);
  }

  function loadCartCount() {
    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const count = cart.reduce(
      (
        total: number,
        item: any
      ) => total + item.quantity,
      0
    );

    setCartCount(count);
  }

  function openProduct(
    product: Product
  ) {
    setSelectedProduct(product);

    setSelectedSize(
      product.sizes?.[0] || ""
    );

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
  }

  const filteredProducts =
    useMemo(() => {
      return products.filter(
        (product) => {
          const categoryMatch =
            category === "All"
              ? true
              : product.category ===
                category;

          const searchMatch =
            !search
              ? true
              : product.name
                  ?.toLowerCase()
                  .includes(
                    search.toLowerCase()
                  ) ||
                product.category
                  ?.toLowerCase()
                  .includes(
                    search.toLowerCase()
                  ) ||
                product.description
                  ?.toLowerCase()
                  .includes(
                    search.toLowerCase()
                  );

          return (
            categoryMatch &&
            searchMatch
          );
        }
      );
    }, [
      products,
      category,
      search,
    ]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        Loading Store...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      <div className="border-b border-white/10">

        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <h1 className="text-3xl font-black uppercase">
            Breeze Merch
          </h1>

          <div className="flex gap-3">

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search products..."
              className="
                h-12
                w-[280px]
                rounded-xl
                border
                border-white/10
                bg-[#101010]
                px-4
                text-white
              "
            />

            <Link
              href="/cart"
              className="
                h-12
                px-5
                rounded-xl
                bg-[#8DFF00]
                text-black
                font-black
                flex
                items-center
              "
            >
              Cart ({cartCount})
            </Link>

          </div>

        </div>

      </div>

      <div className="mx-auto max-w-7xl px-6 py-6">

        <div className="flex flex-wrap gap-3">

          {CATEGORIES.map(
            (item) => (
              <button
                key={item}
                onClick={() =>
                  setCategory(item)
                }
                className={`h-11 px-5 rounded-full text-xs font-black uppercase transition ${
                  category === item
                    ? "bg-[#8DFF00] text-black"
                    : "bg-[#101010] border border-white/10"
                }`}
              >
                {item}
              </button>
            )
          )}

        </div>

      </div>

      <div className="mx-auto max-w-7xl px-6 pb-20">

        <div className="grid gap-5 grid-cols-2 lg:grid-cols-4">

          {filteredProducts.map(
            (product) => (
              <div
                key={product.id}
                className="
                  overflow-hidden
                  rounded-2xl
                  bg-[#101010]
                  border
                  border-white/10
                "
              >
                <button
                  onClick={() =>
                    openProduct(
                      product
                    )
                  }
                  className="block w-full"
                >
                  <img
                    src={
                      product.image_url
                    }
                    alt={
                      product.name
                    }
                    className="
                      aspect-square
                      w-full
                      object-cover
                    "
                  />
                </button>

                <div className="p-4">
                  <h3 className="font-black uppercase">
                    {product.name}
                  </h3>

                  <div className="mt-2 text-[#8DFF00] text-xl font-black">
                    R{product.price}
                  </div>

                  <button
                    onClick={() =>
                      addToCart(
                        product
                      )
                    }
                    className="
                      mt-4
                      w-full
                      h-11
                      rounded-xl
                      bg-[#8DFF00]
                      text-black
                      font-black
                    "
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            )
          )}

        </div>

      </div>      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">

          <div className="w-full max-w-4xl rounded-2xl bg-[#101010] border border-white/10 overflow-hidden">

            <div className="grid lg:grid-cols-2">

              <div>
                <img
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                  className="w-full aspect-square object-cover"
                />
              </div>

              <div className="p-6">

                <div className="flex justify-between items-start">

                  <div>

                    <div className="text-xs uppercase tracking-[2px] text-white/50">
                      {selectedProduct.category}
                    </div>

                    <h2 className="mt-2 text-4xl font-black uppercase">
                      {selectedProduct.name}
                    </h2>

                    <div className="mt-3 text-4xl font-black text-[#8DFF00]">
                      R{selectedProduct.price}
                    </div>

                  </div>

                  <button
                    onClick={closeProduct}
                    className="
                      h-10
                      px-4
                      rounded-lg
                      border
                      border-white/10
                    "
                  >
                    Close
                  </button>

                </div>

                {selectedProduct.description && (
                  <p className="mt-6 text-white/70 leading-7">
                    {selectedProduct.description}
                  </p>
                )}

                {selectedProduct.has_sizes &&
                  selectedProduct.sizes &&
                  selectedProduct.sizes.length > 0 && (

                  <div className="mt-8">

                    <div className="mb-3 text-sm font-black uppercase">
                      Size
                    </div>

                    <div className="flex flex-wrap gap-2">

                      {selectedProduct.sizes.map(
                        (size) => (

                          <button
                            key={size}
                            onClick={() =>
                              setSelectedSize(
                                size
                              )
                            }
                            className={`h-11 px-4 rounded-xl font-black ${
                              selectedSize === size
                                ? "bg-[#8DFF00] text-black"
                                : "bg-black border border-white/10"
                            }`}
                          >
                            {size}
                          </button>

                        )
                      )}

                    </div>

                  </div>

                )}

                <div className="mt-8">

                  <div className="mb-3 text-sm font-black uppercase">
                    Quantity
                  </div>

                  <div className="flex w-fit border border-white/10 rounded-xl overflow-hidden">

                    <button
                      onClick={() =>
                        setQuantity(
                          Math.max(
                            1,
                            quantity - 1
                          )
                        )
                      }
                      className="w-12 h-12 bg-black"
                    >
                      -
                    </button>

                    <div className="w-14 h-12 flex items-center justify-center font-black">
                      {quantity}
                    </div>

                    <button
                      onClick={() =>
                        setQuantity(
                          quantity + 1
                        )
                      }
                      className="w-12 h-12 bg-black"
                    >
                      +
                    </button>

                  </div>

                </div>

                <button
                  onClick={() => {
                    addToCart(
                      selectedProduct,
                      quantity,
                      selectedSize
                    );

                    closeProduct();
                  }}
                  className="
                    mt-8
                    w-full
                    h-14
                    rounded-xl
                    bg-[#8DFF00]
                    text-black
                    font-black
                    uppercase
                  "
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
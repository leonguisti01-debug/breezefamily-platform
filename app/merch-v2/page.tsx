"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { createClient } from "@supabase/supabase-js";

const BREEZE_GREEN = "#8DFF00";
const COURIER_FEE = 150;
const CART_KEY = "breeze_cart_v2";

/*
|--------------------------------------------------------------------------
| CHRISTIAN COLLECTION
|--------------------------------------------------------------------------
|
| Leave false until Kent confirms.
| Change to true later when we intentionally add the Christian collection.
|
*/

const ENABLE_CHRISTIAN_LINE = false;

/*
|--------------------------------------------------------------------------
| SUPABASE
|--------------------------------------------------------------------------
*/

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

type Product = {
  id: number;
  name: string;
  price: string | number;
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

type CartItem = {
  id: number;
  name: string;
  price: string | number;
  image_url: string;
  quantity: number;
  category: string;
  size?: string;
};

type Category = {
  name: string;
  subtitle: string;
  icon: ReactNode;
};

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

function priceNumber(
  value: string | number
) {
  if (
    typeof value === "number"
  ) {
    return value;
  }

  const cleaned = String(value)
    .replace(/[^\d.,]/g, "")
    .replace(",", ".");

  return (
    Number.parseFloat(cleaned) ||
    0
  );
}

function money(
  value: string | number
) {
  return `R${priceNumber(
    value
  ).toFixed(0)}`;
}

function sameCategory(
  product: Product,
  category: string
) {
  return (
    product.category
      ?.trim()
      .toLowerCase() ===
    category
      .trim()
      .toLowerCase()
  );
}

/*
|--------------------------------------------------------------------------
| ICONS
|--------------------------------------------------------------------------
*/

function BagIcon({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8h12l1 13H5L6 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

function SearchIcon({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="11"
        cy="11"
        r="7"
      />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function UserIcon({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="12"
        cy="8"
        r="4"
      />
      <path d="M4 21c.7-4 3.5-6 8-6s7.3 2 8 6" />
    </svg>
  );
}

function MenuIcon({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h11v10H3V6Z" />
      <path d="M14 9h4l3 3v4h-7V9Z" />
      <circle
        cx="7"
        cy="18"
        r="2"
      />
      <circle
        cx="18"
        cy="18"
        r="2"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z" />
      <path d="m9 12 2 2 4-5" />
    </svg>
  );
}

function GameIcon() {
  return (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 8h10c3 0 5 2.5 5 5.5S20.5 19 18 19c-2 0-3-2-6-2s-4 2-6 2c-2.5 0-4-2.5-4-5.5S4 8 7 8Z" />
      <path d="M7 12v4" />
      <path d="M5 14h4" />
      <circle
        cx="17"
        cy="13"
        r=".8"
        fill="currentColor"
        stroke="none"
      />
      <circle
        cx="19"
        cy="15"
        r=".8"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function SmileIcon() {
  return (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
      />
      <circle
        cx="9"
        cy="10"
        r=".8"
        fill="currentColor"
        stroke="none"
      />
      <circle
        cx="15"
        cy="10"
        r=".8"
        fill="currentColor"
        stroke="none"
      />
      <path d="M8 15c1 1.4 2.3 2 4 2s3-.6 4-2" />
    </svg>
  );
}

function HandsIcon() {
  return (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2 8 5 5 4-4-5-5L2 8Z" />
      <path d="m22 8-5 5-4-4 5-5 4 4Z" />
      <path d="m7 13 5 5 5-5" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 2.5 3 6.1 6.7 1-4.9 4.7 1.2 6.7-6-3.2-6 3.2 1.2-6.7-4.9-4.7 6.7-1 3-6.1Z" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      className="w-9 h-9"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M10 2h4v6h5v4h-5v10h-4V12H5V8h5V2Z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" />
    </svg>
  );
}

/*
|--------------------------------------------------------------------------
| PAGE
|--------------------------------------------------------------------------
*/

export default function MerchV2Page() {
  const [
    products,
    setProducts,
  ] = useState<Product[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [
    cart,
    setCart,
  ] = useState<CartItem[]>([]);

  const [
    cartOpen,
    setCartOpen,
  ] = useState(false);

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  const [
    searchOpen,
    setSearchOpen,
  ] = useState(false);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    selectedSizes,
    setSelectedSizes,
  ] = useState<
    Record<number, string>
  >({});

  /*
  |--------------------------------------------------------------------------
  | LOAD
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  async function loadProducts() {
    setLoading(true);

    const {
      data,
      error,
    } = await supabase
      .from("merch_products")
      .select("*")
      .eq(
        "status",
        "active"
      )
      .order(
        "featured",
        {
          ascending:
            false,
        }
      )
      .order(
        "created_at",
        {
          ascending:
            false,
        }
      );

    if (error) {
      console.error(
        "MERCH V2 PRODUCT ERROR:",
        error
      );
    }

    const loaded =
      (data ||
        []) as Product[];

    setProducts(loaded);

    const defaults: Record<
      number,
      string
    > = {};

    loaded.forEach(
      (product) => {
        if (
          product.has_sizes
        ) {
          defaults[
            product.id
          ] =
            product.sizes?.[
              0
            ] || "M";
        }
      }
    );

    setSelectedSizes(
      defaults
    );

    setLoading(false);
  }

  function loadCart() {
    try {
      const raw =
        localStorage.getItem(
          CART_KEY
        );

      const stored =
        raw
          ? JSON.parse(raw)
          : [];

      setCart(
        Array.isArray(
          stored
        )
          ? stored
          : []
      );
    } catch {
      setCart([]);
    }
  }

  function saveCart(
    updated:
      CartItem[]
  ) {
    setCart(updated);

    localStorage.setItem(
      CART_KEY,
      JSON.stringify(
        updated
      )
    );
  }

  /*
  |--------------------------------------------------------------------------
  | CART ACTIONS
  |--------------------------------------------------------------------------
  */

  function addToCart(
    product: Product
  ) {
    const size =
      product.has_sizes
        ? selectedSizes[
            product.id
          ] ||
          product.sizes?.[
            0
          ] ||
          "M"
        : undefined;

    const existing =
      cart.find(
        (item) =>
          item.id ===
            product.id &&
          item.size ===
            size
      );

    let updated:
      CartItem[];

    if (existing) {
      updated =
        cart.map(
          (item) => {
            if (
              item.id ===
                product.id &&
              item.size ===
                size
            ) {
              return {
                ...item,
                quantity:
                  item.quantity +
                  1,
              };
            }

            return item;
          }
        );
    } else {
      updated = [
        ...cart,
        {
          id:
            product.id,
          name:
            product.name,
          price:
            product.price,
          image_url:
            product.image_url,
          quantity: 1,
          category:
            product.category,
          size,
        },
      ];
    }

    saveCart(updated);
    setCartOpen(true);
  }

  function changeQuantity(
    item: CartItem,
    amount: number
  ) {
    const updated =
      cart
        .map(
          (cartItem) => {
            if (
              cartItem.id ===
                item.id &&
              cartItem.size ===
                item.size
            ) {
              return {
                ...cartItem,
                quantity:
                  cartItem.quantity +
                  amount,
              };
            }

            return cartItem;
          }
        )
        .filter(
          (cartItem) =>
            cartItem.quantity >
            0
        );

    saveCart(updated);
  }

  function removeFromCart(
    item: CartItem
  ) {
    const updated =
      cart.filter(
        (cartItem) =>
          !(
            cartItem.id ===
              item.id &&
            cartItem.size ===
              item.size
          )
      );

    saveCart(updated);
  }

  /*
  |--------------------------------------------------------------------------
  | PRODUCT GROUPS
  |--------------------------------------------------------------------------
  */

  const christianProducts =
    products.filter(
      (product) =>
        sameCategory(
          product,
          "Christian Line"
        ) ||
        sameCategory(
          product,
          "Christian"
        ) ||
        sameCategory(
          product,
          "Faith"
        )
    );

  const featuredProducts =
    products
      .filter(
        (product) =>
          product.featured
      )
      .slice(0, 4);

  const featured =
    featuredProducts.length >
    0
      ? featuredProducts
      : products.slice(
          0,
          4
        );

  const heroProduct:
    | Product
    | undefined =
    ENABLE_CHRISTIAN_LINE
      ? christianProducts[
          0
        ] ||
        products[0]
      : products[0];

  const filteredProducts =
    useMemo(() => {
      let result =
        [...products];

      if (
        selectedCategory !==
        "All"
      ) {
        if (
          selectedCategory ===
          "Christian Line"
        ) {
          result =
            result.filter(
              (
                product
              ) =>
                sameCategory(
                  product,
                  "Christian Line"
                ) ||
                sameCategory(
                  product,
                  "Christian"
                ) ||
                sameCategory(
                  product,
                  "Faith"
                )
            );
        } else {
          result =
            result.filter(
              (
                product
              ) =>
                sameCategory(
                  product,
                  selectedCategory
                )
            );
        }
      }

      const q =
        search
          .trim()
          .toLowerCase();

      if (q) {
        result =
          result.filter(
            (
              product
            ) => {
              const name =
                product.name
                  ?.toLowerCase() ||
                "";

              const category =
                product.category
                  ?.toLowerCase() ||
                "";

              const description =
                product.description
                  ?.toLowerCase() ||
                "";

              return (
                name.includes(
                  q
                ) ||
                category.includes(
                  q
                ) ||
                description.includes(
                  q
                )
              );
            }
          );
      }

      return result;
    }, [
      products,
      selectedCategory,
      search,
    ]);

  /*
  |--------------------------------------------------------------------------
  | CART TOTALS
  |--------------------------------------------------------------------------
  */

  const cartCount =
    cart.reduce(
      (
        total,
        item
      ) =>
        total +
        item.quantity,
      0
    );

  const subtotal =
    cart.reduce(
      (
        total,
        item
      ) =>
        total +
        priceNumber(
          item.price
        ) *
          item.quantity,
      0
    );

  const delivery =
    cart.length > 0
      ? COURIER_FEE
      : 0;

  const total =
    subtotal +
    delivery;

  /*
  |--------------------------------------------------------------------------
  | CATEGORIES
  |--------------------------------------------------------------------------
  */

  const categories:
    Category[] = [
    {
      name:
        "My Merch",
      subtitle:
        "Breeze Originals",
      icon: (
        <BagIcon className="w-8 h-8" />
      ),
    },

    ...(ENABLE_CHRISTIAN_LINE
      ? [
          {
            name:
              "Christian Line",
            subtitle:
              "Faith. Purpose. You.",
            icon: (
              <CrossIcon />
            ),
          },
        ]
      : []),

    {
      name: "Tech",
      subtitle:
        "Gear Up",
      icon: (
        <GameIcon />
      ),
    },

    {
      name:
        "Fun Stuff",
      subtitle:
        "Because Life's Better",
      icon: (
        <SmileIcon />
      ),
    },

    {
      name:
        "Affiliated",
      subtitle:
        "Support Great Brands",
      icon: (
        <HandsIcon />
      ),
    },

    {
      name:
        "Sponsors",
      subtitle:
        "Our Partners",
      icon: (
        <StarIcon />
      ),
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | NAVIGATION HELPERS
  |--------------------------------------------------------------------------
  */

  function scrollToProducts() {
    setTimeout(
      () => {
        document
          .getElementById(
            "products"
          )
          ?.scrollIntoView(
            {
              behavior:
                "smooth",
              block:
                "start",
            }
          );
      },
      30
    );
  }

  function selectCategory(
    category: string
  ) {
    setSelectedCategory(
      category
    );

    setMobileMenuOpen(
      false
    );

    scrollToProducts();
  }

  /*
  |--------------------------------------------------------------------------
  | PAGE
  |--------------------------------------------------------------------------
  */

  return (
    <main className="min-h-screen bg-[#F7F8F8] text-[#0A0A0A] overflow-x-hidden">

      {/* ================================================================
          HEADER
      ================================================================= */}

      <header className="sticky top-0 z-50 bg-[#031016] text-white border-b border-white/10">

        <div className="max-w-[1450px] mx-auto h-[72px] px-4 md:px-8 flex items-center justify-between">

          {/* LOGO */}

          <button
            type="button"
            onClick={() =>
              window.scrollTo(
                {
                  top: 0,
                  behavior:
                    "smooth",
                }
              )
            }
            className="flex items-center"
          >
            <div>

              <div className="flex items-center gap-2">

                <span
                  className="text-[24px] leading-none"
                  style={{
                    color:
                      BREEZE_GREEN,
                  }}
                >
                  ♛
                </span>

                <span className="font-black text-[25px] md:text-[30px] tracking-[-1.5px] leading-none">
                  BREEZE
                </span>

              </div>

              <div
                className="text-[8px] md:text-[9px] tracking-[5px] font-black text-right mt-1"
                style={{
                  color:
                    BREEZE_GREEN,
                }}
              >
                STORE
              </div>

            </div>
          </button>

          {/* DESKTOP NAV */}

          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-semibold">

            {categories.map(
              (
                category
              ) => (
                <button
                  type="button"
                  key={
                    category.name
                  }
                  onClick={() =>
                    selectCategory(
                      category.name
                    )
                  }
                  className="transition hover:text-[#8DFF00]"
                >
                  {
                    category.name
                  }
                </button>
              )
            )}

          </nav>

          {/* ACTIONS */}

          <div className="flex items-center gap-4 md:gap-6">

            <button
              type="button"
              aria-label="Search"
              onClick={() =>
                setSearchOpen(
                  (
                    current
                  ) =>
                    !current
                )
              }
              className="transition hover:text-[#8DFF00]"
            >
              <SearchIcon />
            </button>

            <button
              type="button"
              aria-label="My account"
              onClick={() => {
                window.location.href =
                  "/portal";
              }}
              className="hidden sm:block transition hover:text-[#8DFF00]"
            >
              <UserIcon />
            </button>

            <button
              type="button"
              aria-label="Cart"
              onClick={() =>
                setCartOpen(
                  true
                )
              }
              className="relative transition hover:text-[#8DFF00]"
            >
              <BagIcon />

              {cartCount >
                0 && (
                <span
                  className="absolute -top-3 -right-3 min-w-[20px] h-[20px] px-1 flex items-center justify-center rounded-full text-black text-[10px] font-black"
                  style={{
                    background:
                      BREEZE_GREEN,
                  }}
                >
                  {cartCount}
                </span>
              )}

            </button>

            <button
              type="button"
              aria-label="Menu"
              onClick={() =>
                setMobileMenuOpen(
                  (
                    current
                  ) =>
                    !current
                )
              }
              className="lg:hidden"
            >
              <MenuIcon />
            </button>

          </div>

        </div>

        {/* SEARCH BAR */}

        {searchOpen && (
          <div className="border-t border-white/10 px-4 py-4">

            <div className="max-w-3xl mx-auto">

              <input
                autoFocus
                value={search}
                onChange={(
                  event
                ) =>
                  setSearch(
                    event
                      .target
                      .value
                  )
                }
                placeholder="Search the Breeze Store..."
                className="w-full bg-white text-black rounded-full px-6 py-3.5 outline-none text-sm"
              />

            </div>

          </div>
        )}

        {/* MOBILE MENU */}

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 px-4 py-4">

            <div className="grid grid-cols-2 gap-2">

              {categories.map(
                (
                  category
                ) => (
                  <button
                    type="button"
                    key={
                      category.name
                    }
                    onClick={() =>
                      selectCategory(
                        category.name
                      )
                    }
                    className="rounded-xl border border-white/10 px-4 py-3 text-left text-sm bg-white/[0.03]"
                  >
                    {
                      category.name
                    }
                  </button>
                )
              )}

              <button
                type="button"
                onClick={() => {
                  window.location.href =
                    "/portal";
                }}
                className="rounded-xl border border-white/10 px-4 py-3 text-left text-sm bg-white/[0.03]"
              >
                My Account
              </button>

            </div>

          </div>
        )}

      </header>

      {/* ================================================================
          HERO
      ================================================================= */}

      <section className="relative bg-[#021017] text-white overflow-hidden">

        <div className="grid lg:grid-cols-[0.78fr_1.22fr] min-h-[620px] sm:min-h-[640px] lg:min-h-[520px]">

          {/* HERO COPY */}

          <div className="relative z-20 flex items-center">

            <div className="w-full px-6 py-14 md:px-12 lg:pl-[max(60px,calc((100vw-1450px)/2))]">

              <p
                className="text-[11px] md:text-xs uppercase tracking-[4px] font-black"
                style={{
                  color:
                    BREEZE_GREEN,
                }}
              >
                {ENABLE_CHRISTIAN_LINE
                  ? "New Collection"
                  : "Official Breeze Store"}
              </p>

              {ENABLE_CHRISTIAN_LINE ? (
                <>
                  <h1 className="mt-5 text-[52px] sm:text-[68px] lg:text-[76px] leading-[0.87] tracking-[-3px] font-black uppercase">
                    FAITH
                    <br />
                    BUILDS
                    <br />
                    DIFFERENT.
                  </h1>

                  <p className="mt-6 text-lg md:text-xl text-white/90">
                    Same Heart.
                    A Higher
                    Purpose.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      selectCategory(
                        "Christian Line"
                      )
                    }
                    className="mt-8 px-7 py-4 rounded-md text-xs md:text-sm font-black uppercase text-black transition hover:brightness-95"
                    style={{
                      background:
                        BREEZE_GREEN,
                    }}
                  >
                    Shop The Christian Line →
                  </button>
                </>
              ) : (
                <>
                  <h1 className="mt-5 text-[58px] sm:text-[74px] lg:text-[88px] leading-[0.84] tracking-[-4px] font-black uppercase">
                    WEAR
                    <br />
                    THE
                    <br />
                    FAMILY.
                  </h1>

                  <p className="mt-6 max-w-lg text-lg md:text-xl text-white/80">
                    Official
                    Breeze gear,
                    drops, tech
                    and more.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      selectCategory(
                        "All"
                      )
                    }
                    className="mt-8 px-8 py-4 rounded-md text-xs md:text-sm font-black uppercase text-black transition hover:brightness-95"
                    style={{
                      background:
                        BREEZE_GREEN,
                    }}
                  >
                    Shop The Collection →
                  </button>
                </>
              )}

            </div>

          </div>

          {/* HERO IMAGE */}

          <div className="absolute lg:relative inset-0 lg:inset-auto min-h-full">

            {heroProduct?.image_url ? (
              <img
                src={
                  heroProduct.image_url
                }
                alt={
                  heroProduct.name ||
                  "Breeze Store"
                }
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#113947] via-[#071b22] to-black" />
            )}

            <div className="absolute inset-0 bg-black/40 lg:hidden" />

            <div className="absolute inset-0 bg-gradient-to-r from-[#021017] via-[#021017]/75 to-[#021017]/10" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#021017] via-transparent to-transparent lg:hidden" />

          </div>

        </div>

      </section>

      {/* ================================================================
          CATEGORIES
      ================================================================= */}

      <section className="bg-white">

        <div className="max-w-[1450px] mx-auto px-4 md:px-8 py-6 md:py-8">

          <div className="flex md:grid md:grid-cols-5 lg:grid-cols-6 gap-3 overflow-x-auto pb-2 md:pb-0">

            {categories.map(
              (
                category
              ) => {
                const active =
                  selectedCategory ===
                  category.name;

                return (
                  <button
                    type="button"
                    key={
                      category.name
                    }
                    onClick={() =>
                      selectCategory(
                        category.name
                      )
                    }
                    className={`
                      min-w-[128px]
                      md:min-w-0
                      rounded-xl
                      border
                      p-4
                      md:p-5
                      text-center
                      bg-white
                      transition
                      ${
                        active
                          ? "border-[#8DFF00] shadow-[0_0_0_1px_#8DFF00]"
                          : "border-[#E5E7EB] hover:border-[#8DFF00]"
                      }
                    `}
                  >

                    <div className="h-10 flex items-center justify-center text-[#07161B]">
                      {
                        category.icon
                      }
                    </div>

                    <div className="font-black text-[13px] mt-3">
                      {
                        category.name
                      }
                    </div>

                    <div className="text-[10px] text-gray-500 mt-1 hidden md:block">
                      {
                        category.subtitle
                      }
                    </div>

                  </button>
                );
              }
            )}

          </div>

        </div>

      </section>

      {/* ================================================================
          FEATURED
      ================================================================= */}

      <section className="bg-white px-4 md:px-8 pb-14">

        <div className="max-w-[1450px] mx-auto">

          <div className="flex items-end justify-between gap-4 mb-6">

            <div>

              <h2 className="text-[26px] md:text-[34px] leading-none font-black uppercase tracking-[-1px]">
                Featured
                Products
              </h2>

              <p className="text-gray-500 mt-2 text-sm md:text-base">
                Popular right
                now in the
                Breeze Family
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                selectCategory(
                  "All"
                )
              }
              className="text-xs md:text-sm font-bold whitespace-nowrap"
            >
              View All →
            </button>

          </div>

          {loading ? (
            <ProductSkeleton />
          ) : featured.length ===
            0 ? (
            <EmptyProducts />
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">

              {featured.map(
                (
                  product
                ) => (
                  <ProductCard
                    key={
                      product.id
                    }
                    product={
                      product
                    }
                    selectedSize={
                      selectedSizes[
                        product.id
                      ]
                    }
                    onSizeChange={(
                      value
                    ) =>
                      setSelectedSizes(
                        (
                          current
                        ) => ({
                          ...current,
                          [product.id]:
                            value,
                        })
                      )
                    }
                    onAdd={() =>
                      addToCart(
                        product
                      )
                    }
                  />
                )
              )}

            </div>
          )}

        </div>

      </section>

      {/* ================================================================
          CHRISTIAN COLLECTION BANNER
      ================================================================= */}

      {ENABLE_CHRISTIAN_LINE && (
        <section className="bg-white px-4 md:px-8 pb-14">

          <div className="max-w-[1450px] mx-auto grid lg:grid-cols-[2fr_1fr] gap-5">

            <div className="relative min-h-[340px] overflow-hidden rounded-2xl bg-[#07161B]">

              {christianProducts[
                0
              ]?.image_url && (
                <img
                  src={
                    christianProducts[
                      0
                    ]
                      .image_url
                  }
                  alt="Christian Collection"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/15" />

              <div className="relative z-10 p-7 md:p-10 max-w-xl text-white">

                <p
                  className="uppercase text-[10px] md:text-xs tracking-[3px] font-black"
                  style={{
                    color:
                      BREEZE_GREEN,
                  }}
                >
                  Christian
                  Line
                </p>

                <h2 className="mt-4 text-[44px] md:text-[62px] leading-[0.88] uppercase font-black tracking-[-2px]">
                  FAITH.
                  <br />
                  PURPOSE.
                  <br />
                  EVERYDAY.
                </h2>

                <p className="mt-5 text-lg">
                  Wear what
                  matters.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    selectCategory(
                      "Christian Line"
                    )
                  }
                  className="mt-6 rounded-md px-6 py-4 text-black text-xs font-black uppercase transition hover:brightness-95"
                  style={{
                    background:
                      BREEZE_GREEN,
                  }}
                >
                  Explore The Collection →
                </button>

              </div>

            </div>

            <TrustPanel />

          </div>

        </section>
      )}

      {/* ================================================================
          TRUST PANEL
      ================================================================= */}

      {!ENABLE_CHRISTIAN_LINE && (
        <section className="bg-white px-4 md:px-8 pb-14">

          <div className="max-w-[1450px] mx-auto">

            <TrustPanel />

          </div>

        </section>
      )}

      {/* ================================================================
          SHOP
      ================================================================= */}

      <section
        id="products"
        className="bg-[#F7F8F8] px-4 md:px-8 py-14 md:py-20 scroll-mt-24"
      >

        <div className="max-w-[1450px] mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8">

            <div>

              <p
                className="text-[10px] md:text-xs uppercase tracking-[3px] font-black"
                style={{
                  color:
                    "#638F00",
                }}
              >
                Breeze Store
              </p>

              <h2 className="text-[36px] md:text-[48px] leading-none font-black uppercase tracking-[-2px] mt-2">
                {selectedCategory ===
                "All"
                  ? "Shop Everything"
                  : selectedCategory}
              </h2>

              <p className="mt-3 text-sm text-gray-500">
                {
                  filteredProducts.length
                }{" "}
                product
                {filteredProducts.length ===
                1
                  ? ""
                  : "s"}
              </p>

            </div>

            {selectedCategory !==
              "All" && (
              <button
                type="button"
                onClick={() =>
                  setSelectedCategory(
                    "All"
                  )
                }
                className="text-sm font-bold underline underline-offset-4 self-start sm:self-auto"
              >
                Clear
                filter
              </button>
            )}

          </div>

          {loading ? (
            <ProductSkeleton />
          ) : filteredProducts.length ===
            0 ? (
            <EmptyProducts />
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">

              {filteredProducts.map(
                (
                  product
                ) => (
                  <ProductCard
                    key={
                      product.id
                    }
                    product={
                      product
                    }
                    selectedSize={
                      selectedSizes[
                        product.id
                      ]
                    }
                    onSizeChange={(
                      value
                    ) =>
                      setSelectedSizes(
                        (
                          current
                        ) => ({
                          ...current,
                          [product.id]:
                            value,
                        })
                      )
                    }
                    onAdd={() =>
                      addToCart(
                        product
                      )
                    }
                  />
                )
              )}

            </div>
          )}

        </div>

      </section>

      {/* ================================================================
          VALUES
      ================================================================= */}

      <section className="bg-white px-4 md:px-8 py-12">

        <div className="max-w-[1450px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">

          <ValueItem
            icon={
              <ShieldIcon />
            }
            title="QUALITY GEAR"
            text="Built to last"
          />

          <ValueItem
            icon={
              <HeartIcon />
            }
            title="SUPPORT THE FAMILY"
            text="Every purchase helps"
          />

          <ValueItem
            icon={
              <StarIcon />
            }
            title="BREEZE POINTS"
            text="Earn while you shop"
          />

          <ValueItem
            icon={
              <HeartIcon />
            }
            title="MAKING A DIFFERENCE"
            text="More than just merch"
          />

        </div>

      </section>

      {/* ================================================================
          FOOTER
      ================================================================= */}

      <footer className="bg-[#031016] text-white">

        <div className="max-w-[1450px] mx-auto px-5 md:px-8 py-12">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-2">

                <span
                  style={{
                    color:
                      BREEZE_GREEN,
                  }}
                  className="text-xl"
                >
                  ♛
                </span>

                <div className="text-2xl font-black">
                  BREEZE
                </div>

              </div>

              <div
                className="text-[8px] tracking-[5px] font-black ml-8"
                style={{
                  color:
                    BREEZE_GREEN,
                }}
              >
                STORE
              </div>

            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/70">

              {categories.map(
                (
                  category
                ) => (
                  <button
                    type="button"
                    key={
                      category.name
                    }
                    onClick={() =>
                      selectCategory(
                        category.name
                      )
                    }
                    className="hover:text-white"
                  >
                    {
                      category.name
                    }
                  </button>
                )
              )}

            </div>

          </div>

          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-between text-xs text-white/50">

            <div>
              Same Family.
              Bigger
              Purpose.
            </div>

            <div>
              It Gets a Bit
              Breezy in
              Here.
            </div>

          </div>

        </div>

      </footer>

      {/* ================================================================
          CART OVERLAY
      ================================================================= */}

      {cartOpen && (
        <button
          type="button"
          aria-label="Close cart"
          onClick={() =>
            setCartOpen(
              false
            )
          }
          className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
        />
      )}

      {/* ================================================================
          CART DRAWER
      ================================================================= */}

      <aside
        className={`
          fixed
          top-0
          right-0
          z-[100]
          h-full
          w-full
          max-w-[430px]
          bg-white
          text-black
          shadow-2xl
          transition-transform
          duration-300
          ease-out
          ${
            cartOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >

        <div className="h-full flex flex-col">

          {/* CART HEADER */}

          <div className="p-5 md:p-6 border-b border-gray-200 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-black">
                Your Cart
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                {cartCount}{" "}
                item
                {cartCount ===
                1
                  ? ""
                  : "s"}
              </p>

            </div>

            <button
              type="button"
              aria-label="Close"
              onClick={() =>
                setCartOpen(
                  false
                )
              }
              className="text-3xl leading-none w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              ×
            </button>

          </div>

          {/* CART BODY */}

          <div className="flex-1 overflow-y-auto p-5 md:p-6">

            {cart.length ===
            0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">

                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <BagIcon className="w-7 h-7" />
                </div>

                <h3 className="font-black text-xl mt-5">
                  Your cart
                  is empty
                </h3>

                <p className="text-gray-500 mt-2 text-sm">
                  Go find
                  something
                  Breezy.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setCartOpen(
                      false
                    );

                    selectCategory(
                      "All"
                    );
                  }}
                  className="mt-6 px-6 py-3 rounded-md font-black text-sm text-black"
                  style={{
                    background:
                      BREEZE_GREEN,
                  }}
                >
                  SHOP NOW
                </button>

              </div>
            ) : (
              <div className="space-y-6">

                {cart.map(
                  (
                    item
                  ) => (
                    <div
                      key={`${item.id}-${item.size || "none"}`}
                      className="flex gap-4 pb-6 border-b border-gray-100 last:border-0"
                    >

                      <div className="w-[90px] h-[105px] bg-[#F3F4F4] rounded-xl overflow-hidden flex-shrink-0">

                        <img
                          src={
                            item.image_url
                          }
                          alt={
                            item.name
                          }
                          className="w-full h-full object-contain p-1"
                        />

                      </div>

                      <div className="flex-1 min-w-0">

                        <div className="flex items-start justify-between gap-3">

                          <div className="min-w-0">

                            <h3 className="font-black text-sm leading-tight">
                              {
                                item.name
                              }
                            </h3>

                            {item.size && (
                              <p className="text-xs text-gray-500 mt-1">
                                Size:{" "}
                                {
                                  item.size
                                }
                              </p>
                            )}

                          </div>

                          <button
                            type="button"
                            aria-label="Remove item"
                            onClick={() =>
                              removeFromCart(
                                item
                              )
                            }
                            className="text-gray-400 hover:text-red-500 text-xl"
                          >
                            ×
                          </button>

                        </div>

                        <div className="flex items-end justify-between mt-5 gap-3">

                          <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">

                            <button
                              type="button"
                              onClick={() =>
                                changeQuantity(
                                  item,
                                  -1
                                )
                              }
                              className="w-9 h-9 bg-gray-50 hover:bg-gray-100"
                            >
                              −
                            </button>

                            <div className="w-9 text-center font-bold text-sm">
                              {
                                item.quantity
                              }
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                changeQuantity(
                                  item,
                                  1
                                )
                              }
                              className="w-9 h-9 bg-gray-50 hover:bg-gray-100"
                            >
                              +
                            </button>

                          </div>

                          <div className="font-black whitespace-nowrap">
                            {money(
                              priceNumber(
                                item.price
                              ) *
                                item.quantity
                            )}
                          </div>

                        </div>

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

          </div>

          {/* CART TOTAL */}

          {cart.length >
            0 && (
            <div className="border-t border-gray-200 p-5 md:p-6 bg-white">

              <div className="space-y-3 text-sm">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <strong>
                    {money(
                      subtotal
                    )}
                  </strong>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Delivery
                    (Flat
                    Rate)
                  </span>

                  <strong>
                    {money(
                      delivery
                    )}
                  </strong>

                </div>

                <div className="pt-4 mt-4 border-t border-gray-200 flex justify-between text-lg">

                  <strong>
                    Total
                  </strong>

                  <strong>
                    {money(
                      total
                    )}
                  </strong>

                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  alert(
                    "V2 cart is ready. PayFast checkout is the next build."
                  )
                }
                className="mt-6 w-full py-4 rounded-md text-black text-sm font-black uppercase transition hover:brightness-95 active:scale-[0.99]"
                style={{
                  background:
                    BREEZE_GREEN,
                }}
              >
                Secure
                Checkout →
              </button>

              <div className="mt-4 text-center text-[11px] text-gray-500">
                Secure
                payments
                powered by{" "}
                <strong className="text-[#E33232]">
                  PayFast
                </strong>
              </div>

            </div>
          )}

        </div>

      </aside>

    </main>
  );
}

/*
|--------------------------------------------------------------------------
| PRODUCT CARD
|--------------------------------------------------------------------------
*/

function ProductCard({
  product,
  selectedSize,
  onSizeChange,
  onAdd,
}: {
  product: Product;
  selectedSize?: string;
  onSizeChange: (
    value: string
  ) => void;
  onAdd: () => void;
}) {
  const sizes =
    product.sizes &&
    product.sizes.length >
      0
      ? product.sizes
      : [
          "S",
          "M",
          "L",
          "XL",
          "2XL",
          "3XL",
          "4XL",
          "5XL",
          "6XL",
        ];

  return (
    <article className="group min-w-0">

      {/* IMAGE */}

      <div className="relative bg-[#F1F3F3] rounded-xl md:rounded-2xl overflow-hidden">

        {product.limited_drop && (
          <span
            className="absolute top-2 right-2 md:top-3 md:right-3 z-10 px-2.5 md:px-3 py-1 rounded-md text-[8px] md:text-[10px] uppercase font-black text-black"
            style={{
              background:
                BREEZE_GREEN,
            }}
          >
            Limited
          </span>
        )}

        {product.featured &&
          !product.limited_drop && (
            <span
              className="absolute top-2 right-2 md:top-3 md:right-3 z-10 px-2.5 md:px-3 py-1 rounded-md text-[8px] md:text-[10px] uppercase font-black text-black"
              style={{
                background:
                  BREEZE_GREEN,
              }}
            >
              New
            </span>
          )}

        <img
          src={
            product.image_url
          }
          alt={product.name}
          loading="lazy"
          className="
            w-full
            aspect-[4/4.5]
            md:aspect-square
            object-contain
            p-2
            md:p-4
            transition
            duration-500
            group-hover:scale-[1.04]
          "
        />

      </div>

      {/* INFO */}

      <div className="pt-3">

        <div className="text-[9px] md:text-[10px] uppercase tracking-[1px] text-gray-400 font-bold truncate">
          {
            product.category
          }
        </div>

        <h3 className="font-black text-[13px] md:text-[16px] leading-[1.15] mt-1 min-h-[31px] md:min-h-[38px]">
          {product.name}
        </h3>

        <div className="font-black text-[17px] md:text-[20px] mt-2">
          {money(
            product.price
          )}
        </div>

        {product.breeze_points &&
          product.breeze_points >
            0 && (
            <div className="mt-1 text-[9px] md:text-[10px] text-gray-500 min-h-[14px]">
              Earn{" "}
              <strong className="text-black">
                {
                  product.breeze_points
                }{" "}
                Breeze
                Points
              </strong>
            </div>
          )}

        {product.has_sizes && (
          <select
            value={
              selectedSize ||
              sizes[0]
            }
            onChange={(
              event
            ) =>
              onSizeChange(
                event.target
                  .value
              )
            }
            className="mt-3 w-full border border-gray-200 bg-white rounded-md px-2 md:px-3 py-2 text-[10px] md:text-xs outline-none"
          >
            {sizes.map(
              (size) => (
                <option
                  key={
                    size
                  }
                  value={
                    size
                  }
                >
                  Size{" "}
                  {size}
                </option>
              )
            )}
          </select>
        )}

        <button
          type="button"
          onClick={onAdd}
          className="
            mt-3
            w-full
            py-3
            rounded-md
            text-[10px]
            md:text-[13px]
            font-black
            text-black
            transition
            hover:brightness-95
            active:scale-[0.98]
          "
          style={{
            background:
              BREEZE_GREEN,
          }}
        >
          Add to Cart
        </button>

      </div>

    </article>
  );
}

/*
|--------------------------------------------------------------------------
| TRUST PANEL
|--------------------------------------------------------------------------
*/

function TrustPanel() {
  return (
    <div className="bg-[#F7F8F8] rounded-2xl border border-gray-200 p-6 md:p-8 grid sm:grid-cols-3 gap-8">

      <div className="flex gap-4">

        <div className="text-[#456A7B] flex-shrink-0">
          <TruckIcon />
        </div>

        <div>

          <div className="font-black text-sm uppercase">
            Nationwide
            Delivery
          </div>

          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            R150 flat
            rate anywhere
            in South
            Africa
          </p>

        </div>

      </div>

      <div className="flex gap-4">

        <div className="text-[#456A7B] flex-shrink-0">
          <ShieldIcon />
        </div>

        <div>

          <div className="font-black text-sm uppercase">
            Secure
            Payments
          </div>

          <p className="text-xs text-gray-500 mt-1">
            Safe. Simple.
            Secure.
          </p>

          <div className="mt-2 text-lg italic font-black text-[#E33232]">
            PayFast
          </div>

        </div>

      </div>

      <div className="flex gap-4">

        <div className="text-[#456A7B] flex-shrink-0">
          <StarIcon />
        </div>

        <div>

          <div className="font-black text-sm uppercase">
            Breeze
            Points
          </div>

          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Earn while
            you shop
          </p>

        </div>

      </div>

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| VALUE ITEM
|--------------------------------------------------------------------------
*/

function ValueItem({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3 items-start">

      <div className="text-[#456A7B] flex-shrink-0">
        {icon}
      </div>

      <div>

        <div className="text-[10px] md:text-xs font-black">
          {title}
        </div>

        <div className="text-[9px] md:text-xs text-gray-500 mt-1">
          {text}
        </div>

      </div>

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| EMPTY STATE
|--------------------------------------------------------------------------
*/

function EmptyProducts() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-10 md:p-14 text-center">

      <div
        className="w-12 h-12 rounded-full mx-auto flex items-center justify-center"
        style={{
          background:
            `${BREEZE_GREEN}25`,
        }}
      >
        <BagIcon className="w-6 h-6" />
      </div>

      <h3 className="text-xl md:text-2xl font-black mt-5">
        Nothing here
        yet.
      </h3>

      <p className="text-gray-500 mt-2 text-sm">
        This collection
        is coming soon.
      </p>

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| LOADING SKELETON
|--------------------------------------------------------------------------
*/

function ProductSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">

      {[1, 2, 3, 4].map(
        (item) => (
          <div
            key={item}
            className="animate-pulse"
          >

            <div className="aspect-square bg-gray-200 rounded-xl md:rounded-2xl" />

            <div className="h-2.5 bg-gray-200 rounded mt-4 w-1/3" />

            <div className="h-4 bg-gray-200 rounded mt-3 w-3/4" />

            <div className="h-5 bg-gray-200 rounded mt-3 w-1/4" />

            <div className="h-10 md:h-11 bg-gray-200 rounded mt-4" />

          </div>
        )
      )}

    </div>
  );
}
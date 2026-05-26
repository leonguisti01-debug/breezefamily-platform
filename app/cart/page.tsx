"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const BREEZE_GREEN = "#8DFF00";

const COURIER_FEE = 150;

const supabase = createClient(
  "https://xwzathzitijhmupqqxux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0"
);

export default function CartPage() {

  const [cart,
    setCart] =
    useState<any[]>([]);

  const [name,
    setName] =
    useState("");

  const [phone,
    setPhone] =
    useState("");

  const [email,
    setEmail] =
    useState("");

  const [address,
    setAddress] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const [success,
    setSuccess] =
    useState(false);

  useEffect(() => {

    loadCart();

  }, []);

  /* LOAD */
  const loadCart =
    () => {

      const storedCart =
        JSON.parse(
          localStorage.getItem(
            "cart"
          ) || "[]"
        );

      setCart(storedCart);
    };

  /* SAVE */
  const saveCart =
    (updatedCart: any[]) => {

      localStorage.setItem(
        "cart",
        JSON.stringify(
          updatedCart
        )
      );

      setCart(updatedCart);
    };

  /* REMOVE */
  const removeItem =
    (id: number,
      size?: string
    ) => {

      const updatedCart =
        cart.filter(
          (item) =>
            !(
              item.id === id &&
              item.size === size
            )
        );

      saveCart(updatedCart);
    };

  /* INCREASE */
  const increaseQuantity =
    (id: number,
      size?: string
    ) => {

      const updatedCart =
        cart.map((item) => {

          if (
            item.id === id &&
            item.size === size
          ) {

            return {
              ...item,
              quantity:
                item.quantity + 1,
            };
          }

          return item;
        });

      saveCart(updatedCart);
    };

  /* DECREASE */
  const decreaseQuantity =
    (id: number,
      size?: string
    ) => {

      const updatedCart =
        cart.map((item) => {

          if (
            item.id === id &&
            item.size === size &&
            item.quantity > 1
          ) {

            return {
              ...item,
              quantity:
                item.quantity - 1,
            };
          }

          return item;
        });

      saveCart(updatedCart);
    };

  /* SUBTOTAL */
  const calculateSubtotal =
    () => {

      return cart.reduce(
        (
          total,
          item
        ) => {

          const price =
            parseFloat(
              item.price.replace(
                "R",
                ""
              )
            );

          return (
            total +
            price *
              item.quantity
          );

        },
        0
      );
    };

  const subtotal =
    calculateSubtotal();

  const total =
    subtotal +
    COURIER_FEE;

  /* PLACE ORDER */
  const placeOrder =
    async () => {
      console.log(
  "PLACE ORDER CLICKED"
);

      if (
        !name ||
        !phone ||
        !email ||
        !address
      ) {

        alert(
          "Please complete all details."
        );

        return;
      }

      setLoading(true);

      /* SAVE TO SUPABASE */
      const {
        data,
        error
      } = await supabase
        .from("merch_orders")
        .insert([
          {
            customer_name:
              name,
            phone,
            email,
            address,
            items: cart,
            subtotal:
              `R${subtotal}`,
            courier:
              `R${COURIER_FEE}`,
            total:
              `R${total}`,
            status: "new",
          },
        ])
        .select()
        .single();

      if (error) {

        console.log(
          "SUPABASE ERROR:",
          error
        );

        alert(
          "Order failed."
        );

        setLoading(false);

        return;
      }

      /* SEND EMAIL */
      console.log(
        "SENDING ORDER..."
      );

      try {

        const response =
          await fetch(
            "/api/order",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                orderId:
                  data.id,
                name,
                phone,
                email,
                address,
                cart,
                subtotal,
                courier:
                  COURIER_FEE,
                total,
              }),
            }
          );

        console.log(
          "FETCH RESPONSE:",
          response
        );

        const result =
          await response.json();

        console.log(
          "FETCH RESULT:",
          result
        );

        if (!response.ok) {

          alert(
            JSON.stringify(
              result
            )
          );

          setLoading(false);

          return;
        }

      } catch (err) {

        console.log(
          "FETCH ERROR:",
          err
        );

        alert(
          "Fetch crashed"
        );

        setLoading(false);

        return;
      }

      localStorage.removeItem(
        "cart"
      );

      setCart([]);

      setSuccess(true);

      setLoading(false);
    };

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden px-4 py-20">

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

      <div className="max-w-3xl mx-auto relative z-20">

        {/* SUCCESS */}
        {success && (

          <div className="rounded-[30px] border border-[#8DFF00]/30 bg-[#8DFF00]/10 p-10 text-center">

            <h2
              className="uppercase italic font-black"
              style={{
                fontFamily:
                  "Bebas Neue, sans-serif",
                fontSize:
                  "clamp(46px, 9vw, 80px)",
                lineHeight:
                  "0.9",
              }}
            >

              ORDER
              <span
                className="block"
                style={{
                  color:
                    BREEZE_GREEN,
                }}
              >
                RECEIVED
              </span>

            </h2>

            <p className="mt-5 text-white/70 text-sm leading-relaxed">

              Thank you for supporting
              Breeze Family.

              <br /><br />

              We will contact you shortly
              with payment and delivery
              details.

            </p>

            <Link
              href="/merch"
              className="
                inline-flex
                mt-8
                px-6
                py-4
                rounded-2xl
                bg-[#8DFF00]
                text-black
                font-black
                uppercase
                text-sm
                tracking-[2px]
              "
            >

              Continue Shopping

            </Link>

          </div>

        )}

        {!success && (

          <>
            {/* HEADER */}
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
                  className="mt-2 uppercase italic font-black"
                  style={{
                    fontFamily:
                      "Bebas Neue, sans-serif",
                    fontSize:
                      "clamp(42px, 11vw, 80px)",
                    lineHeight:
                      "0.82",
                  }}
                >

                  YOUR
                  <span
                    className="block"
                    style={{
                      color:
                        BREEZE_GREEN,
                    }}
                  >
                    CART
                  </span>

                </h1>

              </div>

              <Link
                href="/merch"
                className="
                  shrink-0
                  px-4
                  py-3
                  rounded-xl
                  bg-white
                  text-black
                  font-black
                  uppercase
                  text-[10px]
                  tracking-[1px]
                "
              >

                Shop

              </Link>

            </div>

            {/* EMPTY */}
            {cart.length === 0 && (

              <div className="mt-12 rounded-[28px] bg-white/5 border border-white/10 p-10 text-center">

                <h2 className="text-2xl font-black uppercase">

                  Your Cart Is Empty

                </h2>

              </div>

            )}

            {/* CART */}
            {cart.length > 0 && (

              <div className="mt-10 space-y-4">

                {cart.map(
                  (item) => (

                    <div
                      key={`${item.id}-${item.size || "default"}`}
                      className="
                        rounded-[24px]
                        bg-white/5
                        border
                        border-white/10
                        overflow-hidden
                      "
                    >

                      <div className="flex">

                        {/* IMAGE */}
                        <div className="w-[110px] h-[110px] bg-black shrink-0">

                          <img
                            src={
                              item.image_url
                            }
                            alt={
                              item.name
                            }
                            className="
                              w-full
                              h-full
                              object-cover
                            "
                          />

                        </div>

                        {/* CONTENT */}
                        <div className="flex-1 p-4">

                          <h2
                            className="uppercase font-black leading-tight"
                            style={{
                              fontSize:
                                "clamp(14px, 4vw, 20px)",
                            }}
                          >

                            {item.name}

                          </h2>

                          {/* SIZE */}
                          {item.size && (

                            <p className="mt-1 text-[10px] uppercase tracking-[2px] text-white/50">

                              Size: {item.size}

                            </p>

                          )}

                          <p
                            className="mt-2 font-black"
                            style={{
                              color:
                                BREEZE_GREEN,
                            }}
                          >

                            {item.price}

                          </p>

                          {/* QUANTITY */}
                          <div className="mt-3 flex items-center gap-2">

                            <button
                              onClick={() =>
                                decreaseQuantity(
                                  item.id,
                                  item.size
                                )
                              }
                              className="
                                w-8
                                h-8
                                rounded-lg
                                bg-white
                                text-black
                                font-black
                              "
                            >

                              -

                            </button>

                            <div className="text-sm font-black min-w-[20px] text-center">

                              {item.quantity}

                            </div>

                            <button
                              onClick={() =>
                                increaseQuantity(
                                  item.id,
                                  item.size
                                )
                              }
                              className="
                                w-8
                                h-8
                                rounded-lg
                                bg-[#8DFF00]
                                text-black
                                font-black
                              "
                            >

                              +

                            </button>

                          </div>

                          {/* REMOVE */}
                          <button
                            onClick={() =>
                              removeItem(
                                item.id,
                                item.size
                              )
                            }
                            className="
                              mt-3
                              text-[10px]
                              uppercase
                              tracking-[1px]
                              text-red-400
                              font-black
                            "
                          >

                            Remove

                          </button>

                        </div>

                      </div>

                    </div>

                  )
                )}

                {/* TOTALS */}
                <div className="rounded-[28px] bg-[#8DFF00] text-black p-6">

                  <div className="space-y-3">

                    <div className="flex items-center justify-between font-black uppercase text-sm">

                      <span>
                        Subtotal
                      </span>

                      <span>
                        R{subtotal}
                      </span>

                    </div>

                    <div className="flex items-center justify-between font-black uppercase text-sm">

                      <span>
                        Courier
                      </span>

                      <span>
                        R150
                      </span>

                    </div>

                    <div className="border-t border-black/20 pt-3 flex items-center justify-between font-black uppercase text-lg">

                      <span>
                        Total
                      </span>

                      <span>
                        R{total}
                      </span>

                    </div>

                  </div>

                </div>

                {/* DETAILS */}
                <div className="rounded-[28px] bg-white/5 border border-white/10 p-5">

                  <h2 className="text-2xl font-black uppercase">

                    Customer Details

                  </h2>

                  <div className="mt-5 space-y-4">

                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) =>
                        setName(
                          e.target.value
                        )
                      }
                      className="
                        w-full
                        px-4
                        py-4
                        rounded-2xl
                        bg-black
                        border
                        border-white/10
                        text-white
                      "
                    />

                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) =>
                        setEmail(
                          e.target.value
                        )
                      }
                      className="
                        w-full
                        px-4
                        py-4
                        rounded-2xl
                        bg-black
                        border
                        border-white/10
                        text-white
                      "
                    />

                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) =>
                        setPhone(
                          e.target.value
                        )
                      }
                      className="
                        w-full
                        px-4
                        py-4
                        rounded-2xl
                        bg-black
                        border
                        border-white/10
                        text-white
                      "
                    />

                    <textarea
                      placeholder="Delivery Address"
                      value={address}
                      onChange={(e) =>
                        setAddress(
                          e.target.value
                        )
                      }
                      className="
                        w-full
                        px-4
                        py-4
                        rounded-2xl
                        bg-black
                        border
                        border-white/10
                        text-white
                        min-h-[120px]
                      "
                    />

                  </div>

                  {/* ORDER */}
                  <button
                    onClick={
                      placeOrder
                    }
                    disabled={
                      loading
                    }
                    className="
                      mt-6
                      w-full
                      py-4
                      rounded-2xl
                      bg-[#8DFF00]
                      text-black
                      font-black
                      uppercase
                      text-sm
                      tracking-[2px]
                      disabled:opacity-50
                    "
                  >

                    {loading
                      ? "Placing Order..."
                      : "Place Order"}

                  </button>

                </div>

              </div>

            )}

          </>

        )}

      </div>

    </main>
  );
}
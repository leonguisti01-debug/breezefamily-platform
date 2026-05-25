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

  const [address,
    setAddress] =
    useState("");

  useEffect(() => {

    loadCart();

  }, []);

  /* LOAD CART */
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

  /* SAVE CART */
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
    (id: number) => {

      const updatedCart =
        cart.filter(
          (item) =>
            item.id !== id
        );

      saveCart(updatedCart);
    };

  /* INCREASE */
  const increaseQuantity =
    (id: number) => {

      const updatedCart =
        cart.map((item) => {

          if (
            item.id === id
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
    (id: number) => {

      const updatedCart =
        cart.map((item) => {

          if (
            item.id === id &&
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

  /* CHECKOUT */
  const checkoutWhatsApp =
    async () => {

      if (
        !name ||
        !phone ||
        !address
      ) {

        alert(
          "Please complete all details."
        );

        return;
      }

      /* SAVE ORDER */
      const {
        error
      } = await supabase
        .from("merch_orders")
        .insert([
          {
            customer_name:
              name,
            phone,
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
        ]);

      if (error) {

  console.log(
    "SUPABASE ERROR:",
    error
  );

  alert(
    JSON.stringify(error)
  );

  return;
}

      /* WHATSAPP */
      let message =
        `Hi Breeze Family,%0A%0A`;

      message +=
        `I would like to place an order:%0A%0A`;

      cart.forEach(
        (item) => {

          message +=
            `${item.quantity} x ${item.name} - ${item.price}%0A`;
        }
      );

      message +=
        `%0ASubtotal: R${subtotal}%0A`;

      message +=
        `Courier: R${COURIER_FEE}%0A`;

      message +=
        `TOTAL: R${total}%0A%0A`;

      message +=
        `Name: ${name}%0A`;

      message +=
        `Phone: ${phone}%0A`;

      message +=
        `Address: ${address}`;

      window.open(
        `https://wa.me/27660725752?text=${message}`,
        "_blank"
      );

      localStorage.removeItem(
        "cart"
      );

      setCart([]);

      alert(
        "Order submitted!"
      );
    };

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden px-4 py-20">

      {/* BACKGROUND */}
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

            {/* ITEMS */}
            {cart.map(
              (item) => (

                <div
                  key={item.id}
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

                      {item.image_url ? (

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

                      ) : (

                        <div className="w-full h-full flex items-center justify-center text-white/30 text-[10px] uppercase">

                          No Image

                        </div>

                      )}

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

                      <p
                        className="mt-1 font-black"
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
                              item.id
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
                              item.id
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
                            item.id
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
                  checkoutWhatsApp
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
                "
              >

                Order On WhatsApp

              </button>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}
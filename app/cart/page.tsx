"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

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

  /* REMOVE ITEM */
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

  /* TOTAL */
  const calculateTotal =
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

  /* WHATSAPP CHECKOUT */
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

      const total =
        calculateTotal();

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
            total: `R${total}`,
            status: "new",
          },
        ]);

      if (error) {

        console.log(error);

        alert(
          "Order failed."
        );

        return;
      }

      /* WHATSAPP MESSAGE */
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
        `%0ATotal: R${total}%0A%0A`;

      message +=
        `Name: ${name}%0A`;

      message +=
        `Phone: ${phone}%0A`;

      message +=
        `Address: ${address}`;

      /* OPEN WHATSAPP */
      window.open(
        `https://wa.me/27660725752?text=${message}`,
        "_blank"
      );

      /* CLEAR CART */
      localStorage.removeItem(
        "cart"
      );

      setCart([]);

      alert(
        "Order submitted!"
      );
    };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

          <div>

            <p className="uppercase tracking-[4px] text-green-300 text-sm">
              Breeze Family
            </p>

            <h1 className="mt-4 text-5xl md:text-7xl font-black uppercase">
              Shopping Cart
            </h1>

          </div>

          <Link
            href="/merch"
            className="inline-flex items-center justify-center px-8 py-5 rounded-2xl bg-white text-black font-black uppercase hover:opacity-90 transition duration-300"
          >

            Continue Shopping

          </Link>

        </div>

        {/* EMPTY */}
        {cart.length === 0 && (

          <div className="mt-20 rounded-3xl bg-white/5 border border-white/10 p-16 text-center">

            <h2 className="text-4xl font-black uppercase">
              Your Cart Is Empty
            </h2>

          </div>

        )}

        {/* ITEMS */}
        {cart.length > 0 && (

          <div className="mt-20 grid gap-8">

            {cart.map(
              (item) => (

                <div
                  key={item.id}
                  className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden"
                >

                  <div className="grid md:grid-cols-4 gap-6">

                    {/* IMAGE */}
                    <div>

                      {item.image_url ? (

                        <img
                          src={
                            item.image_url
                          }
                          alt={
                            item.name
                          }
                          className="w-full h-full object-cover"
                        />

                      ) : (

                        <div className="w-full h-full bg-black flex items-center justify-center text-white/30">
                          No Image
                        </div>

                      )}

                    </div>

                    {/* DETAILS */}
                    <div className="md:col-span-3 p-8">

                      <h2 className="text-4xl font-black uppercase">
                        {item.name}
                      </h2>

                      <p className="mt-4 text-2xl text-green-300 font-black">
                        {item.price}
                      </p>

                      {/* QUANTITY */}
                      <div className="mt-8 flex items-center gap-4">

                        <button
                          onClick={() =>
                            decreaseQuantity(
                              item.id
                            )
                          }
                          className="w-12 h-12 rounded-xl bg-white text-black font-black text-2xl"
                        >
                          -
                        </button>

                        <div className="text-2xl font-black">
                          {item.quantity}
                        </div>

                        <button
                          onClick={() =>
                            increaseQuantity(
                              item.id
                            )
                          }
                          className="w-12 h-12 rounded-xl bg-green-400 text-black font-black text-2xl"
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
                        className="mt-8 px-6 py-3 rounded-2xl bg-red-500 text-white font-black uppercase"
                      >

                        Remove Item

                      </button>

                    </div>

                  </div>

                </div>
              )
            )}

            {/* TOTAL */}
            <div className="rounded-3xl bg-green-400 text-black p-10">

              <p className="uppercase tracking-[3px] text-sm">
                Order Total
              </p>

              <h2 className="mt-4 text-6xl font-black">
                R{calculateTotal()}
              </h2>

            </div>

            {/* CUSTOMER DETAILS */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-10">

              <h2 className="text-4xl font-black uppercase">
                Customer Details
              </h2>

              <div className="mt-8 grid gap-6">

                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  className="w-full px-5 py-5 rounded-2xl bg-black border border-white/10 text-white"
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
                  className="w-full px-5 py-5 rounded-2xl bg-black border border-white/10 text-white"
                />

                <textarea
                  placeholder="Delivery Address"
                  value={address}
                  onChange={(e) =>
                    setAddress(
                      e.target.value
                    )
                  }
                  className="w-full px-5 py-5 rounded-2xl bg-black border border-white/10 text-white min-h-[150px]"
                />

              </div>

              {/* WHATSAPP */}
              <button
                onClick={
                  checkoutWhatsApp
                }
                className="mt-10 w-full py-5 rounded-2xl bg-green-400 text-black font-black uppercase text-xl hover:opacity-90 transition duration-300"
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
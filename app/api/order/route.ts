import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

console.log(
  "RESEND KEY:",
  process.env.RESEND_API_KEY
);

export async function POST(
  req: Request
) {

  try {

    console.log(
      "API ROUTE HIT"
    );

    const body =
      await req.json();

    console.log(
      "BODY:",
      body
    );

    const {
      orderId,
      name,
      phone,
      email,
      address,
      cart,
      subtotal,
      courier,
      total,
    } = body;

    console.log(
      "SENDING ADMIN EMAIL"
    );

    const adminEmail =
      await resend.emails.send({

        from:
          "onboarding@resend.dev",

        to:
          "onboarding@resend.dev",

        subject:
          `New Merch Order #${orderId}`,

        html: `
          <h1>New Order</h1>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Phone:</strong> ${phone}</p>

          <p><strong>Address:</strong> ${address}</p>

          <hr />

          <h2>Items</h2>

          <p>
            ${cart
              ?.map(
                (item: any) =>
                  `
                    ${item.quantity} x
                    ${item.name}
                    ${
                      item.size
                        ? `(Size ${item.size})`
                        : ""
                    }
                    - ${item.price}
                  `
              )
              .join("<br/>")}
          </p>

          <hr />

          <p>
            <strong>Subtotal:</strong>
            R${subtotal}
          </p>

          <p>
            <strong>Courier:</strong>
            R${courier}
          </p>

          <h2>
            Total: R${total}
          </h2>
        `,
      });

    console.log(
      "ADMIN EMAIL RESPONSE:",
      adminEmail
    );

    console.log(
      "SENDING CUSTOMER EMAIL"
    );

    const customerEmail =
      await resend.emails.send({

        from:
          "onboarding@resend.dev",

        to: email,

        subject:
          "Your Breeze Family Order Was Received",

        html: `
          <h1>
            Thank You For Your Order
          </h1>

          <p>
            Hi ${name},
          </p>

          <p>
            We have received your order
            and will contact you shortly
            with payment and courier details.
          </p>

          <p>
            <strong>Total:</strong>
            R${total}
          </p>

          <p>
            Thank you for supporting
            Breeze Family.
          </p>
        `,
      });

    console.log(
      "CUSTOMER EMAIL RESPONSE:",
      customerEmail
    );

    return Response.json({
      success: true,
      adminEmail,
      customerEmail,
    });

  } catch (error: any) {

    console.log(
      "FULL ERROR:",
      JSON.stringify(
        error,
        null,
        2
      )
    );

    return Response.json(
      {
        success: false,
        error:
          error?.message ||
          "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
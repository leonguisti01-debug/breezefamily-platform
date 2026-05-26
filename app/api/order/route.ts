import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

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

    const orderItems =
      cart
        .map(
          (item: any) =>
            `${item.quantity} x ${item.name} (${item.price})`
        )
        .join("<br/>");

    /* ADMIN EMAIL */
    await resend.emails.send({

      from:
        "Breeze Family <orders@breezefamily.co.za>",

      to:
        "orders@breezefamily.co.za",

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

        <p>${orderItems}</p>

        <hr />

        <p><strong>Subtotal:</strong> R${subtotal}</p>

        <p><strong>Courier:</strong> R${courier}</p>

        <h2>Total: R${total}</h2>
      `,
    });

    /* CUSTOMER EMAIL */
    await resend.emails.send({

      from:
        "Breeze Family <orders@breezefamily.co.za>",

      to: email,

      subject:
        "Your Breeze Family Order Was Received",

      html: `
        <h1>Thank You For Your Order</h1>

        <p>Hi ${name},</p>

        <p>
          We have received your order and
          will contact you shortly with
          payment and courier details.
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

    return Response.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
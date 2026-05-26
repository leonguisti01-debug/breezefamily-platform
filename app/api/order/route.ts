import { Resend } from "resend";

const resend = new Resend(
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
          "orders@breezefamily.co.za",

        to:
          "orders@breezefamily.co.za",

        subject:
          `New Merch Order #${orderId}`,

        html: `
          <h1>New Order</h1>

          <p>${name}</p>
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
          "orders@breezefamily.co.za",

        to: email,

        subject:
          "Order Received",

        html: `
          <h1>Thank You</h1>
        `,
      });

    console.log(
      "CUSTOMER EMAIL RESPONSE:",
      customerEmail
    );

    return Response.json({
      success: true,
    });

  } catch (error: any) {

    console.log(
      "FULL ERROR:",
      error
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
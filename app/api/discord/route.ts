import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "🎭 New Kids Edition Entry",
            color:
              body.status === "approved"
                ? 5763719
                : 16753920,

            fields: [
              {
                name: "Contestant",
                value: body.full_name,
                inline: true,
              },
              {
                name: "Age",
                value: String(body.age),
                inline: true,
              },
              {
                name: "Category",
                value: body.talent_category,
                inline: true,
              },
              {
                name: "TikTok",
                value:
                  body.tiktok_username ||
                  "Not Provided",
              },
              {
                name: "Parent Contact",
                value:
                  body.parent_phone ||
                  "Not Provided",
              },
              {
                name: "Status",
                value:
                  body.status === "approved"
                    ? "✅ APPROVED"
                    : "⏳ PENDING",
              },
            ],

            image: {
              url: body.photo_url,
            },

            timestamp:
              new Date().toISOString(),
          },
        ],
      }),
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
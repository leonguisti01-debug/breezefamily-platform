import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { data: contestant } = await supabase
    .from("contestants")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!contestant) {
    return NextResponse.json({
      success: false,
      error: "Contestant not found",
    });
  }

  const response = await fetch(
    process.env.DISCORD_WEBHOOK_URL!,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "🎭 New Kids Edition Entry",
            color: 5763719,

            fields: [
              {
                name: "Contestant",
                value:
                  contestant.full_name ||
                  "Unknown",
                inline: true,
              },
              {
                name: "Age",
                value:
                  contestant.age || "-",
                inline: true,
              },
              {
                name: "Category",
                value:
                  contestant.talent_category ||
                  "-",
                inline: true,
              },
              {
                name: "TikTok",
                value:
                  contestant.tiktok_username ||
                  "Not Provided",
              },
              {
                name: "Parent Contact",
                value:
                  contestant.parent_phone ||
                  "Not Provided",
              },
            ],

            image: {
              url:
                contestant.photo_url,
            },

            timestamp:
              new Date().toISOString(),
          },
        ],
      }),
    }
  );

  return NextResponse.json({
    success: true,
    status: response.status,
    contestant:
      contestant.full_name,
  });
}
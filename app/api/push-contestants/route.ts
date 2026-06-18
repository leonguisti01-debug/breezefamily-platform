import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3emF0aHppdGlqaG11cHFxeHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDA5NzUsImV4cCI6MjA5NDM3Njk3NX0.uz0NqLhb8cfSh6b8141Fvio3PYDKT1UwZz9K7ZAREr0
);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const ids =
      searchParams
        .get("ids")
        ?.split(",")
        .map((id) => Number(id.trim()))
        .filter(Boolean) || [];

    if (!ids.length) {
      return NextResponse.json({
        success: false,
        error: "No IDs supplied",
      });
    }

    const { data: contestants, error } =
      await supabase
        .from("contestants")
        .select("*")
        .in("id", ids);

    if (error) {
      throw error;
    }

    let pushed = 0;

    for (const contestant of contestants || []) {
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
                title:
                  "🎭 TikTok Stars Kids Edition Entry",
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

      if (response.ok) {
        pushed++;
      }
    }

    return NextResponse.json({
      success: true,
      pushed,
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
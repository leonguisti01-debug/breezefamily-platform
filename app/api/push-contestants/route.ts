import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

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

    const { data: contestants, error } = await supabase
      .from("contestants")
      .select("*")
      .in("id", ids)
      .order("id");

    if (error) {
      throw error;
    }

    let pushed = 0;
    let failed = 0;

    for (const contestant of contestants || []) {
      try {
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
                        contestant.age?.toString() ||
                        "-",
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
                    {
                      name: "Status",
                      value:
                        contestant.status ||
                        "Approved",
                    },
                  ],

                  image: contestant.photo_url
                    ? {
                        url: contestant.photo_url,
                      }
                    : undefined,

                  footer: {
                    text: `Contestant ID ${contestant.id}`,
                  },

                  timestamp:
                    contestant.created_at ||
                    new Date().toISOString(),
                },
              ],
            }),
          }
        );

        if (response.ok) {
          pushed++;
          console.log(
            `Pushed contestant ${contestant.id}`
          );
        } else {
          failed++;

          const errorText =
            await response.text();

          console.error(
            `Discord failed for ${contestant.id}`,
            response.status,
            errorText
          );
        }

        // Discord rate-limit protection
        await sleep(1200);
      } catch (err) {
        failed++;
        console.error(
          `Failed contestant ${contestant.id}`,
          err
        );
      }
    }

    return NextResponse.json({
      success: true,
      total: contestants?.length || 0,
      pushed,
      failed,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
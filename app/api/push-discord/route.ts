import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST() {
  try {
    const { data: contestants, error } =
      await supabase
        .from("contestants")
        .select("*")
        .gte("id", 108)
        .lte("id", 139)
        .order("id");

    if (error) throw error;

    let sent = 0;

    for (const contestant of contestants || []) {
      await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/discord`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            full_name:
              contestant.full_name,
            age: contestant.age,
            talent_category:
              contestant.talent_category,
            tiktok_username:
              contestant.tiktok_username,
            parent_phone:
              contestant.parent_phone,
            photo_url:
              contestant.photo_url,
            status:
              contestant.status,
          }),
        }
      );

      sent++;

      await new Promise((r) =>
        setTimeout(r, 1200)
      );
    }

    return NextResponse.json({
      success: true,
      sent,
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
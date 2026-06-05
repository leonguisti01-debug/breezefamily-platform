import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();

    const {
      player_name,
      whatsapp,
      email,
      activision_id,
      platform,
      team_id,
      agreed_rules,
    } = body;

    if (
      !player_name ||
      !whatsapp ||
      !email ||
      !activision_id ||
      !platform ||
      !team_id
    ) {
      return Response.json(
        {
          success: false,
          error: "Missing fields",
        },
        {
          status: 400,
        }
      );
    }

    const { count } = await supabase
      .from("cod_players")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("team_id", team_id);

    if ((count || 0) >= 4) {
      return Response.json(
        {
          success: false,
          error: "Team is full",
        },
        {
          status: 400,
        }
      );
    }

    const { error } = await supabase
      .from("cod_players")
      .insert([
        {
          team_id,
          player_name,
          whatsapp,
          email,
          activision_id,
          platform,
          status: "pending",
          agreed_rules,
        },
      ]);

    if (error) {
      console.error(error);

      return Response.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return Response.json({
      success: true,
    });

  } catch (error: any) {

    console.error(error);

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
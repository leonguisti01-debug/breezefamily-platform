import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL;

const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Missing Supabase environment variables"
  );
}

const supabase = createClient(
  supabaseUrl,
  serviceRoleKey
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const authUserId = body.authUserId;

    if (!authUserId) {
      return NextResponse.json(
        {
          error: "Missing auth user id",
        },
        {
          status: 400,
        }
      );
    }

    const { data: member } = await supabase
      .from("members")
      .select("*")
      .eq("auth_user_id", authUserId)
      .single();

    if (!member) {
      return NextResponse.json(
        {
          error: "Member not found",
        },
        {
          status: 404,
        }
      );
    }

    const now = new Date();

    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    let alreadyClaimed = false;

    if (member.last_login) {
      const lastLogin = new Date(
        member.last_login
      );

      const lastLoginDay = new Date(
        lastLogin.getFullYear(),
        lastLogin.getMonth(),
        lastLogin.getDate()
      );

      alreadyClaimed =
        lastLoginDay.getTime() ===
        today.getTime();
    }

    if (alreadyClaimed) {
      return NextResponse.json({
        awarded: false,
        breeze_points:
          member.breeze_points || 0,
        member_level:
          member.member_level || 1,
        login_streak:
          member.login_streak || 0,
      });
    }

    let streak =
      member.login_streak || 0;

    if (member.last_login) {
      const lastLogin =
        new Date(member.last_login);

      const yesterday =
        new Date(today);

      yesterday.setDate(
        yesterday.getDate() - 1
      );

      const lastLoginDay =
        new Date(
          lastLogin.getFullYear(),
          lastLogin.getMonth(),
          lastLogin.getDate()
        );

      if (
        lastLoginDay.getTime() ===
        yesterday.getTime()
      ) {
        streak += 1;
      } else {
        streak = 1;
      }
    } else {
      streak = 1;
    }

    const rewardPoints = 10;

    const totalPoints =
      (member.breeze_points || 0) +
      rewardPoints;

    let level = 1;

    if (totalPoints >= 500)
      level = 2;

    if (totalPoints >= 1000)
      level = 3;

    if (totalPoints >= 2000)
      level = 4;

    if (totalPoints >= 3500)
      level = 5;

    await supabase
      .from("members")
      .update({
        breeze_points:
          totalPoints,
        member_level:
          level,
        login_streak:
          streak,
        last_login:
          now.toISOString(),
      })
      .eq(
        "auth_user_id",
        authUserId
      );

    await supabase
      .from("points_log")
      .insert({
        member_id: member.id,
        points: rewardPoints,
        reason:
          "Daily Login Reward",
      });

    return NextResponse.json({
      awarded: true,
      pointsAwarded:
        rewardPoints,
      breeze_points:
        totalPoints,
      member_level:
        level,
      login_streak:
        streak,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
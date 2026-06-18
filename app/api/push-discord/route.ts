export async function GET() {
  const response = await fetch(
    process.env.DISCORD_WEBHOOK_URL!,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "🚨 TEST MESSAGE FROM BREEZE FAMILY",
      }),
    }
  );

  return Response.json({
    success: response.ok,
    status: response.status,
  });
}
import { NextResponse } from "next/server";
import { runNewsBot } from "../bots/newsBot";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("Cron job running...");
    await runNewsBot();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Cron failed: " + error },
      { status: 500 }
    );
  }
}

import { BrowserUseClient } from "browser-use-sdk";
import { NextRequest, NextResponse } from "next/server";
import { SessionResponse } from "@/types/browser-use";

const client = new BrowserUseClient({
  apiKey: process.env.BROWSER_USE_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { proxyCountryCode } = body;

    const session = await client.sessions.createSession({
      proxyCountryCode: proxyCountryCode || undefined,
    });

    const sessionResponse: SessionResponse = {
      id: session.id,
      status: session.status as any,
      startedAt: session.startedAt,
      finishedAt: session.finishedAt || null,
      liveUrl: session.liveUrl || null,
      publicShareUrl: null, // This property doesn't exist in the SDK response
    };

    return NextResponse.json(sessionResponse);
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const pageNumber = parseInt(searchParams.get("pageNumber") || "1");
    const filterBy = searchParams.get("filterBy");

    const sessions = await client.sessions.listSessions({
      pageSize,
      pageNumber,
      filterBy: filterBy as any,
    });

    return NextResponse.json(sessions);
  } catch (error) {
    console.error("Error listing sessions:", error);
    return NextResponse.json(
      { error: "Failed to list sessions" },
      { status: 500 }
    );
  }
}

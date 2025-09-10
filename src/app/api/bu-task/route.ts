import { BrowserUseClient } from "browser-use-sdk";
import { NextRequest, NextResponse } from "next/server";
import { CreateTaskRequest } from "@/types/browser-use";

const client = new BrowserUseClient({
  apiKey: process.env.BROWSER_USE_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = CreateTaskRequest.parse(body);

    const task = await client.tasks.createTask({
      task: validatedData.task,
      llm: validatedData.llm as any,
      startUrl: validatedData.startUrl,
      maxSteps: validatedData.maxSteps,
      sessionId: validatedData.sessionId,
      metadata: validatedData.metadata as Record<string, string> | undefined,
      secrets: validatedData.secrets as Record<string, string> | undefined,
      allowedDomains: validatedData.allowedDomains,
      highlightElements: validatedData.highlightElements,
      flashMode: validatedData.flashMode,
      thinking: validatedData.thinking,
      vision: validatedData.vision,
      systemPromptExtension: validatedData.systemPromptExtension,
      structuredOutput: validatedData.structuredOutput,
    });

    return NextResponse.json({ 
      id: task.id,
      message: "Task created successfully" 
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}

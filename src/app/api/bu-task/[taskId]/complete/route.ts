import { BrowserUseClient } from "browser-use-sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new BrowserUseClient({
  apiKey: process.env.BROWSER_USE_API_KEY!,
});

export async function POST(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    // Get the task to check its status
    const task = await client.tasks.getTask(params.taskId);
    
    // If task is already finished, return the existing output
    if (task.status === "finished") {
      return NextResponse.json({
        success: true,
        output: task.output,
        parsed: null, // We don't have parsed data from the basic task view
        isSuccess: task.isSuccess,
      });
    }

    // For running tasks, we need to wait for completion
    // This is a simplified approach - in a real app you might want to use streaming
    return NextResponse.json({
      success: false,
      error: "Task is still running. Use streaming or polling to get real-time updates.",
      status: task.status,
    });
  } catch (error) {
    console.error("Error completing task:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to complete task",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

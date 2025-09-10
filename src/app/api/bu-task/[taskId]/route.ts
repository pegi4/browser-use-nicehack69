import { BrowserUseClient } from "browser-use-sdk";
import { NextRequest, NextResponse } from "next/server";
import { TaskResponse } from "@/types/browser-use";

const client = new BrowserUseClient({
  apiKey: process.env.BROWSER_USE_API_KEY!,
});

export async function GET(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const task = await client.tasks.getTask(params.taskId);
    
    const taskResponse: TaskResponse = {
      id: task.id,
      sessionId: task.sessionId,
      llm: task.llm,
      task: task.task,
      status: task.status as any,
      startedAt: task.startedAt,
      finishedAt: task.finishedAt || null,
      metadata: task.metadata || null,
      output: task.output || null,
      browserUseVersion: task.browserUseVersion || null,
      isSuccess: task.isSuccess || null,
      steps: task.steps?.map(step => ({
        number: step.number,
        memory: step.memory,
        evaluationPreviousGoal: step.evaluationPreviousGoal,
        nextGoal: step.nextGoal,
        url: step.url,
        actions: step.actions,
        screenshotUrl: step.screenshotUrl || null,
      })),
      outputFiles: task.outputFiles?.map(file => ({
        id: file.id,
        fileName: file.fileName,
      })),
    };

    return NextResponse.json(taskResponse);
  } catch (error) {
    console.error("Error getting task:", error);
    return NextResponse.json(
      { error: "Failed to get task" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const body = await request.json();
    const { action } = body;

    if (!action || !["stop", "pause", "resume", "stop_task_and_session"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Must be one of: stop, pause, resume, stop_task_and_session" },
        { status: 400 }
      );
    }

    const task = await client.tasks.updateTask(params.taskId, { action });
    
    return NextResponse.json({ 
      id: task.id,
      status: task.status,
      message: `Task ${action} successful` 
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

import { BrowserUseClient } from "browser-use-sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new BrowserUseClient({
  apiKey: process.env.BROWSER_USE_API_KEY!,
});

export async function GET(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const task = await client.tasks.getTask(params.taskId);
    
    // Create a readable stream for Server-Sent Events
    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();
        
        // Send initial task data
        const initialData = {
          type: 'task_update',
          data: {
            id: task.id,
            status: task.status,
            output: task.output,
            isSuccess: task.isSuccess,
            steps: task.steps,
          }
        };
        
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(initialData)}\n\n`));
        
        // If task is finished, close the stream
        if (task.status === "finished" || task.status === "stopped") {
          controller.close();
          return;
        }
        
        // Poll for updates every 2 seconds
        const pollInterval = setInterval(async () => {
          try {
            const updatedTask = await client.tasks.getTask(params.taskId);
            
            const updateData = {
              type: 'task_update',
              data: {
                id: updatedTask.id,
                status: updatedTask.status,
                output: updatedTask.output,
                isSuccess: updatedTask.isSuccess,
                steps: updatedTask.steps,
              }
            };
            
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(updateData)}\n\n`));
            
            // Close stream if task is finished
            if (updatedTask.status === "finished" || updatedTask.status === "stopped") {
              clearInterval(pollInterval);
              controller.close();
            }
          } catch (error) {
            console.error("Error polling task:", error);
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({
              type: 'error',
              error: 'Failed to poll task updates'
            })}\n\n`));
            clearInterval(pollInterval);
            controller.close();
          }
        }, 2000);
        
        // Cleanup on abort
        request.signal.addEventListener('abort', () => {
          clearInterval(pollInterval);
          controller.close();
        });
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error("Error streaming task:", error);
    return NextResponse.json(
      { error: "Failed to stream task" },
      { status: 500 }
    );
  }
}

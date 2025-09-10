import { 
  CreateTaskRequest, 
  TaskResponse, 
  SessionResponse, 
  TaskResult,
} from "@/types/browser-use";

const API_BASE = "/api";

export class BrowserUseClient {
  async createTask(taskData: CreateTaskRequest) {
    const response = await fetch(`${API_BASE}/bu-task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create task: ${response.statusText}`);
    }

    return response.json();
  }

  async getTask(taskId: string): Promise<TaskResponse> {
    const response = await fetch(`${API_BASE}/bu-task/${taskId}`);

    if (!response.ok) {
      throw new Error(`Failed to get task: ${response.statusText}`);
    }

    return response.json();
  }

  async updateTask(taskId: string, action: "stop" | "pause" | "resume" | "stop_task_and_session") {
    const response = await fetch(`${API_BASE}/bu-task/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update task: ${response.statusText}`);
    }

    return response.json();
  }

  async completeTask(taskId: string): Promise<TaskResult> {
    const response = await fetch(`${API_BASE}/bu-task/${taskId}/complete`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`Failed to complete task: ${response.statusText}`);
    }

    return response.json();
  }

  async createSession(proxyCountryCode?: string): Promise<SessionResponse> {
    const response = await fetch(`${API_BASE}/bu-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ proxyCountryCode }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create session: ${response.statusText}`);
    }

    return response.json();
  }

  async listSessions(pageSize = 10, pageNumber = 1, filterBy?: string) {
    const params = new URLSearchParams({
      pageSize: pageSize.toString(),
      pageNumber: pageNumber.toString(),
      ...(filterBy && { filterBy }),
    });

    const response = await fetch(`${API_BASE}/bu-session?${params}`);

    if (!response.ok) {
      throw new Error(`Failed to list sessions: ${response.statusText}`);
    }

    return response.json();
  }

}

export const browserUseClient = new BrowserUseClient();

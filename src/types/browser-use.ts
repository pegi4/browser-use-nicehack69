import { z } from "zod";

// Task status enum
export const TaskStatus = z.enum(["started", "paused", "finished", "stopped"]);
export type TaskStatus = z.infer<typeof TaskStatus>;

// Session status enum
export const SessionStatus = z.enum(["active", "stopped"]);
export type SessionStatus = z.infer<typeof SessionStatus>;

// Task creation request
export const CreateTaskRequest = z.object({
  task: z.string().min(1).max(20000),
  llm: z.string().optional(),
  startUrl: z.string().url().optional(),
  maxSteps: z.number().min(1).max(200).optional(),
  sessionId: z.string().uuid().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
  secrets: z.record(z.string(), z.string()).optional(),
  allowedDomains: z.array(z.string()).optional(),
  highlightElements: z.boolean().optional(),
  flashMode: z.boolean().optional(),
  thinking: z.boolean().optional(),
  vision: z.boolean().optional(),
  systemPromptExtension: z.string().max(2000).optional(),
  structuredOutput: z.string().optional(), // JSON schema as string
});

export type CreateTaskRequest = z.infer<typeof CreateTaskRequest>;

// Task response
export const TaskResponse = z.object({
  id: z.string().uuid(),
  sessionId: z.string().uuid(),
  llm: z.string(),
  task: z.string(),
  status: TaskStatus,
  startedAt: z.string().datetime(),
  finishedAt: z.string().datetime().nullable(),
  metadata: z.record(z.string(), z.any()).nullable(),
  output: z.string().nullable(),
  browserUseVersion: z.string().nullable(),
  isSuccess: z.boolean().nullable(),
  steps: z.array(z.object({
    number: z.number(),
    memory: z.string(),
    evaluationPreviousGoal: z.string(),
    nextGoal: z.string(),
    url: z.string(),
    actions: z.array(z.string()),
    screenshotUrl: z.string().nullable(),
  })).optional(),
  outputFiles: z.array(z.object({
    id: z.string().uuid(),
    fileName: z.string(),
  })).optional(),
});

export type TaskResponse = z.infer<typeof TaskResponse>;

// Session response
export const SessionResponse = z.object({
  id: z.string().uuid(),
  status: SessionStatus,
  startedAt: z.string().datetime(),
  finishedAt: z.string().datetime().nullable(),
  liveUrl: z.string().nullable(),
  publicShareUrl: z.string().nullable(),
  tasks: z.array(TaskResponse).optional(),
});

export type SessionResponse = z.infer<typeof SessionResponse>;


// Generic task result
export const TaskResult = z.object({
  success: z.boolean(),
  output: z.string(),
  parsed: z.any().optional(),
  error: z.string().optional(),
});

export type TaskResult = z.infer<typeof TaskResult>;

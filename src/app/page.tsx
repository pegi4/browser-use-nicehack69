"use client";

import { useState } from "react";
import TaskForm from "@/components/TaskForm";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleTaskCreated = (taskId: string) => {
    setSuccess(`Task created successfully! ID: ${taskId}`);
    setError(null);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setSuccess(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-3xl font-black text-balance">Property Finder</h1>
          </div>
          <p className="text-muted-foreground">
            AI-powered property search automation. Find the perfect property using intelligent browser automation.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-destructive/15 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
            <strong>Error:</strong> {error}
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-500/15 border border-green-500/20 text-green-600 px-4 py-3 rounded-md">
            <strong>Success:</strong> {success}
          </div>
        )}

        <TaskForm 
          onTaskCreated={handleTaskCreated}
          onError={handleError}
        />
      </div>
    </div>
  );
}

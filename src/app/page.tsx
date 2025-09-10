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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Property Finder
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            AI-powered property search automation. Find the perfect property using intelligent browser automation.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            <strong>Error:</strong> {error}
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
            <strong>Success:</strong> {success}
          </div>
        )}

        <div className="max-w-4xl mx-auto mb-8">
          <TaskForm 
            onTaskCreated={handleTaskCreated}
            onError={handleError}
          />
        </div>
      </div>
    </div>
  );
}

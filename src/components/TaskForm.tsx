"use client";

import { useState } from "react";
import { CreateTaskRequest } from "@/types/browser-use";
import { browserUseClient } from "@/lib/browser-use-client";

interface TaskFormProps {
  onTaskCreated: (taskId: string) => void;
  onError: (error: string) => void;
}

export default function TaskForm({ onTaskCreated, onError }: TaskFormProps) {
  const [formData, setFormData] = useState<Partial<CreateTaskRequest>>({
    task: "",
    llm: "gpt-4.1-mini",
    flashMode: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { id } = await browserUseClient.createTask(formData as CreateTaskRequest);
      onTaskCreated(id);
    } catch (error) {
      onError(error instanceof Error ? error.message : "Failed to create task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof CreateTaskRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Property Finder Task</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Search Description *
        </label>
        <textarea
          value={formData.task}
          onChange={(e) => handleChange("task", e.target.value)}
          placeholder="Describe the property you want to find (e.g., 'Find 3-bedroom apartments in downtown area under $500k')..."
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          required
        />
      </div>


      <div className="flex items-center justify-center">
        <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.flashMode}
            onChange={(e) => handleChange("flashMode", e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div>
            <span className="text-lg font-medium text-gray-900">ENABLE Fast Mode</span>
            <p className="text-sm text-gray-500">Faster property search execution</p>
          </div>
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading || !formData.task}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? "Searching Properties..." : "Start Property Search"}
      </button>
    </form>
  );
}

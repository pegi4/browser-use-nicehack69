"use client";

import { useState } from "react";
import { CreateTaskRequest } from "@/types/browser-use";
import { browserUseClient } from "@/lib/browser-use-client";

interface TaskFormProps {
  onTaskCreated: (taskId: string) => void;
  onError: (error: string) => void;
}

interface Source {
  id: string;
  name: string;
  domain: string;
  checked: boolean;
  deletable?: boolean;
}

export default function TaskForm({ onTaskCreated, onError }: TaskFormProps) {
  const [formData, setFormData] = useState<Partial<CreateTaskRequest>>({
    task: "",
    llm: "gpt-4.1-mini",
  });
  const [sources, setSources] = useState<Source[]>([
    { id: "nepremicnine", name: "nepremicnine.net", domain: "nepremicnine.net", checked: true },
    { id: "bolha", name: "bolha.si/nepremicnine", domain: "bolha.si", checked: false },
    { id: "google", name: "Google (free search)", domain: "google.com", checked: false },
  ]);
  const [customDomain, setCustomDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const selectedSources = sources.filter((s) => s.checked);
      const allDomains = selectedSources.map((s) => s.domain);

      if (allDomains.length === 0) {
        onError("Please select at least one source.");
        return;
      }

      const taskData: CreateTaskRequest = {
        ...formData,
        task: formData.task || "",
        allowedDomains: allDomains,
      } as CreateTaskRequest;

      const { id } = await browserUseClient.createTask(taskData);
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

  const handleSourceChange = (sourceId: string, checked: boolean) => {
    setSources((prev) => prev.map((source) => (source.id === sourceId ? { ...source, checked } : source)));
  };

  const addCustomDomain = () => {
    if (customDomain.trim() && !sources.some((s) => s.domain === customDomain.trim())) {
      const newSource: Source = {
        id: `custom-${Date.now()}`,
        name: customDomain.trim(),
        domain: customDomain.trim(),
        checked: true,
        deletable: true,
      };
      setSources((prev) => [...prev, newSource]);
      setCustomDomain("");
    }
  };

  const deleteSource = (sourceId: string) => {
    setSources((prev) => prev.filter((source) => source.id !== sourceId));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          value={formData.task}
          onChange={(e) => handleChange("task", e.target.value)}
          placeholder="Describe the property you want to find (e.g., 'Find 3-bedroom apartments in downtown area under $500k')..."
          className="w-full p-4 bg-background border border-border rounded-md focus:ring-2 focus:ring-ring focus:border-transparent text-foreground placeholder:text-muted-foreground"
          required
        />

      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold">Sources</h2>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {sources.map((source) => (
              <div key={source.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={source.id}
                    checked={source.checked}
                    onChange={(e) => handleSourceChange(source.id, e.target.checked)}
                    className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-ring focus:ring-2"
                  />
                  <label htmlFor={source.id} className="text-sm font-normal cursor-pointer text-foreground">
                    {source.name}
                  </label>
                </div>
                {source.deletable && (
                  <button
                    onClick={() => deleteSource(source.id)}
                    className="hover:bg-muted rounded p-1 text-muted-foreground hover:text-foreground"
                    aria-label={`Delete ${source.name}`}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border">
            <label className="text-sm font-medium mb-2 block text-foreground">Add Custom Domain</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="example.com"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustomDomain()}
                className="flex-1 p-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-ring focus:border-transparent text-foreground placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={addCustomDomain}
                disabled={!customDomain.trim()}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

        <button
          type="submit"
          disabled={isLoading || !formData.task}
          className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-md hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
        >
          {isLoading ? "Searching Properties..." : "Start Property Search"}
          <svg 
            className="h-5 w-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
            />
          </svg>
        </button>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import { CreateTaskRequest } from "@/types/browser-use";
import { browserUseClient } from "@/lib/browser-use-client";
import { createRealEstateSystemPrompt } from "@/lib/prompts";

interface TaskProgress {
  taskId: string;
  domain: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
}

interface TaskFormProps {
  onTasksCreated: (tasks: TaskProgress[], searchQuery: string) => void;
  onError: (error: string) => void;
}

interface Source {
  id: string;
  name: string;
  domain: string;
  checked: boolean;
  deletable?: boolean;
}

export default function TaskForm({ onTasksCreated, onError }: TaskFormProps) {
  const [formData, setFormData] = useState<Partial<CreateTaskRequest>>({
    task: "",
    llm: "gpt-4.1-mini",
  });
  const [sources, setSources] = useState<Source[]>([
    { id: "nepremicnine", name: "nepremicnine.net", domain: "nepremicnine.net", checked: true, deletable: true },
    { id: "bolha", name: "bolha.si", domain: "bolha.si/nepremicnine", checked: false, deletable: true },
    { id: "google", name: "Google (free search)", domain: "google.com", checked: false, deletable: true },
    { id: "Facebook Marketplace", name: "Facebook Marketplace", domain: "facebook.com", checked: false, deletable: true },
  ]);
  const [customDomain, setCustomDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const selectedSources = sources.filter((s) => s.checked);

      if (selectedSources.length === 0) {
        onError("Please select at least one source.");
        return;
      }

      if (!formData.task?.trim()) {
        onError("Please enter a search query.");
        return;
      }

      // Create separate tasks for each domain
      const taskPromises = selectedSources.map(async (source) => {
        const systemPrompt = createRealEstateSystemPrompt(source.domain, formData.task!);
        
        // Special handling for Google - no allowedDomains or startUrl restrictions
        const isGoogle = source.domain === 'google.com';
        
        const taskData: CreateTaskRequest = {
          task: systemPrompt,
          llm: "gpt-4.1-mini",
          ...(isGoogle ? {} : {
            allowedDomains: [source.domain], // Only allow this specific domain
            startUrl: `https://${source.domain}` // Start directly on the domain
          })
        };

        const { id } = await browserUseClient.createTask(taskData);
        return {
          taskId: id,
          domain: source.domain,
          status: 'pending' as const
        };
      });

      // Wait for all tasks to be created
      const createdTasks = await Promise.all(taskPromises);
      onTasksCreated(createdTasks, formData.task!);
    } catch (error) {
      onError(error instanceof Error ? error.message : "Failed to create tasks");
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

  const promptCards = [
    {
      title: "Apartments",
      description: "Find apartments in your area",
      prompt: "Find 2-3 bedroom apartments in downtown area under $800k with parking"
    },
    {
      title: "Houses",
      description: "Search for houses",
      prompt: "Find 3-4 bedroom houses with garden in residential area under $1.2M"
    },
    {
      title: "Commercial",
      description: "Business properties",
      prompt: "Find office spaces or retail properties in city center under $2000/month"
    }
  ];

  const handlePromptClick = (prompt: string) => {
    setFormData(prev => ({ ...prev, task: prompt }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    handleChange("task", textarea.value);
    
    // Auto-resize textarea
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 350) + 'px';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {promptCards.map((card, index) => (
          <button
            key={index}
            onClick={() => handlePromptClick(card.prompt)}
            className="p-6 bg-gradient-to-br from-card to-muted/30 border-2 border-primary/20 rounded-xl hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 text-left shadow-lg"
          >
            <h3 className="font-semibold text-foreground mb-2 text-lg">{card.title}</h3>
            <p className="text-sm text-muted-foreground">{card.description}</p>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <textarea
          value={formData.task}
          onChange={handleTextareaChange}
          placeholder="Describe the property you want to find..."
          className="w-full p-6 bg-gradient-to-br from-card to-muted/30 border-2 border-primary/40 rounded-xl focus:ring-4 focus:ring-primary/30 focus:border-primary text-foreground placeholder:text-muted-foreground resize-none min-h-[80px] max-h-[450px] overflow-y-auto shadow-2xl focus:shadow-2xl focus:shadow-primary/20 transition-all duration-300 text-lg font-medium"
          rows={1}
          required
        />

      <div className="bg-gradient-to-br from-card to-muted/30 border-2 border-primary/20 rounded-xl shadow-lg">
        <div className="p-6 border-b border-primary/20">
          <h2 className="text-lg font-semibold text-foreground">Sources</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Select the websites our AI engine will crawl to find properties for you
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-3 mb-6">
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

          <div className="pt-4 border-t border-primary/20">
            <label className="text-sm font-medium mb-2 block text-foreground">Add Custom Domain</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="example.com"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustomDomain()}
                className="flex-1 p-3 bg-background border-2 border-primary/20 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary text-foreground placeholder:text-muted-foreground transition-all duration-200"
              />
              <button
                type="button"
                onClick={addCustomDomain}
                disabled={!customDomain.trim()}
                className="px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed font-medium transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
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
          className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-4 px-6 rounded-xl hover:from-primary/90 hover:to-primary/70 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-3 text-lg shadow-2xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 cursor-pointer"
        >
          {isLoading ? "Creating Search Tasks..." : "Start Real Estate Search"}
          <svg 
            className="h-6 w-6" 
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

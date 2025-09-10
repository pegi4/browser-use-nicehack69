"use client";

import { useState } from "react";
import TaskForm from "@/components/TaskForm";
import LoadingScreen from "@/components/LoadingScreen";
import PropertyResults from "@/components/PropertyResults";

interface TaskProgress {
  taskId: string;
  domain: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
}

interface DomainResult {
  domain: string;
  data: any;
}

type AppState = 'form' | 'loading' | 'results';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('form');
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<TaskProgress[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<DomainResult[]>([]);

  const handleTasksCreated = (createdTasks: TaskProgress[], query: string) => {
    setTasks(createdTasks);
    setSearchQuery(query);
    setError(null);
    setAppState('loading');
  };

  const handleSearchComplete = (searchResults: DomainResult[]) => {
    setResults(searchResults);
    setAppState('results');
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setAppState('form');
  };

  const handleNewSearch = () => {
    setAppState('form');
    setError(null);
    setTasks([]);
    setResults([]);
    setSearchQuery('');
  };

  // Render based on current app state
  if (appState === 'loading') {
    return (
      <LoadingScreen
        tasks={tasks}
        onComplete={handleSearchComplete}
        onError={handleError}
        userQuery={searchQuery}
      />
    );
  }

  if (appState === 'results') {
    return (
      <PropertyResults
        results={results}
        searchQuery={searchQuery}
        onNewSearch={handleNewSearch}
      />
    );
  }

  // Default form state
  return (
    <div className="min-h-screen bg-background text-foreground dark pt-26">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-3xl font-black text-balance">Real Estate Finder</h1>
          </div>
          <p className="text-muted-foreground">
            AI-powered real estate search. Find the perfect property using intelligent automation.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-destructive/15 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
            <strong>Error:</strong> {error}
          </div>
        )}

        <TaskForm 
          onTasksCreated={handleTasksCreated}
          onError={handleError}
        />
      </div>
    </div>
  );
}

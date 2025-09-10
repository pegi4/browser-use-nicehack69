"use client";

import { useState, useEffect } from "react";
import { getLoadingMessages } from "@/lib/prompts";

interface TaskProgress {
  taskId: string;
  domain: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  currentStep?: string;
  progress?: number;
}

interface LoadingScreenProps {
  tasks: TaskProgress[];
  onComplete: (results: any[]) => void;
  onError: (error: string) => void;
  userQuery: string;
}

export default function LoadingScreen({ tasks, onComplete, onError, userQuery }: LoadingScreenProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [taskProgress, setTaskProgress] = useState<TaskProgress[]>(tasks);
  const [completedTasks, setCompletedTasks] = useState<any[]>([]);
  const loadingMessages = getLoadingMessages();

  // Rotate through loading messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [loadingMessages.length]);

  // Monitor task progress
  useEffect(() => {
    const monitorTasks = async () => {
      const updatedTasks = [...taskProgress];
      let allCompleted = true;
      const results: any[] = [];

      for (let i = 0; i < updatedTasks.length; i++) {
        const task = updatedTasks[i];
        
        if (task.status === 'pending') {
          // Task hasn't started yet, mark as running
          updatedTasks[i] = { ...task, status: 'running' };
          allCompleted = false;
        } else if (task.status === 'running') {
          try {
            // Check task status
            const response = await fetch(`/api/bu-task/${task.taskId}`);
            const taskData = await response.json();

            if (taskData.status === 'finished') {
              // Get task results
              const resultResponse = await fetch(`/api/bu-task/${task.taskId}/complete`);
              const result = await resultResponse.json();
              
              updatedTasks[i] = { ...task, status: 'completed' };
              results.push({ domain: task.domain, data: result });
            } else if (taskData.status === 'failed') {
              updatedTasks[i] = { ...task, status: 'failed' };
            } else {
              // Still running
              allCompleted = false;
              // Update progress if available
              if (taskData.steps && taskData.steps.length > 0) {
                const latestStep = taskData.steps[taskData.steps.length - 1];
                updatedTasks[i] = { 
                  ...task, 
                  currentStep: latestStep.description || 'Processing...',
                  progress: Math.min(90, (taskData.steps.length * 15)) // Estimate progress
                };
              }
            }
          } catch (error) {
            console.error(`Error monitoring task ${task.taskId}:`, error);
            updatedTasks[i] = { ...task, status: 'failed' };
          }
        }
      }

      setTaskProgress(updatedTasks);

      // Check if all tasks are completed
      const completedCount = updatedTasks.filter(t => t.status === 'completed').length;
      const failedCount = updatedTasks.filter(t => t.status === 'failed').length;
      
      if (completedCount + failedCount === updatedTasks.length) {
        if (completedCount > 0) {
          setCompletedTasks(results);
          setTimeout(() => onComplete(results), 1000); // Small delay for UX
        } else {
          onError("All tasks failed to complete");
        }
      }
    };

    const interval = setInterval(monitorTasks, 2000); // Check every 2 seconds
    monitorTasks(); // Initial check

    return () => clearInterval(interval);
  }, [taskProgress, onComplete, onError]);

  const getProgressPercentage = () => {
    const completed = taskProgress.filter(t => t.status === 'completed').length;
    return Math.round((completed / taskProgress.length) * 100);
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg className="h-8 w-8 text-primary animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <h1 className="text-3xl font-black text-balance">Finding Your Properties</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Searching for: <span className="text-primary font-medium">"{userQuery}"</span>
          </p>
        </div>

        {/* Main Loading Message */}
        <div className="bg-gradient-to-br from-card to-muted/30 border-2 border-primary/20 rounded-xl p-8 mb-8 text-center shadow-lg">
          <div className="text-2xl font-semibold text-primary mb-4 animate-pulse">
            {loadingMessages[currentMessageIndex]}
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-muted/30 rounded-full h-3 mb-6">
            <div 
              className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>

          <p className="text-muted-foreground">
            {getProgressPercentage()}% Complete • {taskProgress.filter(t => t.status === 'completed').length} of {taskProgress.length} sources processed
          </p>
        </div>

        {/* Task Progress Cards */}
        <div className="grid gap-4">
          {taskProgress.map((task, index) => (
            <div key={task.taskId} className="bg-gradient-to-br from-card to-muted/30 border-2 border-primary/20 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    task.status === 'completed' ? 'bg-green-500' :
                    task.status === 'running' ? 'bg-yellow-500 animate-pulse' :
                    task.status === 'failed' ? 'bg-red-500' :
                    'bg-gray-400'
                  }`}></div>
                  <h3 className="font-semibold text-lg">{task.domain}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                  task.status === 'running' ? 'bg-yellow-500/20 text-yellow-400' :
                  task.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {task.status === 'completed' ? 'Completed' :
                   task.status === 'running' ? 'Searching...' :
                   task.status === 'failed' ? 'Failed' :
                   'Waiting...'}
                </span>
              </div>
              
              {task.currentStep && (
                <p className="text-muted-foreground text-sm mb-2">
                  {task.currentStep}
                </p>
              )}
              
              {task.status === 'running' && (
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${task.progress || 10}%` }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Completion Message */}
        {completedTasks.length === taskProgress.length && completedTasks.length > 0 && (
          <div className="mt-8 bg-gradient-to-br from-green-500/10 to-green-600/5 border-2 border-green-500/20 rounded-xl p-6 text-center shadow-lg">
            <div className="text-green-400 text-xl font-semibold mb-2">
              🎉 Search Complete!
            </div>
            <p className="text-muted-foreground">
              Found properties from {completedTasks.length} sources. Preparing results...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

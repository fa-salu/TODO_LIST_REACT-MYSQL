import React from "react";
import { Card } from "@mui/material";
import {
  Calendar,
  Clock,
  CheckCircle,
  Circle,
  AlertCircle,
} from "lucide-react";

export const CalendarCard = () => {
  const todos = [
    {
      id: 1,
      title: "Complete Project Proposal",
      dueDate: "2024-02-15",
      priority: "high",
      status: "pending",
      description: "Write and review the Q1 project proposal",
    },
    {
      id: 2,
      title: "Team Meeting",
      dueDate: "2024-02-12",
      priority: "medium",
      status: "completed",
      description: "Weekly sync with development team",
    },
    {
      id: 3,
      title: "Review Code Changes",
      dueDate: "2024-02-11",
      priority: "high",
      status: "pending",
      description: "Review pull requests for new features",
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "pending":
        return <Circle className="w-5 h-5 text-yellow-500" />;
      case "overdue":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Todo Dashboard</h2>
        </div>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>

      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {getStatusIcon(todo.status)}
                  <h3 className="font-medium">{todo.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
              </div>
              <div className="flex flex-col items-end">
                <div
                  className={`text-sm font-medium ${getPriorityColor(
                    todo.priority
                  )}`}
                >
                  {todo.priority.charAt(0).toUpperCase() +
                    todo.priority.slice(1)}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                  <Clock className="w-4 h-4" />
                  {new Date(todo.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {todos.length === 0 && (
        <div className="h-32 flex items-center justify-center text-gray-500">
          No todos for today
        </div>
      )}
    </Card>
  );
};

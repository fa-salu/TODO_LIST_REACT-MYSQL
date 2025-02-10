import React from "react";
import { Card } from "@mui/material";
import { Calendar } from "lucide-react";

export const CalendarCard = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-gray-500" />
        <h2 className="text-lg font-semibold">Calendar</h2>
      </div>
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">Calendar Content Goes Here</p>
      </div>
    </Card>
  );
};

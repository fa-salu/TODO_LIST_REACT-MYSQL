import React from "react";
import { Card } from "@mui/material";
import { BarChart } from "lucide-react";

export const StatsCard = ({ title, value, color }) => {
  const bgColorMap = {
    blue: "bg-blue-100",
    yellow: "bg-yellow-100",
    green: "bg-green-100",
  };

  const textColorMap = {
    blue: "text-blue-600",
    yellow: "text-yellow-600",
    green: "text-green-600",
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        <div className={`p-3 ${bgColorMap[color]} rounded-full`}>
          <BarChart className={`w-6 h-6 ${textColorMap[color]}`} />
        </div>
      </div>
    </Card>
  );
};

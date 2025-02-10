import React from "react";
import { StatsCard } from "./StatusCard";

export const StatsGrid = () => {
  const stats = [
    { title: "Total Tasks", value: 10, color: "blue" },
    { title: "Pending", value: 5, color: "yellow" },
    { title: "Completed", value: 5, color: "green" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          color={stat.color}
        />
      ))}
    </div>
  );
};

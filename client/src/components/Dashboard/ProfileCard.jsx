import React from "react";
import { Card } from "@mui/material";
import { User } from "lucide-react";

export const ProfileCard = ({ name, email }) => {
  return (
    <Card className="p-6">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
          <User className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-500 text-sm">{email}</p>
      </div>
    </Card>
  );
};

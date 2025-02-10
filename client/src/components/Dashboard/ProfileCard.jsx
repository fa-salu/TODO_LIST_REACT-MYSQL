import React from "react";
import { Card } from "@mui/material";
import { User } from "lucide-react";

export const ProfileCard = ({ name, email, completion = 85 }) => {
  return (
    <Card className="p-6">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
          <User className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-500 text-sm">{email}</p>
        <div className="mt-4 w-full">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Profile Completion</span>
            <span>{completion}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${completion}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Card>
  );
};

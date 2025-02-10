import React from "react";
import { Button, Card } from "@mui/material";
import { UserPlus, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AssignTodo = () => {
  const navigate = useNavigate();
  const handleRoute = () => {
    navigate("/todos");
  };
  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">Assign Todo</h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">Create new task</span>
          </div>

          <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">Schedule task</span>
          </div>

          {/* <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
            <AlertCircle className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">Set priority</span>
          </div> */}
        </div>
        <Button
          onClick={handleRoute}
          variant="outline"
          size="sm"
          sx={{ border: "1px solid" }}
        >
          Assign New Task
        </Button>
      </div>
    </Card>
  );
};

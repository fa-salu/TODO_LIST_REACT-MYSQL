import React from "react";
import { Card, CardContent, Typography, Avatar } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";

export function ProfileCard() {
  return (
    <Card className="w-80 p-4 shadow-lg rounded-lg flex flex-col items-center">
      <Avatar sx={{ width: 80, height: 80 }} />
      <CardContent className="text-center">
        <Typography variant="h6">John Doe</Typography>
        <Typography variant="body2" color="text.secondary">
          johndoe@example.com
        </Typography>
      </CardContent>
    </Card>
  );
}

export function CalendarPage() {
  return (
    <Card className="w-full p-4 shadow-lg rounded-lg">
      <CardContent>
        <Typography variant="h6">Calendar</Typography>
        <Typography variant="body2" color="text.secondary">
          <CalendarToday />
        </Typography>
      </CardContent>
    </Card>
  );
}

export function StatsPage() {
  return (
    <Card className="w-full p-4 shadow-lg rounded-lg">
      <CardContent>
        <Typography variant="h6">Task Statistics</Typography>
        <div className="grid grid-cols-3 gap-4 mt-4 text-center">
          <div>
            <Typography variant="h5">10</Typography>
            <Typography variant="body2">Total Tasks</Typography>
          </div>
          <div>
            <Typography variant="h5">5</Typography>
            <Typography variant="body2">Pending</Typography>
          </div>
          <div>
            <Typography variant="h5">5</Typography>
            <Typography variant="body2">Completed</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

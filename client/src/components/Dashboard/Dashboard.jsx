import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Logout, Settings } from "@mui/icons-material";
import { CalendarPage, ProfileCard, StatsPage } from "./Cards";
import Cookies from "js-cookie";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 space-y-6">
      <div className="flex justify-end w-full max-w-4xl gap-5 space-x-4">
        <Button variant="outlined" color="primary" startIcon={<Settings />}>
          Settings
        </Button>
        <Button
          onClick={handleLogout}
          variant="outlined"
          color="secondary"
          startIcon={<Logout />}
        >
          Logout
        </Button>
      </div>

      <ProfileCard />
      <CalendarPage />
      <StatsPage />
    </div>
  );
}

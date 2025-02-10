import React from "react";
import { Header } from "./Header";
import { ProfileCard } from "./ProfileCard";
import { StatsGrid } from "./StatusGrid";
import { CalendarCard } from "./CalenderCard";
import Cookies from "js-cookie";

const Dashboard = () => {
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-3">
            <ProfileCard
              name="John Doe"
              email="johndoe@example.com"
              completion={85}
            />
          </div>

          <div className="col-span-12 lg:col-span-9 space-y-6">
            <StatsGrid />
            <CalendarCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

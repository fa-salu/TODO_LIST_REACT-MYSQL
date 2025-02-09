import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import todoImage from "../../assets/task-home.svg";
import AuthForm from "../../pages/AuthPage";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
      setTimeout(() => navigate("/todos"), 1000);
    }
  }, []);

  return (
    <div className="relative h-screen bg-[#CADCFC] px-4 flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 w-full text-center py-4 shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 tracking-wide">TODO</h1>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center w-full h-full">
        <motion.div
          className="flex-1 md:flex justify-center items-center hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={todoImage}
            alt="Todo List"
            className="max-w-xs md:max-w-sm w-full"
          />
        </motion.div>

        <motion.div
          className="flex-1 flex justify-center items-center w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {isLoggedIn ? (
            <div className="text-center text-green-600 font-bold text-lg">
              Redirecting to your dashboard...
            </div>
          ) : (
            <AuthForm />
          )}
        </motion.div>
      </div>
    </div>
  );
}

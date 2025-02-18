import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Paper, Typography, Link, Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../api/AuthApi";
import Cookies from "js-cookie";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: registerUser,
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
  });

  const handleAuth = () => {
    if (!email || !password || (!isLogin && !name)) {
      console.error("Validation error: Missing fields");
      return;
    }

    if (isLogin) {
      loginMutation.mutate(
        { email, password },
        {
          onSuccess: (data) => {
            Cookies.set("token", data.token, { expires: 7, secure: true });
            navigate("/dashboard");
          },
        }
      );
    } else {
      registerMutation.mutate(
        { username: name, email, password },
        {
          onSuccess: () => {
            setIsLogin(true);
          },
        }
      );
    }
  };

  return (
    <Paper
      elevation={6}
      sx={{
        padding: "24px",
        borderRadius: "12px",
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px",
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Typography variant="h4" fontWeight="bold" textAlign="center">
            {isLogin ? "Login to Todo App" : "Create an Account"}
          </Typography>
          <Typography variant="body1" textAlign="center" sx={{ mt: 1 }}>
            {isLogin
              ? "Manage your tasks efficiently"
              : "Sign up and get started!"}
          </Typography>

          {!isLogin && (
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              sx={{ mt: 2 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            sx={{ mt: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            sx={{ mt: 2, mb: 3 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {(registerMutation.error || loginMutation.error) && (
            <Typography color="error" sx={{ textAlign: "center", mb: 2 }}>
              {registerMutation.error?.response?.data?.error ||
                loginMutation.error?.response?.data?.error}
            </Typography>
          )}

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              color="inherit"
              sx={{ width: "150px" }}
              onClick={handleAuth}
              disabled={registerMutation.isLoading || loginMutation.isLoading}
            >
              {registerMutation.isLoading || loginMutation.isLoading
                ? "Loading..."
                : isLogin
                ? "Login"
                : "Register"}
            </Button>
          </Box>

          <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Link
              sx={{ cursor: "pointer", color: "#000", ml: 1, fontWeight: 500 }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Login"}
            </Link>
          </Typography>
        </motion.div>
      </AnimatePresence>
    </Paper>
  );
}

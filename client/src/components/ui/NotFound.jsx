import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function NotFoundPage() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('images/not-found.jpg')` }}
    >
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        sx={{ px: 4, py: 1, fontSize: "16px" }}
      >
        Go Home
      </Button>
    </div>
  );
}

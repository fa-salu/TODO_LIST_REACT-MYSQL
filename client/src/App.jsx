import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Todo from "./components/Todo/Todo";
import Dashboard from "./components/Dashboard/Dashboard";
import { AuthRoute, ProtectedRoute } from "./middleware/AuthProtectRoute";
import NotFoundPage from "./components/ui/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path={"/"} element={<Home />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path={"/todos"} element={<Todo />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;

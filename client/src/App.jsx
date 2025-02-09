import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Todo from "./components/Todo/Todo";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/todos"} element={<Todo />} />
      <Route path={"/dashboard"} element={<Dashboard />} />
    </Routes>
  );
}

export default App;

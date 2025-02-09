import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Todo from "./components/Todo/Todo";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/todos"} element={<Todo />} />
    </Routes>
  );
}

export default App;

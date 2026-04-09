import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserRepos from "./pages/UserRepos";
import "./App.css";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/:username" element={<UserRepos />} />
    </Routes>
  );
}

export default App;
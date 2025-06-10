import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/home";
import LoginPage from "../auth/login";
import SignupPage from "../auth/signup";
import Navbar from "../components/navbar";
import AddTodo from "../pages/addtodo";

export default function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/addtodo" element={<AddTodo />} />
      </Routes>
    </Router>
  );
}

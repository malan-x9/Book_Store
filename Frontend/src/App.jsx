import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import { Route, Routes } from "react-router-dom";
import Books from "./Components/Books";
export default function App() {
  return (
    <div
      className="min-h-screen w-full font-sans"
      style={{
        background: "linear-gradient(160deg, #f0fdf4 0%, #fefce8 40%, #f0fdf4 100%)",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />}/>
        <Route path="/books" element={<Books />}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      
      
    </div>
  );
}
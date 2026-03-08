import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className="w-full flex items-center justify-between px-10 py-5">
      {/* Logo */}
      <div onClick={() => navigate("/")}
      className="flex items-center gap-1 cursor-pointer">
        <span className="text-2xl font-black tracking-tight text-gray-900">
          R<span className="text-green-500">E</span>ADY
          <span className="text-green-500 text-xs align-super">°</span>
        </span>
      </div>

      {/* Nav Links */}
      <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
        <li>
          <a href="#" className="hover:text-green-500 transition-colors">
            Explore
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-green-500 transition-colors">
            About US
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-green-500 transition-colors">
            Buy Now
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-green-500 transition-colors">
            Contact
          </a>
        </li>
      </ul>

      {/* Auth Buttons */}
       <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-xl font-semibold text-green-500 underline">
              Hi, {user.displayName}
            </span>
            <button
              onClick={logout}
              className="bg-red-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <a href="/signup" className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors shadow-md shadow-green-200">
            Sign Up
          </a>
        )}
      </div>
    </nav>
  );
}
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import Swal from "sweetalert2";
import axiosInstance from "../server/AxiosInterceptor";
import {
  FaHome,
  FaBolt,
  FaVideo,
  FaUser,
  FaEnvelope,
  FaBell,
  FaMoon,
  FaSignOutAlt,
  FaSearch,
} from "react-icons/fa";

const Navbar = () => {
  const { user, setUser, setUserId } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    axiosInstance
      .post(`/api/auth/user/logout/`)
      .then((response) => {
        console.log("Logout Successful:", response?.data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logout Successful..!",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user_id");
        setUser(null);
        setUserId(null);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Login Error:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something went wrong. Please try again..!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
    setIsDropdownOpen(false);
  };

  const toggleDarkMode = () => {
    setActiveTab("mode");
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="flex items-center space-x-4">
          <Link to="/home" className="flex items-center space-x-2">
            <FaBolt className="text-green-500" />
            <span className="text-xl font-bold text-blue-600">PhiBook</span>
          </Link>
          <div className="relative text-gray-600">
            <input
              type="search"
              name="search"
              placeholder="Start typing to search.."
              className="bg-gray-200 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
            />
            <FaSearch className="absolute right-3 top-3" />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-6 text-xl">
        <Link
          to="/home"
          className={`${
            activeTab == "home"
              ? "text-yellow-300"
              : "text-gray-400 hover:text-yellow-300"
          }`}
        >
          <FaHome onClick={() => setActiveTab("home")} />
        </Link>
        <Link
          onClick={() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Coming Soon..!",
              showConfirmButton: false,
              timer: 1500,
            });
          }}
          className={`${
            activeTab == "explore"
              ? "text-yellow-300"
              : "text-gray-400 hover:text-yellow-300"
          }`}
        >
          <FaBolt onClick={() => setActiveTab("explore")} />
        </Link>
        <Link
          onClick={() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Coming Soon..!",
              showConfirmButton: false,
              timer: 1500,
            });
          }}
          className={`${
            activeTab == "video"
              ? "text-yellow-300"
              : "text-gray-400 hover:text-yellow-300"
          }`}
        >
          <FaVideo onClick={() => setActiveTab("video")} />
        </Link>
        <Link
          to="/home/profile"
          className={`${
            activeTab == "profile"
              ? "text-yellow-300"
              : "text-gray-400 hover:text-yellow-300"
          }`}
        >
          <FaUser onClick={() => setActiveTab("profile")} />
        </Link>
        <Link
          to="/home/comment_post"
          className={`${
            activeTab == "envelop"
              ? "text-yellow-300"
              : "text-gray-400 hover:text-yellow-300"
          }`}
        >
          <FaEnvelope onClick={() => setActiveTab("envelop")} />
        </Link>
      </div>

      <div className="flex items-center gap-4 text-xl">
        <FaBell
          onClick={() => {
            setActiveTab("bell");
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Coming Soon..!",
              showConfirmButton: false,
              timer: 1500,
            });
          }}
          className={`${
            activeTab == "bell"
              ? "text-yellow-300"
              : "text-gray-400 hover:text-yellow-300"
          }`}
        />
        <FaMoon
          className={`${
            activeTab == "mode"
              ? "text-yellow-300"
              : "text-gray-400 hover:text-yellow-300"
          }`}
          onClick={toggleDarkMode}
        />
        {user ? (
          <>
            <img
              src={user?.image}
              alt="Profile"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="absolute top-[64px] right-0 w-[200px] bg-white border border-gray-200 rounded-md shadow z-20">
                <ul className="py-2 flex flex-col">
                  <Link to={`/home/liked_post`} className="p-3">Like/Unlike Posts</Link>
                  <Link to={`/home/comment_post`} className="p-3">Comment</Link>
                  <Link to={`/home/my_post`} className="p-3">My Posts</Link>
                  <Link to={`/home/add_post`} className="p-3">Add Post</Link>
                </ul>
              </div>
            )}
            <button
              title="Logout"
              onClick={logout}
              className="text-yellow-300 text-xl hover:text-blue-700 px-3 py-2 rounded-md font-medium"
            >
              <FaSignOutAlt />
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-yellow-300 hover:text-blue-700 px-3 py-2 rounded-md  font-medium"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="text-yellow-300 hover:text-blue-700 px-3 py-2 rounded-md font-medium"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

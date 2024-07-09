import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import Swal from "sweetalert2";
import axiosInstance from "../server/AxiosInterceptor";

const Navbar = () => {
  const { user, setUser, setUserId } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Like/Unlike");

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

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <Link to="/" className="text-xl font-bold">
                My PhiBook
              </Link>
            </div>

            <div className="flex items-center">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium capitalize"
                  >
                    {user?.user?.username}
                  </Link>
                  <div>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Dashboard
                    </button>
                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                      <div className="absolute top-[64px] right-0 w-[200px] bg-white border border-gray-200 rounded-md shadow z-20">
                        <ul className="py-2">
                          <Link to={`/liked_post`}
                            className={`px-4 py-2 block cursor-pointer ${
                              activeTab === "Like/Unlike"
                                ? "bg-black text-white"
                                : "bg-transparent text-black"
                            }`}
                            onClick={() => handleTabSelect("Like/Unlike")}
                          >
                            Like/Unlike Posts
                          </Link>
                          <Link to={`/comment_post`}
                            className={`px-4 py-2 block cursor-pointer ${
                              activeTab === "Comment"
                                ? "bg-secondary text-white"
                                : "bg-transparent text-black"
                            }`}
                            onClick={() => handleTabSelect("Comment")}
                          >
                            Comment
                          </Link>
                          <Link to={`/my_post`}
                            className={`px-4 py-2 block cursor-pointer ${
                              activeTab === "My Posts"
                                ? "bg-secondary text-white"
                                : "bg-transparent text-black"
                            }`}
                            onClick={() => handleTabSelect("My Posts")}
                          >
                            My Posts
                          </Link>
                          <Link to={`/add_post`}
                            className={`px-4 py-2 block cursor-pointer ${
                              activeTab === "Add Post"
                                ? "bg-secondary text-white"
                                : "bg-transparent text-black"
                            }`}
                            onClick={() => handleTabSelect("Add Post")}
                          >
                            Add Post
                          </Link>
                        </ul>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={logout}
                    className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

import React, { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../server/AxiosInterceptor";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    console.log('user id from context',storedUserId);
    if (storedUserId) {
      axiosInstance
        .get(`/api/auth/user/details/${storedUserId}`)
        .then((response) => {
          setUser(response.data);
          console.log("User details fetched successfully:", response?.data);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Something went wrong...!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  }, [userId]);

  

  return (
    <UserContext.Provider value={{ user, setUser, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

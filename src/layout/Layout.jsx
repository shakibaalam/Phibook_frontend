import React from "react";
import "./Layout.css";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import {
  FaUserFriends,
  FaHeart,
  FaBuilding,
  FaGlobe,
} from "react-icons/fa";
import LeftContent from "../shared/LeftContent";
import RightContent from "../shared/RightContent";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-[20%_minmax(60%,_1fr)_20%]">
        {/* left */}
        <LeftContent/>

        {/* dynamic content */}
        <Outlet />

        {/* right */}
        <RightContent/>
      </div>
    </div>
  );
};

export default Layout;

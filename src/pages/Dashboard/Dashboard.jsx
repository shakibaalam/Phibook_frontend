import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import LikedPost from "../../components/Dashboard/LikedPost";
import CommentsPost from "../../components/Dashboard/CommentsPost";
import MyPost from "../../components/Dashboard/MyPost";
import AddPost from "../../components/Dashboard/AddPost";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Like/Unlike");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
    setIsDropdownOpen(false);
  };

  return (
    <div className="mt-8 flex justify-between items-center xl:justify-center gap-[6px] w-[90%] mx-auto">
      <span className="text-[14px] leading-[21px] lg:text-[26px] font-medium lg:leading-6">
        Dashboard
      </span>

      {/* Dropdown for selecting actions */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="font-[400] text-[14px] leading-[21px] text-textGrey border-[1px] border-boxGrey rounded-[8px] px-4 py-1 cursor-pointer flex justify-between items-center gap-[6px]"
        >
          <span>{activeTab}</span>
          <RiArrowDropDownLine className="text-3xl" />
        </button>

        
      </div>
    </div>
  );
};

export default Dashboard;

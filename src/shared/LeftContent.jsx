import React from "react";
import {
  FaNewspaper,
  FaTrophy,
  FaBookOpen,
  FaUsers,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaVideo,
  FaCog,
  FaChartBar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const LeftContent = () => {
  return (
    <div className="p-4 overflow-y-auto border-r border-r-slate-400">
      {/* news feed */}
      <div className="p-6 rounded shadow">
        <h4 className="mb-4 font-[600] text-[#adb5bd] text-[18px]">
          New Feeds
        </h4>
        <div className="flex flex-col gap-4">
          <Link to={`/home`}>
            <span className=" flex gap-2 items-center ">
              <FaNewspaper className="bg-[#1E74FD] text-white rounded-full p-2 text-4xl border-[3px] border-yellow-200 shadow-lg" />
              <span className="leading-6 text-[16px] text-[#888] font-semibold">
                NewsFeed
              </span>
            </span>
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
          >
            <span className=" flex gap-2 items-center ">
              <FaTrophy className="bg-[#1E74FD] text-white rounded-full p-2 text-4xl border-[3px] border-yellow-200 shadow-lg" />
              <span className="leading-6 text-[16px] text-[#888] font-semibold">
                Badges
              </span>
            </span>
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
          >
            <span className=" flex gap-2 items-center ">
              <FaBookOpen className="bg-[#1E74FD] text-white rounded-full p-2 text-4xl border-[3px] border-yellow-200 shadow-lg" />
              <span className="leading-6 text-[16px] text-[#888] font-semibold">
                Explore Stories
              </span>
            </span>
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
          >
            <span className=" flex gap-2 items-center ">
              <FaUsers className="bg-[#1E74FD] text-white rounded-full p-2 text-4xl border-[3px] border-yellow-200 shadow-lg" />
              <span className="leading-6 text-[16px] text-[#888] font-semibold">
                Popular Groups
              </span>
            </span>
          </Link>

          <Link to={`/home/profile`}>
            <span className=" flex gap-2 items-center ">
              <FaUsers className="bg-[#1E74FD] text-white rounded-full p-2 text-4xl border-[3px] border-yellow-200 shadow-lg" />
              <span className="leading-6 text-[16px] text-[#888] font-semibold">
                Author Profile
              </span>
            </span>
          </Link>
        </div>
      </div>

      {/* more pages */}
      <div className="p-6 rounded shadow mt-6">
        <h4 className="mb-4 font-[600] text-[#adb5bd] text-[18px]">
          More Pages
        </h4>
        <div className="flex flex-col gap-4">
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
          >
            <span className=" flex gap-2 items-center ">
              <FaEnvelope className="bg-[#1E74FD] text-white rounded-full p-2 text-4xl border-[3px] border-yellow-200 shadow-lg" />
              <span className="leading-6 text-[16px] text-[#888] font-semibold">
                Email Box
              </span>
            </span>
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
          >
            <span className=" flex gap-2 items-center ">
              <FaCalendarAlt className="bg-[#1E74FD] text-white rounded-full p-2 text-4xl border-[3px] border-yellow-200 shadow-lg" />
              <span className="leading-6 text-[16px] text-[#888] font-semibold">
                Latest Event
              </span>
            </span>
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
          >
            <span className=" flex gap-2 items-center ">
              <FaVideo className="bg-[#1E74FD] text-white rounded-full p-2 text-4xl border-[3px] border-yellow-200 shadow-lg" />
              <span className="leading-6 text-[16px] text-[#888] font-semibold">
                Live Stream
              </span>
            </span>
          </Link>
        </div>
      </div>

      {/* Account */}
      <div className="p-6 rounded shadow mt-6">
        <h4 className="mb-4 font-[600] text-[#adb5bd] text-[18px]">Account</h4>
        <div className="flex flex-col gap-4">
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
          >
            <span className=" flex gap-2 items-center ">
              <FaCog className="bg-[#1E74FD] text-white rounded-full p-2 text-4xl border-[3px] border-yellow-200 shadow-lg" />
              <span className="leading-6 text-[16px] text-[#888] font-semibold">
                Settings
              </span>
            </span>
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
          >
            <span className=" flex gap-2 items-center ">
              <FaChartBar className="bg-[#1E74FD] text-white rounded-full p-2 text-4xl border-[3px] border-yellow-200 shadow-lg" />
              <span className="leading-6 text-[16px] text-[#888] font-semibold">
                Analytics
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftContent;

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
  FaUserFriends,
  FaHeart,
  FaBuilding,
  FaGlobe,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const RightContent = () => {
  return (
    <div className="p-4 overflow-y-auto">
      {/* contacts */}
      <div className="p-6 rounded shadow">
        <h4 className="mb-4 font-[600] text-[#adb5bd] text-[18px]">Contacts</h4>
        <div className="flex flex-col gap-4">
          <Link>
            <span className=" flex gap-2 items-center ">
              <FaUserFriends className="bg-[#1E74FD] text-white rounded-full p-2 text-4xl border-[3px] border-yellow-200 shadow-lg" />
              <span className="leading-6 text-[16px] text-[#888] font-semibold">
                Hurin Seary
              </span>
            </span>
          </Link>

          <Link>
            <span className=" flex gap-2 items-center ">
              <FaUserFriends className="bg-[#1E74FD] text-white rounded-full p-2 text-4xl border-[3px] border-yellow-200 shadow-lg" />
              <span className="leading-6 text-[16px] text-[#888] font-semibold">
                Victor Exrixon
              </span>
            </span>
          </Link>

          <Link>
            <span className=" flex gap-2 items-center ">
              <FaUserFriends className="bg-[#1E74FD] text-white rounded-full p-2 text-4xl border-[3px] border-yellow-200 shadow-lg" />
              <span className="leading-6 text-[16px] text-[#888] font-semibold">
                Ana Seary
              </span>
            </span>
          </Link>

          <Link>
            <span className=" flex gap-2 items-center ">
              <FaUserFriends className="bg-[#1E74FD] text-white rounded-full p-2 text-4xl border-[3px] border-yellow-200 shadow-lg" />
              <span className="leading-6 text-[16px] text-[#888] font-semibold">
                Seary Victor
              </span>
            </span>
          </Link>

          <Link>
            <span className=" flex gap-2 items-center ">
              <FaUserFriends className="bg-[#1E74FD] text-white rounded-full p-2 text-4xl border-[3px] border-yellow-200 shadow-lg" />
              <span className="leading-6 text-[16px] text-[#888] font-semibold">
                David Goria
              </span>
            </span>
          </Link>

          <Link>
            <span className=" flex gap-2 items-center ">
              <FaUserFriends className="bg-[#1E74FD] text-white rounded-full p-2 text-4xl border-[3px] border-yellow-200 shadow-lg" />
              <span className="leading-6 text-[16px] text-[#888] font-semibold">
                Hurin Seary
              </span>
            </span>
          </Link>
        </div>
      </div>

      {/* groups */}
      <div className="p-6 rounded shadow mt-6">
        <h4 className="mb-4 font-[600] text-[#adb5bd] text-[18px]">Groups</h4>
        <div className="flex flex-col gap-4">
          <Link>
            <span className=" flex gap-2 items-center ">
              <FaHeart className="bg-[#1E74FD] text-white rounded-full p-2 text-4xl border-[3px] border-yellow-200 shadow-lg" />
              <span className="leading-6 text-[16px] text-[#888] font-semibold">
                Studio Express
              </span>
            </span>
          </Link>

          <Link>
            <span className=" flex gap-2 items-center ">
              <FaBuilding className="bg-[#1E74FD] text-white rounded-full p-2 text-4xl border-[3px] border-yellow-200 shadow-lg" />
              <span className="leading-6 text-[16px] text-[#888] font-semibold">
                Armany Design
              </span>
            </span>
          </Link>

          <Link>
            <span className=" flex gap-2 items-center ">
              <FaGlobe className="bg-[#1E74FD] text-white rounded-full p-2 text-4xl border-[3px] border-yellow-200 shadow-lg" />
              <span className="leading-6 text-[16px] text-[#888] font-semibold">
                De fabous
              </span>
            </span>
          </Link>
        </div>
      </div>

      {/* pages */}
      <div className="p-6 rounded shadow mt-6">
        <h4 className="mb-4 font-[600] text-[#adb5bd] text-[18px]">Pages</h4>
        <div className="flex flex-col gap-4">
          <Link>
            <span className=" flex gap-2 items-center ">
              <FaHeart className="bg-[#1E74FD] text-white rounded-full p-2 text-4xl border-[3px] border-yellow-200 shadow-lg" />
              <span className="leading-6 text-[16px] text-[#888] font-semibold">
                Studio Express
              </span>
            </span>
          </Link>

          <Link>
            <span className=" flex gap-2 items-center ">
              <FaBuilding className="bg-[#1E74FD] text-white rounded-full p-2 text-4xl border-[3px] border-yellow-200 shadow-lg" />
              <span className="leading-6 text-[16px] text-[#888] font-semibold">
                Armany Design
              </span>
            </span>
          </Link>

          <Link>
            <span className=" flex gap-2 items-center ">
              <FaGlobe className="bg-[#1E74FD] text-white rounded-full p-2 text-4xl border-[3px] border-yellow-200 shadow-lg" />
              <span className="leading-6 text-[16px] text-[#888] font-semibold">
                De fabous
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RightContent;

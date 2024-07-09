import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import axiosInstance from "../../server/AxiosInterceptor";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_no: "",
    image: null,
  });

  useEffect(() => {
    if (user?.user) {
      setFormData({
        first_name: user.user.first_name || "",
        last_name: user.user.last_name || "",
        email: user.user.email || "",
        mobile_no: user.mobile_no || "",
        image: null,
      });
    }
  }, [user]);

  console.log("form data", formData);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateData = new FormData();

    for (const key in formData) {
      if (key === "image") {
        if (formData[key]) {
          updateData.append(key, formData[key]);
        }
      } else {
        updateData.append(key, formData[key]);
      }
    }

    axiosInstance
      .patch(`/api/auth/user/details/${user?.id}/`, updateData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setUser(response.data);
        setIsEditing(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Profile updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to update profile",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-gray-100 flex flex-col items-center container mx-auto p-4">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className=" text-3xl font-bold text-gray-900">
            My Profile
          </h2>
          <img src={user?.image} alt="profile_img" className="w-[250px] h-[300px] rounded-md border-2 border-slate-200 my-3"/>
          <h2>
            {user?.user?.first_name} {user?.user?.last_name}
          </h2>
          <p>{user?.user?.email}</p>
          <p>{user?.mobile_no}</p>
          <button
            onClick={handleEdit}
            className="mt-4 py-2 px-4 bg-indigo-600 text-white rounded-md"
          >
            Edit Profile
          </button>
        </div>

        {isEditing && (
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="rounded-md shadow-sm ">
              <div className='mb-2'>
                <label htmlFor="first_name" className="mb-1">
                  First Name
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  required
                  value={formData.first_name}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="First Name"
                />
              </div>

              <div className='mb-2'>
                <label htmlFor="last_name" className="mb-1">
                  Last Name
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                  value={formData.last_name}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                />
              </div>

              <div className='mb-2'>
                <label htmlFor="email" className="mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                />
              </div>

              <div className='mb-2'>
                <label htmlFor="mobile_no" className="mb-1">
                  Mobile Number
                </label>
                <input
                  id="mobile_no"
                  name="mobile_no"
                  type="text"
                  required
                  value={formData.mobile_no}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Mobile Number"
                />
              </div>

              <div className='mb-2'>
                <label htmlFor="image" className="mb-1">
                  Profile Image
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
              
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;

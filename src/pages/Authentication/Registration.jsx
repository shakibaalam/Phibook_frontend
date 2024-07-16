import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axiosInstance from '../../server/AxiosInterceptor';
import { Link, useNavigate } from 'react-router-dom';
import { HiExclamationCircle } from "react-icons/hi";
import { BiSolidLogInCircle } from "react-icons/bi";

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''
  });

  const { username, first_name, last_name, email, password, confirm_password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate=useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirm_password) {
        console.error('Passwords do not match');
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Passwords did not match..!",
            showConfirmButton: false,
            timer: 1500
        });
        return;
    }

    axiosInstance.post(`/api/auth/user/register/`,formData)
     .then((response) => {
        console.log('Register Successful:', response.data);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Register Successful.Check your mail for confirmation..!",
            showConfirmButton: false,
            timer: 3500
        });
        navigate('/login');
      })
      .catch((error) => {
        console.error('register Error:', error);
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Something went wrong. Please try again..!",
            showConfirmButton: false,
            timer: 3500
        });
      });
  };

  return (
    <div className=" bg-blue-300">
      <div className="w-[80%] grid grid-cols-1 lg:grid-cols-2 items-center justify-center min-h-[100vh] gap-6 mx-auto">
        <div>
          <h2 className="text-[2.5rem] font-[300] mb-[45px] ">Welcome to the Biggest Social Network in the World
          </h2>

          <p className="text-[.875rem] mb-[45px] ">We are the best and biggest social network with 5 billion active users all around the world. Share you thoughts, write blog posts, show your favourite music via Stopify, earn badges and much more!</p>

          <button className='border-[2px] border-yellow-200 text-[1rem] px-[3rem] py-[1rem] rounded-[.3rem] text-white font-[700] leading-[1.5]'>Register now!</button>
        </div>

        <form className=" bg-white shadow-sm" onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 w-full p-5 bg-yellow-100'>
            <Link to={`/register`}>
             <HiExclamationCircle className='w-full mx-auto flex justify-center items-center text-slate-400 text-3xl border-r border-r-yellow-500 hover:text-yellow-400'/>
            </Link>
            <Link to={`/login`}>
             <BiSolidLogInCircle className='w-full mx-auto flex justify-center items-center text-slate-400 text-3xl hover:text-yellow-400'/>
            </Link>
          </div>
          <div >
            <h2 className='border-b-[2px] border-b-yellow-200 p-5 font-[400] leading-[1.3] text-[1.5rem]'>Register to PhiBook</h2>
          </div>
          <div className="rounded-md mb-2 p-5">
            <div className='mb-2'>
              <label htmlFor="username" className="mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>

            <div className='mb-2'>
              <label htmlFor="first-name" className="mb-1">
                First Name
              </label>
              <input
                id="first-name"
                name="first_name"
                type="text"
                autoComplete="given-name"
                required
                value={first_name}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
              />
            </div>

            <div className='mb-2'>
              <label htmlFor="last-name" className="mb-1">
                Last Name
              </label>
              <input
                id="last-name"
                name="last_name"
                type="text"
                autoComplete="family-name"
                required
                value={last_name}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Last Name"
              />
            </div>

            <div className='mb-2'>
              <label htmlFor="email-address" className="mb-1">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>

            <div className='mb-2'>
              <label htmlFor="password" className="mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>

            <div className='mb-2'>
              <label htmlFor="confirm-password" className="mb-1">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm_password"
                type="password"
                autoComplete="new-password"
                required
                value={confirm_password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Complete Registration!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;

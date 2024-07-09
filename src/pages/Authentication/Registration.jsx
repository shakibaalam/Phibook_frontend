import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axiosInstance from '../../server/AxiosInterceptor';
import { useNavigate } from 'react-router-dom';

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
    <div className="bg-gray-100 flex flex-col items-center container mx-auto p-4">
      <div className="lg:w-[60%] w-[80%]">
        <h2 className="text-center text-3xl font-bold text-gray-900">Create an account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm mb-2">
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
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;

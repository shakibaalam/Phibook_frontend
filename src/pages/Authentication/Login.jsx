import React, { useContext, useState } from 'react';
import axiosInstance from '../../server/AxiosInterceptor';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserContext } from '../../Context/UserContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;

  const navigate=useNavigate();
  const { setUserId } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosInstance.post(`/api/auth/user/login/`,formData)
     .then((response) => {
         console.log('Login Successful:', response?.data);
         localStorage.setItem('accessToken', response?.data?.token);
         localStorage.setItem('user_id', response?.data?.profile_id);
         setUserId(response?.data?.profile_id)
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successful..!",
            showConfirmButton: false,
            timer: 1500
        });
        navigate('/')
      })
      .catch((error) => {
        console.error('Login Error:', error);
        Swal.fire({
            position: "center",
            icon: "error",
            title: `${error?.response?.data?.error}. Please activate your credentials first..!`,
            showConfirmButton: false,
            timer: 3500
        });
      });
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center container mx-auto p-4">
      <div className="lg:w-[60%] w-[80%]">
        <h2 className="text-center text-3xl font-bold text-gray-900">Log in to your account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm ">
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
              <label htmlFor="password" className="mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {/* <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div> */}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

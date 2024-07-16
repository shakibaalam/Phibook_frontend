import React, { useContext, useRef, useState } from "react";
import { FaVideo, FaPhotoVideo, FaSmile } from "react-icons/fa";
import { UserContext } from "../../Context/UserContext";
import axiosInstance from "../../server/AxiosInterceptor";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState({
      author: user?.user?.username || '',
      content: '',
      title: '',
      image: null,
      video: null,
    });
    const imageInputRef = useRef(null);
    const videoInputRef = useRef(null);
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value, files } = e.target;
      if (name === 'image' || name === 'video') {
        setFormData({ ...formData, [name]: files[0] });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData();
      data.append('author', formData.author);
      data.append('content', formData.content);
      data.append('title', formData.title);
      if (formData.image) {
        data.append('image', formData.image);
      }
      if (formData.video) {
        data.append('video', formData.video);
      }
  
      axiosInstance.post('/api/posts/list/', data)
        .then((response) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Post created successfully!",
            showConfirmButton: false,
            timer: 1500
          });
          window.location.reload();
          //navigate('/home');
        })
        .catch((error) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Something went wrong. Please try again...!",
            showConfirmButton: false,
            timer: 1500
          });
          console.error('Error creating post:', error);
        });
    };

  return (
    <div className="p-4 bg-white rounded shadow mb-10">
      <h4 className="mb-4 font-[600] text-[#5c5d5e] text-[18px]">
        Create your post
      </h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-2">
          <img
            src={user?.image}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="w-full flex-1">
            <input type="text" className=" w-full border rounded-lg py-2 px-4 outline-none mb-1"
            name="title" required
            placeholder="What's your title?"
            value={formData.title}
            onChange={handleChange}
            />
          <textarea
            name="content" required
            cols={20}
            placeholder="What's on your mind?"
            value={formData.content}
            onChange={handleChange}
            className="w-full border rounded-lg py-2 px-4 outline-none"
          />
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            className="flex items-center space-x-2 text-red-500"
          >
            <FaVideo />
            <span onClick={()=>{
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Coming Soon...",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }}>Live Video</span>
          </button>
          <button
            type="button"
            className="flex items-center space-x-2 text-green-500"
            
          >
            <FaPhotoVideo />
            <span><span onClick={() => imageInputRef.current.click()}>Photo</span>/ <span onClick={() => videoInputRef.current.click()}>Video</span></span>
          </button>
          <button
            type="button"
            className="flex items-center space-x-2 text-orange-500"
            onClick={() => videoInputRef.current.click()}
          >
            <FaSmile />
            <span>Feeling/Activity</span>
          </button>
        </div>
        <input
          type="file"
          name="image"
          accept="image/*"
          ref={imageInputRef}
          className="hidden"
          onChange={handleChange}
        />
        <input
          type="file"
          name="video"
          accept="video/*"
          ref={videoInputRef}
          className="hidden"
          onChange={handleChange}
        />
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md  text-[#5c5d5e] border-[2px] border-yellow-200 hover:bg-yellow-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;

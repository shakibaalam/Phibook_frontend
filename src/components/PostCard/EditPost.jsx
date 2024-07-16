import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../../server/AxiosInterceptor';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserContext } from '../../Context/UserContext';

const EditPost = () => {
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: null,
        video: null,
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get(`/api/posts/post_detail/${id}/`)
            .then(response => {
                const { title, content } = response.data;
                // For files, we don't directly set them in formData
                setFormData({ title, content, image: null, video: null });
            })
            .catch(error => console.error("Error fetching post:", error));
    }, [id]);

    const { title, content, image, video } = formData;

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
        data.append('title', title);
        data.append('content', content);
        if (image) {
            data.append('image', image);
        }
        if (video) {
            data.append('video', video);
        }

        axiosInstance.put(`/api/posts/post_detail/${id}/`, data)
            .then(response => {
                if(response?.status === 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Post updated successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate(`/home/post_details/${id}`);
                }
            })
            .catch(error => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Something went wrong. Please try again!",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.error('Error updating post:', error);
            });
    };

    return (
        <div className="bg-gray-100 flex flex-col items-center container mx-auto p-4">
            <div className="lg:w-[60%] w-[80%]">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">Edit post</h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm mb-2">
                        <div className='mb-2'>
                            <label htmlFor="title" className="mb-1">Title</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                required
                                value={title}
                                onChange={handleChange}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Title"
                            />
                        </div>

                        <div className='mb-2'>
                            <label htmlFor="content" className="mb-1">Content</label>
                            <textarea
                                id="content"
                                name="content"
                                required
                                value={content}
                                onChange={handleChange}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Content"
                                rows="5"
                            />
                        </div>

                        <div className='mb-2'>
                            <label htmlFor="image" className="mb-1">Image</label>
                            <input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleChange}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>

                        <div className='mb-2'>
                            <label htmlFor="video" className="mb-1">Video</label>
                            <input
                                id="video"
                                name="video"
                                type="file"
                                accept="video/*"
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
                            Update Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPost;

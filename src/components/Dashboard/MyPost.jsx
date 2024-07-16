import React, { useEffect, useState } from 'react';
import axiosInstance from '../../server/AxiosInterceptor';
import PostCard from '../PostCard/PostCard';
import Loading from '../../shared/Loading';

const MyPost = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get('/api/posts/list/')
            .then(response => {
              console.log('all my posts', response);
              setIsLoading(false);
              const sortedPosts = response?.data?.sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at));
              setPosts(sortedPosts);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []); 
    return (
        <div>
            { isLoading ? <Loading /> :
            <div className="container mx-auto p-4">
                {
                    posts?.length >0 ?
                <div className="grid grid-cols-1 gap-4">
                    {posts?.map((post,index) => <PostCard key={index} post={post}/>)}
                </div> :
                <div className="text-center text-xl font-bold mt-8 mb-4">No posts found.</div>
                }
            </div>
            }
        </div>
    );
};

export default MyPost;
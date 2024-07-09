import React, { useEffect, useState } from 'react';
import axiosInstance from '../../server/AxiosInterceptor';
import PostCard from '../PostCard/PostCard';
import Loading from '../../shared/Loading';
import Swal from 'sweetalert2';

const CommentsPost = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCommentedPosts = async () => {
            try {
                const response = await axiosInstance.get('/api/posts/user_post_comment/');
                console.log('user commented post', response);
                if(response.status==200) {
                    setIsLoading(false);

                }
            } catch (err) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `Something went wrong.Please try again...!!`,
                    showConfirmButton: false,
                    timer: 3500
                });
            } finally {
                setIsLoading(false);
                
            }
        };

        fetchCommentedPosts();
    }, []);

    return (
        <div>
            {
                isLoading ? <Loading/> :
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts?.length === 0 ? (
                        <div>No commented posts found</div>
                    ) : (
                        posts?.map((post) => <PostCard key={post?.id} post={post} />)
                    )}
                </div>
            }
        </div>
    );
};

export default CommentsPost;

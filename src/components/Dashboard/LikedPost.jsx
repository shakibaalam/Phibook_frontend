import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../../server/AxiosInterceptor";
import PostCard from "../PostCard/PostCard";
import Loading from "../../shared/Loading";
import Swal from "sweetalert2";

const LikedPost = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const response = await axiosInstance.get("/api/posts/user_post_like/");
        setIsLoading(false);
        setLikedPosts(response.data);
      } catch (error) {
        console.error("Error fetching liked posts:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Something went wrong.Please try again...!!`,
          showConfirmButton: false,
          timer: 3500,
        });
      }
    };

    fetchLikedPosts();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mx-auto p-4">
          {likedPosts?.length === 0 ? (
            <p>No liked posts found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {likedPosts.map((post) => (
                <PostCard key={post?.id} post={post} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LikedPost;

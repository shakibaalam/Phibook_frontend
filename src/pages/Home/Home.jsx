import React, { useState, useEffect } from "react";
import axiosInstance from "../../server/AxiosInterceptor";
import { Url } from "../../server/MyServer";
import PostCard from "../../components/PostCard/PostCard";
import Loading from "../../shared/Loading";
import Swal from "sweetalert2";
import CreatePost from "../../components/PostCard/CreatePost";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/api/posts/random_posts")
      .then((response) => {
        console.log("all posts", response);
        setIsLoading(false);
        const sortedPosts = response?.data?.sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at));
        setPosts(sortedPosts);
      })
      .catch((error) => {
        setIsLoading(false);
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Something went wrong.Please try again...!!`,
          showConfirmButton: false,
          timer: 1500,
        });
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mx-auto p-4">
          {/* add your post */}
          <div>
            <CreatePost/>
          </div>

          {/* news feed post */}
          {posts?.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 ">
              {posts?.map((post, index) => (
                <PostCard key={index} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center text-xl font-bold mt-8 mb-4">
              No posts found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;

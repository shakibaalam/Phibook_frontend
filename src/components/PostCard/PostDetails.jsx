import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../server/AxiosInterceptor";
import { Url } from "../../server/MyServer";
import { FaRegComment } from "react-icons/fa";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import Swal from "sweetalert2";
import { UserContext } from "../../Context/UserContext";
import PostComment from "./PostComment";
import crossIcon from "../../assets/croos_icon.png";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`/api/posts/post_detail/${id}/`)
      .then((response) => {
        setIsLoading(false);
        console.log("post details", response);
        setPost(response?.data);

        const userLiked = response?.data?.likes?.some(
          (like) => like?.user === user?.user?.id
        );
        setLiked(userLiked);
      })
      .catch((error) => {
        setIsLoading(false);
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${error?.response?.data?.detail}. Please login and try again.`,
          showConfirmButton: false,
          timer: 3500,
        });
        console.error("Error fetching post:", error);
      });
  }, [id, user?.user?.id]);

  if (!post) return <div>Loading...</div>;

  const { image, author, content, title, video } = post;

  const handleEdit = () => {
    navigate(`/home/edit_post/${id}`);
  };

  const handleDelete = () => {
    setIsLoading(true);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/api/posts/post_detail/${id}/`)
          .then((response) => {
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
            setIsLoading(false);
            navigate("/");
          })
          .catch((error) => {
            console.error("Error deleting post:", error);
            Swal.fire(
              "Error!",
              "There was an error deleting your post.",
              "error"
            );
          });
      }
    });
  };

  const handleLike = () => {
    axiosInstance
      .post(`/api/posts/post_like/${id}/`)
      .then((response) => {
        console.log("liked response", response);
        setLiked(true);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error liking post:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Something went wrong.Please try again...!!`,
          showConfirmButton: false,
          timer: 3500,
        });
      });
  };

  const handleDislike = () => {
    axiosInstance
      .post(`/api/posts/post_like/${id}/`)
      .then((response) => {
        console.log("disliked response", response);
        setLiked(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error disliking post:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Something went wrong.Please try again...!!`,
          showConfirmButton: false,
          timer: 3500,
        });
      });
  };

  return (
    <div className="w-full mx-auto px-4 py-10 leading-6">
      <div className=" grid grid-cols-1 gap-6">
        <div className="w-full shadow p-2">
          <div className="grid grid-cols-1 w-full gap-4">
            {video && (
              <video controls className="w-full h-64 rounded-md object-cover">
                <source src={Url + video} type="video/mp4" />
              </video>
            )}
            {image && (
              <img
                src={Url + image}
                alt=""
                className="w-full h-64 rounded-md object-cover cursor-pointer"
                onClick={() => setShowImagePopup(true)}
              />
            )}
          </div>
          <h2 className="text-xl font-bold my-2">{title}</h2>
          <p className="text-gray-700 my-2 font-semibold">Author: {author}</p>
          <p className="text-gray-700">{content}</p>

          <div className="flex justify-between gap-2 items-center mt-4">
            <div className="flex gap-2 items-center">
              {liked ? (
                <FaThumbsUp onClick={handleDislike} color="blue" />
              ) : (
                <FaRegThumbsUp onClick={handleLike} />
              )}
              <span>
                {post?.likes?.length} Like{post?.likes?.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="">
              <div className="flex gap-2 items-center cursor-pointer">
                <FaRegComment />
                <span>
                  {post?.comments?.length} Comment
                  {post?.comments?.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          {author == user?.user?.username && (
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                disabled={isLoading}
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <PostComment
          postId={post?.id}
          userId={user?.user?.id}
          comments={post?.comments}
        />
      </div>

      {showImagePopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#252525b0] z-[99] ">
          <div className=" bg-[#FAFAFA] rounded-[12px] w-[90%] md:w-[50%] ">
            {/* close popup */}
            <div className="text-right flex justify-end">
              <img
                src={crossIcon}
                alt=""
                className=" w-[40px] h-[40px] z-[9999] cursor-pointer m-[-14px]"
                onClick={() => {
                  setShowImagePopup(false);
                }}
              />
            </div>

            <div className="p-[40px] text-center h-[500px] overflow-y-auto">
              <img src={Url + image} alt="Selected" className=" w-full " />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;

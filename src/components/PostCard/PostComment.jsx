import React, { useState, useContext } from "react";
import axiosInstance from "../../server/AxiosInterceptor";
import { UserContext } from "../../Context/UserContext";
import { MdSend } from "react-icons/md";
import Swal from "sweetalert2";

const PostComment = ({ postId, userId, comments }) => {
  const [allComment, setAllComment] = useState(comments);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const data = new FormData();
    data.append('user', userId);
    data.append('post', postId);
    data.append('content', newComment);
    axiosInstance
      .post(`/api/posts/post_comment/${postId}/`, data)
      .then((response) => {
        console.log('add comment to post', response);
        if (response) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Add comment successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            window.location.reload();
           setNewComment("");
        }
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  };

  return (
    <div>
      <div className=" bg-slate-200 h-full">
        <form onSubmit={handleCommentSubmit} className="p-2 flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className=""
          >
            <MdSend color="blue" className=" text-2xl"/>
          </button>
        </form>
        <div>
          {
            comments?.length > 0 ?
            comments?.map((comment) => (
              <div key={comment?.id} className="m-2 py-1 border-b-2 border-b-blue-200">
                <p>
                  <span className=" font-semibold">{comment?.user?.first_name} {comment?.user?.last_name} </span>: {comment?.content}
                </p>
              </div>
            )): 
            <div className="text-center text-xl font-bold mt-8 mb-4">No comment yet.</div>
          }
        </div>
      </div>
    </div>
  );
};

export default PostComment;

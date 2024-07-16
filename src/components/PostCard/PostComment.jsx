import React, { useState, useContext } from "react";
import axiosInstance from "../../server/AxiosInterceptor";
import { UserContext } from "../../Context/UserContext";
import { FaEdit } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const PostComment = ({ postId, userId, comments }) => {
  const [allComment, setAllComment] = useState(comments);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const data = new FormData();
    data.append("user", userId);
    data.append("post", postId);
    data.append("content", newComment);
    axiosInstance
      .post(`/api/posts/post_comment/${postId}/`, data)
      .then((response) => {
        console.log("add comment to post", response);
        if (response) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Add comment successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.reload();
          setNewComment("");
        }
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  };

  const handleEdit = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditedCommentContent(content);
  };

  const handleEditSubmit = (e, commentId) => {
    e.preventDefault();
    if (!editedCommentContent.trim()) return;

    const data = new FormData();
    data.append("content", editedCommentContent);
    data.append("post", postId);
    axiosInstance
      .put(`/api/posts/post_comment_detail/${commentId}/`, data)
      .then((response) => {
        console.log("edit comment", response);
        if (response) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Comment edited successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error editing comment:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something went wrong.Please try again!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleDelete = (commentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/api/posts/post_comment_detail/${commentId}/`)
          .then((response) => {
            console.log("delete comment", response);
            if (response) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Comment deleted successfully!",
                showConfirmButton: false,
                timer: 1500,
              });
              window.location.reload();
            }
          })
          .catch((error) => {
            console.error("Error deleting comment:", error);
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Something went wrong. Please try again!",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };
  

  return (
    <div>
      <div className="">
        <form onSubmit={handleCommentSubmit} className="p-2 flex gap-2 shadow mb-6 ">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            className="w-full p-2 border border-yellow-300 rounded focus:outline-none"
          />
          <button type="submit" className="">
            <MdSend color="blue" className="text-2xl" />
          </button>
        </form>
        <div className=" shadow py-4">
          {comments?.length > 0 ? (
            comments?.map((comment) => (
              <div
                key={comment?.id}
                className="m-2 p-1 border-b border-b-blue-50  rounded-sm"
              >
                <p className="font-semibold">
                  {comment?.user?.first_name} {comment?.user?.last_name}
                </p>
                <p className="grid grid-cols-[minmax(80%,_1fr)_10%] gap-4">
                  <span>
                    {editingCommentId === comment?.id ? (
                      <form
                        onSubmit={(e) => handleEditSubmit(e, comment?.id)}
                        className="flex gap-2"
                      >
                        <input
                          type="text"
                          value={editedCommentContent}
                          onChange={(e) =>
                            setEditedCommentContent(e.target.value)
                          }
                          className="w-full p-2 border rounded"
                        />
                        <button type="submit" className="text-blue-500">
                          <MdSend className="text-2xl" />
                        </button>
                      </form>
                    ) : (
                      comment?.content
                    )}
                  </span>
                  {
                    (userId==comment?.user?.id && !editingCommentId)&& 
                    <span className="flex gap-2 items-center text-right cursor-pointer">
                      <FaEdit className=" text-slate-500 text-xl"
                        onClick={() => handleEdit(comment?.id, comment?.content)}
                      />
                      <FaTrashAlt className=" text-slate-500 text-lg" onClick={() => handleDelete(comment?.id)} />
                    </span>
                  }
                </p>
              </div>
            ))
          ) : (
            <div className="text-center text-xl font-bold mt-8 mb-4">
              No comment yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostComment;

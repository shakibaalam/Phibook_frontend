import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Url } from "../../server/MyServer";
import { FaRegThumbsUp, FaRegComment, FaShare } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

const PostCard = ({ post }) => {
  const { image, author, content, title, video, id, created_at, author_image } =
    post;
  const [showFullContent, setShowFullContent] = useState(false);
  const navigate = useNavigate();

  const handleSeeMore = (e) => {
    e.stopPropagation();
    navigate(`/home/post_details/${id}`);
  };

  return (
    <div
      key={id}
      className="bg-white rounded-lg shadow-md p-4 leading-6 mb-4 h-full"
    >
      <div className="flex justify-between items-center mb-4">
        {/* <img
          src={Url + author_image}
          alt="Author Avatar"
          className="w-10 h-10 rounded-full"
        /> */}
        <h2 className="text-gray-700 font-semibold capitalize">{author}</h2>
        <p className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(created_at))} ago
        </p>
      </div>

      <div onClick={handleSeeMore} className=" cursor-pointer">
        {video ? (
          <video controls className="w-full rounded-md object-cover">
            <source src={Url + video} type="video/mp4" />
          </video>
        ) : (
          <img
            src={Url + image}
            alt=""
            className="w-full rounded-md object-cover"
          />
        )}

        <h2 className="text-xl font-bold my-2">{title}</h2>
        {/* <p className="text-gray-700 my-2 font-semibold capitalize">Author: {author}</p> */}
        <p className="text-gray-700">
          {showFullContent ? content : content.slice(0, 100)}
          {content.length > 100 && (
            <button
              onClick={handleSeeMore}
              className="text-blue-500 hover:text-blue-700"
            >
              {showFullContent ? " Show Less" : " ...See More"}
            </button>
          )}
        </p>

        <div className="flex justify-between gap-2 items-center mt-4 pt-3 border-t border-t-yellow-300">
          <div className="flex gap-2 items-center">
            <FaRegThumbsUp />
            <span>{post?.likes?.length} Like</span>
          </div>
          <div className="flex gap-2 items-center">
            <FaRegComment />
            <span>{post?.comments?.length} Comment</span>
          </div>
          <div className="flex gap-2 items-center">
            <FaShare />
            <span>Share</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PostCard;

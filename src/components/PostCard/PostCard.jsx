import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Url } from "../../server/MyServer";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";

const PostCard = ({ post }) => {
  const { image, author, content, title, video, id } = post;
  const [showFullContent, setShowFullContent] = useState(false);
  const navigate = useNavigate();

  const handleSeeMore = () => {
    navigate(`/post_details/${id}`);
  };

  return (
    <div key={id} onClick={handleSeeMore} className="bg-white rounded-lg shadow-md p-4 leading-6">
      {video ? (
        <video controls className="w-full h-64 rounded-md object-cover">
          <source src={Url+video} type="video/mp4" />
        </video>
      ) : (
        <img src={Url + image} alt="" className="w-full h-64 rounded-md object-cover" />
      )}
      <h2 className="text-xl font-bold my-2">{title}</h2>
      <p className="text-gray-700 my-2 font-semibold capitalize">Author: {author}</p>
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

      <div className="flex justify-between gap-2 items-center mt-4">
        <div className="flex gap-2 items-center">
          <FaRegThumbsUp />
          <span>{post?.likes?.length} Like</span>
        </div>
        <div className="flex gap-2 items-center">
          <FaRegComment />
          <span>{post?.comments?.length} Comment</span>
        </div>
      </div>

    </div>
  );
};

export default PostCard;

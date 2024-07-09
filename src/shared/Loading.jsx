import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
      <div className="flex justify-center w-full items-center h-[250px]">
        <ReactLoading
          type={"spinningBubbles"}
          color={"rgb(53, 126, 221)"}
          height={100}
          width={100}
        />
      </div>
  );
};

export default Loading;
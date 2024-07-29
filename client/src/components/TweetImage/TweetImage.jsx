import React, { useState } from "react";

const TweetImage = ({ imageUrl }) => {
  const [isImageOpen, SetIsImageOpen] = useState(null);

  return (
    <div className="my-2">
      <div className="w-full h-0 pb-[100%] relative overflow-hidden">
        <img
          src={imageUrl}
          alt="post"
          className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer rounded-2xl"
          onClick={(e) => {
            e.preventDefault();
            SetIsImageOpen(true);
          }}
        />
      </div>
      {isImageOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={(e) => {
            e.preventDefault();
            SetIsImageOpen(false);
          }}
        >
           <div className="relative max-w-4xl max-h-3xl w-auto h-auto rounded-lg">
            <img src={imageUrl} alt="Post" className="w-full h-full" />
          </div>
          <button
              className="absolute top-0 right-0 m-6 text-white text-4xl"
              onClick={(e) => {
                e.preventDefault();
                SetIsImageOpen(false);
              }}
            >
              &times;
            </button>
        </div>
      )}
    </div>
  );
};

export default TweetImage;

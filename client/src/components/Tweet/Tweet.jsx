import axios from "axios";
import React, { useEffect, useState } from "react";
import formatDistance from "date-fns/formatDistance";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Tweet = ({ tweet, setData }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [userData, setUserData] = useState();

  const dateStr = formatDistance(new Date(tweet.createdAt), new Date());

  const location = useLocation().pathname;
  const {id} = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await axios.get(`/api/users/find/${tweet.userId}`);
        setUserData(user.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, [tweet.userId, tweet.like]);

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/tweet/${tweet._id}/like`, { id: currentUser._id });
      if(location.includes("profile")){
        const newData = await axios.get(`/api/tweet/user/all/${id}`);
        setData(newData.data);
      }
      else if(location.includes("explore")){
        const newData = await axios.get("/api/tweet/explore");
        setData(newData.data);
      }
      else {
        const newData = await axios.get(`/api/tweet/timeline/${userData._id}`);
        setData(newData.data);
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  return (
    <div>
      {userData && (
        <>
          <div className="flex space-x-2">
            {/* <img src="" alt="" /> */}
            <Link to={`/profile/${userData._id}`}>
              <h3 className="font-bold">{userData.username}</h3>
            </Link>

            <span className="font-normal">@{userData.username}</span>
            <p>- {dateStr}</p>
          </div>

          <p>{tweet.description}</p>
          <button onClick={handleLike}>
            {tweet.like.includes(currentUser?._id) ? (
              <FavoriteIcon className="mr-2, my-2 cursor-pointer" />
            ) : (
              <FavoriteBorderIcon className="mr-2, my-2 cursor-pointer" />
            )}
            {tweet.like.length}
          </button>
        </>
      )}
    </div>
  );
};

export default Tweet;

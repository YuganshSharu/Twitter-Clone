import React, { useState, useEffect } from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Tweet from "../../components/Tweet/Tweet";
import EditProfile from "../../components/EditProfile/EditProfile";
import {following} from "../../redux/userSlice";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [userTweets, setUserTweets] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTweets = await axios.get(`/api/tweet/user/all/${id}`);
        setUserTweets(userTweets.data);
        const userProfile = await axios.get(`/api/users/find/${id}`);
        setUserProfile(userProfile.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, [currentUser, id]);
  
  const handleFollow = async () => {
    if(currentUser.following.includes(id)){
      try{
        await axios.put(`/api/users/unfollow/${id}`, {id : currentUser._id});
        dispatch(following(id));
      }
      catch(err){
        console.log("error", err);
      }
    }
    else{
      try{
        await axios.put(`/api/users/follow/${id}`, {id : currentUser._id});
        dispatch(following(id));
      }
      catch(err){
        console.log("error", err);
      }
    }
  }

  return (
    <>
      <div className="grid grid-cols-custom-2 grid-cols-custom-2-fixed md:grid-cols-custom-3 md:grid-cols-custom-3-fixed">
        <div className="px-6">
          <LeftSidebar />
        </div>
        <div className="border-x-2 border-t-slate-800 px-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
            <img
              src={userProfile && userProfile.profilePicture?userProfile.profilePicture : "/images/default-profile-picture.jpg"}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
            />
            <h2 className="font-bold text-xl ml-1">test</h2>
            </div>
            {currentUser && 
              <>
                {currentUser._id === id ? (
                <button
                  className="px-4 py-2 bg-blue-500 rounded-full text-white"
                  onClick={() => setOpen(true)}
                >
                  Edit Profile
                </button>
                ) : currentUser.following.includes(id) ? (
                <button className="px-4 py-2 bg-blue-500 rounded-full text-white" onClick={handleFollow}>
                  Following
                </button>
                ) : (
                <button className="px-4 py-2 bg-blue-500 rounded-full text-white" onClick={handleFollow}>
                  Follow
                </button>
                )}
              </>
            }
          </div>
          <div className="mt-6">
            {userTweets &&
              userTweets.map((tweet) => {
                return (
                  <div key={tweet._id} className="p-2">
                    <Tweet tweet={tweet} setData={setUserTweets} />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="hidden lg:block px-6">
          <RightSidebar />
        </div>
      </div>
      {open && <EditProfile setOpen={setOpen} />}
    </>
  );
};

export default Profile;

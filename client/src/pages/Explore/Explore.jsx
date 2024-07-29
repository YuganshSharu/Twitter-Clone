import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import ExploreTweets from "../../components/ExploreTweets/ExploreTweets";
import { useSelector } from "react-redux";
import Signin from "../Signin/Signin";

const Explore = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      {!currentUser ? (
        <Signin />
      ) : (
        <div className="grid grid-cols-custom-2 grid-cols-custom-2-fixed md:grid-cols-custom-3 md:grid-cols-custom-3-fixed">
          <div className="px-6">
            <LeftSidebar />
          </div>
          <div className="border-x-2 border-t-slate-800 px-6">
            <ExploreTweets />
          </div>
          <div className="hidden lg:block px-6">
            <RightSidebar />
          </div>
        </div>
      )}
    </>
  );
};

export default Explore;

import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import MainTweet from "../../components/MainTweet/MainTweet";
import Signin from "../Signin/Signin";

import { useSelector } from "react-redux";

const Home = () => {
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
            <MainTweet />
          </div>
          <div className="hidden lg:block px-6">
            <RightSidebar />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

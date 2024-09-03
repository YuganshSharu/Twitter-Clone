import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import SearchIcon from "@mui/icons-material/Search";
import UserPlaceholder from "../UserPlaceholder/UserPlaceholder";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation().pathname;
  return (
    // <div className="pb-16">
    // {/* <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50"> */}
      <div className="grid grid-cols-custom-2 grid-cols-custom-2-fixed md:grid-cols-custom-3 md:grid-cols-custom-3-fixed my-3 justfy-center">
        <div className="mx-auto md:mx-0 my-auto">
          <img
            src="/images/twitter-logo.png"
            alt="Twitter Logo"
            width={"40px"}
            className="md:ml-8"
          />
        </div>
        <div className="border-x-2 border-slate-200 px-6 my-6 md:my-0">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-2xl">
              {location.includes("profile") ? (
                <UserPlaceholder
                  setUserData={setUserData}
                  userData={userData}
                />
              ) : location.includes("explore") ? (
                "Explore"
              ) : (
                "Home"
              )}
            </h2>
            <StarBorderPurple500Icon />
          </div>
        </div>
        <div className="px-0 md:px-6 mx-auto hidden lg:block">
          <SearchIcon className="absolute m-2" />
          <input type="text" className="bg-blue-100 rounded-full py-2 px-8" />
        </div>
      </div>
    // {/* </nav> */}
    // </div>
  );
};

export default Navbar;

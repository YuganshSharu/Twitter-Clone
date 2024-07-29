import React from 'react';

import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import PersonIcon from "@mui/icons-material/Person";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../../redux/userSlice";

const LeftSidebar = () => {
    const {currentUser} = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return <div className='flex flex-col h-full md:h-[90vh] justify-between md:mr-6'>
        <div className="mt-6 flex flex-col space-y-4 mx-auto">
            <Link to="/">
                <div className="flex items-center space-x-6 px-2 lg:hover:bg-slate-200 rounded-full cursor-points">
                    <HomeIcon fontSize='large'/> 
                    <p className='hidden xl:block'>Home</p>
                </div>
            </Link>
            <Link to="/explore">
                <div className="flex items-center space-x-6 px-2 lg:hover:bg-slate-200 rounded-full cursor-points">
                    <TagIcon fontSize='large'/> 
                    <p className='hidden xl:block'>Explore</p>
                </div>
            </Link>
            <Link to={`/profile/${currentUser?._id}`}>
                <div className="flex items-center space-x-6 px-2 lg:hover:bg-slate-200 rounded-full cursor-points">
                    <PersonIcon fontSize='large'/> 
                    <p className='hidden xl:block'>Profile</p>
                </div>
            </Link>
        </div>
        <div className="flex justify-between items-center mb-4">
            <div className='hidden xl:block'>
                <p className="font-bold">{currentUser?.username}</p>
                <p className="font-bold">@{currentUser?.username}</p>
            </div>
            <div>
                <Link to="/signin">
                    <button className="bg-red-500 px-2 mx-0 lg:px-4 py-2 mx-2 text-white rounded-full" onClick={handleLogout}><p className='hidden md:block'>Logout</p> <p className='block md:hidden'><PowerSettingsNewIcon /></p></button>
                </Link>
            </div>
        </div>
    </div>;
};

export default LeftSidebar;
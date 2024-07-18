import React from "react";
import LeftSidebar from "../../components/Navbar/LeftSidebar/LeftSidebar";

const Home = () => {
    return <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="px-6">
            <LeftSidebar />
        </div>
    </div>
};

export default Home;
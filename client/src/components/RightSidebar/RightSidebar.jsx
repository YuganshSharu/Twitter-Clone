import React, { useEffect, useState } from "react";
import axios from "axios";

const RightSidebar = () => {
  const [topTrendings, setTopTrendings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topTrendingsData = await axios.get("/api/trends/list");
        setTopTrendings(topTrendingsData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [topTrendings, setTopTrendings]);
  return (
    <div className="p-6 bg-slate-100 rounded-lg mx-4 space-y-4">
      <h2 className="text-xl font-bold">Trending</h2>
      {topTrendings.slice(0,3).map((trend) => {
        return (
          <div key={trend._id}>
            <p className="font-bold">{trend.name}</p>
            <p className="text-sm">{trend.tweetsCount} posts</p>
          </div>
        );
      })}
      
      {/* <p className="font-bold">#gryffindor</p>
        <p className="font-bold">#hufflepuff</p>
        <p className="font-bold">#slytherin</p>
        <p className="font-bold">#ravenclow</p> */}
    </div>
  );
};

export default RightSidebar;

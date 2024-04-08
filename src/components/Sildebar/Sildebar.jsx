import React from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { MdFileUpload } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Sildebar = () => {
  const routes = [
    {
      icon: <FaHome className="inline-block w-6 h-6 mr-2 -mt-2" />,
      text: "Home",
      route: "/Home",
    },
    {
      icon: <MdOutlineExplore className="inline-block w-6 h-6 mr-2 -mt-2" />,
      text: "Explore",
      route: "/Explore",
    },
    {
      icon: <MdFileUpload className="inline-block w-6 h-6 mr-2 -mt-2" />,
      text: "Upload",
      route: "/Upload",
    },
    {
      icon: <RiTeamFill className="inline-block w-6 h-6 mr-2 -mt-2" />,
      text: "Team",
      route: "/Team",
    },
  ];

  return (
    <div className="w-64 text-black fixed px-2 h-full bg-white ">
      <div>
        <div className="mt-3 font-mono flex flex-col gap-3 border-r-4 border-orange-300 ">
          {routes.map((value, index) => {
            return (
              <Link
                key={index}
                to={value.route}
                className=" rounded hover:shadow hover:duration-300 duration-300 cursor-pointer hover:bg-orange-300 py-2 px-2"
              >
                {value.icon} {value.text}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Sildebar;

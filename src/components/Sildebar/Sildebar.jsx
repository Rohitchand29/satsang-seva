import React from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { MdFileUpload } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";

const Sildebar = () => {
  const routes = [
    {
      icon: <FaHome className="inline-block w-6 h-6 mr-2 -mt-2" />,
      text: "Home",
      route: "/",
    },
    {
      icon: <MdOutlineExplore className="inline-block w-6 h-6 mr-2 -mt-2" />,
      text: "Explore",
      route: "/",
    },
    {
      icon: <MdFileUpload className="inline-block w-6 h-6 mr-2 -mt-2" />,
      text: "Upload",
      route: "/",
    },
    {
      icon: <RiTeamFill className="inline-block w-6 h-6 mr-2 -mt-2" />,
      text: "Team",
      route: "/",
    },
  ];

  return (
    <div className="w-64 text-black fixed px-2 h-full bg-primary">
      <div>
        <div className="mt-3 font-bold flex flex-col gap-3">
          {routes.map((value, index) => {
            return (
              <a
                key={index}
                href={value.route}
                className=" rounded hover:shadow hover:duration-300 duration-300 cursor-pointer hover:bg-accent py-2 px-2"
              >
                {value.icon} {value.text}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Sildebar;

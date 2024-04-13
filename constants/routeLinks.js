import { FaHome } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { MdFileUpload } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";

const routeLinks = [
  {
    icon: <FaHome className="inline-block w-6 h-6 mr-2 -mt-2" />,
    text: "Home",
    route: "/",
  },
  {
    icon: <MdOutlineExplore className="inline-block w-6 h-6 mr-2 -mt-2" />,
    text: "Explore",
    route: "/explore",
  },
  {
    icon: <MdFileUpload className="inline-block w-6 h-6 mr-2 -mt-2" />,
    text: "Upload",
    route: "/upload",
  },
  {
    icon: <RiTeamFill className="inline-block w-6 h-6 mr-2 -mt-2" />,
    text: "Team",
    route: "/team",
  },
];

export default routeLinks
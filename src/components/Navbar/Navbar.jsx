import { CiSearch } from "react-icons/ci";
import Dropdown from "../Dropdown/Dropdown";
import { useGeoLocation } from "../../Hooks";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const routes = [
  {
    text: "Login",
    route: "/Login",
  },
];

const Navbar = () => {
  const { location, error, refresh } = useGeoLocation();
  const [city, setCity] = useState("");
  console.log({ location, error, refresh });

  const getCityName = async () => {
    console.log(process.env.REACT_APP_OPENWEATHER_API_KEY);
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=28.950794063078728&lon=77.06840059488145&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`,
    );

    const data = await response.data;
    console.log(data.name);
    setCity(data.name);
  };
  useEffect(() => {
    if (location) {
      getCityName();
    }
  });

  return (
    <div>
      <nav className="bg-white  text-text w-full py-4 px-8 z-10 fixed border-b-4 border-orange-300">
        <ul className="flex items-center justify-between">
          <li className="font-bold text-4xl text-black font-mono">
            BrandName{" "}
          </li>
          <div className=" flex justify-between items-center ">
            <button className=" ml-20">
              <div className="flex bg-white justify-center items-center rounded-md text-black px-1">
                <input
                  type="search"
                  placeholder="Search"
                  className="flex h-9 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-orange-300 file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-80"
                />
              </div>
            </button>

            <button
              onClick={() => {}}
              className="rounded hover:shadow hover:duration-300 duration-300 cursor-pointer ml-1 px-2 py-2 bg-slate-100 font-mono"
            >
              {city ? <>{city}</> : <>Location</>}
            </button>
            <Dropdown />
            <button>
              {routes.map((value, index) => {
                return (
                  <Link
                    key={index}
                    to={value.route}
                    className=" rounded hover:shadow hover:duration-300 duration-300 cursor-pointer hover:bg-orange-300 py-2 px-4 bg-orange-400"
                  >
                    {value.icon} {value.text}
                  </Link>
                );
              })}
            </button>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

import { CiSearch } from "react-icons/ci";
import Dropdown from "../Dropdown/Dropdown";
import { useGeoLocation } from "../../Hooks";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const { location, error, refresh } = useGeoLocation();
  const [city, setCity] = useState("");
  console.log({ location, error, refresh })

  const getCityName = async () => {
    console.log(process.env.REACT_APP_OPENWEATHER_API_KEY)
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=28.950794063078728&lon=77.06840059488145&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`)

      const data = await response.data;
      console.log(data.name)
      setCity(data.name)
  }
  useEffect(()=>{
    if (location) {
      getCityName();
    }
  })

  return (
    <div>
      <nav className="bg-secondary  text-text w-full py-4 px-8 z-10 fixed ">
        <ul className="flex items-center gap-4 justify-between">
          <li className="font-bold text-4xl text-black font-serif">
            BrandName{" "}
          </li>
          <div className=" flex justify-between items-center gap-4">
            <Dropdown />
            <button className=" ml-20">
              <div className="flex bg-white justify-center items-center rounded-md text-black px-2">
                <input
                  type="search"
                  placeholder="Search Bar"
                  className="  flex text-start outline-none w-[600px] py-1 text-black"
                />
                <CiSearch className="" />
              </div>
            </button>

            <button onClick={
              ()=>{
              }
            } className="rounded hover:shadow hover:duration-300 duration-300 cursor-pointer hover:bg-accent ml-20 font-serif">
              {(city)?<>{city}</>:<>Location</>}
            </button>
            <button className="rounded hover:shadow hover:duration-300 duration-300 cursor-pointer hover:bg-accent ml-20 font-serif">
              Login
            </button>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

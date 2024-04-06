import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-secondary  text-text w-full py-4 px-8 z-10 fixed ">
        <ul className="flex items-center gap-4 justify-between">
          <li className="font-bold text-4xl text-black font-serif">
            BrandName{" "}
          </li>
          <div className=" flex justify-between items-center gap-4">
            <button className="ml-20 font-serif">Language</button>
            <button className="ml-20">
              <div className="flex bg-white justify-center items-center rounded-md text-black px-2">
                <input
                  type="search"
                  placeholder="Search Bar"
                  className="  flex text-center outline-none w-[600px]  py-1 text-black"
                />
                <CiSearch className="" />
              </div>
            </button>

            <button className="ml-20 font-serif">Location</button>
            <button className="ml-20 font-serif">Login</button>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

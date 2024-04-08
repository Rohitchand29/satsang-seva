import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import list from "./list";
import { useState } from "react";
import { IoLanguage } from "react-icons/io5";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  // console.log(list)
  return (
    <div className="flex justify-between ml-1 mr-1">
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-slate-200 hover:text-accent-foreground h-9 px-4 py-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <IoLanguage /> {!isOpen ? <AiOutlineCaretDown /> : <AiOutlineCaretUp />}
      </button>

      {isOpen && (
        <div className=" z-50 fixed mt-11 rounded px-4 py-1 bg-slate-100 text-black ">
          {list.map((item, i) => {
            return (
              <div className="" key={i}>
                <h3>{item.language}</h3>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

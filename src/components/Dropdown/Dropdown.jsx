import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import list from "./list";
import { useState } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  // console.log(list)
  return (
    <div className="flex justify-between">
      <button
        className="flex justify-between items-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Language {!isOpen ? <AiOutlineCaretDown /> : <AiOutlineCaretUp />}
      </button>

      {isOpen && (
        <div className=" z-50 fixed mt-6 rounded px-4 py-1 bg-slate-700 text-white font-bold">
          {list.map((item, i) => {
            return (
              <div className="flex " key={i}>
                <h3>{item.city}</h3>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

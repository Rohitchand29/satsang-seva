import React from "react";

const OutlineButton = (props) => {
  return (
    <button
      className={
        " h-full flex justify-center items-center border-2 py-2 px-6 border-gray-600" +
        props.className
      }
    >
      {props.children}
    </button>
  );
};

export default OutlineButton;

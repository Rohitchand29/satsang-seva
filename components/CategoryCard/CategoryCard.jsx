import React from 'react'

const CategoryCard = (props) => {
  return (
    <div className="w-[269px] h-[368px] relative">
      <img className="w-[269px] h-[345px] left-0 top-0 absolute rounded-[20px]" src={props.img || "https://via.placeholder.com/269x345"} />
      <div className="w-[188px] h-12 left-[40px] top-[320px] absolute bg-white rounded-[50px]" />
      <div className="w-[179px] h-[38px] px-[55px] py-1.5 left-[44px] top-[325px] absolute bg-orange-500 rounded-[50px] justify-center items-center gap-2.5 inline-flex">
        <div className="text-white text-base font-bold ">{props.text}</div>
      </div>
    </div>
  )
}

export default CategoryCard
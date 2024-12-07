import React from "react";
import accelerate from '../assets/images/accelerate.png'
import brake from '../assets/images/brake.png'
import right from '../assets/images/right.png'
import "./style.css";


const CarControls = ({ keys }) => {
  const { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } = keys;

  return (
    <div className="justify-between items-center h-[120px] absolute bottom-0 right-0 p-[20px] flex gap-[20px] w-[100%]" >

      <div className="flex gap-5">
        <img src={right} alt="accelerate" style={{
          filter: ArrowLeft && 'drop-shadow(0 2px 4px skyblue)'
        }} className={`h-[50px] rotate-180 transition-all duration-100`} />
        <img src={right} alt="accelerate" style={{
          filter: ArrowRight && 'drop-shadow(0 2px 4px skyblue)'
        }} className={`h-[50px] transition-all duration-100`} />
      </div>
      <div className="flex gap-8">

        <img src={brake} alt="accelerate" style={{
          filter: ArrowDown && 'drop-shadow(0 2px 4px skyblue)'
        }} className={`w-[40px] h-[90px] ${ArrowDown && 'h-[80px]'} transition-all duration-100`} />
        <img src={accelerate} alt="accelerate" style={{
          filter: ArrowUp && 'drop-shadow(0 2px 4px skyblue)'
        }} className={`w-[40px] h-[90px] ${ArrowUp && 'h-[75px]'} transition-all duration-100`} />
      </div>
    </div>
  );
};

export default CarControls;

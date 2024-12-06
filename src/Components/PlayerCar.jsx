import React from "react";
import carImage1 from "../assets/images/car1.png";
import carImage2 from "../assets/images/car2.png";
import carImage3 from "../assets/images/car3.png";
import carImage21 from "../assets/images/car21.png";
import carImage22 from "../assets/images/car22.png";
import carImage23 from "../assets/images/car23.png";

const PlayerCar = ({ playerCarRef , carView , carName }) => {
  console.log("curr" , carName);

  const carImage = {
    "left":carName === "one"? carImage2: carImage22,
    "center":carName === "one"? carImage1: carImage21,
    "right":carName === "one"? carImage3: carImage23,
  }
  return (
    <div
    id="playerCar"
    ref={playerCarRef}
    style={{
      width: "200px",
      height: "auto",
      transformStyle:'flat',
      position:'absolute',
      bottom:'0',
    }}
  >
    <div className="relative  ">
    <h1 className="absolute bottom-[-70px] left-[5%] text-[12px] w-[50px] text-white font-semibold text-center rounded-lg rounded-br-none h-5 bg-[#0000009a]">you</h1>
    </div>
    <img src={carImage[carView]} alt="your car" className="object-contain" />
  </div>
  );
};

export default PlayerCar;

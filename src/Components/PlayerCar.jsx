import React from "react";
import carImage1 from "../assets/images/car1.png";
import carImage2 from "../assets/images/car2.png";
import carImage3 from "../assets/images/car3.png";

const PlayerCar = ({ playerCarRef , carView }) => {
  const carImage = {
    "left":carImage2,
    "center":carImage1,
    "right":carImage3,
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
    <img src={carImage[carView]} alt="your car" className="object-contain" />
  </div>
  );
};

export default PlayerCar;

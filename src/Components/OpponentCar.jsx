import React from "react";
import carImage1 from "../assets/images/car1.png";
import carImage2 from "../assets/images/car2.png";
import carImage3 from "../assets/images/car3.png";
import carImage21 from "../assets/images/car21.png";
import carImage22 from "../assets/images/car22.png";
import carImage23 from "../assets/images/car23.png";

const OpponentCar = ({ OpponentCarRef , carView , carName }) => {
  const carImage = {
    "left":carName === "two"? carImage2: carImage22,
    "center":carName === "two"? carImage1: carImage21,
    "right":carName === "two"? carImage3: carImage23,
  }
  return (
    <div
    id="playerCar"
    ref={OpponentCarRef}
    style={{
      position: "absolute",
      width: "200px",
      height: "100px",
      top: "calc(100% - 150px)",
      transform: "translateX(150%) translateY(0px) translateZ(0px) scale(1)",
      transformOrigin: "center",
      transition: "transform 0.3s ease",
    }}
  >
    <img src={carImage[carView]} alt="your car" className="object-contain" />
  </div>
  );
};

export default OpponentCar;

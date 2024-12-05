import React from "react";
import carImage1 from "../assets/images/car1.png";
import carImage2 from "../assets/images/car2.png";
import carImage3 from "../assets/images/car3.png";

const OpponentCar = ({ OpponentCarRef , carView }) => {
  const carImage = {
    "left":carImage2,
    "center":carImage1,
    "right":carImage3,
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
      left: "50%",
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

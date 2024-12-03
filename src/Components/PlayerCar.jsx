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
      backgroundImage: `url(${carImage[carView]})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: "absolute",
      width: "200px",
      height: "150px",
      bottom: '10px'
    }}
  ></div>
  );
};

export default PlayerCar;

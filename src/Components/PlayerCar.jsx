import React from "react";
import carImage from "../../../../../Downloads/Screenshot_2024-12-01_014756-removebg-preview.png";

const PlayerCar = ({ playerCarRef }) => {
  return (
    <div
    id="playerCar"
    ref={playerCarRef}
    style={{
      background: `url(${carImage})`,
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

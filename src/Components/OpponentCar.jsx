import React from "react";

const OpponentCar = ({ position }) => {
  return (
    <div
      className="absolute w-12 h-24 bg-blue-500"
      style={{
        left: position.x,
        top: position.y,
        transition: "all 0.1s ease-in-out",
      }}
    ></div>
  );
};

export default OpponentCar;

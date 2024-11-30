import React from "react";

const Car = ({ player, isCurrent }) => {
  const { x, y, color, name } = player;

  return (
    <div
      className={`absolute w-[50px] h-[100px] text-center text-white text-[12px] leading-[100px] ${
        isCurrent ? "border-2 border-black" : ""
      }`}
      style={{
        left: x,
        top: y,
        backgroundColor: color,
      }}
    >
      {name || "Player"}
    </div>
  );
};

export default Car;

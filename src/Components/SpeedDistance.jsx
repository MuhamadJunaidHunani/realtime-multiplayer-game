import React from "react";

const SpeedDistance = ({ speed, distance }) => {
  return (
    <div className="absolute top-4 left-4 text-white">
      <h1>Speed: {Math.round(speed)} km/h</h1>
      <h1>Distance: {distance.toFixed(2)} m</h1>
    </div>
  );
};

export default SpeedDistance;

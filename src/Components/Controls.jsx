import React from "react";
import "./style.css";


const Controls = ({ roadSpeed, distance }) => {
  return (
    <div className="info" >
      <h1>Speed: {Math.round(roadSpeed * 10)} km/h</h1>
      <h1>Distance: {distance.toFixed(2)} m</h1>
    </div>
  );
};

export default Controls;

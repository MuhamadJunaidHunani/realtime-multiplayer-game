import React from "react";
import "./style.css";


const Controls = ({ speed, distance }) => {
  return (
    <div className="controlCont">
      <h1 className="speedMeter">{Math.round(speed * 10)} km/h</h1>
      <h1 className="distanceMeter">{distance.toFixed(2)} m</h1>
    </div>
  );
};

export default Controls;

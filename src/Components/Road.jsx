import React from "react";
import roadImage from "../assets/images/road.jpg";

const Road = ({ roadRef }) => {

  return (
    <div
    className="road"
    ref={roadRef}
    style={{
      background: `url(${roadImage})`,
      backgroundRepeat: 'repeat-y',
      backgroundSize: 'contain',
      position: 'absolute',
      width: '20vw',
      height: '341vh',
      top:'60%',
      left:'50%',
      transform:'translate(-50%, -50%) rotateX(92deg)'
    }}
  ></div>
  );
};

export default Road;

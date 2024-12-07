import React, { useEffect, useRef } from "react";
import enemyCar from "../assets/images/enemyCar.png";

const EnemyCar = ({ enemyCarRef }) => {

  // useEffect(() => {
  //   if (carRef.current) {
  //     const { z, scale } = car; // z is the position, scale adjusts size
  //     carRef.current.style.transform = `translateY(${0}px) translateZ(${z}px) scale(${scale})`;
  //   }
  // }, [car]);

  return (
    <div
      ref={enemyCarRef}
      style={{
        position: "absolute",
        top: "50%",
        left: "49%",
        transform: "translate(-50%, -50%)",
        width: "30px",
        height: "25px",
        background: `url(${enemyCar})`,
        backgroundSize: "cover",
        zIndex:1000,
        overflow:'visible'
      }}
    ></div>
  );
};

export default EnemyCar;

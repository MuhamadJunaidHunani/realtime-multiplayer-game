import React, { useEffect, useRef } from "react";
import roadImage from "../assets/images/road.jpg";

const Road = ({ roadSpeed }) => {
  const roadRef = useRef(null);

  useEffect(() => {
    const roadElement = roadRef.current;
    let position = 0;

    const scrollRoad = () => {
      position += roadSpeed;
      roadElement.style.backgroundPositionY = `${position}px`;
      requestAnimationFrame(scrollRoad);
    };

    scrollRoad();
    return () => cancelAnimationFrame(scrollRoad);
  }, [roadSpeed]);

  return (
    <div
      ref={roadRef}
      className="absolute top-0 left-0 w-full h-full bg-cover bg-repeat-y"
      style={{
        backgroundImage: `url(${roadImage})`,
        backgroundPositionY: "0px",
      }}
    />
  );
};

export default Road;

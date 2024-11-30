import React, { useState, useEffect } from "react";

const CarRace = () => {
  const [carPosition, setCarPosition] = useState(0); // Initial position
  const [isMoving, setIsMoving] = useState(false);  // Movement state

  useEffect(() => {
    let interval;

    if (isMoving) {
      // Update position at regular intervals
      interval = setInterval(() => {
        setCarPosition((prevPosition) => prevPosition + 5);
      }, 100); // Adjust interval for smoother/slower animation
    } else {
      clearInterval(interval); // Stop movement
    }

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isMoving]);

  // Event listeners for keydown and keyup
  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      setIsMoving(true);
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "ArrowUp") {
      setIsMoving(false);
    }
  };

  return (
    <div
      tabIndex="0" // Makes div focusable to capture key events
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      style={{
        outline: "none",
        position: "relative",
        height: "100vh",
        background: "#f0f0f0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: `${carPosition}px`,
          left: "50%",
          transform: "translateX(-50%)",
          width: "50px",
          height: "30px",
          background: "red",
          transition: "bottom 0.1s linear", // Smooth animation
        }}
      ></div>
    </div>
  );
};

export default CarRace;

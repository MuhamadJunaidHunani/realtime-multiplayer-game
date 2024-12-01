import React, { useEffect, useRef, useState } from "react";
import roadImage from "../assets/images/road.jpg";
import treeImage from "../assets/images/tree.png";
import carImage from "../../../../../Downloads/Screenshot_2024-12-01_014756-removebg-preview.png";

const GameArea = () => {
  const gameAreaRef = useRef(null);
  const roadRef = useRef(null);
  const treeRefs = useRef([]);
  const playerCarRef = useRef(null);
  const [roadSpeed, setRoadSpeed] = useState(3);
  const [distance, setDistance] = useState(0);
  const [trees, setTrees] = useState([...Array(6).keys()]);

  const car = useRef({
    x: 300, // Initial X position
    y: 400, // Initial Y position
    moveSpeed: 5,
  });
  const roadPosition = useRef(0);
  const keysRef = useRef({});
  const lastTimestampRef = useRef(performance.now());
  const animationRef = useRef();

  useEffect(() => {
    const handleKeyDown = (e) => {
      keysRef.current[e.key] = true;
    };
    const handleKeyUp = (e) => {
      keysRef.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const roadSpeedRef = useRef(roadSpeed); // Create a ref to track roadSpeed

  const updateRoad = () => {
    roadPosition.current += roadSpeedRef.current; // Use ref for the current speed
    if (roadRef.current) {
      roadRef.current.style.backgroundPositionY = `${roadPosition.current}px`;
    }
  };

  function calculatePercentage(data, min, max) {
    const mid = (min + max) / 2;
    if (data === mid) return 100;

    if (data < mid) {
        const range = mid - min;
        const difference = mid - data;
        const percentage = 100 - (difference / range) * 50; // Scale from 100 to 50
        return (150 * percentage) / 100;
      
    } else {
        const range = max - mid;
        const difference = data - mid;
        const percentage = 100 - (difference / range) * 50; // Scale from 100 to 50
        return  (150 * percentage) / 100;
    }
}

  
  const adjustMovement = () => {
    const keys = keysRef.current;
    const carData = car.current;

    if (keys["ArrowLeft"] && carData.x > 150) {
      carData.x -= carData.moveSpeed;
    }
    if (keys["ArrowRight"] && carData.x < 750) {
      carData.x += carData.moveSpeed;
    }
    if (keys["ArrowUp"] && roadSpeedRef.current < 30) {
      roadSpeedRef.current += 0.1; // Update the ref directly
      setRoadSpeed(roadSpeedRef.current); // Sync state for UI updates if needed
    }
    if (keys["ArrowDown"] && roadSpeedRef.current > 3) {
      roadSpeedRef.current -= 0.1; // Update the ref directly
      setRoadSpeed(roadSpeedRef.current); // Sync state for UI updates if needed
    }

    if (playerCarRef.current) {
      playerCarRef.current.style.transform = `translateX(${carData.x}px)`;
      const width = calculatePercentage(carData.x , 150 , 750);
      
      playerCarRef.current.style.width = `${width}px`;
      playerCarRef.current.style.height = `${width}px`;
    }
  };



  const handleSpeedDecay = () => {
    if (!keysRef.current["ArrowUp"] && roadSpeedRef.current > 5) {
      
      roadSpeedRef.current -= 0.1; // Update the ref directly
      setRoadSpeed((speed) => speed - 0.1);
    }
  };

  const animateTrees = () => {
    setTrees((prevTrees) => {
      return prevTrees.map((tree, index) => {
        const treeRef = treeRefs.current[index];
        if (treeRef) {
          const currentLeft = parseFloat(treeRef.style.left);
          const currentTop = parseFloat(treeRef.style.top);

          // Update position
          treeRef.style.left = `${currentLeft - 0.2}%`;
          treeRef.style.top = `${currentTop + 0.07}%`;

          // Scale animation
          const scaleFactor =
            parseFloat(treeRef.style.transform.match(/scale\((.*?)\)/)?.[1]) || 1;
          treeRef.style.transform = `translate(-50%, -50%) scale(${scaleFactor + 0.005})`;

          // Remove if out of bounds
          if (currentLeft < -11) {
            return null; // Mark for removal
          }
        }
        return tree; // Keep tree if it's still in bounds
      }).filter(Boolean); // Remove `null` elements
    });
  };
  const updateDistance = (deltaTime) => {
    setDistance((prev) => prev + roadSpeedRef.current * (1000 / 3600) * deltaTime);
  };

  const gameLoop = (currentTimestamp) => {
    const deltaTime = (currentTimestamp - lastTimestampRef.current) / 1000;
    lastTimestampRef.current = currentTimestamp;

    updateDistance(deltaTime);
    adjustMovement();
    handleSpeedDecay();
    updateRoad();
    animateTrees()

    animationRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);



  return (
    <div
      id="gameArea"
      ref={gameAreaRef}
      style={{

        position: 'relative',
        width: '100%',
        height: '100vh',
        perspective: '1000px',
        overflow: 'hidden',
        // overflow: "hidden",
        // background: "green",
      }}
    >
      <div
        className="road"
        ref={roadRef}
        style={{
          background: `url(${roadImage})`,
          backgroundRepeat: 'repeat-y',
          backgroundSize: 'contain',
          // backgroundPositionY:`0px`,
          position: 'absolute',
          width: '20vw',
          height: '341vh',
          top:'60%',
          left:'50%',
          transform:'translate(-50%, -50%) rotateX(92deg)'
        }}
      ></div>
      <>
      {trees.map((_, index) => (
        <div
          key={index}
          ref={(el) => (treeRefs.current[index] = el)}
          style={{
            backgroundImage: `url(${treeImage})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            position: 'absolute',
            width: `${20 - index * 1.5}vw`,
            aspectRatio: '1 / 2',
            height: 'auto',
            top: `${73 - index * 2.7}%`,
            left: `${15 * index - index * 7}%`,
            transform: `translate(-50%, -50%) scale(${1 - index * 0.1})`,
            zIndex: -index,
          }}
        ></div>
      ))} 
      </>

      <div
        id="playerCar"
        ref={playerCarRef}
        style={{
          background: `url(${carImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition:'center',
          position: "absolute",
          width: "200px",
          height: "150px",
          bottom:'10px'
          // transform: `translate(${car.current.x}px, ${car.current.y}px)`,
        }}
      ></div>
      <div className="info" >
        <h1>Speed: {Math.round(roadSpeed * 10)} km/h</h1>
        <h1>Distance: {distance.toFixed(2)} m</h1>
      </div>
    </div>
  );
};

export default GameArea;

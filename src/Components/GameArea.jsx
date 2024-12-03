import React, { useEffect, useRef, useState } from "react";
import mount from "../assets/images/360_F_248730987_xRhUf0X7eMmK8cb1oo9gE64kpZrO1aSoa.jpg";
import Road from "./Road";
import Trees from "./Trees";
import PlayerCar from "./PlayerCar";
import Controls from "./Controls";

const GameArea = () => {
  const gameAreaRef = useRef(null);
  const roadRef = useRef(null);
  const treeRef1 = useRef(null);
  const treeRef2 = useRef(null);
  const playerCarRef = useRef(null);
  const animationRef = useRef();
  const roadPosition = useRef(0);
  const [roadSpeed, setRoadSpeed] = useState(3);
  const roadSpeedRef = useRef(roadSpeed);
  const [distance, setDistance] = useState(0);
  const keysRef = useRef({});
  const lastTimestampRef = useRef(performance.now());
  const car = useRef({
    x: 300,
    y: 400,
    moveSpeed: 5,
  });

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


  const updateRoad = () => {
    roadPosition.current += roadSpeedRef.current;
    if (roadRef.current) {
      roadRef.current.style.backgroundPositionY = `${roadPosition.current}px`;
      treeRef1.current.style.backgroundPositionX = `-${roadPosition.current}px`;
      treeRef2.current.style.backgroundPositionX = `-${roadPosition.current + 200}px`;
    }
  };

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
      roadSpeedRef.current += 0.1;
      setRoadSpeed(roadSpeedRef.current);
    }
    if (keys["ArrowDown"] && roadSpeedRef.current > 3) {
      roadSpeedRef.current -= 0.1;
      setRoadSpeed(roadSpeedRef.current);
    }

    if (playerCarRef.current) {
      playerCarRef.current.style.transform = `translateX(${carData.x}px)`;
    }
  };

  const handleSpeedDecay = () => {
    if (!keysRef.current["ArrowUp"] && roadSpeedRef.current > 5) {
      roadSpeedRef.current -= 0.1;
      setRoadSpeed((speed) => speed - 0.1);
    }
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
        background: `url(${mount}) , #00678F`,
        backgroundRepeat: 'no-repeat , no-repeat ',
        backgroundSize: '100% 59% , 50%',
        backgroundPosition: 'center top , center bottom ',
        position: 'relative',
        width: '100%',
        height: '100vh',
        perspective: '1000px',
        overflow: 'hidden',
      }}
    >
      <div className="w-[180px] h-[100px] bg-[#0000005d] z-[10000] absolute top-[44%] right-[42%] pointer-events-none bg-gradient-to-t from-[rgba(135,206,250,1)] via-[rgba(135,206,250,0.3)] to-transparent">
      </div>
      <Road roadRef={roadRef} />
      <Trees treeRef1={treeRef1} treeRef2={treeRef2} />
      <PlayerCar playerCarRef={playerCarRef} />
      <Controls roadSpeed={roadSpeed} distance={distance}/>
    </div>
  );
};

export default GameArea;

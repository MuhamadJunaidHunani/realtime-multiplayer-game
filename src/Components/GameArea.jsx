import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import carImage from "../assets/images/car.png";
import roadImage from "../assets/images/road.jpg";

const GameArea = () => {
  const [roadSpeed, setRoadSpeed] = useState(3);
  const [distance, setDistance] = useState(0);
  const [roadPosition, setRoadPosition] = useState(0);
  const [car, setCar] = useState({ x: 175, y: 580 });
  const [keys, setKeys] = useState({});
  const [enemyCars, setEnemyCars] = useState([]);
  const gameAreaRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => setKeys((prev) => ({ ...prev, [e.key]: true }));
    const handleKeyUp = (e) => setKeys((prev) => ({ ...prev, [e.key]: false }));

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const gameLoop = () => {
      updateRoad();
      adjustMovement();
      updateEnemyCars();
      handleSpeedDecay();

      if (Math.random() < 0.01 && roadSpeed > 2) createEnemyCar();

      requestAnimationFrame(gameLoop);
    };
    gameLoop();
  }, []);

  const updateRoad = () => setRoadPosition((pos) => pos + roadSpeed);

  const adjustMovement = () => {
    setCar((prevCar) => {
      let { x, y } = prevCar;
      if (keys["ArrowLeft"] && x > 0) x -= 5;
      if (keys["ArrowRight"] && x < 350) x += 5;
      if (keys["ArrowUp"] && roadSpeed < 30) setRoadSpeed((speed) => speed + 0.1);
      if (keys["ArrowDown"] && roadSpeed > 3) setRoadSpeed((speed) => speed - 0.1);
      return { x, y };
    });
  };

  const createEnemyCar = () => {
    const xPosition = Math.random() * 350;
    const newEnemy = {
      id: Date.now(),
      x: xPosition,
      y: -100,
      speed: Math.random() * 2 + 2,
    };
    setEnemyCars((prev) => [...prev, newEnemy]);
  };

  const updateEnemyCars = () => {
    setEnemyCars((prev) =>
      prev
        .map((enemy) => ({ ...enemy, y: enemy.y + roadSpeed }))
        .filter((enemy) => enemy.y < 700)
    );
  };

  const handleSpeedDecay = () => {
    if (!keys["ArrowUp"] && roadSpeed > 3) setRoadSpeed((speed) => speed - 0.01);
  };

  return (
    <div
      id="gameArea"
      style={{
        backgroundImage: `url(${roadImage})`,
        backgroundPositionY: `${roadPosition}px`,
      }}
      ref={gameAreaRef}
    >
      <div
        id="playerCar"
        className="car"
        style={{ left: `${car.x}px`, top: `${car.y}px`, backgroundImage: `url(${carImage})` }}
      ></div>
      {enemyCars.map((enemy) => (
        <div
          key={enemy.id}
          className="enemy"
          style={{ left: `${enemy.x}px`, top: `${enemy.y}px` }}
        ></div>
      ))}
    </div>
  );
};

export default GameArea;

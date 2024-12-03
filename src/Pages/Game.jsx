import React, { useState, useEffect, useRef } from "react";
import { socket, joinRoom, moveCar } from "../services/socket";
import PlayerCar from "../Components/PlayerCar";
import mount from "../assets/images/360_F_248730987_xRhUf0X7eMmK8cb1oo9gE64kpZrO1aSoa.jpg";
import smog from "../assets/images/b.png";
import Road from "../Components/Road";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Trees from "../Components/Trees";
import CarControls from "../Components/CarControls";

const Game = () => {
  const { roomId } = useParams();

  const { currentUser, currentUserLoading } = useSelector((state) => state.currentUser);
  const [opponentCar, setOpponentCar] = useState({ x: 0, y: 0 });
  const [keys, setKeys] = useState({});
  const animationRef = useRef();
  const gameAreaRef = useRef(null);
  const roadRef = useRef(null);
  const treeRef1 = useRef(null);
  const treeRef2 = useRef(null);
  const playerCarRef = useRef(null);
  const roadPosition = useRef(0);
  const roadSpeedRef = useRef(3);
  const keysRef = useRef({});
  const lastTimestampRef = useRef(performance.now());
  const car = useRef({ x: 300, y: 400, moveSpeed: 5 });
  const [roadSpeed, setRoadSpeed] = useState(3);
  const [players, setPlayers] = useState([]);
  const [opponent, setOpponent] = useState({});
  const [carView, setCarView] = useState("center");
  const [distance, setDistance] = useState(0);
  const distanceRef = useRef(0);



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
      treeRef2.current.style.backgroundPositionX = `-${roadPosition.current + 200
        }px`;
    }
  };


  const adjustMovement = () => {
    const { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } = keysRef.current;
    const carState = car.current;
    const roadSpeed = roadSpeedRef.current;
    const screenWidth = window.innerWidth;
    const moveBounds = { left: 0, right: screenWidth - 200 };
    const viewThresholds = { left: screenWidth / 4, right: (screenWidth / 4) * 2.5 };

    if (ArrowLeft && carState.x > moveBounds.left) carState.x -= carState.moveSpeed;
    if (ArrowRight && carState.x < moveBounds.right) carState.x += carState.moveSpeed;

    if (ArrowUp && roadSpeed < 30) {
      roadSpeedRef.current += 0.1;
      setRoadSpeed(roadSpeedRef.current);
    } else if (ArrowDown && roadSpeed > 3) {
      roadSpeedRef.current -= 0.1;
      setRoadSpeed(roadSpeedRef.current);
    }
    
    moveCar(roomId, distanceRef.current ,carState.x , carState.y);
    if (playerCarRef.current) {
      const newCarView =
        carState.x > viewThresholds.right ? "right" :
          carState.x < viewThresholds.left ? "left" :
            "center";
      setCarView((prevView) => (prevView !== newCarView ? newCarView : prevView));
      playerCarRef.current.style.transform = `translateX(${carState.x}px)`;
    }
  };

  const handleSpeedDecay = () => {
    if (!keysRef.current.ArrowUp && roadSpeedRef.current > 5) {
      roadSpeedRef.current -= 0.1;
      setRoadSpeed(roadSpeedRef.current);
    }
  };

  const updateDistance = (deltaTime) => {
    distanceRef.current += roadSpeedRef.current * (1000 / 3600) * deltaTime
    setDistance(distanceRef.current);
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
    return () => cancelAnimationFrame(animationRef.current);
  }, []);


  useEffect(() => {
    if (currentUser && roomId) {
      joinRoom(roomId, currentUser);

      socket.on("player-joined", ({ players }) => {
        const opponentData = players.find((p) => p?.id !== socket?.id);
        setPlayers(players);
        setOpponent(opponentData || {});
      });

      socket.on("car-update", ({ id, car }) => {
        if (id !== socket.id) setOpponentCar(car);
      });

      socket.on("winner", (winnerId) => {
        alert(winnerId === socket.id ? "You won!" : "Opponent won!");
        window.location.href = "/";
      });

      return () => {
        socket.off("player-joined");
        socket.off("car-update");
        socket.off("winner");
      };
    }
  }, [roomId, currentUser]);

  return (
    <div
      id="gameArea"
      ref={gameAreaRef}
      style={{
        background: `url(${mount}), #00678F`,
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundSize: "100% 59%, 50%",
        backgroundPosition: "center top, center bottom",
        position: "relative",
        width: "100%",
        height: "100vh",
        perspective: "1000px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundImage: `linear-gradient(0deg, #7D7D7D 0%, rgba(255,255,255,0) 100%), url(${smog})`,
          backgroundPosition: "0% 33px, center",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundSize: "100% 30%, cover",
        }}
        className="w-[100px] overflow-hidden h-[45px] z-[10000] absolute top-[50%] left-[46.4%] pointer-events-none"
      ></div>
      <Road roadRef={roadRef} />
      <Trees treeRef1={treeRef1} treeRef2={treeRef2} />
      <PlayerCar playerCarRef={playerCarRef} carView={carView} />
      <CarControls roadSpeed={roadSpeed} distance={distance} />
    </div>
  );
};

export default Game;

import React, { useState, useEffect, useRef } from "react";
import { socket, joinRoom, moveCar } from "../Services/socket";
import PlayerCar from "../Components/PlayerCar";
import mount from "../assets/images/360_F_248730987_xRhUf0X7eMmK8cb1oo9gE64kpZrO1aSoa.jpg";
import smog from "../assets/images/b.png";
import Road from "../Components/Road";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Trees from "../Components/Trees";
import CarControls from "../Components/CarControls";
import OpponentCar from "../Components/OpponentCar";
import EnemyCar from "../Components/EnemyCar";
import Speedometer from "../Components/Speedometer";
import GameWonModal from "../Components/GameWonModal";
import GameLossModal from "../Components/GameLossModal";
import { updateUserStats } from "../Firebase/updateUserStats";

const Game = () => {
  const { roomId } = useParams();
  const { currentUser } = useSelector((state) => state.currentUser);
  const animationRef = useRef();
  const gameAreaRef = useRef(null);
  const roadRef = useRef(null);
  const treeRef1 = useRef(null);
  const treeRef2 = useRef(null);
  const playerCarRef = useRef(null);
  const opponentCarRef = useRef(null);
  const roadPosition = useRef(0);
  const roadSpeedRef = useRef(3);
  const keysRef = useRef({});
  const lastTimestampRef = useRef(performance.now());
  const playerCarPos = useRef({ x: 0, y: 400, moveSpeed: 8 });
  const opponentCarPos = useRef({ x: 0, y: 400, moveSpeed: 8 });
  const [roadSpeed, setRoadSpeed] = useState(3);
  const [allPlayers, setAllPlayers] = useState([]);
  const [Winner, setWinner] = useState(null);
  const [opponent, setOpponent] = useState({});
  const [carView, setCarView] = useState("center");
  const [opponentCarView, setOpponentCarView] = useState("center");
  const [distance, setDistance] = useState(0);
  const [keys, setKeys] = useState({});
  const [carName, setCarName] = useState(null);
  const distanceRef = useRef(0);
  const [opponentdistance, setopponentDistance] = useState(0);
  const opponentdistanceRef = useRef(0);
  const navigate = useNavigate();
  const [enemyCars, setEnemyCars] = useState([]);
  const enemyCarRef = useRef();
  let zPosition = 0;
  let scale = 1;
  const afterWin = () => {
    navigate("/players")
  }


  const playersIds = roomId.split('_');
  if (!playersIds.includes(currentUser.uid)) {
    navigate('a/players');
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      keysRef.current[e.key] = true;
      setKeys(keysRef.current)
    };
    const handleKeyUp = (e) => {
      keysRef.current[e.key] = false;
      setKeys(keysRef.current)
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  useEffect(() => {
    if (currentUser && roomId) {
      joinRoom(roomId, currentUser);
      socket.on("player-joined", ({ players }) => {
        const opponentData = players.find((p) => p?.id !== socket?.id);
        const MyData = players.find((p) => p?.id === socket?.id);
        setAllPlayers((prev) => {
          const isAlreadyIncluded = prev?.some((player) => player?.id === socket?.id);
          if (!isAlreadyIncluded) {
            setCarName(MyData?.playerNumber)
            if (MyData?.playerNumber === "one") {
              playerCarPos.current.x = window.innerWidth / 6;
            } else if (MyData?.playerNumber === "two") {
              playerCarPos.current.x = (window.innerWidth / 6) * 4;
            }
          }
          return players;
        });
        setOpponent(opponentData || {});
      });

      socket.on("car-update", ({ id, car, distance }) => {
        if (id !== socket.id) {
          opponentCarPos.current = { x: car.x, y: car.y, moveSpeed: 5 };
          opponentdistanceRef.current = distance;
          setopponentDistance(distance)
        }

      });

      socket.on("winner", (winnerId) => {
        cancelAnimationFrame(animationRef.current)
        if (winnerId === socket.id) {
          setWinner("you")
        } else {
          setWinner("opp")
        }
      });

      return () => {
        socket.off("player-joined");
        socket.off("car-update");
        socket.off("winner");
      };
    }
  }, [roomId, currentUser]);

  if (Winner === "you") {
    updateUserStats(currentUser.uid, 'win', 1)
    return <GameWonModal onClose={afterWin} />
  } else if (Winner === "opp") {
    updateUserStats(currentUser.uid, 'lose', 1)
    return <GameLossModal onClose={afterWin} />
  }

  const updateRoad = () => {
    roadPosition.current += roadSpeedRef.current;
    if (roadRef.current) {
      roadRef.current.style.backgroundPositionY = `${roadPosition.current}px`;
      treeRef1.current.style.backgroundPositionX = `-${roadPosition.current}px`;
      treeRef2.current.style.backgroundPositionX = `-${roadPosition.current + 200}px`;
    }
  };

  const adjustMovement = () => {
    const { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } = keysRef.current;
    const carState = playerCarPos.current;
    const roadSpeed = roadSpeedRef.current;
    const screenWidth = window.innerWidth;
    const moveBounds = { left: 0, right: screenWidth - 200 };
    const viewThresholds = { left: window.innerWidth / 6, right: (window.innerWidth / 6) * 4 };

    if (ArrowLeft && carState.x > moveBounds.left) carState.x -= carState.moveSpeed;
    if (ArrowRight && carState.x < moveBounds.right) carState.x += carState.moveSpeed;

    if (ArrowUp && roadSpeed < 30) {
      roadSpeedRef.current += 0.1;
      setRoadSpeed(roadSpeedRef.current);
    } else if (ArrowDown && roadSpeed > 3) {
      roadSpeedRef.current -= 0.1;
      setRoadSpeed(roadSpeedRef.current);
    }

    moveCar(roomId, distanceRef.current, carState.x, carState.y);
    if (playerCarRef.current) {
      const newCarView =
        carState.x > viewThresholds.right ? "right" :
          carState.x < viewThresholds.left ? "left" :
            "center";
      const newOpponentCarView =
        opponentCarPos.current.x > viewThresholds.right ? "right" :
          opponentCarPos.current.x < viewThresholds.left ? "left" :
            "center";
      setCarView((prevView) => (prevView !== newCarView ? newCarView : prevView));
      setOpponentCarView((prevView) => (prevView !== newOpponentCarView ? newOpponentCarView : prevView));
      playerCarRef.current.style.transform = `translateX(${carState.x}px)`;
      zPosition = (distanceRef.current - opponentdistanceRef.current) * 50;
      scale = zPosition <= -3500 ? 0 : Math.min(Math.abs(((zPosition / -3500) * 100) - 100), 100)
      opponentCarRef.current.style.transform = `translateX(${opponentCarPos.current.x}px) translateY(0px) translateZ(${zPosition}px) scale(${scale}%)`;

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

  const spawnCar = () => {
    setEnemyCars((prevCars) =>
      prevCars.length >= 1
        ? prevCars
        : [...prevCars, { z: 500, scale: 0, speed: 5 }]
    );
  };

  const updateCars = () => {
    setEnemyCars((prevCars) =>
      prevCars
        .map((car) => {
          const newZ = car.z + (roadSpeedRef.current / 10) + 1;
          const newScale = Math.min(0.3, car.scale + 0.01);
          enemyCarRef.current.style.transform = `translateY(${0}px) translateZ(${newZ}px) scale(${newScale})`;

          return newZ < 1000 ? { ...car, z: newZ, scale: newScale } : null;
        })
        .filter(Boolean)
    );
  };

  const gameLoop = (currentTimestamp) => {
    const deltaTime = (currentTimestamp - lastTimestampRef.current) / 1000;
    lastTimestampRef.current = currentTimestamp;
    updateDistance(deltaTime);
    adjustMovement();
    handleSpeedDecay();
    updateRoad();
    updateCars()
    const abc = Math.random()
    if (abc < 0.009 && abc > 0.008 && roadSpeedRef.current > 2) {
      spawnCar()
    }

    animationRef.current = requestAnimationFrame(gameLoop);
  };

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
          backgroundImage: ` url(${smog})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="w-[100px] overflow-hidden h-[45px] z-[10000] absolute top-[50%] left-[46.4%] pointer-events-none"
      ></div>
      <Speedometer currentSpeed={Math.round(roadSpeed * 10)} opponentDistance={opponentdistance} distance={distance} maxSpeed={300} />
      <Road roadRef={roadRef} />
      <Trees treeRef1={treeRef1} treeRef2={treeRef2} />
      <PlayerCar playerCarRef={playerCarRef} carView={carView} carName={carName} />
      <OpponentCar OpponentCarRef={opponentCarRef} carView={opponentCarView} carName={carName} />
      <CarControls roadSpeed={roadSpeed} keys={keys} />
      {enemyCars.map((car, index) => (
        <EnemyCar key={index} enemyCarRef={enemyCarRef} />
      ))}
    </div>
  );
};

export default Game;

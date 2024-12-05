import React, { useState, useEffect, useRef } from "react";
import { socket, joinRoom, moveCar } from "../services/socket";
import PlayerCar from "../Components/PlayerCar";
import mount from "../assets/images/360_F_248730987_xRhUf0X7eMmK8cb1oo9gE64kpZrO1aSoa.jpg";
import smog from "../assets/images/b.png";
import smog1 from "../assets/images/q.gif";
import Road from "../Components/Road";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Trees from "../Components/Trees";
import CarControls from "../Components/CarControls";
import OpponentCar from "../Components/OpponentCar";

const Game = () => {
  const { roomId } = useParams();

  const { currentUser, currentUserLoading } = useSelector((state) => state.currentUser);
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
  const playerCarPos = useRef({ x: 0, y: 400, moveSpeed: 5 });
  const opponentCarPos = useRef({ x: 0, y: 400, moveSpeed: 5 });
  const [roadSpeed, setRoadSpeed] = useState(3);
  const [allPlayers, setAllPlayers] = useState([]);
  const [opponent, setOpponent] = useState({});
  const [carView, setCarView] = useState("center");
  const [opponentCarView, setOpponentCarView] = useState("center");
  const [distance, setDistance] = useState(0);
  const distanceRef = useRef(0);
  const [opponentdistance, setopponentDistance] = useState(0);
  const opponentdistanceRef = useRef(0);
  const navigate = useNavigate();


  const playersIds = roomId.split('_');
  if(!playersIds.includes(currentUser.uid)){
    navigate('/players');

  }
  



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

  let zPosition = 0; // Start at the bottom of the road
  let scale = 1;

  // Function to move the car "forward" (towards the top of the road)
  function okh() {
    if (distanceRef.current - opponentdistanceRef.current < -3) { // Limit the movement to the end of the road
      zPosition = distanceRef.current - opponentdistanceRef.current; // Move forward in the Z-axis
      scale -= 0.015; // Reduce size to simulate perspective
      opponentCarRef.current.style.transform = `translateY(0px) translateZ(${zPosition}px) scale(${scale})`;
    }
  }

  const adjustMovement = () => {
    const { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } = keysRef.current;
    const carState = playerCarPos.current;
    const roadSpeed = roadSpeedRef.current;
    const screenWidth = window.innerWidth;
    const moveBounds = { left: 0, right: screenWidth - 200 };
    const viewThresholds = { left: window.innerWidth / 6, right: (window.innerWidth / 6) *4 };

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
      console.log(opponentCarPos.current.x , "⚱️⚱️⚱️");
      
      opponentCarRef.current.style.transform = `translateX(${opponentCarPos.current.x}px)`;
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
    okh()
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
        console.log(players);
        
        const opponentData = players.find((p) => p?.id !== socket?.id);
        setAllPlayers((prev) => {
          const isAlreadyIncluded = prev?.some((player) => player?.id === socket?.id);

          if (!isAlreadyIncluded) {
            if (players.length === 1) {
              playerCarPos.current.x = window.innerWidth / 6;
            } else if (players.length === 2) {
              playerCarPos.current.x = (window.innerWidth / 6) * 4;
            }
          }

          return players;
        });

        setOpponent(opponentData || {});
      });

      socket.on("car-update", ({ id, car , distance }) => {
        if (id !== socket.id){
        opponentCarPos.current = { x: car.x, y: car.y, moveSpeed: 5 };
        opponentdistanceRef.current = distance;
        console.log(car.x , opponentCarPos.current.x);
        }
        
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
          backgroundImage: ` url(${smog1})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="w-[100px] overflow-hidden h-[45px] z-[10000] absolute top-[50%] left-[46.4%] pointer-events-none"
      ></div>
      <Road roadRef={roadRef} />
      <Trees treeRef1={treeRef1} treeRef2={treeRef2} />
      <PlayerCar playerCarRef={playerCarRef} carView={carView} />
      <OpponentCar OpponentCarRef={opponentCarRef} carView={opponentCarView} />
      <CarControls roadSpeed={roadSpeed} distance={distance} />
    </div>
  );
};

export default Game;

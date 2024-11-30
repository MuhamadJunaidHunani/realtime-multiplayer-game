import React, { useState, useEffect, useRef } from "react";
import { socket, joinRoom, moveCar } from "../services/socket";
import PlayerCar from "../Components/PlayerCar";
import OpponentCar from "../Components/OpponentCar";
import SpeedDistance from "../Components/SpeedDistance";
import Road from "../Components/Road";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Game = () => {
  const { roomId } = useParams();
  const [players, setPlayers] = useState([]);
  const [opponent, setOpponent] = useState({});
  const { currentUser, currentUserLoading } = useSelector((state) => state.currentUser);
  const gameAreaRef = useRef(null);
  const [roadSpeed, setRoadSpeed] = useState(3);
  const [distance, setDistance] = useState(0);
  const [playerCar, setPlayerCar] = useState({ x: 0, y: 0 });
  const [opponentCar, setOpponentCar] = useState({ x: 0, y: 0 });
  const [keys, setKeys] = useState({});
  const animationRef = useRef();

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => setKeys((keys) => ({ ...keys, [e.key]: true }));
    const handleKeyUp = (e) => setKeys((keys) => ({ ...keys, [e.key]: false }));

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Smooth game loop using requestAnimationFrame
  const lastFrameTimeRef = useRef();
  const gameLoop = (currentTimestamp) => {
    const deltaTime = (currentTimestamp - lastFrameTimeRef.current) / 1000; // Time in seconds
    lastFrameTimeRef.current = currentTimestamp;

    // Smoothly update distance
    setDistance((prevDistance) => prevDistance + roadSpeed * deltaTime);

    // Update car position
    setPlayerCar((prevPosition) => {
      let { x, y } = prevPosition;

      if (keys["ArrowLeft"] && x > 0) x -= 150 * deltaTime; // Movement scaled by deltaTime
      if (keys["ArrowRight"] && x < 350) x += 150 * deltaTime;
      if (keys["ArrowUp"]) setRoadSpeed((speed) => Math.min(speed + 5 * deltaTime, 30));
      if (keys["ArrowDown"]) setRoadSpeed((speed) => Math.max(speed - 5 * deltaTime, 3));

      moveCar(roomId, x, y); // Notify server of new position
      return { x, y };
    });

    // Schedule the next frame
    animationRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {


    // Start the game loop
    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [setKeys]);

  // Handle socket events
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
    <div className="relative w-full h-screen overflow-hidden bg-green-500">
      <Road roadSpeed={roadSpeed} />
      <PlayerCar position={playerCar} />
      <OpponentCar position={opponentCar} />
      <SpeedDistance speed={roadSpeed * 10} distance={distance} />
    </div>
  );
};

export default Game;

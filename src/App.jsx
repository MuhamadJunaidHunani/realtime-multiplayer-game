import React, { useState } from "react";
import Controls from "./Components/Controls";
import GameArea from "./Components/GameArea";
import Test from "./Components/Test";


const App = () => {
  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState(0);

  return (
    // <div className="mainCont">
    //   <Controls speed={speed} distance={distance} />
    //   <GameArea setSpeed={setSpeed} setDistance={setDistance} />
    // </div>
    <Test/>
  );
};

export default App;

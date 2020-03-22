import React, { useState } from "react";
import "./DummyHouse.css";

import { Decider } from "./Decider";

export function DummyHouse() {
  const [decisions, setDecision] = useState({});


  return (
    <div id="testHouse">
      <Decider
        className="decider"
        decisions={decisions}
        setDecision={setDecision}
      />
      <div
        id="room1"
      ></div>
      <div
        id="room2"
      ></div>
      <div
        id="room3"
      ></div>
      <div
        id="room4"
      ></div>
    </div>
  );
}

import React, { useState } from "react";
import "./DummyHouse.css";

import { Decider } from "./Decider";
import { ExampleActivities } from "./ExampleActivities";

export function DummyHouse() {
  const [decisions, setDecision] = useState({});

  return (
    <div id="testHouse">
      <ExampleActivities />
      <Decider
        className="decider"
        decisions={decisions}
        setDecision={setDecision}
      />

      <div
        className={`overlay ${decisions.kopfbauch === "Bauch" ? "active" : ""}`}
        id="room1"
      ></div>

      <div className="overlay" id="room2"></div>
      <div className="overlay" id="room3"></div>
      <div className="overlay" id="room4"></div>
      <div className="overlay" id="room5"></div>
    </div>
  );
}

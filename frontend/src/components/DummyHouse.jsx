import React, { useState } from "react";
import "./DummyHouse.css";

import { Decider } from "./Decider";

export function DummyHouse({ listing, setListing, ...props }) {
  const [decisions, setDecision] = useState({});

  return (
    <div id="testHouse">
      <Decider
        decisions={decisions}
        setDecision={setDecision}
        listing={listing}
        setListing={setListing}
      />
      <div id="room1"></div>
      <div id="room2"></div>
      <div id="room3"></div>
      <div id="room4"></div>
    </div>
  );
}

import React, { useState } from "react";
import "./DummyHouse.css";

import { Decider } from "./Decider";

/*
 Decisions can be:
 {
   kopfbauch: Kopf | Bauch,
   helldunkel: Hell | Dunkel,
   grossklein: Gross | Klein,
   lautleise: Laut | Leise
 }
*/

export function DummyHouse({ listing, setListing, ...props }) {
  const [decisions, setDecision] = useState({});

  return (
    <div id="testHouse">
      <div className="deciderContainer">
        <Decider
          decisions={decisions}
          setDecision={setDecision}
          listing={listing}
          setListing={setListing}
        />
      </div>  
      <div id="houseContainer"></div>
      <div className={`overlay ${decisions.kopfbauch ? 'active' : ''}`} id="room1"></div>
      <div className={`overlay ${decisions.helldunkel ? 'active' : ''}`} id="room2"></div>
      <div className={`overlay ${decisions.grossklein ? 'active' : ''}`} id="room3"></div>
      <div className={`overlay ${decisions.lautleise ? 'active' : ''}`} id="room4"></div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import "./ExampleActivities.css";
import { Typography } from "@material-ui/core";

const exampleActivities = [
  "zusammen Stricken lernen",
  "gemeinsam Tomaten pflanzen",
  "mit anderen Zumba tanzen",
  "als Gruppe Nudeln machen"
];

export function ExampleActivities() {
  const [activity, setActivity] = useState(0);

  useEffect(() => {
    const updater = setTimeout(() => {
      const nextActivity =
        activity === exampleActivities.length - 1 ? 0 : activity + 1;
      setActivity(nextActivity);
    }, 3000);

    return function cleanup() {
      clearTimeout(updater);
    };
  });

  return (
    <div className="exampleActivities">
      <Typography variant="h5" gutterBottom>
      In Quarantäne soziale Aktivitäten finden<br />
      Zum Beispiel: <strong>{exampleActivities[activity]}</strong>
      </Typography>
    </div>
  );
}

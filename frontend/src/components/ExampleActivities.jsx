import React, { useState, useEffect } from "react";
import "./ExampleActivities.css";
import { Typography } from "@material-ui/core";

const exampleActivities = [
  "Stricken lernen",
  "Tomaten pflanzen",
  "Zumba tanzen",
  "Nudeln machen"
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
        {exampleActivities[activity]}
      </Typography>
    </div>
  );
}

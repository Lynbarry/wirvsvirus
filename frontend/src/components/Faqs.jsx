import React, { useEffect, useState } from "react";
import { Button, Typography } from "@material-ui/core";

export function Faqs() {
  const [headerSize, setHeaderSize] = useState("big");

  return (
    <div className="wrapper">
      <Typography variant="h3">
        FAQ
      </Typography>
    </div>
  );
}
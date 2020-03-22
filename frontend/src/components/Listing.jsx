import React from "react";
import { useParams } from "react-router-dom";
import { Button, Typography, Link } from "@material-ui/core";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import PeopleOutlinedIcon from "@material-ui/icons/PeopleOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

import "./Listing.css";

export function Listing() {
  const id = useParams();
  console.log(id);
  return (
    <div className="listingContainer">
      <div className="listingBlock">
        <Typography variant="h3">Zumba tanzen im Zimmer von Ole</Typography>
        <Typography variant="subtitle1" gutterBottom>
          Interaktiver Stream
        </Typography>
      </div>
      <div className="listingBlock">
        <Typography className="listingProperty">
          <AccessTimeOutlinedIcon
            fontSize="small"
            className="listingProperty--icon"
          />
          Heute, 16:00 - 18:00
        </Typography>
        <Typography className="listingProperty">
          <PeopleOutlinedIcon
            fontSize="small"
            className="listingProperty--icon"
          />
          5 - 10 Leute
        </Typography>
      </div>
      <div className="listingParticipate listingBlock">
        <Button
          variant="contained"
          color="primary"
          size="large"
          className="listingButton"
          startIcon={<HomeOutlinedIcon />}
        >
          Mitmachen
        </Button>
        <Link href="/faq">Wie funktioniert das?</Link>
      </div>
      <div className="listingDescription">
        <Typography variant="body1" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
      </div>
    </div>
  );
}

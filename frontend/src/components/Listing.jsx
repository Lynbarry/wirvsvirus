import React from "react";
import { useParams } from "react-router-dom";
import { Button, Typography, Link } from "@material-ui/core";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import PeopleOutlinedIcon from "@material-ui/icons/PeopleOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

import "./Listing.css";

/*
{
  created: row[0],
  title: row[1],
  abstract: row[2],
  date: row[3],
  time: row[4],
  duration: row[5],
  level: row[6],
  participantCount: row[7],
  broadcast: row[8],
  name: row[9],
  email: row[10],
  cost: row[11],
  categories: {
    light: row[12],
    body: row[13],
    size: row[14],
    noise: row[15],
    clean: row[16],
    speed: row[17]
  }
}
*/

export function Listing(props) {
  const id = useParams();
  console.log(id);
  return (
    <div className="listingContainer">
      <div className="listingBlock">
        <Typography variant="h3">{props.title}</Typography>
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
          {props.date}, {props.time}
        </Typography>
        <Typography className="listingProperty">
          <PeopleOutlinedIcon
            fontSize="small"
            className="listingProperty--icon"
          />
          {props.participantCount}
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
          {props.broadcast}
        </Button>
        <Link href="/faq">Wie funktioniert das?</Link>
      </div>
      <div className="listingDescription">
        <Typography variant="body1" gutterBottom>
          {props.abstract}
        </Typography>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Button, Typography } from "@material-ui/core";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import PeopleOutlinedIcon from "@material-ui/icons/PeopleOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import CostOutlinedIcon from "@material-ui/icons/ShoppingCartRounded";

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

export function Listing({ setHeaderSize }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [listing, setListing] = useState(undefined);
  const listingId = useParams().listingId;

  setHeaderSize("small");

  useEffect(() => {
    axios
      .get(`https://zusammenimzimmer.herokuapp.com/listing/${listingId}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
        responseType: "json",
      })
      .then((res) => {
        setListing(res.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        setIsLoaded(true);
      });
  }, [listingId]);

  return isLoaded ? (
    <ListingContent {...listing} setListing={setListing} />
  ) : (
    <div className="loadingOverlay">
      <div>Loading...</div>
    </div>
  );
}

const ListingContent = ({ setListing, ...props }) => {
  const [oClass, setOClass] = React.useState("");
  const [shouldAdd, setShouldAdd] = React.useState(false);
  const [fireRequest, setFireRequest] = React.useState(false);
  const [localListingConfig, setLocalListingConfig] = React.useState({});

  useEffect(() => {
    if (fireRequest) {
      setFireRequest(false);
      setParticipationStatus(
        props.id,
        shouldAdd,
        localListingConfig,
        setLocalListingConfig
      );
      setListing({
        ...props,
        participants: shouldAdd
          ? props.participants + 1
          : props.participants - 1,
      });
    }
  }, [shouldAdd]);

  // Try to load data from local storage on load
  useEffect(() => {
    const localStorageConfig = localStorage.getItem(props.id);
    if (localStorageConfig) {
      try {
        const localStorageJson = JSON.parse(localStorageConfig);
        setLocalListingConfig(localStorageJson);
        setShouldAdd(localStorageJson.joined);
      } catch (e) {
        console.error("Could not load config from localStorage", e);
      }
    }
  }, []);

  return (
    <div className="wrapper">
      <div className="listingBlock">
        <Typography variant="h3">
          {props.title} von {props.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {props.level}
        </Typography>
      </div>
      <div className="listingBlock">
        <Typography className="listingProperty">
          <AccessTimeOutlinedIcon
            fontSize="small"
            className="listingProperty--icon"
          />
          {props.date}, {props.time}, Dauer: {props.duration}
        </Typography>
        <Typography className="listingProperty">
          <PeopleOutlinedIcon
            fontSize="small"
            className="listingProperty--icon"
          />
          {props.participantCount}
        </Typography>
        <Typography className="listingProperty">
          <CostOutlinedIcon
            fontSize="small"
            className="listingProperty--icon"
          />
          kostenlos
        </Typography>
      </div>
      <div className="listingParticipate listingBlock">
        {localListingConfig.joined ? (
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="primary actionButton"
            startIcon={<HomeOutlinedIcon />}
            onClick={() => {
              setFireRequest(true);
              setShouldAdd(false);
            }}
          >
            Doch nicht
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="primary actionButton"
            startIcon={<HomeOutlinedIcon />}
            onClick={() => {
              setOClass("active");
            }}
          >
            Mitmachen
          </Button>
        )}
        <Typography className="listingBlock--participants">
          {props.participants} Teilnehmer
        </Typography>
        <a href="https://docs.google.com/document/d/1iU-KhLWcl6hAg8GHEPamBzc90jk6vw3B2_R-V7GUyvo/edit#heading=h.d8waaqmdpqay">
          Wie funktioniert das?
        </a>
      </div>
      <div className="listingDescription">
        <p>{props.abstract}</p>
        <p>Stream-Info:</p>
        <p>{props.broadcast}</p>
      </div>
      <div className="listing--further">
        <p className="listing--further-heading">Über Zusammen im Zimmer</p>
        <p className="listing--further-text">
          Zusammen im Zimmer ist ein Verzeichnis, in dem Ihr während der Zeit
          von Ausgangsbeschränkungen und Quarantäne soziale Aktivitäten finden
          könnt.
        </p>
        <div>
          <a className="listing--further-link" href="/faq">
            Missbrauch melden
          </a>
          <a className="listing--further-link" href="/faq">
            Zimmer eröffnen (Stream anbieten)
          </a>
          <a className="listing--further-link" href="/faq">
            Hilfe
          </a>
        </div>
      </div>
      <button className="rerollButton" onClick={() => {}}>
        Zeig mir ein anders Zimmer
      </button>
      <div id="instructionOverlay" className={oClass}>
        <div>
          <h3>Super!</h3>
          <p>
            Du möchtest bei "{props.title}" im Zimmer von {props.name}{" "}
            mitmachen. Bitte lies dir {props.name}s Beschreibung genau durch:
          </p>
          <p>
            * Auf welcher Online-Plattform und unter welchem Link die Aktivität
            stattfindet, steht in der Beschreibung.
            <br />* Klicke pünktlich auf den Link, damit {props.name}s Mühe sich
            lohnt.
            <br />* Ob der Zugang beschränkt ist und wer mitmachen kann,
            entscheidet {props.name} über die Online-Plattform.
          </p>
          <p>Viel Spaß! Hast du Fragen? Schreib uns</p>
          <button
            className="primary actionButton"
            onClick={() => {
              setOClass("");
              setFireRequest(true);
              setShouldAdd(true);
            }}
          >
            ok
          </button>
        </div>
      </div>
    </div>
  );
};

// Makes the API request, then sets localStorage and state
function setParticipationStatus(
  id,
  participate,
  localListingConfig,
  setLocalListingConfig
) {
  return axios
    .post("https://zusammenimzimmer.herokuapp.com/join", {
      id,
      add: participate,
    })
    .then((res) => {
      if (res.status === 200) {
        const newConfig = { ...localListingConfig, joined: participate };
        localStorage.setItem(id, JSON.stringify(newConfig));
        return newConfig;
      } else {
        console.error("There was an error with the API request", res);
      }
    })
    .then((newConfig) => {
      setLocalListingConfig(newConfig);
    })
    .catch((err) => {
      console.error("There was an error setting the participation status", err);
    });
}

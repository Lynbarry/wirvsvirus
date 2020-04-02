import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Typography } from "@material-ui/core";
import "./Decider.css";
import { ExampleActivities } from "./ExampleActivities";
import axios from "axios";

const decisionData = [
  {
    subline: "Frage 1/4",
    question: "Kopf oder Bauch",
    answerOne: "Kopf",
    answerTwo: "Bauch",
    decisionKey: "kopfbauch"
  },
  {
    subline: "Frage 2/4",
    question: "Hell oder Dunkel",
    answerOne: "Hell",
    answerTwo: "Dunkel",
    decisionKey: "helldunkel"
  },
  {
    subline: "Frage 3/4",
    question: "Gross oder Klein",
    answerOne: "Gross",
    answerTwo: "Klein",
    decisionKey: "grossklein"
  },
  {
    subline: "Frage 4/4",
    question: "Laut oder Leise",
    answerOne: "Laut",
    answerTwo: "Leise",
    decisionKey: "lautleise"
  }
];

export function Decider({ decisions, setDecision, ...props }) {
  const [listing, setListing] = useState(null);
  const [step, setStep] = useState(-1);
  const [decided, setDecided] = useState(false);

  useEffect(() => {
    if (decided) {
      axios
        .post("https://zusammenimzimmer.herokuapp.com/listing", decisions, {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
          responseType: "json"
        })
        .then(res => {
          setListing(res.data);
        })
        .catch(err => console.error(err));
    }
  }, [decided, decisions]);

  if (listing) {
    return <Redirect to={{ pathname: `/listing/${listing.id}` }} />;
  }

  switch (step) {
    case -1:
      return <Initiator setStep={setStep} {...props} />;
    case decisionData.length:
      // User has gone through the whole decision process
      setStep(-1);
      setDecided(true);
      return <div className="loadingOverlay">loading...</div>;
    default:
      return (
        <DeciderButtons
          step={step}
          setDecision={setDecision}
          decisions={decisions}
          setStep={setStep}
          {...props}
        />
      );
  }
}

function Initiator({ setStep, ...props }) {
  return (
    <>
      <ExampleActivities />
      <button className="startButton actionButton" onClick={() => setStep(0)}>
        Zeig mir ein Zimmer
      </button>
      <button className="actionButton">
        <a target="blank" href="https://docs.google.com/forms/d/e/1FAIpQLSe-H75uQp0nyQSGD1n9ACGWwQY0zktaaUXoM3TsGX7KbNJVEQ/viewform">Eröffne ein Zimmer</a>
      </button>
    </>
  );
}

function DeciderButtons({ step, setDecision, decisions, setStep, ...props }) {
  const { subline, question, answerOne, answerTwo, decisionKey } = decisionData[
    step
  ];

  return (
    <div className="deciderButtons" {...props}>
      <div className="deciderQuestion">
        <h5>
          {subline}
        </h5>
        <h4>
          {question.toUpperCase()}?
        </h4>
      </div>
      <div className="deciderAnswers">
        <div
          className={answerOne}
          onClick={() => {
            setDecision({ ...decisions, [decisionKey]: answerOne });
            setStep(step + 1);
          }}
        ></div>
        <div
          className={answerTwo}
          onClick={() => {
            setDecision({ ...decisions, [decisionKey]: answerTwo });
            setStep(step + 1);
          }}
        ></div>
      </div>
    </div>
  );
}

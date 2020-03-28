import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import "./Decider.css";
import { Listing } from "./Listing";
import { ExampleActivities } from "./ExampleActivities";
import axios from "axios";

const decisionData = [
  {
    subline: "Um dich zuzuordnen, hier vier Fragen:",
    question: "Kopf oder Bauch",
    answerOne: "Kopf",
    answerTwo: "Bauch",
    decisionKey: "kopfbauch"
  },
  {
    subline: "Frage zwei von vier:",
    question: "Hell oder Dunkel",
    answerOne: "Hell",
    answerTwo: "Dunkel",
    decisionKey: "helldunkel"
  },
  {
    subline: "Frage drei von vier:",
    question: "Gross oder Klein",
    answerOne: "Gross",
    answerTwo: "Klein",
    decisionKey: "grossklein"
  },
  {
    subline: "Letzte Frage:",
    question: "Laut oder Leise",
    answerOne: "Laut",
    answerTwo: "Leise",
    decisionKey: "lautleise"
  }
];

export function Decider({
  decisions,
  setDecision,
  listing,
  setListing,
  ...props
}) {
  const [step, setStep] = useState(-1);

  if (listing) {
    return <Listing {...listing} />;
  }

  switch (step) {
    case -1:
      return <Initiator setStep={setStep} {...props} />;
    case decisionData.length:
      // User has gone through the whole decision process
      // Here we would need to talk to a backend to find out which listing we should go to based on the selection
      setStep(-1);
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

      //return <Redirect to={{ pathname: "/listing/123" }} />;
      return <div>Loading...</div>;
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
        <Typography variant="h5" component="h5">
          {subline}
        </Typography>
        <Typography variant="h4" component="h4">
          {question.toUpperCase()}?
        </Typography>
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

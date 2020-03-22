import React, { useState } from "react";
import { Button, Typography } from "@material-ui/core";
import "./Decider.css";
import { Redirect } from "react-router-dom";
import { ExampleActivities } from "./ExampleActivities";

const decisionData = [
  {
    subline: "Um dich zuzuordnen hier vier Fragen:",
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
    question: "Groß oder Klein",
    answerOne: "Groß",
    answerTwo: "Klein",
    decisionKey: "großklein"
  },
  {
    subline: "Letzte Frage:",
    question: "Laut oder Leise",
    answerOne: "Laut",
    answerTwo: "Leise",
    decisionKey: "lautleise"
  }
];

export function Decider({ decisions, setDecision, ...props }) {
  const [step, setStep] = useState(-1);

  switch (step) {
    case -1:
      return <Initiator setStep={setStep} {...props} />;
    case decisionData.length:
      // User has gone through the whole decision process
      // Here we would need to talk to a backend to find out which listing we should go to based on the selection
      console.log(decisions);
      return <Redirect to={{ pathname: "/listing/123" }} />;
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
    <ExampleActivities 
        className="welcomeText"
    />
    <button
      className="startButton"
      onClick={() => setStep(0)}
    >
      Zeig mir ein Zimmer
    </button>
  );
}

function DeciderButtons({ step, setDecision, decisions, setStep, ...props }) {
  const { subline, question, answerOne, answerTwo, decisionKey } = decisionData[step];

  return (
    <div className="deciderButtons">
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
        >
        </div>
        <div
          className={answerTwo}
          onClick={() => {
            setDecision({ ...decisions, [decisionKey]: answerTwo });
            setStep(step + 1);
          }}
        >
        </div>
      </div>
    </div>
  );
}

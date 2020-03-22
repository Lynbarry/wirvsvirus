import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "typeface-roboto";
import { DummyHouse } from "./components/DummyHouse";
import { Listing } from "./components/Listing";
import logo from "./assets/img/logo.png";

function App() {
  return (
    <Router>
      <header className="header">
        <div className="logo">
          <img src={logo} className="logoImage" alt="logo"></img>
        </div>
      </header>
      <main className="content">
        <Switch>
          <Route path="/listing/:id">
            <Listing />
          </Route>
          <Route path="/">
            <DummyHouse />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;

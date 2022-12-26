import React from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import "./App.css";

import Home from "./components/Home/Home";
import Dogs from "./components/Dogs/Dogs";
import DogDetails from "./components/Dogs/DogCard/DogDetails/DogDetails";
import Form from "./components/Form/Form";

axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  return (
    <div className="app">
      <div className="routes">
        <Switch>
          <Route path="/dogs">
            <Dogs />
          </Route>
          <Route path="/form">
            <Form />
          </Route>
          <Route path="/dogdetails">
            <DogDetails />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;

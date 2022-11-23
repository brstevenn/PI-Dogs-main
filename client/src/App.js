import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css'


import Home from './components/Home/Home';
import Dogs from './components/Dogs/Dogs';
import DogDetails from './components/Dogs/DogCard/DogDetails/DogDetails';
import Form from './components/Form/Form'
//import InsertEpisode from './components/InsertEpisode/InsertEpisode';
//import InsertCharacter from './components/InsertCharacter/InsertCharacter';
//import NotFound from './components/NotFound/NotFound';
//import Loader from './components/Loader/Loader';


function App() {

  return (
    <div className="app">
      <div className="routes" >
        <Switch>
          <Route path="/dogs" ><Dogs/></Route>
          <Route path="/form" ><Form/></Route>
          <Route path="/dogdetails" ><DogDetails/></Route>
          <Route path="/" ><Home/></Route>
        </Switch>
      </div>
    </div>
  );
  
}

export default App;

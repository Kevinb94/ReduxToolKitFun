import React, { useState, useEffect } from 'react';
import configureStore from './store/configureStore';
import * as actions from './store/bugs';
import { projectAdded } from './store/projects';
import logo from './logo.svg';
import './App.css';


const store = configureStore();

store.subscribe(() => {
    console.log("store changed!");
});



function App() {


  useEffect(() => {
    
    store.dispatch(projectAdded({name: "Project 1"}));
    store.dispatch(actions.bugAdded({ description: "Bug 1" }));
    store.dispatch(actions.bugAdded({ description: "Bug 2" }));
    store.dispatch(actions.bugAdded({ description: "Bug 3" }));
    store.dispatch(actions.bugResolved({ id: 2 }));
    
  });


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

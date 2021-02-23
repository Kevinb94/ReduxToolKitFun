import React, { useState, useEffect } from 'react';
import configureStore from './store/configureStore';
import {
    bugAdded, 
    bugResolved, 
    bugRemoved, 
    getUnresolvedBugs,
    getUserBugs,
    bugAssignedToUser
  }from './store/bugs';
import { projectAdded } from './store/projects';
import { userAdded } from './store/users';
import * as actions from './store/api';
import  {loadBugs } from './store/bugs';

import logo from './logo.svg';
import './App.css';


const store = configureStore();

store.subscribe(() => {
    console.log("store changed!");
});



function App() {


  useEffect(() => {
    
    //Projects
    // store.dispatch(projectAdded({name: "Project 1"}));

    //Bugs
    // store.dispatch(bugAdded({ description: "Bug 1" }));
    // store.dispatch(bugAdded({ description: "Bug 2" }));
    // store.dispatch(bugAdded({ description: "Bug 3" }));

    //Users
    // store.dispatch(userAdded({ name: "Ragnar" }));

    // store.dispatch(bugResolved({ id: 2 }));
    // store.dispatch(bugResolved({ id: 1 }));
    // store.dispatch(bugAssignedToUser({ bugID: 1, userID: 1 }));
    
    //Toast Middleware
    // store.dispatch({
    //   type: "error",
    //   payload: {message: "An error occured."}
    // });


    //Api
    store.dispatch(loadBugs());

    const unresolvedBugs1 = getUnresolvedBugs(store.getState());
    const unresolvedBugs2 = getUnresolvedBugs(store.getState());
    const userBugs = getUserBugs(1)(store.getState());
    // console.log(unresolvedBugs1 === unresolvedBugs2);
    // console.log(userBugs)
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

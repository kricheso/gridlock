import React from 'react';
import ReactDOM from 'react-dom';
import './firebase.js';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ExplorePage from './ExploreMode.js';
import Play from './Play.js';
import Create from './Create.js';
import Homepage from './Homepage.js';
import Grid from "./grid_generator";
import FirestoreManualTests from './services/tests/firestoreManualTests.js';
import Routing from './Routing.js'
import Leaderboard from './models/Leaderboard/Leaderboard'

// Note: some score attributes are missing. Testing purposes only.
// const fakeHiscores = [
//   {solveTime: 5000, userDisplayName: "Kousei Richeson", userId: "kousei.richeson@google.com"},
//   {solveTime: 6000, userDisplayName: "Azeezah Muhammad", userId: "azeezah@google.com"}
// ];

ReactDOM.render(
  <React.StrictMode>
    {/*/<ExplorePage />
    //<Play/>
    //<App />
    //<FirestoreManualTests />
    <Leaderboard hiscores={fakeHiscores}/>
    */}
    <Routing />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

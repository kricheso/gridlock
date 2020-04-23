import React from 'react';
import ReactDOM from 'react-dom';
import './firebase.js';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ExplorePage from './ExploreMode.js';
import Play from './Play.js';
import Create from './Create.js';
import Board from './Board.js';

ReactDOM.render(
  <React.StrictMode>
    <ExplorePage />
    <Play/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

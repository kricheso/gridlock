import React, {useState, useEffect} from 'react';
import Firestore from './services/firestore.js';
import Board from './Board';

function Play(props) {
  function finishGame(score) {
    console.log("game finished");
    // Todo: save score and load leaderboard.
  }
  const default_grid = [
    ["1", "1", "1", "1"],
    ["1", "1", "S", "1"],
    ["0", "0", "1", "1"],
    ["0", "0", "F", "0"],
  ];
  return (
    <div>
    <Board grid={props.grid || default_grid} finishGame={finishGame} />
    </div>
  );
}

 export default Play;

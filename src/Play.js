import React, {useState, useEffect} from 'react';
import Firestore from './services/firestore.js';
import Board from './Board';
import './Play.css';

function Play(props) {
  const [timeSec, setTimeSec] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [intervalId, setIntervalId] = useState(null);
  const [grid, setGrid] = useState(null)
  const userId = props.userId;
  const gridId = props.gridId;
  const default_grid = [
    ["1", "1", "1", "1"],
    ["1", "1", "S", "1"],
    ["0", "0", "1", "1"],
    ["0", "0", "F", "0"],
  ];

  function stopTimer() {
    clearInterval(intervalId);
    return Date.now() - startTime;
  }

  function startTimer() {
    setIntervalId(setInterval(() => {
      setTimeSec(Math.floor(Date.now()/1000 - startTime/1000));
    }, 1000));
  }

  useEffect(startTimer, []);
  useEffect(loadGrid, []);

  async function finishGame() {
    console.log("Finished game.");
    const score_sec = stopTimer();
    if (!userId || !gridId) { return; }
    const score_obj = await Firestore.add.score(userId, gridId, score_sec);
    if (!score_obj) {
      // Todo: Surface error to user.
      console.log("Couldn't upload score.");
    } else {
      // Todo: Load leaderboard.
      console.log("Uploaded score.")
      console.log(score_obj)
    }
  }

  async function loadGrid() {
    if (gridId) {
      const grid_obj = await Firestore.get.gridForUnregisteredUser(gridId);
      if (grid_obj) {
        setGrid(grid_obj.data);
        return;
      }
    }
    console.log("Failed to load grid, using default_grid.");
    setGrid(default_grid);
  }

  return (
    <div className="play-component">
      <div className="trophy"></div>
      <div>
        {
          grid // Wait until grid is loaded to render it.
            ? <Board grid={grid} finishGame={finishGame} />
            : <></>
        }
      </div>
      <div className="stopwatch">
        <div className="stopwatch-display">
          {Math.floor(timeSec / 60)} : {("0"+timeSec%60).substr(-2)}
        </div>
      </div>
    </div>
  );
}

 export default Play;

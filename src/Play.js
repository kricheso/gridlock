import React, {useState, useEffect} from 'react';
import Firestore from './services/firestore.js';
import Authentication from './services/authentication.js';
import Board from './Board';
import './Play.css';
import Leaderboard from './Leaderboard';

function Play(props) {
  const {gridId, ...other} = props;
  const [timeSec, setTimeSec] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [intervalId, setIntervalId] = useState(null);
  const [grid, setGrid] = useState(null);
  const [highscores, setHighscores] = useState(null);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const helpMessage = "Use the arrow keys to fill the grid!";
  const [playedFirstMove, setPlayedFirstMove] = useState(false);

  const default_grid ={
    title: "Armada",
    creatorDisplayName: "Jeremy",
    data: [
      ["1", "1", "1", "1"],
      ["1", "1", "S", "1"],
      ["0", "0", "1", "1"],
      ["0", "0", "F", "0"]]
  };

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

  async function finishGame() {
    console.log("Finished game.");
    const score_sec = stopTimer();
    setFinished(true);
    setScore(score_sec);
    if (!props.user || !gridId) {
      console.log("Cannot upload score without logging in.");
      return;
    }
    const score_obj = await Firestore.add.score(props.user.id, gridId, score_sec);
    if (!score_obj) {
      // Todo: Surface error to user.
      console.log("Couldn't upload score.");
    } else {
      console.log("Uploaded score.")
    }
  }

  async function loadGrid() {
    if (gridId) {
      const grid_obj = await Firestore.get.gridForUnregisteredUser(gridId);
      if (grid_obj) {
        setGrid(grid_obj);
        return;
      }
    }
    console.log("Failed to load grid, using default_grid.");
    setGrid(default_grid);
  }

  async function loadHighscores() {
    if (gridId) {
      const scores = await Firestore.get.topFiveScoresForGrid(gridId);
      if (scores) {
        setHighscores(scores);
        return;
      }
    }
    console.log("Failed to load highscores.");
  }

  // useEffect shouldn't be called with async functions since they return a
  // promise and useEffect expects a cleanup callback if anything.
  useEffect(()=>{loadGrid()}, []);
  useEffect(()=>{loadHighscores()}, []);

  function checkFirstMove(e) {
    if (e.key.startsWith("Arrow")) { setPlayedFirstMove(true)};
  }

  document.addEventListener("keydown", checkFirstMove);

  return (<>
    { grid ?
      <div className="play-header">
        <div className="grid-title">{grid.title}</div>
        <div className="grid-creator">by {grid.creatorDisplayName}</div>
      </div> : "" }
    <div className="play-component">
      <div className="trophy"></div>
      <div>
        {
          grid // Wait until grid is loaded to render it.
            ? <Board grid={grid.data} finishGame={finishGame} />
            : <></>
        }
      </div>
      <div className="stopwatch">
        <div className="stopwatch-display">
          {Math.floor(timeSec / 60)} : {("0"+timeSec%60).substr(-2)}
        </div>
      </div>
    </div>
    { finished ? <Leaderboard user={props.user} solveTimeMilliseconds={score} highscores={highscores} /> : "" }
    { playedFirstMove ? "" : <div className="help"> {helpMessage} </div> }
  </>);
}

 export default Play;

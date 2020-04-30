import React, {useState, useEffect} from 'react';
import Firestore from './services/firestore.js';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './Leaderboard.css';

function Leaderboard(props) {
  const score = props.solveTimeMilliseconds;
  const name = props.user ? props.user.displayName : "Guest";
  let highscores = props.highscores || [];
  highscores.push({solveTime:score, userDisplayName: name, fromThisRound:true});
  highscores.sort((a, b) =>
    a.solveTime < b.solveTime ? -1
    : a.solveTime == b.solveTime ? 0 : 1);

  // Convert solve time from milliseconds to minutes and seconds:
  for (let s of highscores) {
    let mins = Math.floor(s.solveTime/60000);
    let secs = Math.floor(s.solveTime/1000);
    s.timestr = mins + " : " + Math.floor(secs/10) + "" + secs%10;
  }

  var pad_array = function(arr,len,fill) {
    return arr.concat(Array(len).fill(fill)).slice(0,len);
  }

  highscores = pad_array(highscores, 5, {timestr: '--', userDisplayName: '--'});

  return (<>
    <Dialog open={true} aria-labelledby="alert-dialog-title">
      <DialogTitle id="alert-dialog-title">{"You Win!"}</DialogTitle>
      <DialogContent>
        <span className="score">{score}</span>
        <table className="highscores">
          {highscores.map((s, i)=>{
            return (
            <tr className={"highscore"+(i?"":" first")} key={i}>
              <td className="place">{i+1}</td>
              <td className="name">{s.userDisplayName}</td>
              <td className="time">{s.timestr}</td>
            </tr>);
          })}
        </table>
      </DialogContent>
      <DialogActions>
        <Button href="/play" color="primary" autoFocus>
          New Game
        </Button>
        <Button href="/explore" color="primary">
          Go Back
        </Button>
      </DialogActions>
    </Dialog>
    </>);
}

export default Leaderboard;

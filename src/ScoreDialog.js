import React, {useState, useEffect} from 'react';
import Firestore from './services/firestore.js';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './ScoreDialog.css';

function ScoreDialog(props) {
  const score = props.score;
  return (<>
    <Dialog open={true} aria-labelledby="alert-dialog-title">
      <DialogTitle id="alert-dialog-title">{"You Win!"}</DialogTitle>
      <DialogContent>
        <span className="score">{score}</span>
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

export default ScoreDialog;

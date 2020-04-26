import React, { useState, useEffect } from 'react';
import './LeaderboardCell.css';

export default function LeaderboardCell(props) {

  const score = props.score;
  const rank = props.rank;
  
  return (<>
    <div className="Cell">{score.userDisplayName} solved the grid in {score.solveTime} and was ranked {rank}</div>
  </>);

}
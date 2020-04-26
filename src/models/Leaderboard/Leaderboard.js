import React, { useState, useEffect } from 'react';
import Type from '../dataTypes.js'
import LeaderboardCell from './LeaderboardCell'
import './Leaderboard.css';

export default function Leaderboard(props) {

  // MARK: - Constants
  const Consts = class {
    static invalidParameterMessage = "Invalid parameter. The parameter type must be an array of score objects."
  }
  
  // MARK: - Errors
  const Error = class {
    static invalidParameter() {
      return (<>{Consts.invalidParameterMessage}</>); 
    }
  }

  // MARK: - Check if the parameters are valid
  if (props.hiscores === undefined) { return Error.invalidParameter() }
  if (typeof(props.hiscores) !== Type.object) { return Error.invalidParameter() }
  if (props.hiscores.length === undefined) { return Error.invalidParameter() }
  if (props.hiscores.length > 0 && props.hiscores[0].solveTime === undefined) { return Error.invalidParameter() }
  
  // MARK: - Return value
  return (<>
    <div className="Leaderboard-Title-Bar">
      <div className="Leaderboard-Title-Text">
        <h1>LEADERBOARDS</h1>
      </div>
    </div>
    <div className="Leaderboard-Columns-Bar">
      {props.hiscores.length > 0 ? (
        props.hiscores.map((score, index) => {
          return (<LeaderboardCell score={score} rank={index+1}/>)
        })
      ) : (
        <div>No one has solved this grid yet!</div>
      )}
    </div>
  </>);

}
import React from 'react';
import logo from './logo.svg';
import './App.css';
//import build from './gameCard.js';
import GameCard from './gameCard2.js';



function ExplorePage() {


  return (
    <div className="App">
      <header className="App-header">
      <GameCard/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gridlock
        </a>
      </header>
    </div>
  );
}

export default ExplorePage;

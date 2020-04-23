import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './ExploreMode.css';
//import GameCard from './gameCard2.js';
import GameCards from './gameCards.js';


function ExplorePage() {
  //var games =  CurrentExploreGames(); //must come from database
  var games;
  const [exploreGames, setExploreGames] = useState([]);

  // useEffect will trigger when the array items in the second argument are
  // updated so whenever game is updated
  useEffect(() => {
    setExploreGames(games);
  }, [games]);

  return (
    <div className="Explore">
      <header className="App-header">
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Explore
      </a>

      <GameCards gameCards={exploreGames} />

        </header>

  </div>

  );
}

export default ExplorePage;

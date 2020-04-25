import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './ExploreMode.css';
import GameCards from './gameCards.js';
import ExploreHeader from './ExploreHeader.js';

function ExplorePage() {
  //var games =  CurrentExploreGames(); //must come from database
  var games;
  const [exploreGames, setExploreGames] = useState([]);

  // useEffect will trigger when the array items in the second argument are
  // updated so whenever game is updated
  // useEffect(() => {
  //   setExploreGames(games);
  // }, [games]);

  return (
    <div>
      <div className="Explore">
        <header className="Explore-header">
          <GameCards/>
       </header>
      </div>
    </div>

  );
}

export default ExplorePage;

import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './ExploreMode.css';
import GameCards from './gameCards.js';


function ExplorePage(props) {
  return (
    <div>
      <div className="Explore">
        <header className="Explore-header">
          <GameCards user={props.user}/>
       </header>
      </div>
    </div>

  );
}

export default ExplorePage;

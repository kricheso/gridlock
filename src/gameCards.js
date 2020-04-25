import React, { useState, useEffect } from 'react';
import SingleCard from './card.js';
import Firestore from './services/firestore.js';
import firebaseConfig from './services/firestore.js'; // Must be present to initialize database.




function GameCards() {

  const [id, setid] = useState();
  const [grid_list, setgridlist] = useState(null);
  const [requestorid, setrequestorid] = useState("kousei.richeson@gmail.com");
  useEffect(load_grids, []);

  const [user_grid_list, setUser_grid_list] = useState(null);

  async function load_grids() {
   const grids = await Firestore.get.trendingGridsForUnregisteredUser();
    // If grid is null, set it to an empty grid instead.
    setgridlist(grids);
  }
  async function load_user_grids() {
   const grids = await Firestore.get.trendingGridsForUser();
    // If grid is null, set it to an empty grid instead.
    setgridlist(grids);
  }

  console.log(grid_list)

     return (
       <div>
       {grid_list ? grid_list[0].creatorDisplayName : " "}
        <div>
       {grid_list ? (grid_list).map(function(grid, key) {
          return < SingleCard
          name = {grid.title}
          author = {grid.creatorDisplayName}
          gameLink = {grid.creatorDisplayName}
          numberOfLikes = {grid.numberOfLikes}
          />
        }) : " "}
      </div>
      </div>

    );


}

export default GameCards;

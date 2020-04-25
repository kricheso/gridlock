import React from 'react';
import Firestore from './services/firestore.js';
import firebaseConfig from './services/firestore.js'; // Must be present to initialize database.



function loadGrids() {

  async function getTrendingGrids() {
    console.log("gridskdkdjjs");

    const grids = await Firestore.get.trendingGridsForUnregisteredUser();
    if (grids === null) { console.log("trending grids failed"); return; }
    console.log("got trending grids");
    console.log(grids);
  }

  return (
    <div>
    </div>
  );

}

export default loadGrids;

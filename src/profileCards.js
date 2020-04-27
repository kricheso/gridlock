import React, { useState, useEffect } from 'react';
import SingleCard from './card.js';
import NewCard from './NewCard.js';
import './gameCards.css';
import Firestore from './services/firestore.js';
import Authentication from './services/authentication.js';


function ProfileCards(props) {
  const {profileId, ...other} = props;
  const [grid_list, setgridlist] = useState(null);
  const [userGridList, setUserGridList] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if(currentUser != null){
      loadCurrentUsersGrids();
    }
  }, [currentUser]);

  async function getCurrentUser() {
    const randomGrid = await Firestore.get.trendingGridsForUnregisteredUser();
    const user = await Authentication.currentUser();
    if (user === null) { console.log("error or the user is not logged in"); return; }
    setCurrentUser(user);
  }

  async function loadCurrentUsersGrids() {
    if(profileId == null && currentUser != null){
      console.log("cardaaaaa", currentUser.id)
      const grids = await Firestore.get.gridsCreatedByUser(currentUser.id, currentUser.id);
      if (grids === null) { console.log("get user grids failed"); return; }
      setUserGridList(grids)
    }
    else if(profileId != null){
      console.log("cardssss", profileId)
      const grids = await Firestore.get.gridsCreatedByUser(profileId, profileId);
      setUserGridList(grids)
    }
  }



     return (
        <div className="Profile-body">
       {userGridList ? (userGridList).map(function(grid, key) {
          return < SingleCard
          name = {grid.title}
          author = {grid.creatorDisplayName}
          gameLink = {grid.creatorDisplayName}
          numberOfLikes = {grid.numberOfLikes}
          gridID = {grid.id}
          currentUser = {currentUser}
          />
        }) : " "}
      </div>

    );


}

export default ProfileCards;


/*      {grid_list.map((grid, i) => {
        return (
          <SingleCard
            name={grid.title}
            author={username}
            gameLink={profilepicture}
            numberOfLikes={grid.numberOfLikes}
          />
        );
      })}*/

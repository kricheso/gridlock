import React, { useState, useEffect } from 'react';
import SingleCard from './card.js';
import './gameCards.css';
import Firestore from './services/firestore.js';

function ProfileCards(props) {
  const {profileId, ...other} = props;
  const [grid_list, setgridlist] = useState(null);
  const [userGridList, setUserGridList] = useState(null);
  const [currentUser, setCurrentUser] = useState(props.user);

  useEffect(() => { setCurrentUser(props.user) }, props.user);
  useEffect(() => { loadCurrentUsersGrids(); }, [currentUser]);

  async function loadCurrentUsersGrids() {
    console.log(profileId);
    let currProfileId = profileId || (currentUser ? currentUser.id : null);
    let userFetchingProfile = currentUser ? currentUser.id : profileId;
    if (!currProfileId) { console.log("Profile id not found."); }
    const grids = await Firestore.get.gridsCreatedByUser(currProfileId, userFetchingProfile);
    if (!grids) { console.log("Couldn't fetch grids created by user."); }
    else { setUserGridList(grids); }
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
          currentUser = {currentUser || {id:null}}
          />
        }) : " "}
      </div>
    );
}

export default ProfileCards;

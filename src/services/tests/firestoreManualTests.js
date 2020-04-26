//
// firestoreManualTests.js
// created by Kousei on 4/24/2020
//

import React, { useState } from 'react';
import Firestore from '../firestore';
import Authentication from '../authentication';

function FirestoreManualTests() {

  const [userId, setUserId] = useState(null);

  async function login() {
    const user = await Authentication.logIn();
    if (user === null) { console.log("login failed"); return; }
    console.log(user);
    console.log("logged in.");
    setUserId(user.id);
  }

  async function logout() {
    const success = await Authentication.logout();
    if (!success) { console.log("logout failed"); return; }
    console.log("logged out.");
    setUserId(null);
  }

  async function addGrid() {
    const matrix = [
      ["S", "1", "0"],
      ["0", "1", "F"]
    ];
    const grid = await Firestore.add.grid(userId, "title3", matrix);
    if (grid === null) { console.log("add grid failed"); return; }
    console.log("added grid");
    console.log(grid);
  }

  async function removeGrid() {
    const id = Firestore.HASH.convertToGridId(userId, "title3");
    const success = await Firestore.remove.grid(id);
    if (success === false) { console.log("remove grid failed"); return; }
    console.log("removed grid");
    console.log(success);
  }

  async function addLike() {
    const like = await Firestore.add.like(userId, "title1_by_kousei.richeson@gmail.com");
    if (like == null) { console.log("add like failed"); return; }
    console.log("added like");
    console.log(like);
  }

  async function removeLike() {
    const success = await Firestore.remove.like(userId, "title1_by_kousei.richeson@gmail.com");
    if (success === false) { console.log("remove like failed"); return; }
    console.log("removed like");
    console.log(success);
  }

  async function addScore() {
    const score = await Firestore.add.score(userId, "title1_by_kousei.richeson@gmail.com", 50503);
    if (score == null) { console.log("add score failed"); return; }
    console.log("added score");
    console.log(score);
  }

  async function addIncompleteScore() {
    const score = await Firestore.add.incompleteScore(userId, "title1_by_kousei.richeson@gmail.com");
    if (score == null) { console.log("add incomplete score failed"); return; }
    console.log("added incomplete score");
    console.log(score);
  }

  async function getTrendingGridsForUser() {
    const grids = await Firestore.get.trendingGridsForUser(userId);
    if (grids === null) { console.log("trending grids for user failed"); return; }
    console.log("got trending grids for user");
    console.log(grids);
  }

  async function getTrendingGrids() {
    const grids = await Firestore.get.trendingGridsForUnregisteredUser();
    if (grids === null) { console.log("trending grids failed"); return; }
    console.log("got trending grids");
    console.log(grids);
  }

  async function visitProfile() {
    const user = await Firestore.get.user("kousei.richeson@gmail.com");
    if (user === null) { console.log("get user profile failed"); return; }
    console.log("Get user profile success");
    console.log(user);
    const grids = await Firestore.get.gridsCreatedByUser("kousei.richeson@gmail.com", "kousei.richeson@gmail.com");
    if (grids === null) { console.log("get user grids failed"); return; }
    console.log("Get user grids success");
    console.log(grids);
  }

  async function getTopFiveScores() {
    const scores = await Firestore.get.topFiveScoresForGrid("title1_by_kousei.richeson@gmail.com");
    if (scores === null) { console.log("get top 5 scores failed"); return; }
    console.log("got top 5 scores");
    console.log(scores);
  }

  async function addFollow() {
    const follow = await Firestore.add.follow(userId, "kousei.richeson@gmail.com");
    if (follow === null) { console.log("add follow failed"); return; }
    console.log("add follow success");
    console.log(follow);
  }

  async function removeFollow() {
    const success = await Firestore.remove.follow(userId, "kousei.richeson@gmail.com");
    if (success === false) { console.log("remove follow failed"); return; }
    console.log("remove follow success");
    console.log(success);
  }

  async function getFollowers() {
    const follows = await Firestore.get.followers(userId);
    if (follows === null) { console.log("error"); return; }
    console.log("get followers success");
    console.log(follows);
  }

  async function getFollowing() {
    const follows = await Firestore.get.following(userId);
    if (follows === null) { console.log("error"); return; }
    console.log("get following success");
    console.log(follows);
  }

  async function getGridsForAllFollowing() {
    const grids = await Firestore.get.gridsFollowedForUser(userId);
    if (grids === null) { console.log("error"); return; }
    console.log("get all all grids success");
    console.log(grids);
  }

  async function gridForUnregisteredUser() {
    const grid = await Firestore.get.gridForUnregisteredUser("title1_by_kousei.richeson@gmail.com");
    if (grid === null) { console.log("error"); return; }
    console.log("get grid success");
    console.log(grid);
  }

  async function gridForRegisteredUser() {
    const grid = await Firestore.get.gridForUser(userId, "title1_by_kousei.richeson@gmail.com");
    if (grid === null) { console.log("error"); return; }
    console.log("get grid success");
    console.log(grid);
  }

  async function getAllLikers() {
    const likers = await Firestore.get.usersWhoLikedGrid("title1_by_kousei.richeson@gmail.com");
    if (likers === null) { console.log("error"); return; }
    console.log("get all grid likers success");
    console.log(likers);
  }

  async function getCurrentUser() {
    const user = await Authentication.currentUser();
    if (user === null) { console.log("error or the user is not logged in"); return; }
    console.log("get current user success");
    console.log(user);
  }

  return (
    <div className="FirestoreManualTests">
      <header className="FirestoreManualTests-header">
        <h2>Firestore Testing and Manipulation File</h2>
        <p>Please visit gridlock firebase console if you want to view live database changes. Open web console to see print statments. Feel free to change the parameters in this file.</p>
        { userId ? (<>  
          <p>Hello { userId }!</p>      
          <button onClick={ logout }> 
            Logout
          </button>
          <button onClick={ addGrid }> 
            addGrid
          </button>
          <button onClick={ removeGrid }> 
            removeGrid
          </button>
           <button onClick={ addLike }> 
            addLike
           </button>
           <button onClick={ addScore }> 
            addScore
           </button>
           <button onClick={ addIncompleteScore }> 
            addIncompleteScore
           </button>
           <button onClick={ getTopFiveScores }> 
            getTopFiveScores
           </button>
           <button onClick={ removeLike }> 
            removeLike
           </button>
           <button onClick={ getTrendingGridsForUser }> 
            Get trending grids for user
           </button>
           <button onClick={ addFollow }> 
            Add follow
           </button>
           <button onClick={ removeFollow }> 
            Remove follow
           </button>
           <button onClick={ getFollowers }> 
           getFollowers
           </button>
           <button onClick={ getFollowing }> 
           getFollowing
           </button>
           <button onClick={ getGridsForAllFollowing }> 
           get all grids from Following
           </button>
           <button onClick={ gridForRegisteredUser }> 
           get for gridForRegisteredUser
          </button>
          <button onClick={ getAllLikers }> 
           get all likers for grid
          </button>
        </>) : (<>
          <button onClick={ login }> 
            Log In
          </button>
          <button onClick={ getTrendingGrids }> 
            Get trending grids for non-registered users
          </button>
          <button onClick={ gridForUnregisteredUser }> 
           get for gridForUnregisteredUser
          </button>
        </>)
        }
        <button onClick={ visitProfile }> 
          visitProfile
        </button>
        <button onClick={ getCurrentUser }> 
            Gets current user in Authentication
          </button>
      </header>
    </div>
  );
}

export default FirestoreManualTests;

import React, { useState, useEffect } from "react";
import Firestore from "./services/firestore";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import "./Profile.css";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import plusSign from "./plusSign.png"
import ProfileCards from './profileCards.js';
import GameCards from './gameCards.js';
import Authentication from './services/authentication.js';
import SingleCard from "./card.js";
import logo from "./logo.svg";

const useStyles = makeStyles({
  root: {
    maxWidth: 245,
  },
  media: {
    height: 140,
  },
});

export default function Profile(props) {
  const classes = useStyles();
  const profileId = props ? props.profileId : '';
  const currentUId = props ? props.currentId : '';

  const [username, setUsername] = useState("");
  const [profilepicture, setProfilpic] = useState("");
  const [profileUser, setProfileUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const click = () => {
    alert("click")
  }


  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
      getProfileUser();
  }, [currentUser]);


  function displayNewUserDetails(){
  }


  async function getCurrentUser() {
    const randomGrid = await Firestore.get.trendingGridsForUnregisteredUser();
    const user = await Authentication.currentUser();
    if (user === null) { console.log("error or the user is not logged in"); return; }
    setCurrentUser(user);
  }

  async function getProfileUser() {
    if(profileId == null && currentUser != null){
      setProfileUser(currentUser);
    }
  
    else if(profileId != null){
      const user = await Firestore.get.user(profileId);
      if (user === null) { console.log("error or the user is not logged in"); return; }
      setProfileUser(user);
    }
  }

  return (
    <div className="board">
      <div className="profileCard">
        <img className="profileImage" src={profileUser? profileUser.photoUrl: ""} alt="Girl in a jacket"/>
        <div className="profileText">
          <h2> {profileUser? profileUser.displayName: " "} </h2>
          <p><span className="star"></span>
          {profileUser? profileUser.numberOfFollowing: " "}
          {profileUser? profileUser.numberOfFollowing: " "}
          {profileUser? profileUser.numberOfFollowers: " "}
          {profileUser? profileUser.numberOfTotalLikes: " "}
          </p>
          <button onClick={()=>click()}>Add Course</button>
        </div>
      </div>
      <ProfileCards profileId={profileId? profileId : profileUser ? profileUser.id : null}/>
    </div>
  );
}

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
import NewCard from './NewCard.js';
import defaultProfileImage from './defaultProfileImage.svg';

const useStyles = makeStyles({
  root: {
    maxWidth: 245,
  },
  media: {
    height: 140,
  },
  follow: {
    color: 'white',
  }
});

export default function Profile(props) {
  const classes = useStyles();
  const profileId = props ? props.profileId : '';

  const [username, setUsername] = useState("");
  const [profilepicture, setProfilpic] = useState("");
  const [profileUser, setProfileUser] = useState(null);
  const [following, setFollowing] = useState(false);
  const [currentUser, setCurrentUser] = useState(props.user);
  const defaultUserName = "Guest";
  useEffect(()=>{setCurrentUser(props.user)}, props.user);
  useEffect(() => { getProfileUser(); }, [currentUser]);
  useEffect(() => { checkFollowing(currentUser); }, [currentUser]);

  async function getProfileUser() {
    if(profileId == null && currentUser != null){
      setProfileUser(currentUser);
    } else if(profileId != null){
      const user = await Firestore.get.user(profileId);
      if (user === null) { console.log("error or the user is not logged in"); return; }
      setProfileUser(user);
    }
  }

  async function checkFollowing(user) {
    if (!profileId || !user) { return; }
    const followers = await Firestore.get.followers(profileId);
    if (!followers) {
      console.log("Couldn't load followers for");
      console.log(profileUser);
    }
    if (followers.map(follower=>follower.id).includes(user.id)) {
      setFollowing(true);
    }
  }

  async function follow() {
    if (!currentUser || !profileUser) { return; }
    const success = await Firestore.add.follow(currentUser.id, profileUser.id);
    if (!success) {
      console.log("Couldn't follow");
      console.log(profileUser);
      setFollowing(true);  // Probably couldn't follow because they're already following.
    } else {
      setFollowing(true);
    }
  }

  async function unfollow() {
    if (!currentUser || !profileUser) { return; }
    const success = await Firestore.remove.follow(currentUser.id, profileUser.id);
    if (!success) {
      console.log("Couldn't unfollow");
      console.log(profileUser);
      setFollowing(false);  // Probably couldn't unfollow because they're already not following.
    } else {
      setFollowing(false);
    }
  }

  return (
    <div className="profile">
      <div className="profileCard">
        <img className="profileImage" src={ profileUser && profileUser.photoUrl ? profileUser.photoUrl : defaultProfileImage } alt="Profile Pic"/>
        <div className="profileText">
          <h2> {profileUser? profileUser.displayName: defaultUserName} </h2>
          <p>
          <span>
          <span className="star"></span>   <b>{profileUser ?  profileUser.numberOfTotalLikes: 0 } </b> Likes </span>
          <span> <b> {profileUser? profileUser.numberOfFollowers + (following ? 1 : 0): 0 }</b> Followers </span>
          <span>  <b> {profileUser? profileUser.numberOfFollowing: 0 } </b>  Following</span>
          </p>
    {
      currentUser != profileUser ?
      (following ? <Button className={classes.follow} onClick={unfollow}>Unfollow</Button>
                 : <Button className={classes.follow} onClick={follow}>Follow</Button>)
      : ""
    }
        </div>
      </div>
      <ProfileCards user={currentUser} profileId={profileId? profileId : (profileUser ? profileUser.id : null)}/>
    </div>
  );
}

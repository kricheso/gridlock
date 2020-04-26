import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Firestore from './services/firestore.js';
import firebaseConfig from './services/firestore.js'; // Must be present to initialize database.
import Authentication from './services/authentication.js';

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
  },
  media: {
    height: 40,
  },
});


function SingleCard({ name, author, gameLink, numberOfLikes, currentUser, gridID }) {
  const classes = useStyles();
  const [likeText, setlikeText] = useState("Like");


  async function likeGrid(currentUserId, gridID) {
    const like = await Firestore.add.like(currentUser.id, gridID);
    if (like == null) {
      console.log("add like failed");
       return false;
    }
    else{
      console.log("like added");
      console.log(like);
      return true;
    }

  }
  async function unlikeGrid(gridID) {
    const success = await Firestore.remove.like(currentUser.id, gridID);
    if (success === false) {
      console.log("remove like failed");
      return false;
    }
    console.log("removed like");
    console.log(success);
    return true
  }


  const doLike = (likedtxt, gridID) => {
    if(likedtxt ==  "Like"){ //&&user hasn't liked from db
      likeGrid(currentUser.id, gridID)
      setlikeText("Unlike")
    }
    else if (likedtxt == "Unlike"){
      setlikeText("Like")
      unlikeGrid(gridID)
    }
  }

  return (
    <Card className={classes.root}>
        <CardMedia
          className={classes.media}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <CardActionArea>
            By <Button href="/profile">{author}</Button>
            </CardActionArea>
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary" href="/play">
          Play
        </Button>
        <Button size="small" color="primary">
          {numberOfLikes} Likes
        </Button>
        <Button size="small" color="primary" onClick={() => doLike(likeText, gridID)}>
          {likeText}
        </Button>
      </CardActions>
    </Card>
  );
}
export default SingleCard;

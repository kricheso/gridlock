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

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
  },
  media: {
    height: 40,
  },
});


function SingleCard({ name, author, gameLink, numberOfLikes, creatorId, gridId }) {
  const classes = useStyles();
  const [likeText, setlikeText] = useState("Like");


  async function likeGrid(userId, gridId) {
    const like = await Firestore.add.like(userId, gridId);
    if (like == null) {
      console.log("add like failed");
       return;
    }
    else{
      console.log("like added");
      console.log(like);
    }

  }
  async function unlikeGrid(userId, gridId) {
    const success = await Firestore.remove.like(userId, gridId);
    if (success === false) {
      console.log("remove like failed");
      return false;
    }
    console.log("removed like");
    console.log(success);
  }


  const doLike = (likedtxt, creatorId, gridId) => {
    if(likedtxt ==  "Like"){ //&&user hasn't liked from db
      likeGrid(creatorId, gridId)
      setlikeText("Unlike")
    }
    else{
      setlikeText("Like")
      unlikeGrid(creatorId, gridId )
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
        <Button size="small" color="primary" onClick={() => doLike(likeText, creatorId, gridId)}>
          {likeText}
        </Button>
      </CardActions>
    </Card>
  );
}
export default SingleCard;

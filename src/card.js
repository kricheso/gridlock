import React, {useEffect, useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Firestore from './services/firestore.js';
import Authentication from './services/authentication.js';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


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
  const [likers, setLikers] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);


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


  async function getAllLikers(gridID) {
    const likers = await Firestore.get.usersWhoLikedGrid(gridID);
    if (likers === null) { console.log("error"); return; }
    console.log("get all grid likers success");
    console.log(likers);
    setLikers(likers);
  }


  useEffect(() => {
    getAllLikers(gridID);
  }, []);

  useEffect(() => {
    determineLikedText();
  }, [likers]);


  function determineLikedText(){
    console.log("sddcfdf")
    if(hasLiked == false){
      setlikeText("Like")

    }
    if(likers != null){
      for (let likedUser in likers ){
        if(currentUser.id = likers[likedUser].id){
            setlikeText("Liked")
            setHasLiked(true);
             break;
          }
      }
    }
  }

  const doLike = (likedtxt, gridID) => {
    if(likedtxt ==  "Like"){ //&&user hasn't liked from db
      likeGrid(currentUser.id, gridID)
      setHasLiked(true);
      setlikeText("Liked")
    }
    else if (likedtxt == "Liked"){
      setlikeText("Like")
      unlikeGrid(gridID)
      setHasLiked(false);
      for (let likedUser in likers ){
        if(currentUser.id = likers[likedUser].id){
            likers.splice(likedUser, 1)
             break;
          }
      }
    }
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    if (likers.length != 0 ){
      setAnchorEl(event.currentTarget);
    }

  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <Button size="small" color="primary"  href={'/play/' + gridID}  >
          Play
        </Button>
        <Button size="small" color="primary" aria-controls="simple-menu"  aria-haspopup="true" onClick={handleClick} >
          {numberOfLikes} Likes
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          >
          {likers ? (likers).map(function(liker, key) {
             return < MenuItem > {liker.displayName} </MenuItem>}) : ""}
        </Menu>
        <Button size="small" color="primary" onClick={() => doLike(likeText, gridID)}>
          {likeText}
        </Button>
      </CardActions>
    </Card>
  );
}

export default SingleCard;

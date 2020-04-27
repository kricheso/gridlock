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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Star from './star.js';

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,

  },
  media: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  Playbutton: {
    width: 170,
    height: 30,
    backgroundColor: 'pink',
    alignItems: 'center',
    margin: '0px',
  },
  Likersbutton: {
    width: 170,
    height: 30,
    backgroundColor: 'pink',
    alignItems: 'center',
    margin: '0px',
  },
  Likebutton: {
    width: 170,
    height: 30,
    backgroundColor: 'pink',
    alignItems: 'right',
    margin: '0px',
  },
});


function SingleCard({ name, author, gameLink, numberOfLikes, currentUser, gridID, creatorID }) {
  const classes = useStyles();
  const [likeText, setlikeText] = useState("Like");
  const [likers, setLikers] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [starState, setStarState] = useState(null);


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
    if(hasLiked == false){
      setlikeText("Like")
      setStarState(false)
    }
    if(likers != null){
      for (let likedUser in likers ){
        if(currentUser.id = likers[likedUser].id){
            setlikeText("Liked")
            setHasLiked(true);
            setStarState(true)
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
          className={classes.media}>
          <Button  className={classes.Likersbutton} size="small" color="primary" aria-controls="simple-menu"  aria-haspopup="true" onClick={handleClick} >
            {numberOfLikes} Likes {starState?
          <Star likeText = {likeText == "Liked" ? likeText : ""}/> :
          <Star likeText = {likeText == "Liked" ? likeText :  ""}/>
          //need to get this to be true when Liked text eventually loads and because true
        }
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
          </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <CardActionArea>
            By <Button href={'/profile/' + creatorID} >{author}</Button>
            </CardActionArea>
          </Typography>
        </CardContent>
      <CardActions>
        <Button className={classes.Playbutton} size="small" color="primary"  href={'/play/' + gridID}  >
          Play
        </Button>
        <Button className={classes.Likebutton} size="small" color="primary" onClick={() => doLike(likeText, gridID)}>
          {likeText}
        </Button>
      </CardActions>
    </Card>
  );
}

export default SingleCard;

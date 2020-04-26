import React, {useState} from 'react';
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
  const [dropdownOpen, setDropdownOpen] = useState(false);


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
  // useEffect(() => {
  //   determineLikedText()
  // }, [grid]);

  async function getAllLikers(gridID) {
    const likers = await Firestore.get.usersWhoLikedGrid(gridID);
    if (likers === null) { console.log("error"); return; }
    console.log("get all grid likers success");
    console.log(likers);
    setLikers(likers);
    return likers;
  }

  window.onload = function() {
    determineLikedText();
  };

  function showLikers(){
    const response = getAllLikers(gridID);
    //var likerName = likers[0].displayName
  }


  function determineLikedText(gridID){
    const response = getAllLikers(gridID);

    //console.log(response2)
    console.log("responsessdggdgsgsshsh2")
    console.log(response)


  }
  window.onload = determineLikedText;

  const doLike = (likedtxt, gridID) => {
    determineLikedText(gridID);
    if(likedtxt ==  "Like"){ //&&user hasn't liked from db
      likeGrid(currentUser.id, gridID)
      setlikeText("Liked")
    }
    else if (likedtxt == "Liked"){
      setlikeText("Like")
      unlikeGrid(gridID)
    }
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // {likers ? (likers).map(function(liker, key) {
  //    return < SingleCard
  //       <MenuItem > {liker}</MenuItem>
  //
  //    />
  //  }) : " "}
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
        <Button size="small" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
          {numberOfLikes} Likes
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          >
          <MenuItem > user 1</MenuItem>
          <MenuItem > user 1</MenuItem>
        </Menu>
        <Button size="small" color="primary" onClick={() => doLike(likeText, gridID)}>
          {likeText}
        </Button>
      </CardActions>
    </Card>
  );
}

export default SingleCard;

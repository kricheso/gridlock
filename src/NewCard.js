import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import  "./NewCard.css";
import  plusSign from "./plusSign.png";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
  },
  media: {
    height: 40,
  },
});

function NewCard({ name, author, gameLink, numberOfLikes }) {
  const classes = useStyles();
  const newGame = () => {
    alert("new game")
  }
  return (
    <Card className={`${classes.root} newCard `} onClick={() => newGame()}>
      <img className="plusSign" src={plusSign} />
    </Card>
  );
}
export default NewCard;

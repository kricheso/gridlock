import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import  "./NewCard.css";
import  plusSign from "./plusSign.png";


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

  return (
    <Card className={`${classes.root} newCard `} onClick={event => window.location.href='/play'}>
      <img className="plusSign" src={plusSign} />
    </Card>
  );
}

export default NewCard;

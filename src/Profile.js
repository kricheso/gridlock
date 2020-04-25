import React, { useState } from "react";
import Firestore from "./services/firestore";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 245,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} />

          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Gridlock
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Kousei course 2
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Play
          </Button>
          <Button size="small" color="primary">
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

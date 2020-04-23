import React, { useState, useEffect } from "react";
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

export default function CreatedGrid() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [grid_list, setgridlist] = useState([]);

  useEffect(load_grid, []);

  async function load_grid() {
    const firestore_grid = await Firestore.get.gridsCreatedByUser(
      "kricheso@google.com",
      "kricheso@google.com"
    );

    setgridlist(firestore_grid);
  }

  return (
    <div className="board">
      {grid_list.map((grid, i) => {
        return (
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia className={classes.media} />

              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Gridlock
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {grid.id}
                  {grid.title}
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
        );
      })}
    </div>
  );
}

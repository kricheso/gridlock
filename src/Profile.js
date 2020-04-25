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

import SingleCard from "./card.js";
import logo from "./logo.svg";

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
  const [profilpic, setProfilpic] = useState("");

  const [id, setid] = useState("kousei.richeson@gmail.com");
  const [requestorid, setrequestorid] = useState("kousei.richeson@gmail.com");

  const [grid_list, setgridlist] = useState([]);

  useEffect(get_user, []);
  useEffect(load_grids, []);

  async function load_grids() {
    const grids = await Firestore.get.gridsCreatedByUser(id, requestorid);
    // If grid is null, set it to an empty grid instead.
    setgridlist(grids || []);
  }

  async function get_user() {
    const user = await Firestore.get.user(id);
    // If grid is null, set it to an empty grid instead.
    setUsername(user.displayName || []);
    setProfilpic(user.photoUrl || []);

    console.log(user.photoUrl);
  }

  return (
    <div className="board">
      <img src={profilpic} alt="Girl in a jacket" width="150" height="150" />
      {grid_list.map((grid, i) => {
        return (
          <SingleCard
            name={grid.title}
            author={username}
            gameLink={profilpic}
            numberOfLikes={grid.numberOfLikes}
          />
        );
      })}
    </div>
  );
}

// return (
//   <div className="board">
//     {grid_list.map((grid, i) => {
//       return (
//         <Card className={classes.root}>
//           <CardActionArea>
//             <CardMedia className={classes.media} />

//             <CardContent>
//               <Typography gutterBottom variant="h5" component="h2">
//                 {grid.title}
//               </Typography>
//               <Typography variant="body2" color="textSecondary" component="p">
//                 {username}
//               </Typography>
//             </CardContent>
//           </CardActionArea>
//           <CardActions>
//             <Button size="small" color="primary">
//               Play
//             </Button>
//             <Button size="small" color="primary">
//               Delete
//             </Button>
//           </CardActions>
//         </Card>
//       );
//     })}
//   </div>
// );
// }

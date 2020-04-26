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
// import ExploreHeader from "./ExploreHeader.js";

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

  const [id, setid] = useState("kricheso@google.com");
  const [requestorid, setrequestorid] = useState("kricheso@google.com");

  const [grid_list, setgridlist] = useState([]);

  useEffect(load_grids, []);
  useEffect(get_user, []);

  async function load_grids() {
    const grids = await Firestore.get.gridsCreatedByUser(id, requestorid);
    // If grid is null, set it to an empty grid instead.
    setgridlist(grids || []);
  }

  async function get_user() {
    const user = await Firestore.get.user(id);
    // If grid is null, set it to an empty grid instead.
    console.log(user.photoUrl);
    console.log(user.displayName);
    console.log(user.displayName);
    setUsername(user.displayName || []);
    setProfilpic(user.photoUrl || []);
    console.log(user.displayName);
  }

  //   return (
  //     <div>
  //       <div className="board">
  //         <img src={profilpic} alt="Girl in a jacket" width="150" height="150" />
  //         {grid_list.map((grid, i) => {
  //           return (
  //             <SingleCard
  //               name={grid.title}
  //               author={username}
  //               gameLink={profilpic}
  //               numberOfLikes={grid.numberOfLikes}
  //             />
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <div className="board">
        <header className="App-header">
          <img
            src={profilpic}
            alt="User's profile picture"
            width="150"
            height="150"
          />
          <h>{username}</h>
          <h>
            Number of Grids:
            <h>{grid_list.length}</h>
          </h>

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
        </header>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Firestore from "./services/firestore";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import "./Profile.css";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import plusSign from "./plusSign.png"

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
  const [profilepicture, setProfilpic] = useState("");

  const [id, setid] = useState("kousei.richeson@gmail.com");
  const [requestorid, setrequestorid] = useState("kousei.richeson@gmail.com");

  const [grid_list, setgridlist] = useState([]);

  const click = () => {
    alert("click")
  }

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
      <div className="profileCard">
        <img className="profileImage" src={profilepicture} alt="Girl in a jacket"/>
        <div className="profileText">
          <h2>My Name</h2>
          <p><span className="star"></span> 100</p>
          <button onClick={()=>click()}>Add Course</button>
        </div>
      </div>

      {grid_list.map((grid, i) => {
        return (
          <SingleCard
            name={grid.title}
            author={username}
            gameLink={profilepicture}
            numberOfLikes={grid.numberOfLikes}
          />
        );
      })}
    </div>
  );
}

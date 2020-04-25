import React, { Component } from "react";
import Firestore from "./services/firestore";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class Grid extends Component {
  state = {
    start_count: 0,
    input_word: "",
    all_the_words: [],
    found_words: [],
    grid: [
      ["0", "0", "0", "0", "0"],
      ["0", "0", "0", "0", "0"],
      ["0", "0", "0", "0", "0"],
      ["0", "0", "0", "0", "0"],
      ["0", "0", "0", "0", "0"],
    ],
  };

  async print_func() {
    const grid_list = await Firestore.get.gridsCreatedByUser(
      "kricheso@google.com",
      "kricheso@google.com"
    );
    console.log(grid_list[0]);

  render() {
    return (
      <div>
        {this.print_func()}
      </div>
    );
  }
}

export default Grid;

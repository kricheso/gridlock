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
              Kousei's course 2
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
// import React, { useState } from "react";

// import logo from "./logo.svg";
// import "./App.css";
// import Firestore from "./services/firestore";
// import Button from "@material-ui/core/Button";

// function App() {
//   const [username, setUsername] = useState("");
//   const [count, setcount] = useState(0);

//   return (
//     <div className="App">
//       {/* {this.get_Username} */}
//       <h> Gridlock | m4 Swarnim</h>
//       <header className="App-header">
//         <p>Swarnim </p>
//         <h>
//           Likes : 30{" "}
//           <Button variant="contained" color="white">
//             Add a new couse
//           </Button>
//         </h>
//         <a></a>
//         <a>{count}</a>
//         <a>{username}Swarnim</a>
//         <a>Your courses</a>
//         <a>Your courses</a>
//         <a>Your courses</a>
//         <a>
//           <Button variant="contained" color="primary">
//             Play
//           </Button>{" "}
//           <Button variant="contained" color="primary">
//             Delete
//           </Button>
//         </a>
//         <a>Your courses</a>
//         <a>Your courses</a>
//       </header>
//     </div>
//   );
// }

// export default App;

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

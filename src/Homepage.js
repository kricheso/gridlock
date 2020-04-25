import React, {useState} from 'react';
import logo from './logo.svg';
import './Homepage.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import lock from './lock.png'
import unlock from './unlock.png'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Authentication from './services/authentication.js';
import ButtonAppBar from './nav.js';
import Firestore from './services/firestore.js';
//import TemporaryDrawer from './navSide.js';
import ExplorePage from './ExploreMode.js'
import Play from './Play.js'
import MediaCard from './Profile.js'

function Explore() {
  return(
    <div>
      {ExplorePage()}
    </div>
    
  );
}

function Profile() {
  return (
    <div>
      {MediaCard()}
    </div>
  );
}

function Game(){
  const dict = {userId : "kricheso@google.com", gridId : "board1_by_kricheso@google.com"}

  return(
    <div>
      {Play(dict)}
    </div>
  );
}

// Change function name to whatever route
function About(){
  return(
    <div>
    </div>
  );
}

export default function Homepage() {
  const [user, setUser] = useState(null);
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  // Helper methods for homepage
  async function loginPress(){
    const user = await Authentication.logIn();
    if (user === null) { /* error */ }

    setUser(user);

    /*
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      console.log(result.user);
      setUser(result.user);
    }).catch(function(error) {
      console.log(error);
    });
    */
  } // End of loginPress

  function handlePlay(){
    console.log("playing");
  } // End of handlePlay
  // END OF HELPTER METHODS FOR HOMEPAGE

  function Home() {
    return (
      <div className="Homepage">
        <header className="Homepage-header">

          {ButtonAppBar()}

          <b style={{ color: 'black', fontSize:100}}>GRIDLOCK</b>
          <p></p>

          {user == null ? (
            <div>
            <Button onClick={() => {loginPress()}}>
              <img src={lock} className="Homepage-logo" alt="logo" />
            </Button>
            </div>) :
            <div>
              <img src={unlock} className="Homepage-logo" alt="logo" />
            </div>
          }

          <div>
            {user == null ? (
              <div>
              <p></p>
                <Button size="small" onClick={() =>  {loginPress()}} >
                  Login
                </Button>
              </div>) :
              <div>

                {user != null &&
                  // <img src={user.photoUrl} alt={user.photoUrl.alt/>
                  <p style={{ color: 'black' }}>
                    Welcome, {user.displayName}
                  </p>
                }
              </div>
            }
          </div>

          <div>
            <Button variant="contained" size="large" href="/explore">
              Play
            </Button>
          </div>
        </header>
      </div>

    );
  }

  return (
    <Router>
      <div>


        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/explore">
            <Explore />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/about"> {/*Rename to whatever but rename the called function and any href links that go to about*/}
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  ); // End of app return
}

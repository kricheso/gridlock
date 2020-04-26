import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";
import PersistentDrawerLeft from './nav.js';
import Homepage from './Homepage.js'
import ExplorePage from './ExploreMode.js'
import Play from './Play.js'
import MediaCard from './Profile.js'
import Create from './Create.js'
import user from './nav.js'

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

  function Home(){
    return(
      <div>
        {Homepage()}
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

  function PlayById() {
    let { gameid } = useParams();
    return <Play gridId={gameid} />
  }

  export default function Routing(){
    return (
        <Router>
            {user == null ?
                (<div>
                    {PersistentDrawerLeft()}
                </div>) : (
                    <div>
                        {PersistentDrawerLeft(user)}
                    </div>)
            }

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
              <Route path="/play/:gameid">
                <PlayById />
              </Route>
              <Route path="/play">
                <Game />
              </Route>
              <Route path="/create">
                <Create />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      ); // End of app return
  }

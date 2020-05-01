import React, {useState, useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";
import PersistentDrawerLeft from './nav.js';
import Homepage from './Homepage.js'
import Explore from './ExploreMode.js'
import Play from './Play.js'
import Profile from './Profile.js'
import Create from './Create.js'
import Authentication from './services/authentication.js';

  function PlayById(props) {
    let {gameid} = useParams();
    return <Play gridId={gameid} user={props.user} />
  }

  function ProfileById(props) {
    let {profileid} = useParams();
    return <Profile profileId={profileid} user={props.user} />
  }

export default function Routing(){
    const [user, setUser] = useState(null);
    async function getCurrentUser() {
      // Wait half a second for auth dependencies to load.
      setTimeout(async () => {
        const _user = await Authentication.currentUser();
        if (!_user) { console.log("Error or the user is not logged in."); return; }
        setUser(_user);
        console.log(_user);
      }, 500);
    }
    // useEffect shouldn't be called with async functions since they return a
    // promise and useEffect expects a cleanup callback if anything.
    useEffect(()=>{getCurrentUser()}, []);

    return (
        <Router>
            {
              user == null ?
              (<PersistentDrawerLeft />) :
              (<PersistentDrawerLeft user={user} />)
            }

            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/explore">
                <Explore user={user} />
              </Route>
              <Route path="/profile/:profileid">
                <ProfileById user={user} />
              </Route>
              <Route path="/profile">
                <Profile user={user} />
              </Route>
              <Route path="/play/:gameid">
                <PlayById user={user} />
              </Route>
              <Route path="/play">
                <Play user={user} />
              </Route>
              <Route path="/create">
                <Create user={user} />
              </Route>
              <Route path="/">
                <Homepage user={user} />
              </Route>
            </Switch>
        </Router>
      ); // End of app return
  }

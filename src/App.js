import React, {useState} from 'react';
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
//import ButtonAppBar from './nav.js';
//import TemporaryDrawer from './navSide.js';


function About() {
  return <h2>Explore</h2>;
}

function Users() {
  return <h2>Profile</h2>;
}

export default function App() {
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
      <div className="App">
        <header className="App-header">
        
          
  
          <b style={{ color: 'black', fontSize:100}}>GRIDLOCK</b>
          <p></p>
  
          {user == null ? (
            <div> 
            <Button onClick={() => {loginPress()}}>  
              <img src={lock} className="App-logo" alt="logo" />  
            </Button>
            </div>) : 
            <div> 
              <img src={unlock} className="App-logo" alt="logo" />  
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
            <Button variant="contained" size="large" href="/about">
              Play
            </Button>
          </div>
        </header>
      </div>
  
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
    );
  }

  return (
    <Router>
      <div>
       

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  ); // End of app return
} // End of function app
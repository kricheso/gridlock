import React, {useState, useEffect} from 'react';
import './Homepage.css';
import './App.css';
import lock from './lock.png'
import unlock from './unlock.png'
import Button from '@material-ui/core/Button';
import Authentication from './services/authentication.js';

export default function Homepage(props) {
  const [user, setUser] = useState(props.user);

  useEffect(()=>{ setUser(props.user); }, props.user);

  async function loginPress(){
    const user = await Authentication.logIn();
    if (!user) { console.log("Couldn't login."); }
    setUser(user);
    window.location = window.location;
  }

  async function logoutPress(){
    const success = await Authentication.logout();
    if (!success) { console.log("Couldn't logout."); }
    setUser(null);
    window.location = window.location;
  }

  return (
    <div className="Homepage">
      <header className="Homepage-header">
      <b className="Homepage-title" >GRIDLOCK</b>

        <p></p>

        <div>
        {!user ? (
          <div>
          <Button onClick={() => {loginPress()}}>
            <img src={lock} className="Homepage-logo" alt="logo" />
          </Button>
          </div>) :
          <div>
          <Button onClick={() => {logoutPress()}}>
            <img src={unlock} className="Homepage-logo" alt="logo" />
          </Button>
          </div>
        }
         </div>
        <p></p>

        <div>
          <Button variant="contained" size="large" href="/explore">
            Play
          </Button>
        </div>
      </header>
    </div>
  );
}

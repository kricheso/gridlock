import React, {useState} from 'react';
import './Homepage.css';
import './App.css';
import lock from './lock.png'
import unlock from './unlock.png'
import Button from '@material-ui/core/Button';
import Authentication from './services/authentication.js';

export default function Homepage() {
  const [user, setUser] = useState(null);

  // Helper methods for homepage
  async function loginPress(){
    const user = await Authentication.logIn();
    if (user === null) { /* error */ }

    setUser(user);

  } // End of loginPress
  // END OF HELPTER METHODS FOR HOMEPAGE

  return (
    <div className="Homepage">
      <header className="Homepage-header">

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
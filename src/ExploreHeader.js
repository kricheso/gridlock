import React from 'react';
import './ExploreMode.css';

function ExploreHeader() {


  return (
    <div class="navbar navbar-inverse navbar-static-top">
      <div class="container">
      <p></p>
        <div class="collapse navbar-collapse navHeaderCollapse">
          <ul class="nav navbar-nav navbar-right text-center">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Gridlock <b class="caret"></b></a>

            <div className="Explore">
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore Mode
                </a>
            </div>

          </ul>
        </div>
      </div>
    </div>
  );
}

export default ExploreHeader;

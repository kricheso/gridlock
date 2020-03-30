# Gridlock

Gridlock is a maze game built in React where players must visit every cell of the game board exactly once. This project aims to create an online version of that game where users can create mazes and compete for fastest solver.

## Contents
* [How to run Gridlock on a localhost](#Run)
* [Firestore.js](#Firestore)

## <a name="Run" />How to Run Gridlock on a localhost

### Terminal:
To run Gridlock, open the terminal and navigate to a directory:
```
$ cd desktop
```
Clone the repo:
```
$ git clone https://github.com/kricheso/gridlock.git
```
Navigate into the repo:
```
$ cd gridlock
```
Install Firebase tools as an administrator:
```
$ sudo npm install -g firebase-tools
```
Install Firebase:
```
$ npm install firebase
```
Look in your email for the `firebase.txt` file. Rename the file from: `firebase.txt` to `firebase.js` then move the file into the following directory:
```
/gridlock/src/
```
Start the localhost server:
```
$ npm start
```

## <a name="Firestore" />Firestore.js

Firestore.js is a custom database class to make communications to Google Firestore easier and less error-prone. All methods in this class are asynchronous and static. There are two types methods: `GET` and `MODIFY`. Import the module with:
```javascript
import Firestore from './services/firestore';
```

### GET Methods:

`GET` methods retrieve data from Google Firestore.  These methods will either return a `value` on success or `null` on failure.

#### `Firestore.get.user(id)`
Return a user from a corresponding id.
* <b>id</b> `String` - A user id.
* <b>Returns</b> `Object?` - A user dictionary.

<b>Example usage:</b>
```javascript
function App() {

  const [userName, setUserName] = useState(null);

  async function myFunction() {
    const user = await Firestore.get.user("Lb1IHIzcHg96FuyGWYXN");
    if (user === null) { return; }
    setUserName(user.name);
  }
  
  return(
    <div className="App">
      <header className="App-header">
        <p>
          Hello {userName}
        </p>
        <button onClick={ myfunction() }>
          My Button
        </button>
      </header>
    </div>
  )

}
```

#### `Firestore.get.grid(id)`
Return a grid from a corresponding id.
* <b>id</b> `String` - A grid id.
* <b>Returns</b> `Object?` - A grid dictionary.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const grid = await Firestore.get.grid("0YtaizGyzfLzuDxkBBwZ");
  if (grid === null) { return; }
  setGridName(grid.name);
}
```

#### `Firestore.get.numberOfLikesForGrid(id)`
Returns the number of likes for a certain grid.
* <b>id</b> `String` - A grid id.
* <b>Returns</b> `Number?` - The number of likes the grid has.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const likes = await Firestore.get.numberOfLikesForGrid("0YtaizGyzfLzuDxkBBwZ");
  if (likes === null) { return; }
  setLikes(likes);
}
```

#### `Firestore.get.gridsCreatedByUser(id)`
Returns all grids created by a certain user.
* <b>id</b> `String` - A user id.
* <b>Returns</b> `Array<Object>?` - An array of grid dictionaries.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const grids = await Firestore.get.gridsCreatedByUser("Lb1IHIzcHg96FuyGWYXN");
  if (grids === null) { return; }
  for (const grid of grids) {
    console.log(grid);
  }
}
```

### MODIFY Methods:

```MODIFY``` methods change data in Google Firestore. These methods will either return `true` on success or ```false``` on failure.

#### `Firestore.modify.addOneLikeFromUserToGrid(userId, gridId)`
Simulates a user liking a grid.
* <b>userId</b> `String` - A user id.
* <b>gridId</b> `String` - A grid id.
* <b>Returns</b> `Boolean` - Did succeed.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const success = await Firestore.modify.addOneLikeFromUserToGrid("Lb1IHIzcHg96FuyGWYXN", "0YtaizGyzfLzuDxkBBwZ");
  if (!success) { return; }
  setLikeIndicator(true);
}
```

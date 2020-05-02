# Gridlock

Gridlock is a maze game built in React where players must visit every cell of the game board exactly once. This project aims to create an online version of that game where users can create mazes and compete for fastest solver.

## Contents
* [How to run Gridlock on a localhost](#Run)
* [How to verify a release](#Verify)
* [GitHub Help](#GitHubHelp)
* [Objects](#Objects)
* [Authentication.js](#Authentication)
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
## <a name="Verify" />How to Verify a Release
1. Start the emulator with `firebase emulators:start --only firestore`.
2. Run the tests with `npm test` (ignore the firebase tests since they're out of date).
3. Login.
4. Click on the play page, submit a score and verify that your score is in the leaderboard.
5. Click on the explore page, verify that the cards load.
6. Click on your profile page, verify that your profile information and games load.
7. Click on one of the cards, and verify that you can visit a profile of a liker.
8. Like a game on the explore or
9. Create a game.
10. Repeat all of the above steps after logging out.
11. Verify that the lock on the homepage is locked when logged out, and unlocked when logged in.

## <a name="GitHubHelp" />GitHub Help

### Commands to Add a New Feature:

```
$ git clone https://github.com/kricheso/gridlock.git
$ cd gridlock
$ git checkout -b name_of_feature  # Creates branch.
$ git add edited_file1 edited_file2 edited_file3  # Or do "git add ." to add everything at once.
$ git commit -m "Implement <name of feature>"  # Add a readable commit message here.
$ git push
```
Now go to the github website to send a pull request to merge your branch.
```
$ git checkout master
$ git pull  # Pull updates from github before implementing next feature.
```

### Other Useful Commands:

* `git status` - Show what files were changed or added to commit.
* `git log` - Show the commits on the active branch.
* `git diff` - Display local file changes.
* `git diff --staged` - Display changes that were marked ready to commit with `git add`.
* `git branch` - Show active branch.
* `git checkout branch_name` - Switch to an existing branch.
* `git reset --soft HEAD^` - Undo the last commit without losing changes.

### Common Issues:

If you get a merge conflict involving package-lock.json or package.json, just copy the versions of those files from  github, then reinstall any packages that you've added.  This is faster since these files are pretty verbose.  So for example:
```
# Overwrite files with what's on Github:
$ git checkout master -- package.json
$ git checkout master -- package-lock.json

# Replace this library with whatever you've installed to make your changes work.
$ npm install @material-ui/core
```

## <a name="Objects" />Objects
Gridlock has three main objects: [Grid](#Grid), [Score](#Score), and [User](#User) objects.

### <a name="Grid" />Grid
* `created` - A date that corresponds to the time and date the grid was created.
* `creatorDisplayName` - A string that is the creator's display name.
* `creatorId` - A string that is the creator's userId.
* `data` - A character matrix that represents the shape of the grid. S means start. F means finish. Numbers mean steps left.
* `id` - A string that is the id of this grid.
* `liked` - A boolean that represents if the current user liked the grid or not.
* `numberOfAttempts` - A number that is the equal to the sum of numberOfIncompletes and numberOfCompletes.
* `numberOfCompletes` - A number that represents the number of attempts that were successful.
* `numberOfIncompletes` - A number that represents the number of attempts that were unsuccessful.
* `numberOfLikes` - A number that is the number of likes this grid has.
* `solution` - An integer matrix that represents multiple coordinates of the solution. Each element in the array is an array of length 2 that represents a coordinate.
* `title` - A string that is the title of this grid.

### <a name="Score" />Score
* `created` - A date that corresponds to the time and date the score was created.
* `gridId` - A string that represents the grid id the score was scored on.
* `id` - A string that is the id of this score.
* `isComplete` - A boolean that determines if solveTime equals Infinity
* `solveTime` - A number that represents the time it took to solve in milliseconds.
* `userDisplayName` - A string that represents the display name of the user who scored this score.
* `userId` - A string that represents the userId of the user who scored this score.

### <a name="User" />User
* `created` - A date that corresponds to the time and date the user was created.
* `displayName` - A string that corresponds to the user's name.
* `email` - A string that is the user's email.
* `id` - A string that is the id of this user. Id is equal to email.
* `numberOfFollowers` - A number that represents how many people follow this user.
* `numberOfFollowing` - A number that represents how many people this user follows.
* `numberOfTotalLikes` - A number that equals the sum of likes on all the user's grids.
* `photoUrl` - A string that is the url link for the profile image.

## <a name="Authentication" />Authentication.js
Authentication.js is a custom authentication class that allows you to access the user object that you logged in as. All methods in this class are asynchronous and static. Make sure to import the file like this:
```javascript
import Authentication from '<path>'; 
```

### `Authentication.currentUser()`
Returns the user object that someone is currently logged in as. Return null if a user is not logged in.
* <b>Returns:</b> `User?` - A [user](#User) object.

#### Example usage:
```javascript
async function myFunction() {
  const user = await Authentication.currentUser();
  if (user === null) { /* user is not logged in */ }
  console.log(user);
}
```

### `Authentication.logIn()`
Displays a sign in screen and returns the user object that someone logged in as. If you do not have an account, it will create one automatically. If the log in fails, it will return null.
* <b>Returns:</b> `User?` - A [user](#User) object.

#### Example usage:
```javascript
async function myFunction() {
  const user = await Authentication.logIn();
  if (user === null) { /* error */ }
  console.log(user);
}
```

### `Authentication.logout()`
Logs the user out. If the log out succeed, it will return true. If the log out failed, it will return false.
* <b>Returns:</b> `boolean` - True or false.

#### Example usage:
```javascript
async function myFunction() {
  const success = await Authentication.logout();
  if (!success) { /* error */ }
  console.log(success);
}
```

## <a name="Firestore" />Firestore.js
Firestore.js is a custom database class to make communications to Google Firestore easier and less error-prone. Almost all methods in this class are asynchronous and static. There are four main method types: [Add Methods](#AddMethods), [Get Methods](#GetMethods), [Hash Methods](#HashMethods), and [Remove Methods](#RemoveMethods). Make sure to import the file like this:
```javascript
import Firestore from '<path>'; 
```

### <a name="AddMethods" />ADD Methods:
ADD methods add data to Google Firestore. These methods will either return the `object` added or `null` on failure. Here is a list of things you can do:

* [Add a User to Someone's Follow List](#addFollow)
* [Add a New Grid](#addGrid)
* [Add an Incomplete Score to a Grid](#addIncompleteScore)
* [Add a Like to a Grid](#addLike)
* [Add a Score to a Grid](#addScore)
* [Add a New User](#addUser)

#### <a name="addFollow" />`Firestore.add.follow(userId, followingId)`
Simulates a user following another user.
* <b>userId</b> `String` - The user id of the person that wants to follow someone.
* <b>followingId</b> `String` - The user id of the person being followed.
* <b>Returns:</b> `Follow?` - The follow object that was created.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const follow = await Firestore.add.follow("raymond@google.com", "swarnim@google.com");
  if (follow === null) { /* error */ }
  console.log(follow);
}
```

#### <a name="addGrid" />`Firestore.add.grid(userId, title, matrix, solution)`
Simulates a user creating a grid.
* <b>userId</b> `String` - The user id of the person who created the grid.
* <b>title</b> `String` - The title of the grid.
* <b>matrix</b> `Character[][]` - The shape of the grid.
* <b>solution</b> `Int[][]` - Solution to grid. Each element represents a coordinate in an array of length 2. 
* <b>Returns:</b> `Grid?` - The [grid](#Grid) object that was created.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const createdGrid = await Firestore.add.grid("raymond@google.com", "My Title", [["S", "0"], ["1", "F"]], [[1,0],[1,1]]);
  if (createdGrid === null) { /* error */ }
  console.log(createdGrid);
}
```

#### <a name="addIncompleteScore" />`Firestore.add.incompleteScore(userId, gridId)`
Adds a score of incomplete. This method is the same as `Firestore.add.score(userId, gridId, Infinity)`.
* <b>userId</b> `String` - The user id of the person who did not complete a grid.
* <b>gridId</b> `String` - The grid id that the person played on.
* <b>Returns:</b> `Score?` - The [score](#Score) object that was created.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const recordedScore = await Firestore.add.incompleteScore("swarnim@google.com", "My Title_by_raymond@google.com");
  if (recordedScore === null) { /* error */ }
  console.log(recordedScore);
}
```

#### <a name="addLike" />`Firestore.add.like(userId, gridId)`
Simulates a user liking a grid.
* <b>userId</b> `String` - The user id of the person who liked grid.
* <b>gridId</b> `String` - The grid id that the person liked.
* <b>Returns:</b> `Like?` - The like object that was created.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const like = await Firestore.add.like("swarnim@google.com", "My Title_by_raymond@google.com");
  if (like === null) { /* error */ }
  console.log(like);
}
```

#### <a name="addScore" />`Firestore.add.score(userId, gridId, milliseconds)`
Adds a score with a solve time of n milliseconds.
* <b>userId</b> `String` - The user id of the person who played on the grid.
* <b>gridId</b> `String` - The grid id that the person played on.
* <b>milliseconds</b> `Number` - The time it took to solve the grid in milliseconds.
* <b>Returns:</b> `Score?` - The [score](#Score) object that was created.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const recordedScore = await Firestore.add.score("swarnim@google.com", "My Title_by_raymond@google.com", 35500);
  if (recordedScore === null) { /* error */ }
  console.log(recordedScore);
}
```

#### <a name="addUser" />`Firestore.add.user(user)`
Adds a new user to Gridlock. Note: Authentication.js calls this function automatically.
* <b>user</b> `Firebase User` - A Firebase Authentication user.
* <b>Returns:</b> `User?` - The [user](#User) object that was created.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const createdUser = await Firestore.add.user(myFirebaseUser);
  if (createdUser === null) { /* error */ }
  console.log(createdUser);
}
```

### <a name="GetMethods" />GET Methods:
GET methods get data from Google Firestore. These methods will either return the `value` retrieved or `null` on failure. If the method returns an array, the order is random unless specified. Here is a list of things you can do:

* [Get a Boolean if a Grid Exists](#getDoesGridExist)
* [Get All Users that Follow a Certain Person](#getFollowers)
* [Get All Users a Certain Person is Following](#getFollowing)
* [Get All the Grids Created by a Certain User](#getGridsCreatedByUser)
* [Get All Grids that the Current User Follows](#getGridsFollowedForUser)
* [Get a Grid Object for the Current User](#getGridForUser)
* [Get a Grid Object for an Unregistered User](#getGridForUnregisteredUser)
* [Get Like Object](#getLike)
* [Get Top Five Scores for a Certain Grid](#getTopFiveScoresForGrid)
* [Get Trending Grids for an Unregistered User](#getTrendingGridsForUnregisteredUser)
* [Get Trending Grids for the Current User](#getTrendingGridsForUser)
* [Get User Object](#getUser)
* [Get All Users Who Liked a Certain Grid](#getUsersWhoLikedGrid)

#### <a name="getDoesGridExist" />`Firestore.get.doesGridExist(id)`
Determines if a grid exists. Note: all Firestore functions do this automatically.
* <b>id</b> `String` - A grid id.
* <b>Returns:</b> `Boolean` - True if the grid exists. False if the grid does not exist.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const doesExist = await Firestore.get.doesGridExist("My Title_by_raymond@google.com");
  console.log(doesExist);
}
```

#### <a name="getFollowers" />`Firestore.get.followers(id)`
Gets all the users that follow a certain person. 
* <b>id</b> `String` - A user id.
* <b>Returns:</b> `User[]?` - An array of [user](#User) objects.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const followers = await Firestore.get.followers("raymond@google.com");
  if (followers === null) { /* error */ }
  console.log(followers);
}
```

#### <a name="getFollowing" />`Firestore.get.following(id)`
Gets all the users a certain person is following.
* <b>id</b> `String` - A user id.
* <b>Returns:</b> `User[]?` - An array of [user](#User) objects.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const following = await Firestore.get.following("raymond@google.com");
  if (following === null) { /* error */ }
  console.log(following);
}
```

#### <a name="getGridsCreatedByUser" />`Firestore.get.gridsCreatedByUser(id, requestorId)`
Gets all the grids created by a certain person. The requestor is the user requesting this info (usually the current user). If both parameters have the same ids, a user is fetching a list of their own grids.
* <b>id</b> `String` - The user id of the person's grids I want.
* <b>requestorId</b> `String` - The user id of the person requested the data.
* <b>Returns:</b> `User[]?` - An array of [grid](#Grid) objects.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const grids = await Firestore.get.gridsCreatedByUser("raymond@google.com", "kousei@google.com");
  if (grids === null) { /* error */ }
  console.log(grids);
}
```

#### <a name="getGridsFollowedForUser" />`Firestore.get.gridsFollowedForUser(id)`
Gets all the grids a user follows. Note: the user must be the current user while logged in.
* <b>id</b> `String` - The id of the user requesting this info.
* <b>Returns:</b> `User[]?` - An array of [grid](#Grid) objects.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const grids = await Firestore.get.gridsFollowedForUser("raymond@google.com");
  if (grids === null) { /* error */ }
  console.log(grids);
}
```

#### <a name="getGridForUser" />`Firestore.get.gridForUser(userId, gridId)`
Gets the grid object for a logged in user. UserId corresponds to the user's id (which is the same as their email address) that is currently logged in. The gridId is the requested grid object. Note: all Firestore functions do this automatically.
* <b>userId</b> `String` - The id of the logged in user.
* <b>gridId</b> `String` - The id of the grid.
* <b>Returns:</b> `Grid?` - The grid object that was queried.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const grid = await Firestore.get.gridForUser("bryan@google.com", "title1_by_kousei.richeson@gmail.com");
  if (grid === null) { /* does not exist */ }
  console.log(grid);
}
```

#### <a name="getGridForUnregisteredUser" />`Firestore.get.gridForUnregisteredUser(gridId)`
Gets the grid object for a user who is not logged in. The gridId is the requested grid object. Note: all Firestore functions do this automatically.
* <b>gridId</b> `String` - The id of the grid.
* <b>Returns:</b> `Grid?` - The grid object that was queried.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const grid = await Firestore.get.gridForUnregisteredUser("title1_by_kousei.richeson@gmail.com");
  if (grid === null) { /* does not exist */ }
  console.log(grid);
}
```

#### <a name="getLike" />`Firestore.get.like(userId, gridId)`
Gets the like object for the corresponding user and grid. Note: all Firestore functions do this automatically.
* <b>userId</b> `String` - The id of the user who liked a certain grid.
* <b>gridId</b> `String` - The id of the grid the user liked.
* <b>Returns:</b> `Like?` - The like object that was queried.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const like = await Firestore.get.like("swarnim@google.com", "My Title_by_raymond@google.com");
  if (like === null) { /* does not exist */ }
  console.log(like);
}
```

#### <a name="getTopFiveScoresForGrid" />`Firestore.get.topFiveScoresForGrid(id)`
Gets the top five scores for a certain grid. This function does not include scores with a solve time of Infinity. The array will be sorted from faster times to slower times.
* <b>id</b> `String` - The id of the grid.
* <b>Returns:</b> `Score[]?` - An array of [score](#Score) objects.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const scores = await Firestore.get.topFiveScoresForGrid("My Title_by_raymond@google.com");
  if (scores === null) { /* error */ }
  console.log(scores);
}
```

#### <a name="getTrendingGridsForUnregisteredUser" />`Firestore.get.trendingGridsForUnregisteredUser()`
Gets a list of trending grids for a user who is not logged in. The max amount of grids returned is 20. The array will be sorted from most likes to fewer likes.
* <b>Returns:</b> `Grid[]?` - An array of [grid](#Grid) objects.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const grids = await Firestore.get.trendingGridsForUnregisteredUser();
  if (grids === null) { /* error */ }
  console.log(grids);
}
```

#### <a name="getTrendingGridsForUser" />`Firestore.get.trendingGridsForUser(id)`
Gets a list of trending grids for a user who is logged in. The max amount of grids returned is 20. The array will be sorted from most likes to fewer likes.
* <b>id</b> `String` - The id of the user who is requesting this info.
* <b>Returns:</b> `Grid[]?` - An array of [grid](#Grid) objects.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const grids = await Firestore.get.trendingGridsForUser("azeezah@google.com");
  if (grids === null) { /* error */ }
  console.log(grids);
}
```

#### <a name="getUser" />`Firestore.get.user(id)`
Gets the user object for the corresponding user id. Note: all Firestore functions do this automatically.
* <b>id</b> `String` - The id of the user.
* <b>Returns:</b> `User?` - The user object that was queried.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const user = await Firestore.get.user("bryan@google.com");
  if (user === null) { /* does not exist */ }
  console.log(user);
}
```

#### <a name="getUsersWhoLikedGrid" />`Firestore.get.usersWhoLikedGrid(gridId)`
Gets a list of all the users who liked a specific grid.
* <b>gridId</b> `String` - The id of the grid.
* <b>Returns:</b> `[User]?` - An array of [user](#User) objects.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const users = await Firestore.get.usersWhoLikedGrid("title1_by_kousei.richeson@gmail.com");
  if (users === null) { /* error */ }
  console.log(users);
}
```

### <a name="HashMethods" />HASH Methods:
Don't know the id? HASH methods can help. All HASH methods are synchronous but keep in mind there are no checks to the database. You must be absolutely sure that the parameters you pass are valid or you might get an id that is not correct. Note: all of these functions are not required becuase it is implemented under the hood already. 

* [Convert a Grid Data String to a Character Matrix](#hashConvertToGridDataString)
* [Convert a Grid Matrix to a Data String](#hashConvertToGridDataMatrix)
* [Convert a User ID & User ID to a Follow ID](#hashConvertToFollowId)
* [Convert a User ID & Title to a Grid ID](#hashConvertToGridId)
* [Convert a User ID & Grid ID to a Like ID](#hashConvertToLikeId)
* [Create a UUID](#hashCreateUUID)
* [Check if a Character Matrix is a Valid Grid Matrix](#hashIsValidMatrix)

#### <a name="hashConvertToGridDataString" />`Firestore.HASH.convertToGridDataString(matrix)`
Converts a grid data matrix to a grid string matrix.
* <b>matrix</b> `Character[][]` - The character matrix of the grid data.
* <b>Returns:</b> `String?` - The grid data in string form.

<b>Example usage:</b>
```javascript
function myFunction() {
  const dataString = Firestore.HASH.convertToGridDataString([["S", "0"], ["1", "F"]]);
  if (dataString === null) { /* error */ }
  console.log(dataString);
}
```

#### <a name="hashConvertToGridDataMatrix" />`Firestore.HASH.convertToGridDataMatrix(string)`
Converts a grid string to a matrix.
* <b>id</b> `String` - The grid data in string form.
* <b>Returns:</b> `Character[][]?` - The character matrix of the grid data.

<b>Example usage:</b>
```javascript
function myFunction() {
  const dataMatrix = Firestore.HASH.convertToGridDataMatrix("S10-01F");
  if (dataMatrix === null) { /* error */ }
  console.log(dataMatrix);
}
```

#### <a name="hashConvertToFollowId" />`Firestore.HASH.convertToFollowId(userId, followingId)`
Converts a two user ids to a follow id.
* <b>userId</b> `String` - The id of the user that is following someone.
* <b>followingId</b> `String` - The id of the user that is being followed.
* <b>Returns:</b> `String?` - The follow id.

<b>Example usage:</b>
```javascript
function myFunction() {
  const followId = Firestore.HASH.convertToFollowId("raymond@google.com", "swarnim@google.com");
  if (followId === null) { /* error */ }
  console.log(followId);
}
```

#### <a name="hashConvertToGridId" />`Firestore.HASH.convertToGridId(userId, title)`
Converts a user id and a title to a grid id.
* <b>userId</b> `String` - The id of the user who created the grid.
* <b>title</b> `String` - The title of the grid.
* <b>Returns:</b> `String?` - The grid id.

<b>Example usage:</b>
```javascript
function myFunction() {
  const gridId = Firestore.HASH.convertToGridId("raymond@google.com", "My Title");
  if (gridId === null) { /* error */ }
  console.log(gridId);
}
```

#### <a name="hashConvertToLikeId" />`Firestore.HASH.convertToLikeId(userId, gridId)`
Converts a user id and grid id to a like id.
* <b>userId</b> `String` - The id of the user who liked the grid.
* <b>gridId</b> `String` - The id of the grid.
* <b>Returns:</b> `String?` - The like id.

<b>Example usage:</b>
```javascript
function myFunction() {
  const likeId = Firestore.HASH.convertToGridId("raymond@google.com", "My Title_by_raymond@google.com");
  if (likeId === null) { /* error */ }
  console.log(likeId);
}
```

#### <a name="hashCreateUUID" />`Firestore.HASH.createUUID()`
Creates a UUID.
* <b>Returns:</b> `String` - A UUID.

<b>Example usage:</b>
```javascript
function myFunction() {
  const uuid = Firestore.HASH.createUUID();
  console.log(uuid);
}
```

#### <a name="hashIsValidMatrix" />`Firestore.HASH.isValidMatrix(matrix)`
Determines if a data grid matrix is valid.
* <b>Returns:</b> `Boolean` - True if valid. False if not valid.

<b>Example usage:</b>
```javascript
function myFunction() {
  const isValid = Firestore.HASH.isValidMatrix([["S", "0"], ["1", "F"]]);
  console.log(isValid);
}
```

### <a name="RemoveMethods" />REMOVE Methods:
REMOVE methods remove data to Google Firestore. These methods will return a boolean. True on success and false on failure. Here is a list of things you can do:

* [Remove a User to Someone's Follow List](#removeFollow)
* [Remove a Grid](#removeGrid)
* [Remove a Like from a Grid](#removeLike)

#### <a name="removeFollow" />`Firestore.remove.follow(userId, followingId)`
Simulates a user unfollowing another user.
* <b>userId</b> `String` - The user id of the person that wants to unfollow someone.
* <b>followingId</b> `String` - The user id of the person being unfollowed.
* <b>Returns:</b> `Boolean` - True if successfully deleted. False if failure.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const success = await Firestore.remove.follow("raymond@google.com", "swarnim@google.com");
  if (!success) { /* error */ }
  console.log(success);
}
```

#### <a name="removeGrid" />`Firestore.remove.grid(id)`
Simulates a user deleting (hopefully their own) grid. Deletes all likes and scores. The creator will lose likes from their total number of likes.
* <b>id</b> `String` - The grid id of the grid to be deleted.
* <b>Returns:</b> `Boolean` - True if successfully deleted. False if failure.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const success = await Firestore.remove.grid("My Title_by_raymond@google.com");
  if (!success) { /* error */ }
  console.log(success);
}
```

#### <a name="removeLike" />`Firestore.remove.like(userId, gridId)`
Simulates a user unliking a grid.
* <b>userId</b> `String` - The user id of the person who unliked grid.
* <b>gridId</b> `String` - The grid id that the person unliked.
* <b>Returns:</b> `Boolean` - True if successfully deleted. False if failure.

<b>Example usage:</b>
```javascript
async function myFunction() {
  const success = await Firestore.remove.like("swarnim@google.com", "My Title_by_raymond@google.com");
  if (!success) { /* error */ }
  console.log(success);
}
```

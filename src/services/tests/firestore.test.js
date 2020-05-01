//
// firestore.test.js
// created by Kousei on 4/24/2020
//

import firebaseConfig from '../../firebase'; // Must be present to initialize database.
import Firestore, {setDB} from '../firestore'
import * as firebaseTesting from '@firebase/testing'
import fs from 'fs'; // File system import

const testUserId = "testuser@google.com"
const testUserDisplayName = "Test User";
const testGridTitle = "<TEST GRID>"
const testGridId = Firestore.HASH.convertToGridId(testUserId, testGridTitle)
const solution = [[0,0], [1,0], [1,1], [1,0]];

const projectId = "gridlock-6f01b";
const rules = fs.readFileSync("./firestore.rules", "utf8");

const app = firebaseTesting.initializeTestApp({
      projectId: projectId,
      auth: {uid:testUserId, email:testUserId, displayName: "Test User"},
})
const db = app.firestore();
setDB(db);

// The emulator must be restarted each time bc this beforeEach doesn't work.
beforeEach(async () => {
    //await firebaseTesting.clearFirestoreData({ projectId });
    //await firebaseTesting.loadFirestoreRules({ projectId, rules });
});

test('Sanity Check', () => {
    expect("hi").toBe("hi");
});

test('create grid', async () => {
  // Let's just write the user manually bc I'm tired of dealing with transactions ;-;
  //await Firestore.add.user({email: testUser, photoURL: "", displayName: "Test User"});
  await db.collection("users").doc(testUserId).set({
       displayName: testUserDisplayName,
  });
  // invalid grid
  expect(await Firestore.add.grid(testUserId, testGridTitle, [["S", "0"], ["F", "F"]], solution)).toBeFalsy();
  // grid created
  expect(await Firestore.add.grid(testUserId, testGridTitle, [["S", "0"], ["1", "F"]], solution)).toBeTruthy();
  expect(await Firestore.remove.grid(testGridId)).toBeTruthy();
  // duplicate title
  //expect(await Firestore.add.grid(testUserId, testGridTitle, [["S", "0"], ["1", "F"]], solution)).toBeFalsy();
  await db.collection("users").doc(testUserId).delete();
});

/*

  test('like grids', async () => {
  await Firestore.add.user({email: testUser, photoURL: "", displayName: "Test User"});


    // grid created
    expect(await Firestore.add.grid(testUser, testGridTitle, [["S", "0"], ["1", "F"]], solution)).toBeTruthy();

    // grid liked
    expect(await Firestore.add.like(testUser, testGrid)).toBeTruthy();

    // grid already liked
    expect(await Firestore.add.like(testUser, testGrid)).toBeFalsy();

    // grid unliked
    expect(await Firestore.remove.like(testUser, testGrid)).toBeTruthy();

    // grid already disliked
    expect(await Firestore.remove.like(testUser, testGrid)).toBeFalsy();

    // dismount subject under testing
    expect(await Firestore.remove.grid(testGrid)).toBeTruthy();
  });
});

test('Adding Some Scores to a Grid', async function () {
    // Clear the database between tests
   await Firestore.add.user({email: testUser, photoURL: "", displayName: "Test User"});

     // grid created
    expect(await Firestore.add.grid(testUser, testGridTitle, [["S", "0"], ["1", "F"]])).toBeTruthy();

    // add incomplete score
    expect(await Firestore.add.incompleteScore(testUser, testGrid));

    // check statistics
    let grid = await Firestore.get.gridForUnregisteredUser(testGrid);
    expect(grid.numberOfAttempts).toBe(1);
    expect(grid.numberOfCompletes).toBe(0);
    expect(grid.numberOfIncompletes).toBe(1);

    // add complete score
    expect(await Firestore.add.score(testUser, testGrid, 1000));

    // check statistics
    grid = await Firestore.get.gridForUnregisteredUser(testGrid);
    expect(grid.numberOfAttempts).toBe(2);
    expect(grid.numberOfCompletes).toBe(1);
    expect(grid.numberOfIncompletes).toBe(1);

    // dismount subject under testing
    expect(await Firestore.remove.grid(testGrid)).toBeTruthy();

    // trying to remove a non-existing grid
    expect(await Firestore.remove.grid(testGrid)).toBeFalsy();

});
*/

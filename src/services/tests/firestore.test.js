//
// firestore.test.js
// created by Kousei on 4/24/2020
//
// This test file requires internet to work. If there
// are network errors, the test suite will fail.
// NOTE: kricheso@google.com is a test account made by Kousei.
// It is guaranteed to be in the database.

import firebaseConfig from '../../firebase'; // Must be present to initialize database.
import Firestore from '../firestore'

const testUser = "kricheso@google.com"
const testGridTitle = "<TEST GRID>"
const testGrid = Firestore.HASH.convertToGridId(testUser, testGridTitle)

test('Sanity Check', () => {
    expect("hi").toBe("hi");
});

test('Like and Unlike Grids', async function () {
    
    // invalid grid
    expect(await Firestore.add.grid(testUser, testGridTitle, [["S", "0"], ["F", "F"]])).toBeFalsy();

    // grid created
    expect(await Firestore.add.grid(testUser, testGridTitle, [["S", "0"], ["1", "F"]])).toBeTruthy();

    // duplicate title
    expect(await Firestore.add.grid(testUser, testGridTitle, [["S", "0"], ["1", "F"]])).toBeFalsy(); 
    
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

test('Adding Some Scores to a Grid', async function () {

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

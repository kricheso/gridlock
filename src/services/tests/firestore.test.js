//
// firestore.test.js
// created by Kousei on 4/24/2020
//
// This test file requires internet to work. If there
// are network errors, the test suite will fail.
// NOTE: kricheso@google.com is a test account made by Kousei.
// It is guarenteed to be in the database.

import firebaseConfig from '../../firebase'; // Must be present to initialize database.
import Firestore from '../firestore'

const testUser = "kricheso@google.com"
const testGridTitle = "<TEST GRID>"
const testGrid = Firestore.HASH.convertToGridId(testUser, testGridTitle)

test('Sanity Check', () => {
    expect("hi").toBe("hi");
});

test('Trying to add an invalid grid', async function () {
    expect(await Firestore.add.grid(testUser, testGridTitle, [["S", "0"], ["F", "F"]])).toBeFalsy();
});

test('Adding a valid grid', async function () {
    expect(await Firestore.add.grid(testUser, testGridTitle, [["S", "0"], ["1", "F"]])).toBeTruthy();
});

test('Adding a valid grid but a duplicate title', async function () {
    expect(await Firestore.add.grid(testUser, testGridTitle, [["S", "0"], ["1", "F"]])).toBeFalsy();
});

test('Liking a grid', async function () {
    expect(await Firestore.add.like(testUser, testGrid)).toBeTruthy();
});

test('Trying to like an already liked grid', async function () {
    expect(await Firestore.add.like(testUser, testGrid)).toBeFalsy();
});

test('Disliking a grid', async function () {
    expect(await Firestore.remove.like(testUser, testGrid)).toBeTruthy();
});

test('Trying to dislike an already disliked grid', async function () {
    expect(await Firestore.remove.like(testUser, testGrid)).toBeFalsy();
});

test('Adding an incomplete score', async function () {
    expect(await Firestore.add.incompleteScore(testUser, testGrid));
});

test('Make sure the grid is updating statistics for incomplete scores', async function () {
    const grid = await Firestore.get.gridForUnregisteredUser(testGrid);
    expect(grid.numberOfAttempts).toBe(1);
    expect(grid.numberOfCompletes).toBe(0);
    expect(grid.numberOfIncompletes).toBe(1);
});

test('Adding a complete score', async function () {
    expect(await Firestore.add.score(testUser, testGrid, 1000));
});

test('Make sure the grid is updating statistics for complete scores', async function () {
    const grid = await Firestore.get.gridForUnregisteredUser(testGrid);
    expect(grid.numberOfAttempts).toBe(2);
    expect(grid.numberOfCompletes).toBe(1);
    expect(grid.numberOfIncompletes).toBe(1);
});

test('Dismount subject under testing', async function () {
    expect(await Firestore.remove.grid(testGrid)).toBeTruthy();
});

test('Trying to remove a non-existing grid', async function () {
    expect(await Firestore.remove.grid(testGrid)).toBeFalsy();
});
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import fs from 'fs'; // File system import
import firebase from 'firebase';
import * as firebaseTesting from '@firebase/testing'
import firebaseApp from './firebase.js';

import Play from './Play';

const projectId = "gridlock-6f01b";
const rules = fs.readFileSync("./firestore.rules", "utf8");

beforeEach(async () => {
  // Clear the database between tests
  await firebaseTesting.clearFirestoreData({ projectId });
  await firebaseTesting.loadFirestoreRules({ projectId, rules });
});

describe('Play component', () => {
  test('Loads grid by id', async () => {
    const gridId = "grid_title_by_username";
    const userId = "username@google.com";
    const userDisplayName = "username";
    const gridTitle = "grid_title";

    const db = firebaseApp.firestore();

    await db.collection("users").doc(userId).set({
      displayName: userDisplayName,
    });
    await db.collection("grids").doc(gridId).set({
      title: gridTitle,
      creatorId: userId,
    });

    const { getByText, findByText } = render(<Play gridId={gridId} />);
    await findByText(gridTitle);
    await findByText("by "+userDisplayName);
  });
});

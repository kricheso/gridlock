import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import fs from 'fs'; // File system import
import firebase from 'firebase';
import * as firebaseTesting from '@firebase/testing'
import firebaseApp from './firebase.js';
import Nav from './nav.js';

const projectId = "gridlock-6f01b";
const rules = fs.readFileSync("./firestore.rules", "utf8");

beforeEach(async () => {
  // Clear the database between tests
  await firebaseTesting.clearFirestoreData({ projectId });
  await firebaseTesting.loadFirestoreRules({ projectId, rules });
});

describe('Nav', () => {
  test('Displays user\'s name if they\'re already logged in', async () => {
    const userDisplayName = "username";
    const user = {displayName: userDisplayName};
    const { getByText, findByText } = render(<Nav user={user} />);
    await findByText(userDisplayName);
  });

  test('Displays user\'s name after they log in as a new user', async () => {
    const userDisplayName = "username";
    const userId = "username@google.com"
    const user = {displayName: userDisplayName, photoURL: "", email:userId};

    // Mock Google Authentication to login as user.
    firebase.auth = jest.fn(() => ({
      signInWithPopup: () => ({
        then: (f) => {
          f({user: user});
          return {
            catch: () => {},
          };
        },
      }),
    }));
    firebase.auth.GoogleAuthProvider = jest.fn();

    const { getByText, findByText } = render(<Nav />);

    act(() => {
      fireEvent.click(getByText('Login'));
    });
    await findByText(userDisplayName);
  });

  test('Displays user\'s name after they log in as an existing user', async () => {
    const userDisplayName = "username";
    const userId = "username@google.com"
    const user = {displayName: userDisplayName, photoURL: "", email:userId};

    const db = firebaseApp.firestore();
    await db.collection("users").doc(userId).set(user);

    // Mock Google Authentication to login as user.
    firebase.auth = jest.fn(() => ({
      signInWithPopup: () => ({
        then: (f) => {
          f({user: user});
          return {
            catch: () => {},
          };
        },
      }),
    }));
    firebase.auth.GoogleAuthProvider = jest.fn();

    const { getByText, findByText } = render(<Nav />);

    act(() => {
      fireEvent.click(getByText('Login'));
    });
    await findByText(userDisplayName);
  });

  test('Login button is displayed once they logout', async () => {
    const userDisplayName = "username";
    const user = {displayName: userDisplayName};
    const { getByText, findByText } = render(<Nav user={user} />);
    await findByText(userDisplayName);
    act(() => {
      fireEvent.click(getByText('Logout'));
    });
    await findByText('Login');
  });
});

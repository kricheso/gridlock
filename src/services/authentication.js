//
// authentication.js
// created by Kousei on 3/30/2020
//

import Firestore from './firestore';
import firebase from 'firebase/app';
import 'firebase/auth';

class Authentication {

    static async currentUser() {
        if (firebase.auth().currentUser === null) { return null; }
        return await Firestore.get.user(firebase.auth().currentUser.email);
    }

    static async logIn() {
        try { 
            if (!Authentication.logout()) { return null; }
            const provider = new firebase.auth.GoogleAuthProvider();
            const userInfo = (await firebase.auth().signInWithPopup(provider)).user;
            const user = await Firestore.add.user(userInfo);
            if (user === null) { return null; }
            return user;
        }
        catch { return null; }
    }

    static async logout() {
        try { await firebase.auth().signOut(); } 
        catch { return false; }
        return true;
    }

}

export default Authentication;
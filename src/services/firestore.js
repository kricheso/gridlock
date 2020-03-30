//
// firestore.js
// created by Kousei on 3/28/2020
//

import Type from '../models/dataTypes.js'
import firebase from 'firebase/app';
import 'firebase/firestore';

class Consts {
    static alreadyLikedMessage = "The user already liked the grid.";
    static createdGridIds = "createdGridIds";
    static creator = "creator";
    static equals = "==";
    static firebaseFailureMessage = "Firestore could not complete a query. Contact Kousei for help.";
    static grid = "grid";
    static grids = "grids";
    static invalidGridMessage = "That grid does not exist.";
    static invalidTypeMessage = "Invalid input type.";
    static invalidUserMessage = "That user does not exist.";
    static likedGridIds = "likedGridIds";
    static likes = "likes";
    static user = "user";
    static users = "users";
}

class REF {
    static BASE = firebase.firestore();
    static FIELD  = firebase.firestore.FieldValue;
    static GRIDS = firebase.firestore().collection(Consts.grids);
    static LIKES = firebase.firestore().collection(Consts.likes);
    static USERS = firebase.firestore().collection(Consts.users);
}

class Error {

    static firebaseFaliure(failValue) {
        console.log(Consts.firebaseFailureMessage);
        return failValue;
    }

    static invalidType(failValue) {
        console.log(Consts.invalidTypeMessage);
        return failValue;
    }

    static invalidUser(failValue) {
        console.log(Consts.invalidUserMessage);
        return failValue;
    }

    static invalidGrid(failValue) {
        console.log(Consts.invalidGridMessage);
        return failValue;
    }

    static alreadyLiked(failValue) {
        console.log(Consts.alreadyLikedMessage);
        return failValue;
    }

}

class Firestore {

    static get = class {

        static async grid(id) {
            if (typeof(id) !== Type.string) { return Error.invalidType(null); }
            try { 
                const doc = await REF.GRIDS.doc(id).get();
                return doc.exists ? doc.data() : null; 
            }
            catch { return Error.firebaseFaliure(null); }
        }

        static async numberOfLikesForGrid(id) {
            if (typeof(id) !== Type.string) { return Error.invalidType(null); }
            try {
                if (await Firestore.get.grid(id) === null) { return Error.invalidGrid(null); }
                const querySnapshot = await REF.LIKES.where(Consts.grid, Consts.equals, id).get();
                return querySnapshot.docs.length;
            }
            catch { return Error.firebaseFaliure(null); }
        }

        static async gridsCreatedByUser(id) {
            if (typeof(id) !== Type.string) { return Error.invalidType(null); }
            try {
                if (await Firestore.get.user(id) === null) { return Error.invalidUser(null); }
                const querySnapshot = await REF.GRIDS.where(Consts.creator, Consts.equals, id).get();
                return querySnapshot.docs.map(doc => doc.data());
            }
            catch { return Error.firebaseFaliure(null); }
        }

        static async user(id) {
            if (typeof(id) !== Type.string) { return Error.invalidType(null); }
            try { 
                const doc = await REF.USERS.doc(id).get();
                return doc.exists ? doc.data() : null; 
            }
            catch { return Error.firebaseFaliure(null); }
        }

    }

    static modify = class {

        static async addOneLikeFromUserToGrid(userId, gridId) {
            if (typeof(userId) !== Type.string) { return Error.invalidType(false); }
            if (typeof(gridId) !== Type.string) { return Error.invalidType(false); }
            try {
                if (await Firestore.get.user(userId) === null) { return Error.invalidUser(false) }
                if (await Firestore.get.grid(gridId) === null) { return Error.invalidGrid(false) }
                if (!(await REF.LIKES.where(Consts.user, Consts.equals, userId).where(Consts.grid, Consts.equals, gridId).get()).empty) { return Error.alreadyLiked(false); }
                const dict = {};
                dict[Consts.user] = userId;
                dict[Consts.grid] = gridId;
                await REF.LIKES.add(dict);
                return true;
            }
            catch { return Error.firebaseFaliure(false); }
        }

    }

}

export default Firestore;
//
// firestore.js
// created by Kousei on 3/28/2020
//

import Type from '../models/dataTypes.js'
import firebase from 'firebase/app';
import 'firebase/firestore';

class Consts {
    static alreadyFollowedMessage = "The user already follows that user."
    static alreadyLikedMessage = "The user already liked the grid.";
    static alreadyNotFollowedMessage = "The user already not followed that user."
    static alreadyNotLikedMessage = "The user already not liked the grid.";
    static alreadyUsedTitleMessage = "That user already made a grid with that title.";
    static ascending = "asc";
    static cannotFollowYourselfMessage = "You cannot follow yourself!";
    static cannotUnfollowYourselfMessage = "You cannot unfollow yourself!";
    static created = "created";
    static creatorDisplayName = "creatorDisplayName";
    static creatorId = "creatorId";
    static data = "data";
    static descending = "desc";
    static displayName = "displayName";
    static email = "email";
    static equals = "==";
    static firebaseFailureMessage = "Firestore could not complete a logical query (or the internet connection is bad). Contact Kousei for help.";
    static followingId = "followingId";
    static follows = "follows";
    static gridId = "gridId";
    static grids = "grids";
    static id = "id";
    static invalidGridMessage = "That grid does not exist.";
    static invalidMatrixMessage = "That matrix is formatted incorrectly.";
    static invalidSolutionMessage = "That solution is formatted incorrectly."
    static invalidTypeMessage = "Invalid parameter type.";
    static invalidUserMessage = "That user does not exist.";
    static isComplete = "isComplete";
    static liked = "liked";
    static likes = "likes";
    static maxTrendingGridsOnPage = 20;
    static numberOfAttempts = "numberOfAttempts";
    static numberOfCompletes = "numberOfCompletes";
    static numberOfFollowers = "numberOfFollowers";
    static numberOfFollowing = "numberOfFollowing";
    static numberOfIncompletes = "numberOfIncompletes";
    static numberOfLikes = "numberOfLikes";
    static numberOfTotalLikes = "numberOfTotalLikes";
    static photoUrl = "photoUrl";
    static scores = "scores";
    static solveTime = "solveTime";
    static solution = "solution";
    static title = "title";
    static userDisplayName = "userDisplayName";
    static userId = "userId";
    static username = "username";
    static users = "users";
    static uuidFormat = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    static uuidMark = "x";
}

class REF {
    static BASE = firebase.firestore();
    static FOLLOWS = firebase.firestore().collection(Consts.follows);
    static GRIDS = firebase.firestore().collection(Consts.grids);
    static USERS = firebase.firestore().collection(Consts.users);
}

class Error {

    static alreadyFollowed(failValue = null) {
        console.log(Consts.alreadyFollowedMessage);
        return failValue;
    }

    static alreadyLiked(failValue = null) {
        console.log(Consts.alreadyLikedMessage);
        return failValue;
    }

    static alreadyNotFollowed(failValue = null) {
        console.log(Consts.alreadyNotFollowedMessage);
        return failValue;
    }

    static alreadyNotLiked(failValue = null) {
        console.log(Consts.alreadyNotLikedMessage);
        return failValue;
    }

    static alreadyUsedTitle(failValue = null) {
        console.log(Consts.alreadyUsedTitleMessage);
        return failValue;
    }

    static cannotFollowYourself(failValue = null) {
        console.log(Consts.cannotFollowYourselfMessage);
        return failValue;
    }

    static cannotUnfollowYourself(failValue = null) {
        console.log(Consts.cannotUnfollowYourselfMessage);
        return failValue;
    }

    static firebaseFaliure(failValue = null) {
        console.log(Consts.firebaseFailureMessage);
        return failValue;
    }

    static invalidGrid(failValue = null) {
        console.log(Consts.invalidGridMessage);
        return failValue;
    }

    static invalidMatrix(failValue = null) {
        console.log(Consts.invalidMatrixMessage);
        return failValue;
    }

    static invalidType(failValue = null) {
        console.log(Consts.invalidTypeMessage);
        return failValue;
    }

    static invalidSolution(failValue = null) {
        console.log(Consts.invalidSolutionMessage);
        return failValue;
    }

    static invalidUser(failValue = null) {
        console.log(Consts.invalidUserMessage);
        return failValue;
    }

}

class Firestore {

    static add = class {

        static async follow(userId, followingId) {

            // Synchronous Checks
            if (typeof(userId) !== Type.string) { return Error.invalidType(); }
            if (typeof(followingId) !== Type.string) { return Error.invalidType(); }
            if (userId === followingId) { return Error.cannotFollowYourself(); }

            try { 

                // Run Transaction
                return await REF.BASE.runTransaction(async function (transaction) {

                    // Asynchronous Checks
                    const userDoc = await transaction.get(REF.USERS.doc(userId));
                    if (!userDoc.exists) { return Error.invalidUser(); }
                    const followingDoc = await transaction.get(REF.USERS.doc(followingId));
                    if (!followingDoc.exists) { return Error.invalidUser(); }
                    const id = Firestore.HASH.convertToFollowId(userId, followingId);
                    if ((await transaction.get(REF.FOLLOWS.doc(id))).exists) { return Error.alreadyFollowed(); }

                    // Write 1
                    const userDict = {};
                    userDict[Consts.numberOfFollowing] = userDoc.data().numberOfFollowing + 1;
                    transaction.update(REF.USERS.doc(userId), userDict);

                    // Write 2
                    const followingDict = {};
                    followingDict[Consts.numberOfFollowers] = followingDoc.data().numberOfFollowers + 1
                    transaction.update(REF.USERS.doc(followingId), followingDict);

                    // Write 3
                    const followDict = {};
                    followDict[Consts.created] = new Date();
                    followDict[Consts.userId] = userId;
                    followDict[Consts.followingId] = followingId;
                    followDict[Consts.id] = id;
                    transaction.set(REF.FOLLOWS.doc(id), followDict);

                    return followDict;

                });

            }

            // Catch Errors
            catch { return Error.firebaseFaliure(); }

        }

        static async grid(userId, title, matrix, solution) {

            // Synchronous Checks
            if (typeof(userId) !== Type.string) { return Error.invalidType(); }
            if (typeof(title) !== Type.string) { return Error.invalidType(); }
            if (typeof(matrix) !== Type.object) { return Error.invalidType(); }
            if (typeof(solution) !== Type.object) { return Error.invalidType(); }
            const data = Firestore.HASH.convertToGridDataString(matrix);
            if (data === null) { return Error.invalidMatrix(); }
            const sol = Firestore.HASH.convertToSolutionString(solution);
            if (sol === null) { return Error.invalidSolution(); }

            try { 

                // Run Transaction
                return await REF.BASE.runTransaction(async function (transaction) {

                    // Asynchronous Checks
                    const id = Firestore.HASH.convertToGridId(userId, title);
                    const userDoc = await transaction.get(REF.USERS.doc(userId));
                    if (!userDoc.exists) { return Error.invalidUser(); }
                    if ((await transaction.get(REF.GRIDS.doc(id))).exists) { return Error.alreadyUsedTitle(); }

                    // Write
                    const dict = {};
                    dict[Consts.created] = new Date();
                    dict[Consts.creatorId] = userId;
                    dict[Consts.data] = data;
                    dict[Consts.id] = id;
                    dict[Consts.numberOfAttempts] = 0;
                    dict[Consts.numberOfIncompletes] = 0;
                    dict[Consts.numberOfLikes] = 0;
                    dict[Consts.numberOfCompletes] = 0;
                    dict[Consts.solution] = sol;
                    dict[Consts.title] = title;
                    transaction.set(REF.GRIDS.doc(id), dict);

                    // Return Result
                    dict[Consts.creatorDisplayName] = userDoc.data().displayName;
                    dict[Consts.data] = matrix;
                    dict[Consts.liked] = false;
                    dict[Consts.solution] = solution;
                    return dict;

                });

            } 

            // Catch Errors
            catch { return Error.firebaseFaliure(); }

        }

        static async incompleteScore(userId, gridId) {

            return await Firestore.add.score(userId, gridId, Infinity)

        }

        static async like(userId, gridId) {

            // Synchronous Checks
            if (typeof(userId) !== Type.string) { return Error.invalidType(); }
            if (typeof(gridId) !== Type.string) { return Error.invalidType(); }
            
            try { 

                // Run Transaction
                return await REF.BASE.runTransaction(async function (transaction) {

                    // Asynchronous Checks
                    if (!(await transaction.get(REF.USERS.doc(userId))).exists) { return Error.invalidUser(); }
                    const gridDoc = await transaction.get(REF.GRIDS.doc(gridId));
                    if (!gridDoc.exists) { return Error.invalidGrid(); }
                    const creatorDoc = await transaction.get(REF.USERS.doc(gridDoc.data().creatorId));
                    if (!creatorDoc.exists) { return Error.firebaseFaliure(); }
                    if ((await transaction.get(REF.GRIDS.doc(gridId).collection(Consts.likes).doc(userId))).exists) { return Error.alreadyLiked(); }

                    // Write 1
                    const gridDict = {};
                    gridDict[Consts.numberOfLikes] = gridDoc.data().numberOfLikes + 1;
                    transaction.update(REF.GRIDS.doc(gridId), gridDict);

                    // Write 2
                    const creatorDict = {};
                    creatorDict[Consts.numberOfTotalLikes] = creatorDoc.data().numberOfTotalLikes + 1;
                    transaction.update(REF.USERS.doc(gridDoc.data().creatorId), creatorDict);

                    // Write 3
                    const likeDict = {};
                    likeDict[Consts.created] = new Date();
                    likeDict[Consts.gridId] = gridId;
                    likeDict[Consts.id] = userId;
                    likeDict[Consts.userId] = userId;
                    transaction.set(REF.GRIDS.doc(gridId).collection(Consts.likes).doc(userId), likeDict)

                    // Return Result
                    return likeDict;

                });

            }

            // Catch Errors
            catch { return Error.firebaseFaliure(); }

        }

        static async score(userId, gridId, milliseconds) {

            // Synchronous Checks
            if (typeof(userId) !== Type.string) { return Error.invalidType(); }
            if (typeof(gridId) !== Type.string) { return Error.invalidType(); }
            if (typeof(milliseconds) !== Type.number) { return Error.invalidType(); }

            try { 

                // Run Transaction
                return await REF.BASE.runTransaction(async function (transaction) {

                    // Asynchronous Checks
                    const userDoc = await transaction.get(REF.USERS.doc(userId));
                    if (!userDoc.exists) { return Error.invalidUser(); }
                    const gridDoc = await transaction.get(REF.GRIDS.doc(gridId));
                    if (!gridDoc.exists) { return Error.invalidGrid(); }

                    // Write 1
                    const gridDict = {};
                    if (milliseconds === Infinity) {
                        gridDict[Consts.numberOfIncompletes] = gridDoc.data().numberOfIncompletes + 1;
                    } else {
                        gridDict[Consts.numberOfCompletes] = gridDoc.data().numberOfCompletes + 1;
                    }
                    gridDict[Consts.numberOfAttempts] = gridDoc.data().numberOfAttempts + 1;
                    transaction.update(REF.GRIDS.doc(gridId), gridDict);
                    
                    // Write 2
                    const dict = {};
                    const id = Firestore.HASH.createUUID();
                    dict[Consts.created] = new Date();
                    dict[Consts.gridId] = gridId;
                    dict[Consts.id] = id;
                    if (milliseconds === Infinity) {
                        dict[Consts.isComplete] = false;
                    } else {
                        dict[Consts.isComplete] = true;
                    }
                    dict[Consts.solveTime] = milliseconds;
                    dict[Consts.userId] = userId
                    transaction.set(REF.GRIDS.doc(gridId).collection(Consts.scores).doc(id), dict)

                    // Return Result
                    dict[Consts.userDisplayName] = userDoc.data().displayName
                    return dict;

                });

            }

            // Catch Errors
            catch { return Error.firebaseFaliure(); }

        }

        static async user(user) {

            // Synchronous Checks
            if (typeof(user) !== Type.object) { return Error.invalidType(); }
            if (user.displayName === undefined) { return Error.invalidType(); }
            if (user.photoURL === undefined) { return Error.invalidType(); }
            if (user.email === undefined) { return Error.invalidType(); }

            try { 

                // Run Transaction
                return await REF.BASE.runTransaction(async function (transaction) {

                    // Asynchronous Checks
                    const userId = user.email;
                    const userDoc = await transaction.get(REF.USERS.doc(userId));

                    // User Object
                    let dict = {};

                    // Write
                    if (!userDoc.exists) {
                        dict[Consts.id] = userId;
                        dict[Consts.created] = new Date();
                        dict[Consts.displayName] = user.displayName;
                        dict[Consts.email] = user.email;
                        dict[Consts.numberOfFollowers] = 0;
                        dict[Consts.numberOfFollowing] = 0;
                        dict[Consts.numberOfTotalLikes] = 0;
                        dict[Consts.photoUrl] = user.photoURL;
                        transaction.set(REF.USERS.doc(userId), dict);
                    } else {
                        dict = userDoc.data();
                        dict[Consts.displayName] = user.displayName;
                        dict[Consts.photoUrl] = user.photoURL;
                        const updateDict = {};
                        updateDict[Consts.displayName] = user.displayName;
                        updateDict[Consts.photoUrl] = user.photoURL;
                        transaction.update(REF.USERS.doc(userId), updateDict);
                    }

                    // Return Result
                    return dict;

                });

            }
            
            // Catch Errors
            catch { return Error.firebaseFaliure(); }

        }

    }

    static get = class {

        static async doesGridExist(id) {
            if (typeof(id) !== Type.string) { return Error.invalidType(); }
            try { 
                const doc = await REF.GRIDS.doc(id).get();
                return doc.exists; 
            }
            catch { return Error.firebaseFaliure(); }
        }

        static async followers(id) {
            if (typeof(id) !== Type.string) { return Error.invalidType(); }
            try {
                const user = await Firestore.get.user(id);
                if (user === null) { return Error.invalidUser(); }
                const querySnapshot = await REF.FOLLOWS.where(Consts.followingId, Consts.equals, id).get();
                let follows = [];
                for (const doc of querySnapshot.docs) {
                    const followUser = await Firestore.get.user(doc.data().userId);
                    if (followUser === null) { Error.firebaseFaliure(); }
                    follows.push(followUser);
                }
                return follows;
            }
            catch { return Error.firebaseFaliure(); }
        }

        static async following(id) {
            if (typeof(id) !== Type.string) { return Error.invalidType(); }
            try {
                const user = await Firestore.get.user(id);
                if (user === null) { return Error.invalidUser(); }
                const querySnapshot = await REF.FOLLOWS.where(Consts.userId, Consts.equals, id).get();
                let follows = [];
                for (const doc of querySnapshot.docs) {
                    const followedUser = await Firestore.get.user(doc.data().followingId);
                    if (followedUser === null) { Error.firebaseFaliure(); }
                    follows.push(followedUser);
                }
                return follows;
            }
            catch { return Error.firebaseFaliure(); }
        }

        static async gridForUser(userId, gridId) {
            if (await Firestore.get.user(userId) === null) { return Error.invalidUser() }
            const grid = await Firestore.get.gridForUnregisteredUser(gridId);
            if (grid === null) { return null; }
            if (await Firestore.get.like(userId, grid.id) !== null) { grid[Consts.liked] = true; }
            return grid;
        }

        static async gridForUnregisteredUser(gridId) {
            if (typeof(gridId) !== Type.string) { return Error.invalidType(); }
            try { 
                const doc = await REF.GRIDS.doc(gridId).get();
                if (!doc.exists) { return null; }
                const dict = doc.data();
                const user = await Firestore.get.user(dict.creatorId);
                if (user === null) { return Error.firebaseFaliure() }
                dict[Consts.creatorDisplayName] = user.displayName;
                dict[Consts.data] = Firestore.HASH.convertToGridDataMatrix(dict.data);
                dict[Consts.solution] = Firestore.HASH.convertToSolutionMatrix(dict.solution);
                dict[Consts.liked] = false;
                return dict;
            }
            catch { return Error.firebaseFaliure(null); }
        }

        static async gridsCreatedByUser(id, requestorId) {
            if (typeof(id) !== Type.string) { return Error.invalidType(); }
            if (typeof(requestorId) !== Type.string && requestorId !== null) { return Error.invalidType(); }
            try {
                const user = await Firestore.get.user(id);
                if (user === null) { return Error.invalidUser(); }
                const querySnapshot = await REF.GRIDS.where(Consts.creatorId, Consts.equals, id).get();
                let grids = [];
                for (const doc of querySnapshot.docs) {
                    const dict = doc.data();
                    dict[Consts.creatorDisplayName] = user.displayName;
                    dict[Consts.data] = Firestore.HASH.convertToGridDataMatrix(dict.data);
                    dict[Consts.solution] = Firestore.HASH.convertToSolutionMatrix(dict.solution);
                    if (requestorId === null) { 
                        dict[Consts.liked] = false; 
                    } else {
                        const likeDoc = await Firestore.get.like(requestorId, dict.id);
                        if (likeDoc !== null) { dict[Consts.liked] = true; }
                        else { dict[Consts.liked] = false; }
                    }
                    grids.push(dict);
                }
                return grids
            }
            catch { return Error.firebaseFaliure(); }
        }

        static async gridsFollowedForUser(id) {
            if (typeof(id) !== Type.string) { return Error.invalidType(); }
            try {
                const user = await Firestore.get.user(id);
                if (user === null) { return Error.invalidUser(); }
                const followingUsers = await Firestore.get.following(user.id);
                if (followingUsers === null) { return null; }
                let result = [];
                for (const followingUser of followingUsers) {
                    const grids = await Firestore.get.gridsCreatedByUser(followingUser.id, id);
                    for (const grid of grids) { result.push(grid); }
                }
                return result;
            }
            catch { return Error.firebaseFaliure(); }
        }

        static async like(userId, gridId) {
            if (typeof(userId) !== Type.string) { return Error.invalidType(); }
            if (typeof(gridId) !== Type.string) { return Error.invalidType(); }
            try { 
                const doc = await REF.GRIDS.doc(gridId).collection(Consts.likes).doc(userId).get();
                return doc.exists ? doc.data() : null;
            }
            catch { return Error.firebaseFaliure(); }
        }

        static async topFiveScoresForGrid(id) {
            if (typeof(id) !== Type.string) { return Error.invalidType(); }
            try {
                if (await Firestore.get.doesGridExist(id) !== true) { return Error.invalidGrid(); }
                const querySnapshot = await REF.GRIDS.doc(id).collection(Consts.scores).orderBy(Consts.solveTime, Consts.ascending).limit(5).get();
                let scores = [];
                for (const doc of querySnapshot.docs) {
                    const score = doc.data()
                    if (score.isComplete) { 
                        const user = await Firestore.get.user(score.userId);
                        if (user === null) { return Error.firebaseFaliure(); }
                        score[Consts.userDisplayName] = user.displayName;
                        scores.push(score); 
                    }
                }
                return scores;
            }
            catch { return Error.firebaseFaliure(); }
        }

        static async trendingGridsForUnregisteredUser() {
            try {
                const querySnapshot = await REF.GRIDS.orderBy(Consts.numberOfLikes, Consts.descending).limit(Consts.maxTrendingGridsOnPage).get();
                let grids = [];
                for (const doc of querySnapshot.docs) {
                    const dict = doc.data();
                    const user = await Firestore.get.user(dict.creatorId);
                    if (user === null) { return Error.firebaseFaliure(); }
                    dict[Consts.creatorDisplayName] = user.displayName; 
                    dict[Consts.data] = Firestore.HASH.convertToGridDataMatrix(dict.data);
                    dict[Consts.solution] = Firestore.HASH.convertToSolutionMatrix(dict.solution);
                    dict[Consts.liked] = false;
                    grids.push(dict);
                }
                return grids;
            }
            catch { return Error.firebaseFaliure(); }
        }

        static async trendingGridsForUser(id) {
            if (typeof(id) !== Type.string) { return Error.invalidType(); }
            if (await Firestore.get.user(id) === null) { return Error.invalidUser(); }
            const grids = await Firestore.get.trendingGridsForUnregisteredUser();
            if (grids === null) { return null; }
            for (const grid of grids) {
                if (await Firestore.get.like(id, grid.id) !== null) { grid[Consts.liked] = true; }
            }
            return grids;
        }

        static async user(id) {
            if (typeof(id) !== Type.string) { return Error.invalidType(); }
            try { 
                const doc = await REF.USERS.doc(id).get();
                return doc.exists ? doc.data() : null; 
            }
            catch { return Error.firebaseFaliure(null); }
        }

        static async usersWhoLikedGrid(gridId) {
            if (typeof(gridId) !== Type.string) { return Error.invalidType(); }
            try {
                if (await Firestore.get.doesGridExist(gridId) !== true) { return Error.invalidGrid(); }
                let users = [];
                const likes = await REF.GRIDS.doc(gridId).collection(Consts.likes).get();
                for (const like of likes.docs) {
                    const user = await Firestore.get.user(like.data().userId);
                    if (user === null) { 
                        Error.firebaseFaliure();
                        continue; 
                    }
                    users.push(user)
                }
                return users;
            }
            catch { return Error.firebaseFaliure(); }
        }

    }

    // !== DO NOT MODIFY ANY CODE IN FIRESTORE.HASH ==!
    // These are hash functions used to communicate with
    // Firestore. If this code changes, all existing
    // data in the database will be corrupted. 
    static HASH = class {

        static convertToGridDataString(matrix) {
            if (!Firestore.HASH.isValidMatrix(matrix)) { return null; }
            let lines = [];
            for (const array of matrix) { lines.push(array.join("")); }
            return lines.join("-");
        }

        static convertToGridDataMatrix(string) {
            if (typeof(string) !== Type.string) { return Error.invalidType(); }
            let matrix = [];
            const lines = string.split("-");
            for (const line of lines) { matrix.push(line.split("")); }
            if (!Firestore.HASH.isValidMatrix(matrix)) { return null; }
            return matrix;
        }

        static convertToFollowId(userId, followingId) {
            if (typeof(userId) !== Type.string) { return Error.invalidType(); }
            if (typeof(followingId) !== Type.string) { return Error.invalidType(); }
            return userId + "_follows_" + followingId;
        }

        static convertToGridId(userId, title) {
            if (typeof(userId) !== Type.string) { return Error.invalidType(); }
            if (typeof(title) !== Type.string) { return Error.invalidType(); }
            return title + "_by_" + userId;
        }

        static convertToLikeId(userId, gridId) {
            if (typeof(userId) !== Type.string) { return Error.invalidType(); }
            if (typeof(gridId) !== Type.string) { return Error.invalidType(); }
            return userId + "_likes_"  + gridId;
        }

        static convertToSolutionMatrix(string) {
            if (typeof(string) !== Type.string) { return Error.invalidType(); }
            let matrix = [];
            const lines = string.split("-");
            for (const line of lines) { matrix.push(line.split("").map(char => parseInt(char))); }
            return matrix;
        }

        static convertToSolutionString(solution) {
            let lines = [];
            for (const array of solution) { 
                if (array.length !== 2) { return null; }
                lines.push(array.join("")); 
            }
            return lines.join("-");
        }

        static createUUID() {
            return Consts.uuidFormat.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c === Consts.uuidMark ? r : ((r & 0x3) | 0x8);
                return v.toString(16);
            });
        }

        static isValidMatrix(matrix) {
            const validTiles = new Set(["S", "F", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
            if (typeof(matrix) !== Type.object) { return false; }
            if (matrix.length === 0) { return false; }
            const width = matrix[0].length;
            let startCount = 0;
            let finishCount = 0;
            for (const array of matrix) { 
                if (array.length !== width) { return false; } 
                for(const element of Array.from(array)) {
                    if (element.length !== 1) { return false; }
                    if (!validTiles.has(element)) { return false; }
                    if (element === "S") { startCount += 1; }
                    if (element === "F") { finishCount += 1; }
                }
            }
            if (startCount !== 1) { return false; }
            if (finishCount !== 1) { return false; }
            return true;
        }

    }

    static remove = class {

        static async follow(userId, followingId) {

            // Synchronous Checks
            if (typeof(userId) !== Type.string) { return Error.invalidType(false); }
            if (typeof(followingId) !== Type.string) { return Error.invalidType(false); }
            if (userId === followingId) { return Error.cannotUnfollowYourself(false); }

            try { 

                // Run Transaction
                return await REF.BASE.runTransaction(async function (transaction) {

                    // Asynchronous Checks
                    const userDoc = await transaction.get(REF.USERS.doc(userId));
                    if (!userDoc.exists) { return Error.invalidUser(); }
                    const followingDoc = await transaction.get(REF.USERS.doc(followingId));
                    if (!followingDoc.exists) { return Error.invalidUser(); }
                    const id = Firestore.HASH.convertToFollowId(userId, followingId);
                    if (!(await transaction.get(REF.FOLLOWS.doc(id))).exists) { return Error.alreadyNotFollowed(); }
                    
                    // Write 1
                    const userDict = {};
                    userDict[Consts.numberOfFollowing] = userDoc.data().numberOfFollowing - 1;
                    transaction.update(REF.USERS.doc(userId), userDict);

                    // Write 2
                    const followingDict = {};
                    followingDict[Consts.numberOfFollowers] = followingDoc.data().numberOfFollowers - 1
                    transaction.update(REF.USERS.doc(followingId), followingDict);

                    // Write 3
                    transaction.delete(REF.FOLLOWS.doc(id))
                    
                    return true;

                });

            }

            // Catch Errors
            catch { return Error.firebaseFaliure(false); }

        }

        static async grid(id) {

            // Synchronous Checks
            if (typeof(id) !== Type.string) { return Error.invalidType(false); }

            try { 

                // Please keep these under 200. If higher than 200, risk
                // firebase failing due to max writes limit.
                const likeBatchSize = 200;
                const scoreBatchSize = 200;

                // Get all documents in collections
                const querySnapshotLikes = await REF.GRIDS.doc(id).collection(Consts.likes).orderBy(Consts.created, Consts.ascending).limit(likeBatchSize).get();
                const querySnapshotScores = await REF.GRIDS.doc(id).collection(Consts.scores).orderBy(Consts.created, Consts.ascending).limit(scoreBatchSize).get();

                // Run Transaction
                const statusCode = await REF.BASE.runTransaction(async function (transaction) {

                    // Asynchronous Checks
                    const gridDoc = await transaction.get(REF.GRIDS.doc(id));
                    if (!gridDoc.exists) { return Error.invalidGrid(404); }
                    const creatorDoc = await transaction.get(REF.USERS.doc(gridDoc.data().creatorId));
                    if (!creatorDoc.exists) { return Error.firebaseFaliure(404); }

                    // Write
                    const creatorDict = {};
                    creatorDict[Consts.numberOfTotalLikes] = creatorDoc.data().numberOfTotalLikes - gridDoc.data().numberOfLikes;
                    transaction.update(REF.USERS.doc(gridDoc.data().creatorId), creatorDict);
                    
                    // Batch Delete
                    for (const doc of querySnapshotLikes.docs) {
                        transaction.delete(REF.GRIDS.doc(id).collection(Consts.likes).doc(doc.id));
                    }
                    for (const doc of querySnapshotScores.docs) {
                        transaction.delete(REF.GRIDS.doc(id).collection(Consts.scores).doc(doc.id));
                    }

                    // Return 206 if the batch is not done.
                    if (querySnapshotLikes.size >= likeBatchSize || querySnapshotScores.size >= scoreBatchSize) {
                        return 206;
                    }

                    transaction.delete(REF.GRIDS.doc(id));
                    return 200;

                });

                if (statusCode === 404) { return false; }
                if (statusCode === 200) { return true; }

                while (true) {
                    const batch = REF.BASE.batch();
                    const likeBatch = await REF.GRIDS.doc(id).collection(Consts.likes).orderBy(Consts.created, Consts.ascending).limit(likeBatchSize).get();
                    const scoreBatch = await REF.GRIDS.doc(id).collection(Consts.scores).orderBy(Consts.created, Consts.ascending).limit(scoreBatchSize).get();
                    const isFinished = likeBatch.size < likeBatchSize && scoreBatch.size < scoreBatchSize
                    for (const likeDoc of likeBatch.docs) { batch.delete(REF.GRIDS.doc(id).collection(Consts.likes).doc(likeDoc.id)); }
                    for (const scoreDoc of scoreBatch.docs) { batch.delete(REF.GRIDS.doc(id).collection(Consts.scores).doc(scoreDoc.id)); }
                    if (isFinished) { batch.delete(REF.GRIDS.doc(id)); }
                    await batch.commit();
                    if (isFinished) { 
                        console.log("Completed delete with multiple batches. Theoretically, stray files still may exist. But very very unlikely.");
                        return true; 
                    }
                }

            } 

            // Catch Errors
            catch { return Error.firebaseFaliure(false); }

        }

        static async like(userId, gridId) {

            // Synchronous Checks
            if (typeof(userId) !== Type.string) { return Error.invalidType(false); }
            if (typeof(gridId) !== Type.string) { return Error.invalidType(false); }
            
            try { 

                // Run Transaction
                return await REF.BASE.runTransaction(async function (transaction) {

                    // Asynchronous Checks
                    if (!(await transaction.get(REF.USERS.doc(userId))).exists) { return Error.invalidUser(false); }
                    const gridDoc = await transaction.get(REF.GRIDS.doc(gridId));
                    if (!gridDoc.exists) { return Error.invalidGrid(false); }
                    const likeDoc = await transaction.get(REF.GRIDS.doc(gridId).collection(Consts.likes).doc(userId));
                    if (!likeDoc.exists) { return Error.alreadyNotLiked(false) }
                    const creatorDoc = await transaction.get(REF.USERS.doc(gridDoc.data().creatorId));
                    if (!creatorDoc.exists) { return Error.firebaseFaliure(false); }
                    
                    // Write 1
                    const gridDict = {};
                    gridDict[Consts.numberOfLikes] = gridDoc.data().numberOfLikes - 1;
                    transaction.update(REF.GRIDS.doc(gridId), gridDict);

                    // Write 2
                    const creatorDict = {};
                    creatorDict[Consts.numberOfTotalLikes] = creatorDoc.data().numberOfTotalLikes - 1;
                    transaction.update(REF.USERS.doc(gridDoc.data().creatorId), creatorDict);

                    // Write 3
                    transaction.delete(REF.GRIDS.doc(gridId).collection(Consts.likes).doc(userId));

                    // Return Result
                    return true;

                });

            }

            // Catch Errors
            catch { return Error.firebaseFaliure(false); }

        }

    }

}

export default Firestore;

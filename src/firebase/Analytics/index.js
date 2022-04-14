import {firebase, db} from '../credenciales'
import { doc, setDoc, Timestamp, deleteDoc, getDoc, getDocs, collection } from "firebase/firestore";

var collectionName = 'Analytics';

// Analytics structure
// {
//     "id": "",
//     "userId": "",
//     "date: "",
//     "time": "",
//     "type": "",
//     "productId": "",
// }

// Analytics types options
const AnalyticsTypes = {
    "addToCart": "addToCart",
    "removeFromCart": "removeFromCart",
    "checkout": "checkout",
    "purchase": "purchase",
    "viewProduct": "viewProduct",
    "viewCategory": "viewCategory",
    "viewHome": "viewHome",
}

// Function that creates an id for the analytics and the verifies if it already exists. 
// If it does, it creates a new one. 
// If it doesn't, it returns the id.
export const createId = async () => {
    let id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let exists = await getDoc(collectionName, id);
    if (exists) {
        return createId();
    } else {
        return id;
    }
}

// Function that adds an analytics to the database with the given parameters and verifies if the right parameters are given.
// It also creates a timestamp for the date and time.
// Time is in milliseconds. It represents the time that the user has been on the react component.
// The function works only if the user information is passed.
export const addAnalytics = async (userId, type, productId, time) => {
    if (userId && type && productId && time) {
        let id = await createId();
        let date = new Date();
        let analytics = {
            "id": id,
            "userId": userId,
            "date": date.toDateString(),
            "time": Timestamp.fromMillis(time),
            "type": type,
            "productId": productId,
        }
        await setDoc(collectionName, id, analytics);
    }
}


// Function that returns an array of analitycs filtered by userId, type, productId.
// If the userId is not given, it returns all the analytics filtered by type and productId.
// If the type is not given, it returns all the analytics filtered by userId and productId.
// If the productId is not given, it returns all the analytics filtered by userId and type.
// If the userId, type and productId are not given, it returns all the analytics.
export const getAnalytics = async (userId, type, productId) => {
    let analytics = [];
    let query = collection(collectionName);
    if (userId) {
        query = query.where("userId", "==", userId);
    }
    if (type) {
        query = query.where("type", "==", type);
    }
    if (productId) {
        query = query.where("productId", "==", productId);
    }
    let snapshot = await query.get();
    snapshot.forEach(doc => {
        analytics.push(doc.data());
    });
    return analytics;
}

// Function that filters a given array of analytics by a date interval.
// It returns an array of analytics filtered by the given date interval.
export const getAnalyticsByDate = async (analytics, startDate, endDate) => {
    let filteredAnalytics = [];
    analytics.forEach(analytic => {
        if (analytic.date >= startDate && analytic.date <= endDate) {
            filteredAnalytics.push(analytic);
        }
    });
    return filteredAnalytics;
}

// Function that sums the time of all the analytics in the given array.
// It returns the sum of the time of all the analytics in the given array.
export const getTotalTime = async (analytics) => {
    let totalTime = 0;
    analytics.forEach(analytic => {
        totalTime += analytic.time.seconds * 1000 + analytic.time.nanoseconds / 1000000;
    });
    return totalTime;
}


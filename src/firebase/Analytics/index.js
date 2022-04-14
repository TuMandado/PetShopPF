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

export const createId = async () => {
  var id = "";
  var exists = true;
  while (exists) {
      id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      exists = await checkIfExists(id);
  }
  return id;
}

const checkIfExists = async (id) => {
  var exists = false;
  await getAnalytic(id).then(doc => {
      if (doc){
          exists = true;
      }
  });
  return exists;
}

export async function uploadAnalytic(data) {
  let uid = await createId()
  uid.toString()
  await setDoc(doc(db, collectionName, uid), data);
}

export async function getAnalytic(uid) {
  try {
      let toReturn = await getDoc(doc(db, collectionName, uid));
      return toReturn.data();
  } catch (error) {
      console.log("getAnalytic error: ", error)
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


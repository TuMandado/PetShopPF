import { firebase, db } from "../credenciales";
import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  getDocs,
  updateDoc,
  Timestamp,
  collection,
} from "firebase/firestore";

var collectionName = "VisitsAnalytics";

// Analytics structure
// {
//     "id": "",
//     "userId": "",
//     "date: "",
//     "time": "",
//     "duration": "",
//     "location": {
//         "lat": "",
//         "lng": ""
//     },
// }

export const createId = async () => {
  var id = "";
  var exists = true;
  while (exists) {
    id =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    exists = await checkIfVisitAnalyticExists(id);
  }
  return id;
};

export const checkIfVisitAnalyticExists = async (id) => {
  var exists = false;
  if (id) {
    await getVisitAnalytic(id).then((doc) => {
      if (doc) {
        exists = true;
      }
    });
  }
  return exists;
};

export async function uploadVisitAnalytic(visitId, user, duration, location) {
  try {
    let date = new Date();
    let userId = user ? user.uid : "";
    let visit = {
      uid: visitId,
      userId: userId,
      duration: duration ?? 0,
      date: Timestamp.fromDate(date),
      time: Timestamp.fromDate(date),
      location,
    };
    await setDoc(doc(db, collectionName, visitId), visit).catch((error) => {
      console.log("uploadVisitAnalytic error: ", error);
    });
    return visit;
  } catch (error) {
    console.log("uploadVisitAnalytic error: ", error);
  }
}

export async function updateVisitAnalytic(uid, user, duration, location) {
  var visit = {
    duration: duration,
    location: location,
  };
  if (user) {
    visit = {
      ...visit,
      userId: user.uid,
    };
  }
  console.log("visit: ", visit);
  await updateDoc(doc(db, collectionName, uid), visit);
}

export async function getVisitAnalytic(uid) {
  try {
    let toReturn = await getDoc(doc(db, collectionName, uid));
    return toReturn.data();
  } catch (error) {
    console.log("getAnalytic error: ", error);
  }
}

// Function that returns an array of all visits.
export async function getAllVisits(user) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  let array = [];
  querySnapshot.forEach((doc) => {
    array.push({
      id: doc.id,
      data: doc.data(),
    });
  }
  );
  return array;
}


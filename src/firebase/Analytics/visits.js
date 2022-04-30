import { firebase, db } from "../credenciales";
import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  Timestamp,
} from "firebase/firestore";

var collectionName = "VisitsAnalytics";

// Analytics structure
// {
//     "id": "",
//     "userId": "",
//     "date: "",
//     "time": "",
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

export async function uploadVisitAnalytic(user) {
  try {
    // Get current location
    let location = {
      lat: "",
      lng: "",
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        location.lat = position.coords.latitude;
        location.lng = position.coords.longitude;
      });
    }
    let date = new Date();
    let uid = await createId();
    let userId = user ? user.uid : "";
    let visit = {
      uid: uid,
      userId: userId,
      date: Timestamp.fromDate(date),
      time: Timestamp.fromDate(date),
      location: location,
    };
    await setDoc(doc(db, collectionName, uid), visit);
    return visit;
  } catch (error) {
    console.log("uploadVisitAnalytic error: ", error);
  }
}

export async function updateVisitAnalytic(uid, user) {
  var visit = {
    userId: user.uid,
  };
  await updateDoc(doc(db, collectionName, uid), visit)
}

export async function getVisitAnalytic(uid) {
  try {
    let toReturn = await getDoc(doc(db, collectionName, uid));
    return toReturn.data();
  } catch (error) {
    console.log("getAnalytic error: ", error);
  }
}

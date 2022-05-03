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

var collectionName = "VisitsDurationAnalytics";

// Analytics structure
// {
//     "id": "",
//     "userId": "",
//     "duration": 0,
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
    await getVisitDurationAnalytic(id).then((doc) => {
      if (doc) {
        exists = true;
      }
    });
  }
  return exists;
};

export async function uploadVisitDurationAnalytic(user, duration, visitId) {
  let data = {
    userId: user.uid,
    duration: duration,
    visitId: visitId,
  };
  await setDoc(doc(db, collectionName, visitId), data);
}

export async function updateVisitDurationAnalytic(user, duration, visitId) {
  try {
    let data = {
      userId: user.uid,
      duration: duration,
      visitId: visitId,
    };
    await updateDoc(doc(db, collectionName, visitId), data);
  } catch (error) {
      console.log(visitId);
    console.log("updateVisitDurationAnalytic error: ", error);
    return error;
  }
}

export async function getVisitDurationAnalytic(uid) {
  try {
    let toReturn = await getDoc(doc(db, collectionName, uid));
    return toReturn.data();
  } catch (error) {
    console.log("getAnalytic error: ", error);
  }
}

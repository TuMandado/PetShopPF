import { firebase, db } from "../credenciales";
import {
  doc,
  setDoc,
  Timestamp,
  deleteDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";

var collectionRef = "Comments";

export async function uploadComment(data, uid) {
  await setDoc(doc(db, collectionRef, uid), data);
}

export async function deleteComment(uid) {
  await deleteDoc(doc(db, collectionRef, uid));
}

export async function getComment(uid) {
  try {
    let toReturn = await getDoc(doc(db, collectionRef, uid));
    return toReturn.data();
  } catch (error) {
    console.log("getComment error: ", error);
    return error;
  }
}

export async function getAllComments() {
  const querySnapshot = await getDocs(collection(db, collectionRef));
  let array = [];
  querySnapshot.forEach((doc) => {
    array.push({
      uid: doc.id,
      data: doc.data(),
    });
  });
  return array;
}

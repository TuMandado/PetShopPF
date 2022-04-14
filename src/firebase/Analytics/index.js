import {firebase, db} from '../credenciales'
import { doc, setDoc, Timestamp, deleteDoc, getDoc, getDocs, collection } from "firebase/firestore";

var collectionRef = "Analytics";

export async function uploadAnalytic(data, uid) {
    await setDoc(doc(db, collectionRef, uid), data);
  }

export async function deletePAnalytic(uid) {
    await deleteDoc(doc(db, collectionRef, uid));
  }

export async function getAnalytic(uid) {
    try {
        let toReturn = await getDoc(doc(db, collectionRef, uid));
        return toReturn.data();
    } catch (error) {
        console.log("getAnalytic error: ", error)
        return error
    }
  }

export async function getAllAnalytics() {
    const querySnapshot = await getDocs(collection(db, collectionRef));
    let array = [];
    querySnapshot.forEach((doc) => {
        array.push({
            uid: doc.id,
            data: doc.data()
        });
      });
    return array;
}

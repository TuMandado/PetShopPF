import {firebase, db} from '../credenciales'
import { doc, setDoc, Timestamp, deleteDoc, getDoc, getDocs, collection } from "firebase/firestore";

var collectionRef = "AnimalCategory";

export async function uploadAnimalCategory(data, uid) {
    await setDoc(doc(db, collectionRef, uid), data);
  }

export async function deleteAnimalCategory(uid) {
    await deleteDoc(doc(db, collectionRef, uid));
  }

export async function getAnimalCategory(uid) {
    try {
        let toReturn = await getDoc(doc(db, collectionRef, uid));
        return toReturn.data();
    } catch (error) {
        console.log("getAnimalCategory error: ", error)
        return error
    }
  }

export async function getAllAnimalCategory() {
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
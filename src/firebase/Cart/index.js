import {firebase, db} from '../credenciales'
import { doc, setDoc, Timestamp, deleteDoc, getDoc, getDocs, updateDoc ,collection } from "firebase/firestore";
import { async } from '@firebase/util';

var collectionRef = "Cart";

export async function uploadCart(data, uid) {
    await setDoc(doc(db, collectionRef, uid), data);
  }

export async function deleteCart(uid) {
    await deleteDoc(doc(db, collectionRef, uid));
  }

export async function getCart(uid) {
    try {
        let toReturn = await getDoc(doc(db, collectionRef, uid));
        return toReturn.data();
    } catch (error) {
        console.log("getCart error: ", error)
        return error
    }
  }

export async function getAllCarts() {
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

export async function editCart(uid,data){
    await updateDoc(doc(db, collectionRef, uid), data);
  }
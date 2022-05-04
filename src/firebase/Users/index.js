import { db} from '../credenciales'
import { doc, setDoc, deleteDoc, getDoc,updateDoc, getDocs, collection } from "firebase/firestore";
import auth from '../auth';

var collectionRef = "Users";

export async function uploadUser(uid, data) {
    data.disabled = data.disabled ?? false;
    await setDoc(doc(db, collectionRef, uid), data);
  }

export async function editUser(uid, data) {
    // data.disabled = data.disabled ?? false;
    await updateDoc(doc(db, collectionRef, uid), data);
}

export async function userOff(uid) {
  await updateDoc(doc(db, collectionRef, uid),{disabled:true})
}

export async function userOn(uid) {
  await updateDoc(doc(db, collectionRef, uid),{disabled:false})
  console.log("llegue al onuser 🎎", uid);
}

export async function deleteUser(uid) {
    await deleteDoc(doc(db, collectionRef, uid));
  }

export async function getUser(uid) {
    try {
        let toReturn = await getDoc(doc(db, collectionRef, uid));
        return toReturn.data();
    } catch (error) {
        console.log("getPet error: ", error)
        return error
    }
  }

export async function getAllUsers() {
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

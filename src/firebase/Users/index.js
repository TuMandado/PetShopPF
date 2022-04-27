import { db} from '../credenciales'
import { doc, setDoc, deleteDoc, getDoc,updateDoc, getDocs, collection } from "firebase/firestore";
import auth from '../auth';

var collectionRef = "Users";

export async function uploadUser(uid, data) {
    await setDoc(doc(db, collectionRef, uid), {...data, delete:false});
  }

export async function editUser(uid, data) {
  try {
    await auth.updateUser(uid, data);
  } catch (error) {
    console.log("auth modification error :", error);
  }
    await updateDoc(doc(db, collectionRef, uid), {...data, delete:false});
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

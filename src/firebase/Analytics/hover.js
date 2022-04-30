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

export async function uploadAnalytic(
  userId,
  type,
  productId,
  time
) {
  // Analytics structure
// {
//     "id": "",
//     "userId": "",
//     "date: "",
//     "time": "",
//     "type": "",
//     "productId": "",
// }
  let date = new Date();
  let uid = await createId()
  let data = {
    userId: userId,
    type: type,
    productId: productId,
    time: time,
    date: date.toLocaleDateString(),
  }
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


// Function that returns an array of all analitycs.
export const getAllAnalytics = async () => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    let array = [];
    querySnapshot.forEach((doc) => {
        array.push({
            "id": doc.id,
            "data": doc.data()
        });
    });
    return array;
}

// Function that filters a an array returned by getAllAnalytics.
// The function filters by the userId, productId and the type of the analytic.
export const filterAnalytics = async (array, userId, productId, type) => {
    let filteredArray = [];
    if(userId){
        filteredArray = array.filter(el => el.data.userId === userId);
    }
    if(productId){
        filteredArray = filteredArray.filter(el => el.data.productId === productId);
    }
    if(type){
        filteredArray = filteredArray.filter(el => el.data.type === type);
    }
    return filteredArray;
}



import {firebase, db} from '../credenciales'
import { doc, setDoc, Timestamp, deleteDoc, getDoc, getDocs, collection } from "firebase/firestore";

var collectionRef = "Pets";

export async function uploadPet(data, uid) {
    await setDoc(doc(db, collectionRef, uid), data);
  }

export async function deletePet(uid) {
    await deleteDoc(doc(db, collectionRef, uid));
  }

export async function getPet(uid) {
    try {
        let toReturn = await getDoc(doc(db, collectionRef, uid));
        return toReturn.data();
    } catch (error) {
        console.log("getPet error: ", error)
        return error
    }
  }

export async function getAllPets() {
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




export async function getAllCategories() {
  const querySnapshot = await getDocs(collection(db, collectionRef));
  let category = [];
  querySnapshot.forEach((doc) => {
    category.push({
          uid: doc.id,
          data: doc.data().category
      });
    });
    
  return category;
}



export function filterByOwner(array,Owner){
  let filterOwner = array.filter(el=>el.data.owner.toLowerCase() === Owner.toLowerCase());
  if ( filterOwner.length > 0){
    return filterOwner;
  }
  else {
    let NotFound = ' Not Found';
    return NotFound;
  }

}

export function filterByState(array, state){
  let filterState = array.filter(el=>el.data.state.toLowerCase() === state.toLowerCase());
  if ( filterState.length > 0){
    return filterState;
  }
  else {
    let NotFound = ' Not Found';
    return NotFound;
  }

}

export function filterByCategory(array, Category){
  let filterCategory = array.filter(el=>el.data.category.toLowerCase() === Category.toLowerCase());
  if ( filterCategory.length > 0){
    return filterCategory;
  }
  else {
    let NotFound = ' Not Found';
    return NotFound;
  }

}



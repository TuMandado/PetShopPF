import { db} from '../credenciales'
import { doc, setDoc, deleteDoc, getDoc, getDocs, collection, updateDoc } from "firebase/firestore";

var collectionRef = "Pets";

export async function uploadPet(data) {
    let uid = await createId()
    await setDoc(doc(db, collectionRef,uid), {...data, delete:false});
  }

  //-- Crea el ID --//
  const createId = async () => {
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
    await getPet(id).then(doc => {
        if (doc){
            exists = true;
        }
    });
    return exists;
  }

//--- ---//

export async function editPet(data,uid){ // modifica datos existentes
  await updateDoc(doc(db, collectionRef, uid),data)
}

export async function deletePet(uid) {
  editPet(uid,{delete:true})
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
    let pets = array.filter(el=> el.data.delete === false)
    return pets;
}




export async function getAllCategories() {
  const querySnapshot = await getDocs(collection(db, collectionRef));
  let category = [];
  querySnapshot.forEach((doc) => {
    if (!category.includes(doc.data().category)){
      category.push({
            uid: doc.id,
            data: doc.data().category
        });
    }
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

export async function getStatePets(){
  let pets = await getAllPets();
  let cache = pets.flatMap(el => el.data.state)
  let state = []
  cache.forEach(el => {
      if (!state.includes(el)) {
          state.push(el)
      }
  })

  return state
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


import {firebase, db} from '../credenciales'
import { doc, setDoc, Timestamp, deleteDoc, getDoc, getDocs, collection } from "firebase/firestore";

var collectionRef = "Products";

export async function uploadProduct(data, uid) {
    await setDoc(doc(db, collectionRef, uid), data);
  }

export async function deleteProduct(uid) {
    await deleteDoc(doc(db, collectionRef, uid));
  }

export async function getProduct(uid) {
    try {
        let toReturn = await getDoc(doc(db, collectionRef, uid));
        return toReturn.data();
    } catch (error) {
        console.log("getProduct error: ", error)
    }
  }

export async function getAllProducts(search) {
    const querySnapshot = await getDocs(collection(db, collectionRef));
    let array = [];
    querySnapshot.forEach((doc) => {
      array.push({
        uid: doc.id,
        data: doc.data()
      });
    });
    
    let products = [];
    if(search){
      let productsFound = array.filter(el => el.data.title.toLowerCase().includes(search.toLowerCase()))
      if(productsFound.length){
        products = productsFound
      } else {
        products = [{msg: 'product not found'}]
      }
    } else {
      products = array
    }
    return products;
}

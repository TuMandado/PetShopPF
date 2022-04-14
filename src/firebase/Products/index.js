import {firebase, db} from '../credenciales'
import { doc, setDoc, Timestamp, deleteDoc, getDoc, getDocs,updateDoc , collection } from "firebase/firestore";
import { async } from '@firebase/util';

var collectionRef = "Products";

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
  await deleteProduct(id).then(doc => {
      if (doc){
          exists = true;
      }
  });
  return exists;
}

export async function uploadProduct(data) {
  let uid = await createId()
  uid.toString()
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

export async function getAllProductsCategories(){
  let products = await getAllProducts();
  let cache= products.flatMap(el => el.data.category)
  let categories = []
  cache.forEach(el=>{
    if(!categories.includes(el)){
      categories.push(el)
    }
  })

  return categories
}

export async function filterProductByCategory(array,category){
  let filterProducts = array.filter(el => el.data.category.includes(category))
  let notFound = [{msg: 'product not found'}]
  if(filterProducts.length){
    return filterProducts
  } else {
    return notFound
  }
}

export async function filterProductByAnimal(array,animal){
  let filterProducts =array.filter(el => el.data.animalCategory.includes(animal))
  let notFound = [{msg: 'no products for this animal'}]
  if(filterProducts.length){
    return filterProducts
  } else {
    return notFound
  }
}

export async function editProduct(uid,data){
  await updateDoc(doc(db, collectionRef, uid), data);
}
import {firebase, db} from '../credenciales'
import { doc, setDoc, Timestamp, deleteDoc, getDoc, getDocs, updateDoc ,collection, serverTimestamp, deleteField} from "firebase/firestore";
import { async } from '@firebase/util';

var collectionRef = "Cart";

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
    await getDoc(collectionRef, id).then(doc => {
        if (doc.exists) {
            exists = true;
        }
    });
    return exists;
}

async function uploadCartFirebase(data) {
    let uid = createId()
    await setDoc(doc(db, collectionRef, uid), {...data,createAt: serverTimestamp()});
  }

export async function deleteCartFirebase(uid) {
    await deleteDoc(doc(db, collectionRef, uid));
  }

export async function getCartFirebase(uid) {
    try {
        let toReturn = await getDoc(doc(db, collectionRef, uid));
        return toReturn.data();
    } catch (error) {
        console.log("getCart error: ", error)
        return error
    }
  }

export async function getAllCartsFirebase() {
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

export async function editCartFirebase(uid,data){
    await updateDoc(doc(db, collectionRef, uid), {...data, updateAt: serverTimestamp()});
  }

function cartLocalStorage(data){
    localStorage.setItem("cart",JSON.stringify(data))
}

async function cartOpen(userUid){
    let cars = await getAllCarts()
    let open = cars.filter(el => el.data.close === false) 
    if (open.length){
        let cartUser= open.filter(el => el.uid === userUid)
        if(cartUser.length){
            return cartUser
        }
    }
}


//sigue en obras, pero ya nos estamos acercando al objetivo 
//Un nuevo dia, un nuevo inicio
//Tendre que hacer una documentacion de este monstruo

function sumarItems(db,localS){
    let finishdb = db
    let keys = Object.keys(localS)
    keys.forEach((el)=> finishdb.data[el] ? finishdb.data[el].cantidad = finishdb.data[el].cantidad + localS[el].cantidad : finishdb.data[el]=localS[el]);
    return finishdb
}

export async function newCart(user,data){
    if(user){
        await uploadCartFirebase(data)
    }else{
        cartLocalStorage(data)
    }
}

export async function loginCart(user){
    db = await cartOpen(user.uid)
    if(localStorage.getItem('cart')){
        localS = JSON.parse(localStorage.getItem('cart'))
        if(db && localS){
            let data = sumarItems(db,localS)
            editCartFirebase(db.uid,data)
        } else {
            uploadCartFirebase(localS)
        }
    }
}

////crear funcion, agregar item al carrito, if user, actualiza en db o en localStorage

export async function addItem(user,item){
    if(user){
        let cart = cartOpen(user.uid)
        await editCartFirebase(cart.uid,item)
        let now= getCartFirebase(cart.uid)
        return now
    }else{
        if(localStorage.getItem('cart')){
            let data = JSON.parse(localStorage.getItem('cart'))
            data = {...data, claro}
            localStorage.setItem("cart",JSON.stringify(data))
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
}

////crear funcion, eliminar item al carrito, if user, actualiza en db o en localStorage
export async function deleteItem(user,item){
    if(user){
        let cart = cartOpen(user.uid)
        let data = await getCart(cart.uid)
        await updateDoc(doc(db, collectionRef, uid), {...data,[item]: deleteField()});
        let newCart = await getCart(cart.uid)   
        return newCart
    } else{
        
    }
}
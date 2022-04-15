import {firebase, db} from '../credenciales'
import { doc, setDoc, Timestamp, deleteDoc, getDoc, getDocs, updateDoc ,collection, serverTimestamp} from "firebase/firestore";
import { async } from '@firebase/util';

var collectionRef = "Cart";

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
    await getDoc(collectionRef, id).then(doc => {
        if (doc.exists) {
            exists = true;
        }
    });
    return exists;
}

export async function uploadCart(data) {
    let uid = createId()
    await setDoc(doc(db, collectionRef, uid), {...data,createAt: serverTimestamp()});
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



//Apartir de aca no miren es un monstruo, seguramente lo empiece de nuevo... otra vez
//Pero ya me acerco a lo que quiero
//Si lees esto esta aburrido
//Que tengas un buen dia
//
// export async function newCart(user,data,uid){
//     if (user){
//         prevCart = cartOpen(user.uid)
//         if (prevCart){
//             if(localStorage.getItem('cart')){
//                 let localS = JSON.parse(localStorage.getItem('cart'))
//                 let newCart =sumarItems(prevCart,localS)
//                 await editCart(prevCart.uid,newCart)
//             }
//             editCart()
//         }else{
//             uploadCart()
//         }
//     }
// }

function sumarItems(db,localS){
    let finishdb = db
    let keys = Object.keys(localS)
    keys.forEach((el)=> finishdb.data[el] ? finishdb.data[el].cantidad = finishdb.data[el].cantidad + localS[el].cantidad : finishdb.data[el]=localS[el]);
    return finishdb
}

export async function newCart(user,data){
    if(user){
        await uploadCart(data)
    }else{
        cartLocalStorage(data)
    }
}

////Crear funcion, juntar carritos, la ejecutaran al momento de loguear

////crear funcion, editar carrito, if user, actualiza en db o en localStorage

//// crear funcion, agregar item 
import {firebase, db} from '../credenciales'
import { doc, setDoc, Timestamp, deleteDoc, getDoc, getDocs, updateDoc ,collection, serverTimestamp, deleteField, arrayUnion} from "firebase/firestore";
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
    await getCartFirebase(collectionRef, id).then(doc => {
        if (doc) {
            exists = true;
        }
    });
    return exists;
}

export async function uploadCartFirebase(data) {
    console.log("upload data",data)
    let uid = await createId()
    uid.toString()
    await setDoc(doc(db, collectionRef, uid),data);
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
    console.log("now data",data)
    await updateDoc(doc(db, collectionRef, uid), data);
}

function cartLocalStorage(data){
    localStorage.setItem("cart",JSON.stringify({...data, localCreatedAt: Date()}))
}

export async function cartOpen(user){
    if(user){
        let cars = await getAllCartsFirebase()
        let open = cars.filter(el => el.data.close === false) 
        if (open.length){
            let cartUser= open.filter(el => el.data.uid === user.uid)
            if(cartUser.length){
                return cartUser
            }
        }
    }else{
        if(localStorage.getItem('cart')){
             return JSON.parse(localStorage.getItem('cart'))
        }
    }
}

export async function cartOpenUs(user){
    if(user){

        let cars = await getAllCartsFirebase()
        let open = cars.filter(el => el.data.close === false) 
        if (open.length){
            let cartUser= open.filter(el => el.data.userUid === user.uid)
            if(cartUser.length){
                return cartUser
            }else if(localStorage.getItem('cart')){
                return JSON.parse(localStorage.getItem('cart'))
           }
        }
    }else{
        if(localStorage.getItem('cart')){
             return JSON.parse(localStorage.getItem('cart'))
        }
    }
}

function sumarItems(db,localS){
    let finishdb = db
    let keys = Object.keys(localS)
    keys.forEach((el)=> finishdb.data[el] ? finishdb.data[el].cantidad = finishdb.data[el].cantidad + localS[el].cantidad : finishdb.data[el]=localS[el]);
    return finishdb
}

export async function newCart(user,data){
    if(user){
        let cart = {
            userUid: user.uid,
            createdAt: Date(),
            close: false,
            items: []
        }
        await uploadCartFirebase(cart)
        let newCart = cartOpen()
        if(newCart){
           await addItem(user,data)
           newCart = cartOpen()
        }
        return newCart
    }else{
        let cart = {
            createdAt: Date(),
            close: false,
            items: [data]
        }
        cartLocalStorage(cart)
        return JSON.parse(localStorage.getItem('cart'))
    }
}

export async function loginCart(user){
    db = await cartOpen(user.uid)
    if(localStorage.getItem('cart')){
        let localS = []
        localS = JSON.parse(localStorage.getItem('cart'))
        if(db && localS){
            let data = sumarItems(db,localS)
            editCartFirebase(db.uid,data)
            localStorage.clear()
        } else {
            uploadCartFirebase(localS)
            localStorage.clear()
        }
    }
}

////crear funcion, agregar item al carrito, if user, actualiza en db o en localStorage

export async function addItem(user,item){
    if(user){
        let cart =await cartOpen(user.uid)
        await editCartFirebase(cart[0].uid,{items: arrayUnion(item)})
        let now= await getCartFirebase(cart[0].uid)
        return now
    }else{
        if(localStorage.getItem('cart')){
            let data = JSON.parse(localStorage.getItem('cart'))
            let items = data.items.push(item)
            console.log("data a agregar", data)
            data = {...data, createdAt: Date()}
            localStorage.setItem("cart",JSON.stringify(data))
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
}


export async function deleteItem(user,item){
    if(user){
        let cart = await cartOpen(user.uid)
        await updateDoc(doc(db, collectionRef, cart[0].uid), {...cart[0].data,[item]: deleteField()});
        let newCart = await getCartFirebase(cart[0].uid)  
        return newCart
    } else{
        if(localStorage.getItem('cart')){
            let data = JSON.parse(localStorage.getItem('cart'))
            delete data[item]
            localStorage.setItem("cart",JSON.stringify(data))
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
}

//// traer carrito independientemente de de si esta en localStroage o en firebase

export async function getCart(user,uid){
    if(user){
        let cart = await getCartFirebase(uid)
        return cart
    }else{
        if(localStorage.getItem('cart')){
            let cart = JSON.parse(localStorage.getItem('cart'))
            return cart
        }else{
            let msg = {msg:'no cart created'}
            return msg
        }
    }
}


////modificar cantidad, db, localStore
export async function editCart(user,item,number){
    if(user){
        let cart = await cartOpen(user.uid)
        console.log("item",item)
        let allItems = {item: cart[0].data.items.map((el) =>{
            if(el.id === item.id){
                return { ...el,
                   cantidad : number,
                   updateAt: Date()}
            }else{return el}
        })}
        console.log("allItems",allItems)
        await editCartFirebase(cart[0].uid,allItems)
        let newCart = await getCartFirebase(cart[0].uid)  
        return newCart
    }else{
        if(localStorage.getItem('cart')){
            let data = JSON.parse(localStorage.getItem('cart'))
            for(const prop in newCart){
                if(prop===item){
                    data[prop].cantidad = number
                }
            }
            data = {...data, item, createdAt: Date()}
            localStorage.setItem("cart",JSON.stringify(data))
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
  
}


export async function addCartItem(user,item){
    if(user){
        let open = await cartOpen(user.uid)
        if (open){
            addItem(user,item)
        }else{
            newCart(user,item)
        }
    }else{
        if(localStorage.getItem('cart')){
            addItem(user,item)
        }else{
            newCart(user,item)
        }
    }

}
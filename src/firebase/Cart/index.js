import {firebase, db} from '../credenciales'
import { doc, setDoc, Timestamp, deleteDoc, getDoc, getDocs, updateDoc ,collection, serverTimestamp, deleteField, arrayUnion, arrayRemove} from "firebase/firestore";
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
    console.log("dataaaaa",data,uid)
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
            let cartUser= open.filter(el => el.data.userUid === user)
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

// function sumarItems(db,localS){
//     let finishdb = db[0]
//     console.log("esto llega",finishdb)
//     let keys = Object.keys(localS)
//     keys.forEach((el)=> finishdb.data[el] ? finishdb.data[el].cantidad = finishdb.data[el].cantidad + localS[el].cantidad : finishdb.data[el]=localS[el]);
//     return finishdb
// }

function sumarItems(db,localS){
    let items= localS.items
    console.log("local",items)

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
    if(user){
        let db = await cartOpenUs(user)
       if(localStorage.getItem('cart')){
           let localS = []
           localS = JSON.parse(localStorage.getItem('cart'))
           if(db[0] && localS){
               console.log("esto es db",db," esto es localS", localS)
                let data = localS.items
                if(db[0].data.items){
                    for(let i = 0; i<=db[0].data.items.length-1; i++){
                        for(let j = 0;j<= localS.items.length-1; j++){
                            //console.log("db id", db[0].data.items[i].id,"local id", localS.items[j].id)
                            if(localS.items[j].id===db[0].data.items[i].id){
                                await editCartFirebase(db[0].uid,{items: arrayRemove(db[0].data.items[i])})
                                //.then(console.log("remove esto", db[0].data.items[i]))
                            }
                        }
                    }
                }
                data.forEach(async el => await editCartFirebase(db[0].uid,{items: arrayUnion(el)}))
              localStorage.clear()
           } else {
               localS ={
                   ...localS,
                   userUid: user.uid
               }
               uploadCartFirebase(localS)
               localStorage.clear()
           }
       }
        let newCart = await cartOpenUs(user)
        return newCart
    }else{
        let localS = []
        localS = JSON.parse(localStorage.getItem('cart'))
        console.log('localS',localS)
        if(localS=== null){
            localS = []
        }
        return localS
    }
}

////crear funcion, agregar item al carrito, if user, actualiza en db o en localStorage

export async function addItem(user,item){
    if(user){
        let cart =await cartOpen(user.uid)
        let now= []
        if(cart[0].data.items.length){
            let oldItems = cart[0].data.items
            let find = false
            let items = oldItems.map(el=>{
                if(el.id === item.id){
                    console.log("lo encontre!!",el)
                    find = true
                    let sum = el.quantity + item.quantity
                    return {
                        ...el,
                        quantity: sum
                    }
                }else {
                    return el
                }
            })
            if(!find){
                items.push(item)
            }
            await editCartFirebase(cart[0].uid,{items})
            now= await getCartFirebase(cart[0].uid)
        }else{
            await editCartFirebase(cart[0].uid,{items: arrayUnion(item)})
            now= await getCartFirebase(cart[0].uid)
        }
        return now
    }else{
        if(localStorage.getItem('cart')){
            let data = JSON.parse(localStorage.getItem('cart'))
            if(data.items.length){
                let oldItems = data.items
                let find = false
                let items = oldItems.map(el=>{
                    if(el.id === item.id){
                        console.log("lo encontre!!",el)
                        find = true
                        let sum = el.quantity + item.quantity
                        return {
                            ...el,
                            quantity: sum,
                            updateAt:Date,
                        }
                    }else {
                        return el
                    }
                })
                if(!find){
                    items.push({...item,createdAt: Date()})
                }
                data ={ ...data,
                    items} 
                localStorage.setItem("cart",JSON.stringify(data))
                return JSON.parse(localStorage.getItem('cart'))
            }else{
                data = {...data,items:[{...item, createdAt: Date()}]}
                localStorage.setItem("cart",JSON.stringify(data))
                return JSON.parse(localStorage.getItem('cart'))
            }
        }
    }
}


export async function deleteItem(user,item){
    if(user){
        let cart = await cartOpen(user.uid)
        let items = cart[0].data.items.find(el => el.id=== item.id)
        await editCartFirebase(cart[0].uid,{items: arrayRemove(items)})
        let newCart = await getCartFirebase(cart[0].uid)  
        console.log("ahora sin", newCart)
        return newCart
    } else{
        if(localStorage.getItem('cart')){
            let data = JSON.parse(localStorage.getItem('cart'))
            let items = data.items.filter(el => el.id !== item.id)
            let del = {...data,
                items: items
            }
            localStorage.setItem("cart",JSON.stringify(del))
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
        let allItems = {items: cart[0].data.items.map((el) =>{
            if(el.id === item.id){
                return { ...el,
                    quantity : number,
                   updateAt: Date()}
            }else{return el}
        })}
        await editCartFirebase(cart[0].uid,allItems)
        let newCart = await getCartFirebase(cart[0].uid)  
        return newCart
    }else{
        if(localStorage.getItem('cart')){
            let data = JSON.parse(localStorage.getItem('cart'))
            let allData = { ...data, 
                items: data.items.map((el) =>{
                if(el.id === item.id){
                    return { ...el,
                        quantity : number,
                       updateAt: Date()}
                }else{return el}
            })}
            localStorage.setItem("cart",JSON.stringify(allData))
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
  
}


export async function addCartItem(user,item){
    if(user){
        let open = await cartOpen(user.uid)
        console.log("useeeer",open,"userUid",user.uid)
        if (open){
            await addItem(user,item)
        }else{
            await newCart(user,item)
        }
        let cart = await cartOpen(user.uid)
        return cart
    }else{
        if(localStorage.getItem('cart')){
            await addItem(user,item)
        }else{
            await newCart(user,item)
        }
        let cart = JSON.parse(localStorage.getItem('cart'))
        return cart
    }

}

export async function closeCartFirebase(user){
    console.log("useeeeer",user)
    if(user){
        let cart = await cartOpen(user.uid)
        let close = {...cart[0].data,
            close: true}
        await editCartFirebase(cart[0].uid,close)
        newCart = await getCartFirebase(cart[0].uid)  
        return newCart
    }
}
import {firebase, db} from '../credenciales'
import { doc, setDoc, Timestamp, deleteDoc, getDoc, getDocs, updateDoc ,collection } from "firebase/firestore";
import { async } from '@firebase/util';

var collectionRef = "Reviews";

export async function uploadReview(data, uid) {
    await setDoc(doc(db, collectionRef, uid), data);
  }

export async function deleteReview(uid) {
    await deleteDoc(doc(db, collectionRef, uid));
  }

export async function getReview(uid) {
    try {
        let toReturn = await getDoc(doc(db, collectionRef, uid));
        return toReturn.data();
    } catch (error) {
        console.log("getReview error: ", error)
        return error
    }
  }

export async function getAllReviews() {
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

export async function getReviewByUser(userUid){
    let allreviews = await getAllReviews();
    let byUser = allreviews.filter(el => el.uid === userUid)
    return byUser
}

export async function getReviewByProduct(productUid){
    let allreviews = await getAllReviews();
    let byProduct = allreviews.filter(el => el.uid === productUid)
    return byProduct
}

export async function getProductScore(productUid){
    let reviews = await getReviewByProduct(productUid)
    let scores = reviews.map(el => el.data.score)
    let addScore =  scores.reduce((prev,cur) => prev+cur)
    let totalScore = addScore / scores.length
    return totalScore
}

export async function editReview(uid,data){
    await updateDoc(doc(db, collectionRef, uid), data);
  }
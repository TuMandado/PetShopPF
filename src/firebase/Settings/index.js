import { db } from "../credenciales";
import { doc, getDoc, updateDoc } from "firebase/firestore";

var collectionRef = "AppSettings";
var uid = "settingsValues";

// Settings model
//   "settingsValues": {
//     useVisitsAnalytics: false,
//     useVisitDurationAnalytics: false,
//     useProductsHoverAnalytics: false,
//     useSalesAnalytics: false,
//     productsWeights: {
//       hoverOnCard: 0.5,
//       hoverOnDetails: 0.5,
//       sales: 0.5
//     },

export async function getSettings() {
  try {
    let toReturn = await getDoc(doc(db, collectionRef, uid));
    return toReturn.data();
  } catch (error) {
    console.log("getSettings error: ", error);
  }
}

export async function editSettingValues(data) {
  await updateDoc(doc(db, collectionRef, uid), data);
}

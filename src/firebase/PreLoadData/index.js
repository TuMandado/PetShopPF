// - Users:
//     created: timestamp
//     updated: timestamp
//     mail: string
//     role: admin, client.
//     pets: array de uids
//     carrito de compras: obj {
//                 title
//                 price
//                 quantity
//                     }
//     compras: array de obj:[obj {
//                 title
//                 price
//                 quantity
//                 state
//                 timestamp
//                     }]
//     direccion: obj:{
//             string
//             number
//                 }
// - Productos:
//     created: timestamp
//     updated: timestamp
//     title: string
//     price: number
//     stock: number
//     info: string
//     animalCategory: [strings]
//     category: [strings]

// - Mascotas:
//     created: timestamp
//     updated: timestamp
//     state: en adopcion  perdida  encontrado || nada
//     owner: uid
//     category: string
//     sexo: string
//     description: string
//     ubicacion: obj {
//             longitude: number
//             latitude: number
//                 }
//     photos:[strings]

// Database data configuration
import { pushAllPets } from "./RandomPetFunctions";
import { pushAllProducts } from "./RandomProductsFunctions";

// Push an especified amount of products and pets to the database
export const pushDataToDatabase = async (petsLength, productsLength) => {
  //Check if productsLength is smaller than 720
  if (productsLength < 720) {
    await pushAllPets(petsLength);
    await pushAllProducts(productsLength);
  } else {
    console.log("The amount of products is too big");
  }
};

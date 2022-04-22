import { db } from '../credenciales'
import { doc, setDoc, deleteDoc, getDoc, getDocs, updateDoc, collection } from "firebase/firestore";


var collectionRef = "Products";

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
    await getProduct(id).then(doc => {
        if (doc) {
            exists = true;
        }
    });
    return exists;
}

export async function uploadProduct(data) {
    let uid = await createId()
    uid.toString()
    await setDoc(doc(db, collectionRef, uid), {...data, delete:false});
}


export async function getProduct(uid) {
    try {
        let toReturn = await getDoc(doc(db, collectionRef, uid));
        return toReturn.data();
    } catch (error) {
        console.log("getProduct error: ", error)
    }
}

export async function editProduct(uid, data) {
    await updateDoc(doc(db, collectionRef, uid), data);
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
    if (search) {
        let productsFound = array.filter(el => el.data.name.toLowerCase().includes(search.toLowerCase()))
        if (productsFound.length) {
            products = productsFound
        } else {
            products = [{ msg: 'product not found' }]
        }
    } else {
        products = array.filter(el=> el.data.delete === false)
    }
    return products;
}

export async function getReallyAllProducts() {
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


export async function deleteProduct(uid) {
    editProduct(uid,{delete:true})
}

export async function getAllProductsCategories() {
    let products = await getAllProducts();
    let cache = products.flatMap(el => el.data.category)
    let categories = []
    cache.forEach(el => {
        if (!categories.includes(el)) {
            categories.push(el)
        }
    })

    return categories
}

export async function filterProductByCategory(array, category) {
    let filterProducts = array.filter(el => el.data.category === category)
    let notFound = [{ msg: 'product not found' }]
    if (filterProducts.length) {
        return filterProducts
    } else {
        return notFound
    }
}

export async function getAllProductsAnimal() {
    let products = await getAllProducts();
    let cache = products.flatMap(el => el.data.animalCategory)
    let animalCategory = []
    cache.forEach(el => {
        if (!animalCategory.includes(el)) {
            animalCategory.push(el)
        }
    })

    return animalCategory
}


export async function filterProductByAnimal(array, animal) {
    let filterProducts = array.filter(el => el.data.animalCategory.includes(animal))
    let notFound = [{ msg: 'no products for this animal' }]
    if (filterProducts.length) {
        return filterProducts
    } else {
        return notFound
    }
}

export async function getAllProductsBrand() {
    let products = await getAllProducts();
    let cache = products.flatMap(el => el.data.brand)
    let brand = []
    cache.forEach(el => {
        if (!brand.includes(el)) {
            brand.push(el)
        }
    })

    return brand
}

export async function filterProductByBrand(array, brand) {
    let filterProducts = array.filter(el => el.data.brand.includes(brand))
    let notFound = [{ msg: 'No products for this brand' }]
    if (filterProducts.length) {
        return filterProducts
    } else {
        return notFound
    }
}


export async function getAllProductsSubCategory() {
    let products = await getAllProducts();
    let cache = products.flatMap(el => el.data.subCategory)
    let subCategory = []
    cache.forEach(el => {
        if (!subCategory.includes(el)) {
            subCategory.push(el)
        }
    })

    return subCategory
}

export async function filterProductBySubCategory(array, subCategory) {
    let filterProducts = array.filter(el => el.data.subCategory === subCategory)
    let notFound = [{ msg: 'No products for this subCategory' }]
    if (filterProducts.length) {
        return filterProducts
    } else {
        return notFound
    }
}

export async function filterProducts(array, category, animal = [], minPrice, maxPrice) {
    let filteredProducts;

    if (!minPrice) minPrice = 1
    if (!maxPrice) maxPrice = 99999 

    if (category && !animal.length) {
            filteredProducts = array.filter(el => (
                el.data.subCategory === category || el.data.category === category)
                &&
                ((el.data.price.match(/\d+.\d+(?=,)|Sin Stock/g)[0].split('.').join('') === 'Sin Stock'
                    || el.data.price.match(/\d+.\d+(?=,)|Sin Stock/g)[0].split('.').join('') >= minPrice)
                    &&
                    (el.data.price.match(/\d+.\d+(?=,)|Sin Stock/g)[0].split('.').join('') === 'Sin Stock'
                        || el.data.price.match(/\d+.\d+(?=,)|Sin Stock/g)[0].split('.').join('') <= maxPrice))
            )
        }
    if (!category && animal.length) {
        filteredProducts = array.filter(el => (
            animal.includes(el.data.animalCategory)
            &&
            (el.data.price.match(/\d+.\d+(?=,)|Sin Stock/g)[0].split('.').join('') === 'Sin Stock'
                || el.data.price.match(/\d+.\d+(?=,)|Sin Stock/g)[0].split('.').join('') >= minPrice)
            &&
            (el.data.price.match(/\d+.\d+(?=,)|Sin Stock/g)[0].split('.').join('') === 'Sin Stock'
                || el.data.price.match(/\d+.\d+(?=,)|Sin Stock/g)[0].split('.').join('') <= maxPrice)
        ))
    }
    if (category && animal.length) {
        filteredProducts = array.filter(el => (
            (el.data.subCategory === category ||
                el.data.category === category) &&
            animal.includes(el.data.animalCategory) &&
            (el.data.price.match(/\d+.\d+(?=,)|Sin Stock/g)[0].split('.').join('') === 'Sin Stock'
                || el.data.price.match(/\d+.\d+(?=,)|Sin Stock/g)[0].split('.').join('') >= minPrice)
            &&
            (el.data.price.match(/\d+.\d+(?=,)|Sin Stock/g)[0].split('.').join('') === 'Sin Stock'
                || el.data.price.match(/\d+.\d+(?=,)|Sin Stock/g)[0].split('.').join('') <= maxPrice)
        )
        )
    }

    if (!category && !animal.length) {
        filteredProducts = array.filter(el => (
            (el.data.price.match(/\d+.\d+(?=,)|Sin Stock/g)[0].split('.').join('') === 'Sin Stock'
                || el.data.price.match(/\d+.\d+(?=,)|Sin Stock/g)[0].split('.').join('') >= minPrice)
            &&
            (el.data.price.match(/\d+.\d+(?=,)|Sin Stock/g)[0].split('.').join('') === 'Sin Stock'
                || el.data.price.match(/\d+.\d+(?=,)|Sin Stock/g)[0].split('.').join('') <= maxPrice)
        ))
    }

    let notFound = [{ msg: 'No products found' }]

    if (filteredProducts?.length) return filteredProducts;
    else return notFound;

}
import { collection, getFirestore, query } from "firebase/firestore/lite";
import { FirebaseConfig } from "../Firebase.config";

import type { ProductInterface } from "./inventory.interface";

const db = getFirestore(FirebaseConfig)

const collectionInventory = collection(db, 'inventory')

//* Products
const getProducts = () => {

    const products = query(collectionInventory);
    return products;

}

const getProductsByFilter = (_filter: ProductInterface) => {}



export {
    getProducts,
    getProductsByFilter,
}

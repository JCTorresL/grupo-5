import { collection, getFirestore, query } from "firebase/firestore/lite";
import { FirebaseConfig } from "../Firebase.config";
import type { ProductInterface } from "./products.interface";

const db = getFirestore(FirebaseConfig)
const collectionProducts = collection(db, 'products')

//* PRoducts
const getProducts = () => {

    const products = query(collectionProducts)
    return products

}

const getProductsByFilter = (filter: ProductInterface) => {}

//* Conversations
const getConversations = () => {}
const getConversationById = (id: string) => {}
const createConversation = (conversation: any) => {}


//* Orders
const getOrders = () => {}
const getOrderById = (id: string) => {}
const createOrder = (order: any) => {}
const updateOrder = (id: string, order: any) => {}

export {
    //* Products
    getProducts,
    getProductsByFilter,

    //* Conversations
    getConversations,
    getConversationById,
    createConversation,

    //* Orders
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
}
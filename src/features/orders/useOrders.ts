import { child, get, getDatabase, push, ref, set, update, type DataSnapshot } from "firebase/database";

import { FirebaseConfig } from "../Firebase.config";
import type { Order } from "./orders.interface";

const db = getDatabase(FirebaseConfig)

const collectionOrders = ref(db, 'orders')

const readOrder = (item: DataSnapshot): Order & { id: string } => ({

    ...(item.val() as Order),
    id: item.key as string,

});

const getOrders = async () => {

    const snapshot = await get(collectionOrders);
    const orders: Array<Order & { id: string }> = [];

    snapshot.forEach((item) => {
        orders.push(readOrder(item));
    });

    return orders;

}

const getOrderById = async (id: string) => {

    const snapshot = await get(child(collectionOrders, id));
    if (!snapshot.exists()) return null;

    return readOrder(snapshot);

}

const createOrder = async (order: Order, id?: string) => {

    const item = id ? child(collectionOrders, id) : push(collectionOrders);
    await set(item, order);
    return item.key as string;

}

const updateOrder = async (id: string, order: Partial<Order>) => {

    await update(child(collectionOrders, id), order);

}

export {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
}

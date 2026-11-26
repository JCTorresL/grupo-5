import { FirebaseConfig } from "../Firebase.config";

import { get, getDatabase, orderByChild, push, query, ref, type DataSnapshot } from "firebase/database";

import type { ConversationsInterface } from "./conversation.interface";

const db = getDatabase(FirebaseConfig)

const collectionConversations = ref(db, 'conversations')

type FirebaseValue = string | number | boolean | null;

type FirebaseMessage = { role: FirebaseValue; text: FirebaseValue };

type FirebaseConversationFields = {
    channel: FirebaseValue;
    status: FirebaseValue;
    intent: FirebaseValue;
    result: FirebaseValue;
    alerts?: FirebaseValue | FirebaseValue[];
    startedAt: FirebaseValue;
    endedAt?: FirebaseValue;
    messages?: Array<FirebaseMessage | null> | Record<string, FirebaseMessage>;
};

export type FirebaseConversation = Omit<ConversationsInterface, keyof FirebaseConversationFields>
    & FirebaseConversationFields & { id: string };

const readConversation = (item: DataSnapshot): FirebaseConversation => ({
    ...(item.val() as Omit<FirebaseConversation, 'id'>),
    id: item.key as string,
});

const getConversations = async () => {

    const snapshot = await get(query(collectionConversations, orderByChild("startedAt")));

    const conversations: FirebaseConversation[] = [];

    snapshot.forEach((item) => {
        conversations.push(readConversation(item));
    });

    return conversations;

}

const getConversationById = async (id: string) => {

    const snapshot = await get(ref(db, `conversations/${id}`));
    if (!snapshot.exists()) return null;

    return readConversation(snapshot);

}

const createConversation = async (conversation: ConversationsInterface) => {

    const item = await push(collectionConversations, conversation);
    return item.key;

}

export {
    getConversations,
    getConversationById,
    createConversation,
}

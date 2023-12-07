import {addDoc, collection, deleteDoc, doc, GeoPoint, getDocs, Timestamp, updateDoc} from "firebase/firestore";
import {firestoreDB} from "../config/firebase-config.ts";


const collectionRef = collection(firestoreDB, 'quests');
export const addQuest = async (labels: string, location: { lat: number, lng: number }) => {
    try {
        const newDocRef = await addDoc(collectionRef, {
            quest: `Quest ${labels}`,
            location: new GeoPoint(location.lat, location.lng),
            timestamp: Timestamp.now(),
        });
        return newDocRef.id;
    } catch (e) {
        console.error(e);
    }
}


export const getId = async () => {
    try {
        const querySnapshot = await getDocs(collectionRef);

        return querySnapshot.docs.map((doc) => ({
            docId: doc.id,
        }));
    } catch (e) {
        console.error(e);
    }
};


export const updateQuest = async (questId: string, location: { lat: number, lng: number }): Promise<void> => {
    try {
        const ids = await getId();
        const matchingId = ids!.find((id) => id.docId === questId);
        const questRef = doc(collectionRef, matchingId!.docId);

        await updateDoc(questRef, {
            location: new GeoPoint(location.lat, location.lng),
            timestamp: Timestamp.now(),
        });
    } catch (error) {
        console.error('Error updating quest:', error);
    }
};


export const deleteQuest = async (questId: string) => {
    try {
        const questRef = doc(collectionRef, questId);
        await deleteDoc(questRef);
    } catch (e) {
        console.log(e);
    }
}
import { FIRESTORE_DB } from "../../FirebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

export const useFirestore = () => {
  const addDocument = async (collectionName, data) => {
    try {
      await addDoc(collection(FIRESTORE_DB, collectionName), data);
      console.log("Document added successfully");
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const getDocument = async (userId, collectionName) => {
    try {
      const docRef = doc(FIRESTORE_DB, collectionName, userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  };

  const listenToDocument = (collectionName, userId, onUpdate, onError) => {
    const q = query(
      collection(FIRESTORE_DB, collectionName),
      where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        if (!querySnapshot.empty) {
          const docs = querySnapshot.docs.map((doc) => doc.data());
          onUpdate(docs);
        } else {
          console.log("No documents found.");
          onUpdate([]);
        }
      },
      (error) => {
        console.error("Error listening to document:", error);
        if (onError) {
          onError(error);
        }
      }
    );

    return unsubscribe;
  };

  // More Firestore operations like update, delete can be added here

  return {
    addDocument,
    getDocument,
    listenToDocument,
  };
};

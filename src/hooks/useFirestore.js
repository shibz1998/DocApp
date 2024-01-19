import { FIRESTORE_DB } from "../../FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export const useFirestore = () => {
  const addDocument = async (collectionName, data) => {
    try {
      await addDoc(collection(FIRESTORE_DB, collectionName), data);
      console.log("Document added successfully");
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  // More Firestore operations like update, delete can be added here

  return {
    addDocument,
  };
};

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

  const getDocument = (
    collectionName,
    filterField,
    userId,
    onUpdate,
    onError
  ) => {
    const q = query(
      collection(FIRESTORE_DB, collectionName),
      where(filterField, "==", userId)
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        if (!querySnapshot.empty) {
          const docs = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
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

  const listenToDoctorProfiles = (onUpdate, onError) => {
    const collectionRef = collection(FIRESTORE_DB, "UserProfile");
    const q = query(collectionRef, where("userType", "==", "doctor"));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const doctorProfiles = [];
        querySnapshot.forEach((doc) => {
          doctorProfiles.push({ id: doc.id, ...doc.data() });
        });
        onUpdate(doctorProfiles);
      },
      onError
    );

    return unsubscribe;
  };

  return {
    addDocument,
    getDocument,
    listenToDoctorProfiles,
  };
};

// const listenToDocument = (collectionName, userId, onUpdate, onError) => {
//   const q = query(
//     collection(FIRESTORE_DB, collectionName),
//     where("userId", "==", userId)
//   );
//   const unsubscribe = onSnapshot(
//     q,
//     (querySnapshot) => {
//       if (!querySnapshot.empty) {
//         const docs = querySnapshot.docs.map((doc) => doc.data());
//         onUpdate(docs);
//       } else {
//         console.log("No documents found.");
//         onUpdate([]);
//       }
//     },
//     (error) => {
//       console.error("Error listening to document:", error);
//       if (onError) {
//         onError(error);
//       }
//     }
//   );

//   return unsubscribe;
// };

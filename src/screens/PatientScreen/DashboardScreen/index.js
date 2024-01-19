// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Button,
//   Alert,
// } from "react-native";
// import React, { useState } from "react";
// import { signOut } from "firebase/auth";
// import { FIREBASE_AUTH } from "../../../../FirebaseConfig";

// import { useFirebaseAuth } from "../../../hooks/useFirebaseAuth";

// export default function DashboardScreen(props) {
//   const { signOutUser } = useFirebaseAuth();

//   const auth = FIREBASE_AUTH;
//   return (
//     <View style={styles.container}>
//       <Text>Patient - Dashboard Screen</Text>

//       {/* <Button
//         title="LOG OUT"
//         onPress={async () => {
//           try {
//             await signOut(auth);
//             // setCurrentUser(null);
//             console.log("User signed out successfully!");
//           } catch (error) {
//             console.error("Error signing out:", error.message);
//           }
//         }}
//       /> */}

//       <Button
//         title="LOG OUT"
//         onPress={async () => {
//           try {
//             await signOutUser();

//             console.log("User signed out successfully -----");
//             // Additional logic after sign out (e.g., redirecting to login page)
//           } catch (error) {
//             console.error("Error signing out:", error);
//           }
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from "react-native";

import React, { useState, useEffect } from "react";
import { useFirebaseAuth } from "../../../hooks/useFirebaseAuth";
import { useFirestore } from "../../../hooks/useFirestore";

export default function DashboardScreen(props) {
  const { currentUser, signOutUser } = useFirebaseAuth();
  const { listenToDocument } = useFirestore();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (currentUser) {
      console.log(currentUser.uid);
      const collectionName = "UserProfile";
      const unsubscribe = listenToDocument(
        collectionName,
        currentUser.uid,
        (docs) => setUserData(docs),
        (error) => setError(error)
      );

      return () => unsubscribe();
    } else {
      console.log("error");
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await signOutUser();

      console.log("User signed out successfully -----");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  console.log(userData);

  return (
    <View style={styles.container}>
      <Text>Patient - Dashboard Screen</Text>
      {userData && (
        <View>
          <Text>Name: {userData.name}</Text>
          {/* Render other user data fields as needed */}
        </View>
      )}
      <Button title="LOG OUT" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

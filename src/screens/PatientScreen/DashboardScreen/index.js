import { StyleSheet, Text, View, Button } from "react-native";

import React, { useState, useEffect } from "react";
import { useFirebaseAuth } from "../../../hooks/useFirebaseAuth";
import { useFirestore } from "../../../hooks/useFirestore";

export default function DashboardScreen(props) {
  console.log("Patient Dashboard Running");
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
        (docs) => setUserData(docs[0]),
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
          <Text>contact: {userData.contact}</Text>
          <Text>User Type: {userData.userType}</Text>
          <Text>Name: {userData.email}</Text>
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

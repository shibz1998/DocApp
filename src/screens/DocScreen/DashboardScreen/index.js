import { StyleSheet, Text, View, Button } from "react-native";

import React, { useState, useEffect } from "react";
import { useFirebaseAuth } from "../../../hooks/useFirebaseAuth";
import { useFirestore } from "../../../hooks/useFirestore";

import { useUserContext } from "../../../UserContext";

export default function DashboardScreen(props) {
  console.log("Doctor Dashboard Running");
  const { currentUser, signOutUser } = useFirebaseAuth();
  const { getDocument } = useFirestore();
  const [userData, setUserData] = useState(null);

  const { userID } = useUserContext();

  useEffect(() => {
    const collectionName = "UserProfile";
    const filterField = "userId";
    const unsubscribe = getDocument(
      collectionName,
      filterField,
      userID,
      (docs) => setUserData(docs[0]),
      (error) => setError(error)
    );
    return () => unsubscribe();
  }, []);

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
      <Text>Docotor - Dashboard Screen</Text>
      {userData && (
        <View>
          <Text>Name: {userData.name}</Text>
          <Text>contact: {userData.contact}</Text>
          <Text>User Type: {userData.userType}</Text>
          <Text>Email: {userData.email}</Text>
          <Text>Speciality: {userData.speciality}</Text>
          <Text>Location: {userData.location}</Text>
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

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Button,
} from "react-native";

import React, { useState } from "react";
//   import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";

export default function ManageAppointsment(props) {
  const auth = FIREBASE_AUTH;
  return (
    <View style={styles.container}>
      <Text>Manage Appointsment</Text>

      <Button
        title="LOG OUT"
        onPress={async () => {
          try {
            await signOut(auth);
            console.log("User signed out successfully!");
          } catch (error) {
            console.error("Error signing out:", error.message);
          }
        }}
      />
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

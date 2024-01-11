import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = FIREBASE_AUTH;

  const handleLogin = async () => {
    try {
      // Validate email and password
      if (!email || !password) {
        Alert.alert("Error", "Please enter both email and password");
        return;
      }

      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);

      // Successfully logged in
      console.log("User logged in successfully");
    } catch (error) {
      // Handle login errors
      console.error("Login Error: ", error.message);
      Alert.alert("Error", "Invalid email or password. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>LOGIN SCREEN</Text>

      <TextInput
        placeholder="EMAIL"
        value={email}
        onChangeText={(t) => {
          setEmail(t);
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(t) => {
          setPassword(t);
        }}
      />

      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.navigation.navigate("SignUp")}>
        <Text> Sign Up</Text>
      </TouchableOpacity>
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

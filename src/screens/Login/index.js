import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import InputComponent from "../../components/InputComponent";
import { useForm, FieldValues } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";

import styles from "../../styles/AuthStyles";

export default function Login(props) {
  console.log("Login Page Rendering");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const auth = FIREBASE_AUTH;

  const handleLogin = async (data) => {
    const { Email, Password } = data;

    console.log(Email, Password);
    try {
      if (!Email || !Password) {
        Alert.alert("Error", "Please enter both email and password");
        return;
      }
      await signInWithEmailAndPassword(auth, Email, Password);
      console.log("User logged in successfully");
    } catch (error) {
      console.error("Login Error: ", error.message);
      Alert.alert("Error", "Invalid email or password. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 100, height: 100, borderRadius: 40 }}
          resizeMode="contain"
        />

        <Text style={styles.title}>Login</Text>

        <InputComponent
          control={control}
          placeholder={"Email"}
          name="Email"
          error={errors?.Email}
          autoCapitalize="none"
        />

        <InputComponent
          control={control}
          placeholder={"Password"}
          name="Password"
          error={errors?.Password}
          autoCapitalize="none"
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(handleLogin)}
        >
          <Text style={styles.buttonTextColor}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.text}>{"Not created an account yet?"}</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("SignUp")}>
          <Text style={styles.linkText}> {"Register"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   title: {
//     fontWeight: "bold",
//     fontSize: 30,
//     // color: "#d04531",
//     color: "#94c11e",

//     marginVertical: 10,
//   },

//   button: {
//     backgroundColor: "#212121",

//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 10,
//     margin: 10,
//     marginTop: 15,
//   },
//   input: {
//     borderRadius: 5,
//     padding: 10,
//     margin: 10,
//     backgroundColor: "white",
//     // opacity: 0.9,
//     // zIndex: 0,

//     width: 250,
//   },
//   buttonTextColor: {
//     color: "white",
//   },
//   card: {
//     backgroundColor: "#e4ede7",

//     alignItems: "center",
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 10,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 5,
//   },

//   text: {
//     color: "black", // Adjust the color according to your design
//     // textAlign: 'center',
//     marginTop: 10,
//   },
//   linkText: {
//     color: "#d04531", // Orange color
//     textDecorationLine: "underline",
//   },
// });

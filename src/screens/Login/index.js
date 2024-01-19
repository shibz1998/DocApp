// import {
//   Text,
//   TouchableOpacity,
//   View,
//   Alert,
//   SafeAreaView,
//   Image,
// } from "react-native";
// import React, { useState } from "react";
// import { FIREBASE_AUTH } from "../../../FirebaseConfig";
// import InputComponent from "../../components/InputComponent";
// import { useForm, FieldValues } from "react-hook-form";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import styles from "../../styles/AuthStyles";
// export default function Login(props) {
//   console.log("Login Page Rendering");

//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const auth = FIREBASE_AUTH;

//   const handleLogin = async (data) => {
//     const { Email, Password } = data;

//     console.log(Email, Password);
//     try {
//       if (!Email || !Password) {
//         Alert.alert("Error", "Please enter both email and password");
//         return;
//       }
//       await signInWithEmailAndPassword(auth, Email, Password);
//       console.log("User logged in successfully");
//     } catch (error) {
//       console.error("Login Error: ", error.message);
//       Alert.alert("Error", "Invalid email or password. Please try again.");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.card}>
//         <Image
//           source={require("../../assets/logo.png")}
//           style={{ width: 100, height: 100, borderRadius: 40 }}
//           resizeMode="contain"
//         />

//         <Text style={styles.title}>Login</Text>

//         <InputComponent
//           control={control}
//           placeholder={"Email"}
//           name="Email"
//           error={errors?.Email}
//           autoCapitalize="none"
//         />

//         <InputComponent
//           control={control}
//           placeholder={"Password"}
//           name="Password"
//           error={errors?.Password}
//           autoCapitalize="none"
//           secureTextEntry={true}
//         />

//         <TouchableOpacity
//           style={styles.button}
//           onPress={handleSubmit(handleLogin)}
//         >
//           <Text style={styles.buttonTextColor}>Login</Text>
//         </TouchableOpacity>

//         <Text style={styles.text}>{"Not created an account yet?"}</Text>
//         <TouchableOpacity onPress={() => props.navigation.navigate("SignUp")}>
//           <Text style={styles.linkText}> {"Register"}</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

import {
  Text,
  TouchableOpacity,
  View,
  Alert,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState } from "react";
import InputComponent from "../../components/InputComponent";
import { useForm, FieldValues } from "react-hook-form";
import { useFirebaseAuth } from "../../hooks/useFirebaseAuth";
import styles from "../../styles/AuthStyles";
export default function Login(props) {
  const { signIn } = useFirebaseAuth();
  console.log("Login Page Rendering");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    const { email, password } = data;
    try {
      if (!email || !password) {
        Alert.alert("Error", "Please enter both email and password");
        return;
      }
      await signIn(email, password);
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
          name="email"
          error={errors?.email}
          autoCapitalize="none"
        />

        <InputComponent
          control={control}
          placeholder={"Password"}
          name="password"
          error={errors?.password}
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

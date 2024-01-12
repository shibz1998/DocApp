import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
export default function SignUp(props) {
  const [userType, setUserType] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [specialty, setSpecialty] = useState("");

  const auth = FIREBASE_AUTH;

  // const handleSignUp = async () => {
  //   try {
  //     if (!email || !password) {
  //       Alert.alert("Error", "Please enter both email and password");
  //       return;
  //     }
  //     await createUserWithEmailAndPassword(auth, email, password);
  //     console.log("User signed up successfully");
  //     Alert.alert("Success", "Account created successfully!");
  //   } catch (error) {
  //     console.error("SignUp Error: ", error.message);
  //     Alert.alert("Error", "Failed to create account. Please try again.");
  //   }
  // };

  const handleSignUp = async () => {
    console.log(userType, email, password, name, contact, specialty);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 100, height: 100, borderRadius: 40 }}
          resizeMode="contain"
        />
        <Text style={styles.title}>Register</Text>

        <Text>Choose User Type:</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={
              userType === "doctor"
                ? styles.selectedButton
                : styles.unSelectedButton
            }
            onPress={() => setUserType("doctor")}
          >
            <Text>Doctor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              userType === "patient"
                ? styles.selectedButton
                : styles.unSelectedButton
            }
            onPress={() => setUserType("patient")}
          >
            <Text>Patient</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(t) => {
            setEmail(t);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={(t) => {
            setPassword(t);
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(t) => {
            setName(t);
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          value={contact}
          onChangeText={(t) => {
            setContact(t);
          }}
        />

        {userType === "doctor" && (
          <TextInput
            placeholder="Specialty"
            value={specialty}
            onChangeText={(text) => setSpecialty(text)}
            style={styles.input}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonTextColor}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{}}
          onPress={() => {
            props.navigation.navigate("Login");
          }}
        >
          <Text style={styles.linkText}>{"Back to login"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontWeight: "bold",
    fontSize: 30,
    // color: "#d04531",
    color: "#94c11e",

    marginVertical: 10,
  },

  button: {
    backgroundColor: "#212121",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    marginTop: 15,
  },
  input: {
    borderRadius: 5,
    padding: 5,
    margin: 5,
    backgroundColor: "white",
    // opacity: 0.9,
    // zIndex: 0,

    width: 250,
  },
  buttonTextColor: {
    color: "white",
  },
  card: {
    backgroundColor: "#e4ede7",

    alignItems: "center",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },

  text: {
    color: "black", // Adjust the color according to your design
    // textAlign: 'center',
    marginTop: 10,
  },
  linkText: {
    color: "#d04531", // Orange color
    textDecorationLine: "underline",
  },

  selectedButton: {
    backgroundColor: "lightblue",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    marginTop: 15,
  },

  unSelectedButton: {
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    marginTop: 15,
  },
});

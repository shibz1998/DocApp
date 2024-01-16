// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Alert,
//   SafeAreaView,
//   Image,
// } from "react-native";
// import React, { useState } from "react";
// import { FIREBASE_AUTH } from "../../../FirebaseConfig";
// import { createUserWithEmailAndPassword } from "firebase/auth";

// import styles from "../../styles/AuthStyles";

// import InputComponent from "../../components/InputComponent";
// import { useForm, FieldValues } from "react-hook-form";

// export default function SignUp(props) {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     Alert.alert("Submitted Data", JSON.stringify(data, null, 2));
//   };

//   const [userType, setUserType] = useState(null);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [contact, setContact] = useState("");
//   const [specialty, setSpecialty] = useState("");
//   const [location, setLocation] = useState("");

//   const auth = FIREBASE_AUTH;

//   const handleSignUp = async () => {
//     try {
//       if (!email || !password) {
//         Alert.alert("Error", "Please enter both email and password");
//         return;
//       }
//       await createUserWithEmailAndPassword(auth, email, password);
//       console.log("User signed up successfully");
//       Alert.alert("Success", "Account created successfully!");
//     } catch (error) {
//       console.error("SignUp Error: ", error.message);
//       Alert.alert("Error", "Failed to create account. Please try again.");
//     }
//   };

//   // const handleSignUp = async () => {
//   //   console.log(userType, email, password, name, contact, specialty);
//   // };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.card}>
//         <Image
//           source={require("../../assets/logo.png")}
//           style={{ width: 100, height: 100, borderRadius: 40 }}
//           resizeMode="contain"
//         />
//         <Text style={styles.title}>Register</Text>

//         <Text>Choose User Type:</Text>
//         <View style={{ flexDirection: "row" }}>
//           <TouchableOpacity
//             style={
//               userType === "doctor"
//                 ? styles.selectedButton
//                 : styles.unSelectedButton
//             }
//             onPress={() => setUserType("doctor")}
//           >
//             <Text>Doctor</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={
//               userType === "patient"
//                 ? styles.selectedButton
//                 : styles.unSelectedButton
//             }
//             onPress={() => setUserType("patient")}
//           >
//             <Text>Patient</Text>
//           </TouchableOpacity>
//         </View>

//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={email}
//           onChangeText={(t) => {
//             setEmail(t);
//           }}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           value={password}
//           secureTextEntry={true}
//           onChangeText={(t) => {
//             setPassword(t);
//           }}
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="Name"
//           value={name}
//           onChangeText={(t) => {
//             setName(t);
//           }}
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="Contact Number"
//           value={contact}
//           onChangeText={(t) => {
//             setContact(t);
//           }}
//         />

//         {userType === "doctor" && (
//           <>
//             <TextInput
//               placeholder="Specialty"
//               value={specialty}
//               onChangeText={(text) => setSpecialty(text)}
//               style={styles.input}
//             />
//             <TextInput
//               placeholder="Location"
//               value={location}
//               onChangeText={(t) => setLocation(t)}
//               style={styles.input}
//             />
//           </>
//         )}

//         <TouchableOpacity style={styles.button} onPress={handleSignUp}>
//           <Text style={styles.buttonTextColor}>Sign Up</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={{}}
//           onPress={() => {
//             props.navigation.navigate("Login");
//           }}
//         >
//           <Text style={styles.linkText}>{"Back to login"}</Text>
//         </TouchableOpacity>

//         <InputComponent
//           control={control}
//           placeholder={"Enter User Name"}
//           name="userName"
//           error={errors?.userName}
//           autoCapitalize="none"
//           testID="userName"
//         />

//         <TouchableOpacity style={{}} onPress={handleSubmit(onSubmit)}>
//           <Text style={styles.linkText}>{"Input check"}</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

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
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../../FirebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

// import firestore from "@react-native-firebase/firestore";

import styles from "../../styles/AuthStyles";

import InputComponent from "../../components/InputComponent";
import { useForm, FieldValues } from "react-hook-form";

export default function SignUp(props) {
  console.log("Sign Up page rendering");

  const auth = FIREBASE_AUTH;
  const [userType, setUserType] = useState(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { Email, Password, Name, Contact, Location, Specialty } = data;

    if (userType !== null) {
      createUserWithEmailAndPassword(auth, Email, Password)
        .then(async (userCredential) => {
          const user = userCredential.user;

          await updateProfile(user, {
            displayName: JSON.stringify({ userType: userType }),
          });
          console.log(user.uid);
          const collectionName = "UserProfile";

          try {
            let userProfileData = {
              userId: userCredential.user.uid,
              email: Email,
              password: Password,
              name: Name,
              contact: Contact,
              userType: userType,
            };

            if (userType === "doctor") {
              userProfileData = {
                ...userProfileData, // Spread existing properties
                location: Location,
                speciality: Specialty,
              };
            }

            await addDoc(
              collection(FIRESTORE_DB, collectionName),
              userProfileData
            );

            console.log("User profile added to Firestore successfully!");
            Alert.alert("User profile added successfully!");
          } catch (error) {
            console.error("Error adding user profile to Firestore:", error);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      Alert.alert("Please Select The Account Type");
    }
  };

  // try{
  //   if(userType!=null){
  //     await createUserWithEmailAndPassword(auth, email, password);
  //     Alert.alert("Success", "Account created successfully!");
  //   }

  // }catch(error){

  // }

  // if (userType === "doctor") {
  // } else if (userType === "patient") {
  // }

  // if (userType == "patient") {
  //   Alert.alert(userType);
  // }

  // reset();

  const handleSignUp = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Error", "Please enter both email and password");
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully");
      Alert.alert("Success", "Account created successfully!");
    } catch (error) {
      console.error("SignUp Error: ", error.message);
      Alert.alert("Error", "Failed to create account. Please try again.");
    }
  };

  // const handleSignUp = async () => {
  //   console.log(userType, email, password, name, contact, specialty);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 30, height: 30, borderRadius: 40 }}
          resizeMode="contain"
        />

        <Text style={[styles.title, { fontSize: 20 }]}>Register</Text>

        <Text>Choose Account Type:</Text>
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

        <InputComponent
          control={control}
          placeholder={"Name"}
          name="Name"
          error={errors?.Name}
          autoCapitalize="none"
        />

        <InputComponent
          control={control}
          placeholder={"Contact Number"}
          name="Contact"
          error={errors?.Contact}
          autoCapitalize="none"
        />

        {userType === "doctor" && (
          <>
            <InputComponent
              control={control}
              placeholder={"Specialty"}
              name="Specialty"
              error={errors?.Specialty}
              autoCapitalize="none"
            />

            <InputComponent
              control={control}
              placeholder={"Location"}
              name="Location"
              error={errors?.Location}
              autoCapitalize="none"
            />
          </>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
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

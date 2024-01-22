import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Alert,
  SafeAreaView,
  Image,
} from "react-native";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../UserContext";
import styles from "../../styles/AuthStyles";
import InputComponent from "../../components/InputComponent";
import { useFirebaseAuth } from "../../hooks/useFirebaseAuth";
import { useFirestore } from "../../hooks/useFirestore";

export default function SignUp(props) {
  const { setUserTypeContext } = useUserContext();
  const { signUp } = useFirebaseAuth();
  const { addDocument } = useFirestore();
  const [userType, setUserType] = useState("patient");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password, name, contact, location, speciality } = data;

    if (userType) {
      try {
        const userCredential = await signUp(email, password);
        const user = userCredential.user;
        setUserTypeContext(userType);
        console.log(user.uid);

        const userProfileData = {
          userId: user.uid,
          email,
          name,
          contact,
          userType,
          ...(userType === "doctor" && {
            location,
            speciality,
          }),
        };
        await addDocument("UserProfile", userProfileData);
        console.log("User profile added to Firestore successfully!");
      } catch (error) {
        console.error("Error during sign up:", error);
        Alert.alert("Sign up failed:", error.message);
      }
    } else {
      Alert.alert("Please Select The Account Type");
    }
  };

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

        <InputComponent
          control={control}
          placeholder={"Name"}
          name="name"
          error={errors?.name}
          autoCapitalize="none"
        />

        <InputComponent
          control={control}
          placeholder={"Contact Number"}
          name="contact"
          error={errors?.contact}
          autoCapitalize="none"
        />

        {userType === "doctor" && (
          <>
            <InputComponent
              control={control}
              placeholder={"Speciality"}
              name="speciality"
              error={errors?.speciality}
              autoCapitalize="none"
            />

            <InputComponent
              control={control}
              placeholder={"Location"}
              name="location"
              error={errors?.location}
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

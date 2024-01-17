import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";

import { useUserContext } from "../UserContext";
import {
  Login,
  SignUp,
  DocDashboardScreen,
  PatientDashboardScreen,
} from "../screens";

import { FIREBASE_AUTH } from "../../FirebaseConfig";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: "Sign Up" }}
      />
    </Stack.Navigator>
  );
};

const DocBottomDrawer = () => {
  return (
    <Tab.Navigator initialRouteName="DocDashboardScreen">
      <Tab.Screen
        name="DocDashboardScreen"
        component={DocDashboardScreen}
        options={{ title: "Dashboard" }}
      />
    </Tab.Navigator>
  );
};

const PatientBottomDrawer = () => {
  return (
    <Tab.Navigator initialRouteName="PatientDashboardScreen">
      <Tab.Screen
        name="PatientDashboardScreen"
        component={PatientDashboardScreen}
        options={{ title: "Dashboard" }}
      />
    </Tab.Navigator>
  );
};

export default function Navigator() {
  const { userType, setUserTypeContext } = useUserContext();
  console.log("NAV SCREEN RENDERING");

  const auth = FIREBASE_AUTH;
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        setIsUserLoggedIn(true);
        console.log("User", JSON.stringify(user));
        const displayName = user.displayName;

        console.log(displayName);
        if (displayName) {
          setUserTypeContext(displayName || "");

          console.log(displayName);
        } else {
          setUserTypeContext("");
        }
      } else {
        setIsUserLoggedIn(false);
        setUserTypeContext("");
      }
    });

    return () => unsubscribe();
  }, []);

  return isUserLoggedIn
    ? userType === "doctor"
      ? DocBottomDrawer()
      : PatientBottomDrawer()
    : AuthStack();
}

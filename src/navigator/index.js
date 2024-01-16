import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import {
  Login,
  SignUp,
  DocDashboardScreen,
  PatientDashboardScreen,
} from "../screens";

import { FIREBASE_AUTH } from "../../FirebaseConfig";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Group>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={{ title: "Sign Up" }}
    />
  </Stack.Group>
);

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

const DoctorStack = () => (
  <Stack.Group screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DocBottomDrawer" component={DocBottomDrawer} />
  </Stack.Group>
);

const PatientStack = () => (
  <Stack.Group screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PatientBottomDrawer" component={PatientBottomDrawer} />
  </Stack.Group>
);

export default function Navigator() {
  console.log("NAV SCREEN RENDERING");

  const auth = FIREBASE_AUTH;
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        setIsUserLoggedIn(true);
        console.log("User" + user);
        const displayName = user.displayName;
        if (displayName) {
          const { userType } = JSON.parse(displayName);
          setUserType(userType || "");

          console.log(userType);
        } else {
          setUserType("");
        }
      } else {
        // User is not logged in
        setIsUserLoggedIn(false);
        setUserType("");
      }
    });

    // Cleanup subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  // const isUserLoggedIn = false;
  // const userType = "doctor";

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isUserLoggedIn
        ? userType === "doctor"
          ? DoctorStack()
          : PatientStack()
        : AuthStack()}
    </Stack.Navigator>
  );
}

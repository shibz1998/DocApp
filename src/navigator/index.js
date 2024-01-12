import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Login,
  SignUp,
  DocDashboardScreen,
  PatientDashboardScreen,
} from "../screens";

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
  const isUserLoggedIn = false;
  const userType = "doctor";
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {isUserLoggedIn
        ? userType === "doctor"
          ? DoctorStack()
          : PatientStack()
        : AuthStack()}
    </Stack.Navigator>
  );
}

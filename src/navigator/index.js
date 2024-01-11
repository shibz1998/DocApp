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
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Group>
);

const DocBottomDrawer = () => {
  return (
    <Tab.Navigator initialRouteName="DocDashboardScreen">
      <Tab.Screen name="DocDashboardScreen" component={DocDashboardScreen} />
    </Tab.Navigator>
  );
};

const PatientBottomDrawer = () => {
  return (
    <Tab.Navigator initialRouteName="PatientDashboardScreen">
      <Tab.Screen
        name="PatientDashboardScreen"
        component={PatientDashboardScreen}
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
  const isUserLoggedIn = true;
  const userType = "patient";
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

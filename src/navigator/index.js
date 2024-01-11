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
  <Stack.Navigator>
    <Stack.Screen
      name="PatientDashboardScreen"
      component={PatientDashboardScreen}
    />
    {/* <Stack.Screen name="OtherPatientScreen" component={OtherPatientScreen} /> */}
  </Stack.Navigator>
);

export default function Navigator() {
  const isUserLoggedIn = true; // Replace this with your actual authentication logic

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {isUserLoggedIn ? DoctorStack() : AuthStack()}
    </Stack.Navigator>
  );
}

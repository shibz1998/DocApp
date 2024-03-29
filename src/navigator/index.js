import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useUserContext } from "../UserContext";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Login,
  SignUp,
  DocDashboardScreen,
  DocManageAppointmentsScreen,
  DocUpcomingAppointmentsScreen,
  DocMyProfileScreen,
  PatientDashboardScreen,
  PatientBookAppointmentScreen,
  PatientMyAppointsmentsScreen,
  PatientDoctorDetailsScreen,
  PatientAppointmentDetailedScreen,
} from "../screens";
import LogoutComponent from "../components/LogoutComponent";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import { useFirestore } from "../hooks/useFirestore";

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
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="DocUpcomingAppointmentsScreen"
        component={DocUpcomingAppointmentsScreen}
        options={{
          title: "Upcoming",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="event" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="DocManageAppointmentsScreen"
        component={DocManageAppointmentsScreen}
        options={{
          title: "Manage",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="edit" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="DocMyProfileScreen"
        component={DocMyProfileScreen}
        options={{
          title: "My Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={LogoutComponent}
        options={{
          title: "Logout",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="exit-to-app" size={size} color={color} />
          ),
        }}
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
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="BookAppointment"
        component={PatientDetailsStack}
        options={{
          headerShown: false,
          title: "Book Appointment",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Manage Appointment"
        component={PatientAppointmentDetailsStack}
        options={{
          headerShown: false,
          title: "Manage",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="edit" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Logout"
        component={LogoutComponent}
        options={{
          title: "Logout",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="exit-to-app" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const PatientDetailsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PatientBookAppointmentScreen"
        component={PatientBookAppointmentScreen}
        options={{ title: "Book Appointment" }}
      />

      <Stack.Screen
        name="PatientDoctorDetailsScreen"
        component={PatientDoctorDetailsScreen}
        options={{ title: "Doctor Details" }}
      />
    </Stack.Navigator>
  );
};

const PatientAppointmentDetailsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PatientMyAppointsmentsScreen"
        component={PatientMyAppointsmentsScreen}
        options={{ title: "Manage Appointments" }}
      />
      <Stack.Screen
        name="PatientAppointmentDetailedScreen"
        component={PatientAppointmentDetailedScreen}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
};

export default function Navigator() {
  const { userType, setUserTypeContext, setUserIDContext } = useUserContext();
  const { currentUser, signOutUser } = useFirebaseAuth();
  const { getDocument } = useFirestore();
  const [error, setError] = useState(null);
  console.log("NAV SCREEN RENDERING");

  useEffect(() => {
    if (currentUser) {
      console.log("User ID  --------", currentUser.uid);
      setUserIDContext(currentUser.uid);
      const collectionName = "UserProfile";
      const filterField = "userId";

      const unsubscribe = getDocument(
        collectionName,
        filterField,
        currentUser.uid,
        (docs) => setUserTypeContext(docs[0].userType),
        (error) => setError(error)
      );
      return () => unsubscribe();
    } else {
      setUserTypeContext("");
      console.log("Current user should be null  ||" + currentUser);
    }
  }, [currentUser]);

  if (!currentUser) {
    return <AuthStack />;
  } else if (userType === "doctor") {
    return <DocBottomDrawer />;
  } else if (userType === "patient") {
    return <PatientBottomDrawer />;
  } else {
    // return <AuthStack />;
    return null;
  }

  // return isUserLoggedIn && userType === "doctor"
  //   ? DocBottomDrawer()
  //   : AuthStack() || (isUserLoggedIn && userType === "patient")
  //   ? PatientBottomDrawer()
  //   : AuthStack();

  //isUserLoggedIn
  // ? userType === "doctor"
  //   ? DocBottomDrawer()
  //   : userType === "patient"
  //   ? PatientBottomDrawer()
  //   : AuthStack()
  // : AuthStack();
}

// import React, { useState, useEffect } from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { onAuthStateChanged } from "firebase/auth";
// import { useUserContext } from "../UserContext";
// import {
//   Login,
//   SignUp,
//   DocDashboardScreen,
//   PatientDashboardScreen,
// } from "../screens";

// import { FIREBASE_AUTH } from "../../FirebaseConfig";

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// const AuthStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen
//         name="SignUp"
//         component={SignUp}
//         options={{ title: "Sign Up" }}
//       />
//     </Stack.Navigator>
//   );
// };

// const DocBottomDrawer = () => {
//   return (
//     <Tab.Navigator initialRouteName="DocDashboardScreen">
//       <Tab.Screen
//         name="DocDashboardScreen"
//         component={DocDashboardScreen}
//         options={{ title: "Dashboard" }}
//       />
//       {/* <Tab.Screen
//         name="DocUpcomingAppointments"
//         component={DocUpcomingAppointments}
//         options={{ title: "Upcoming Appointsment" }}
//       />

//       <Tab.Screen
//         name="DocUpcomingAppointments"
//         component={DocUpcomingAppointments}
//         options={{ title: "Manage Appointsment" }}
//       /> */}
//     </Tab.Navigator>
//   );
// };

// const PatientBottomDrawer = () => {
//   return (
//     <Tab.Navigator initialRouteName="PatientDashboardScreen">
//       <Tab.Screen
//         name="PatientDashboardScreen"
//         component={PatientDashboardScreen}
//         options={{ title: "Dashboard" }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default function Navigator() {
//   const { userType, setUserTypeContext } = useUserContext();
//   console.log("NAV SCREEN RENDERING");
//   // console.log("UserType:: " + userType);
//   console.log("UserType");

//   const auth = FIREBASE_AUTH;
//   const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is logged in
//         setIsUserLoggedIn(true);
//         console.log("User", JSON.stringify(user));
//         const displayName = user.displayName;

//         console.log(displayName);
//         if (displayName) {
//           setUserTypeContext(displayName || "");

//           console.log(displayName);
//         } else {
//           setUserTypeContext("");
//         }
//       } else {
//         setIsUserLoggedIn(false);
//         setUserTypeContext("");
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return isUserLoggedIn
//     ? userType === "doctor"
//       ? DocBottomDrawer()
//       : PatientBottomDrawer()
//     : AuthStack();
// }

import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { onAuthStateChanged } from "firebase/auth";
import { useUserContext } from "../UserContext";
import {
  Login,
  SignUp,
  DocDashboardScreen,
  PatientDashboardScreen,
  PatientAppointmentScreen,
} from "../screens";

// import { FIREBASE_AUTH } from "../../FirebaseConfig";

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
        options={{ title: "Dashboard" }}
      />
      {/* <Tab.Screen
        name="DocUpcomingAppointments"
        component={DocUpcomingAppointments}
        options={{ title: "Upcoming Appointsment" }}
      />

      <Tab.Screen
        name="DocUpcomingAppointments"
        component={DocUpcomingAppointments}
        options={{ title: "Manage Appointsment" }}
      /> */}
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
      <Tab.Screen
        name="PatientAppointmentScreen"
        component={PatientAppointmentScreen}
        options={{ title: "Appointment" }}
      />
    </Tab.Navigator>
  );
};

export default function Navigator() {
  const { userType, setUserTypeContext } = useUserContext();
  const { currentUser } = useFirebaseAuth();

  const { listenToDocument } = useFirestore();
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  console.log("NAV SCREEN RENDERING");
  console.log("UserType:: " + userType);

  // const auth = FIREBASE_AUTH;
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(currentUser);
  const isUserLoggedIn = currentUser != null;

  useEffect(() => {
    if (currentUser) {
      console.log("User For  --------", currentUser.uid); //JSON.stringify(currentUser.uid)
      // setUserTypeContext(userType);

      const collectionName = "UserProfile";
      const unsubscribe = listenToDocument(
        collectionName,
        currentUser.uid,
        (docs) => setUserTypeContext(docs[0].userType),
        (error) => setError(error)
      );
      console.log(userType);
      return () => unsubscribe();
    } else {
      setUserTypeContext("");
      console.log("Current user set to " + currentUser);
      // setIsUserLoggedIn(false);
    }
  }, [currentUser, setUserTypeContext]);

  if (!currentUser) {
    return <AuthStack />;
  } else if (userType === "doctor") {
    return <DocBottomDrawer />;
  } else if (userType === "patient") {
    return <PatientBottomDrawer />;
  } else {
    return <AuthStack />;
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

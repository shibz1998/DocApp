import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Login, SignUp } from "./src/screens";
import { NavigationContainer } from "@react-navigation/native";

import Navigator from "./src/navigator";

import { UserProvider } from "./src/UserContext";

export default function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Login">
    //     <Stack.Screen name="Login" component={Login}></Stack.Screen>
    //     <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
    //   </Stack.Navigator>
    // </NavigationContainer>
    <UserProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </UserProvider>
  );
}

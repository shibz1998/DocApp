import { NavigationContainer } from "@react-navigation/native";

import Navigator from "./src/navigator";

import { UserProvider } from "./src/UserContext";

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </UserProvider>
  );
}

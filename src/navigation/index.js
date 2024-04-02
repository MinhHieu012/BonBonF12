import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../hook";
import AuthNavigator from "./auth-navigation";
import AppNavigator from "./app-navigation";

const Stack = createNativeStackNavigator();
const Navigation = () => {
  // const { token } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {token != null ? (
          <Stack.Screen
            name="App"
            options={{ headerShown: false }}
            component={AppNavigator}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            options={{ headerShown: false }}
            component={AuthNavigator}
          />
        )} */}
        <Stack.Screen
            name="App"
            options={{ headerShown: false }}
            component={AppNavigator}
          />
        {console.log("test")}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;

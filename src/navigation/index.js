import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {useAuth} from "../hook/index"
import AuthNavigator from "./auth-navigation";
import AppNavigator from "./app-navigation";

const Stack = createNativeStackNavigator();
export default function Navigation() {
  const {token} = useAuth()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token !== null ? (
          <Stack.Screen
            name="App"
            component={AppNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
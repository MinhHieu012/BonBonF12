import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "../login-view";
const Stack = createNativeStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Authen"
        options={{ headerShown: false }}
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};
export default AuthNavigator;

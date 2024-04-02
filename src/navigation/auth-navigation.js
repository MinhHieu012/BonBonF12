import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Authen from "../login-view";
const Stack = createNativeStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Authen"
        options={{ headerShown: false }}
        component={Authen}
      />
    </Stack.Navigator>
  );
};
export default AuthNavigator;

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Layout from "../layout";
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Layout"
        options={{ headerShown: false }}
        component={Layout}
      />
    </Stack.Navigator>
  );
};
export default AppNavigator;

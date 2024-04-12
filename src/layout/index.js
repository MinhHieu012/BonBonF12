import { Easing } from "react-native";
import { useSelector } from "react-redux";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import ProductScreen from "../product-view";
import CartScreen from "../cart-view";
import ImportWareHouseScreen from "../import-ware-house-view";
import CreateProductScreen from "../create-product-view";
import ListOrderScreen from "../list-order-view";
import DetailOrderScreen from "../detail-orders-view";
import CustomeDrawer from "./side-bar-component";
import WarehouseScreen from "../warehouse-view";
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const config = {
  animation: " timing ",
  config: { duration: 200, easing: Easing.linear },
};
const handleTakeToken = () => {
  const useToken = useSelector((state) => state.auth.token);
  return useToken;
};

const ProductNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        transitionSpec: {
          open: config,
          close: config,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerMode: "none",
      }}
    >
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
    </Stack.Navigator>
  );
};

const WareHouseNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        transitionSpec: {
          open: config,
          close: config,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerMode: "none",
      }}
    >
      <Stack.Screen
        name="ImportWareHouseScreen"
        component={ImportWareHouseScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
      <Stack.Screen
        name="CreateProduct"
        component={CreateProductScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
    </Stack.Navigator>
  );
};

const ListOrderNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        transitionSpec: {
          open: config,
          close: config,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerMode: "none",
      }}
    >
      <Stack.Screen
        name="ListOrderScreen"
        component={ListOrderScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
      <Stack.Screen
        name="DetailOrder"
        component={DetailOrderScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
    </Stack.Navigator>
  );
};

export default function Layout() {
  const role = handleTakeToken();
  return (
    <Drawer.Navigator
      initialRouteName={
        role.role === "admin" || role.role === "sale" ? "Product" : "Warehouse"
      }
      screenOptions={{ drawerType: "front" }}
      drawerContent={(props) => <CustomeDrawer {...props} />}
    >
      <Drawer.Screen
        name="Product"
        component={ProductNavigation}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
      <Drawer.Screen
        name="ImportWareHouse"
        component={WareHouseNavigation}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
      <Drawer.Screen
        name="ListOrder"
        component={ListOrderNavigation}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
      <Drawer.Screen
        name="Warehouse"
        component={WarehouseScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
    </Drawer.Navigator>
  );
}

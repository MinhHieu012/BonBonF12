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
import WarehouseScreen from "../warehouse-view"
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const config = {
  animation: " timing ",
  config: { duration: 200, easing: Easing.linear },
};
const handleTakeToken = () => {
  const useToken = useSelector((state) => state.auth).token;
  return useToken;
};
const ProductNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerMode: "none",
        open: { config },
      }}
      cardStyleInterpolator={CardStyleInterpolators.forHorizontalIOS}
    >
      <Stack.Screen
        name="ProductScreen"
        options={{ headerShown: false, unmountOnBlur: true }}
      />
      <Stack.Screen
        name="CartScreen"
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
        headerMode: "none",
        open: { config },
      }}
      cardStyleInterpolator={CardStyleInterpolators.forHorizontalIOS}
    >
      <Stack.Screen
        name="ImportWareHouseScreen"
        options={{ headerShown: false, unmountOnBlur: true }}
      />
      <Stack.Screen
        name="CreateProduct"
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
        headerMode: "none",
        open: { config },
      }}
      cardStyleInterpolator={CardStyleInterpolators.forHorizontalIOS}
    >
      <Stack.Screen
        name="ListOrderScreen"
        options={{ headerShown: false, unmountOnBlur: true }}
      />
      <Stack.Screen
        name="DetailOrder"
        options={{ headerShown: false, unmountOnBlur: true }}
      />
    </Stack.Navigator>
  );
};
const Layout = () => {
  const role = handleTakeToken();
  return (
    <Drawer.Navigator
      screenOptions={{ drawerType: "front" }}
      initialRouteName={
        role === "admin" || role === "sale" ? "Product" : "Warehouse"
      }
      drawerContent={(props) => {
        return <CustomeDrawer {...props} />;
      }}
    >
      <Drawer.Screen
        name="Product"
        options={{ headerShown: false, unmountOnBlur: true }}
        ProductNavigation={ProductNavigation}
        component={ProductScreen}
      />
      <Drawer.Screen
        name="ImportWareHouse"
        options={{ headerShown: false, unmountOnBlur: true }}
        WareHouseNavigation={WareHouseNavigation}
        component={ImportWareHouseScreen}
      />
      <Drawer.Screen
        name="ListOrder"
        options={{ headerShown: false, unmountOnBlur: true }}
        ListOrderNavigation={ListOrderNavigation}
        component={ListOrderScreen}
      />
      <Drawer.Screen
        name="Warehouse"
        options={{ headerShown: false, unmountOnBlur: true }}
        WarehouseScreen={WarehouseScreen}
        component={WarehouseScreen}
      />
    </Drawer.Navigator>
  );
};

export default Layout
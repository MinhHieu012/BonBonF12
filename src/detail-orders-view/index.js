import React, { useEffect, useState } from "react";
import { TabView, SceneMap } from "react-native-tab-view";
import { SafeAreaView, useWindowDimensions } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Box } from "@gluestack-ui/themed";
import { styles } from "./style";
import { tabsConfig } from "./config";
import {
  HeaderBackCommon,
  LoadingCommon,
  TotalPriceCommon,
} from "../component";
import { TabBar, DeliveredComponent, EmptyComponent } from "./tabs-component";
import { timeoutGet } from "../utils";

export default function DetailOrderScreen(props) {
  const routeParams = useRoute();
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState(tabsConfig);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState();
  const onBackOrder = () => {
    navigation.navigate("ListOrderScreen");
  };

  const onPressTabs = (val) => {
    setIndex(val.index);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(routeParams.params.listProduct);
      setLoading(false);
    }, timeoutGet);
  }, [routeParams.params.listProduct]);

  const renderScene = SceneMap({
    1: EmptyComponent,
    2: () =>
      DeliveredComponent({
        data,
      }),
    3: EmptyComponent,
  });

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Box style={styles.header}>
          <HeaderBackCommon
            onBack={onBackOrder}
            status={routeParams.params.status}
            title={`${routeParams.params.orderCode} - ${routeParams.params.status}`}
          />
        </Box>
        <TabView
          style={styles.content}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={(data) => (
            <TabBar
              data={data}
              onPressTabs={onPressTabs}
              activeTab={index}
              status={routeParams.params.status}
            />
          )}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
        <TotalPriceCommon
          customer={routeParams.params.customer}
          isButton={false}
          totalPrice={routeParams.params.orderPrice}
        />
      </SafeAreaView>
      <LoadingCommon isOpen={isLoading} />
    </>
  );
}

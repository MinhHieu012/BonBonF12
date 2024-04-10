import React, { useEffect, useState } from "react";
import { TabView, SceneMap } from "react-native-tab-view";
import { SafeAreaView, useWindowDimensions } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Box } from "@gluestack-ui/themed";
import { tabsConfig } from "./config";
import {
    HeaderBackCommon,
    LoadingCommon,
    TotalPriceCommon,
} from "../component";
import { TabBar, DeliveredComponent, EmptyComponent } from "./tabs-component";
import { timeoutGet } from "../utils";
import { styles } from "./style";

const DetailOrderScreen = (props) => {
    const routeParams = useRoute();
    const navigation = useNavigation();
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(1);
    const [routes] = useState(tabsConfig);
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState(false);

    const onBackOrder = () => {
        navigation.navigate("ListOrderScreen");
    };

    const onPressTabs = (val) => {
        setIndex(val);
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setData(routeParams.params.listProduct);
            setLoading(false);
        }, timeoutGet);
    });

    const renderScene = SceneMap({
        1: <EmptyComponent/>,
        2: () => {
            <DeliveredComponent data={data}/>
        },
        3: <EmptyComponent/>,
    });
    
    return (
        <>
            <SafeAreaView style={styles.container}>
                <Box style={styles.header}>
                    <HeaderBackCommon
                        onBack={onBackOrder}
                        status={routeParams.params.status}
                        title={`${routeParams.params.orderCod} - ${routeParams.params.status}`}
                    />
                </Box>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={(data) => {
                        return (
                            <TabBar
                                data={data}
                                onPressTabs={onPressTabs}
                                activeTab={index}
                                status={routeParams.params.status}
                            />
                        );
                    }}
                />
                <TotalPriceCommon
                    customer={routeParams.params.customer}
                    isButton={false}
                    totalPrice={routeParams.params.orderPrice}
                    isOpen={isLoading}
                />
            </SafeAreaView>
            <LoadingCommon />
        </>
    );
};

export default DetailOrderScreen
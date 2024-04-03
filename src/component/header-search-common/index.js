import { debounce } from "lodash";
import {
    View,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from "react-native";
import { React, useState, useCallback, useEffect, useRef } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import timeout from "../../utils";
import {
    Box,
    HStack,
    Input,
    InputField,
    InputSlot,
    Text,
} from "@gluestack-ui/themed";
const HeaderSearchCommon = (props) => {
    const [textSearch, setTextSearch] = useState("");
    const refInput = useRef("");
    const { navigation, onGetTextSearch } = props;
    const onOpenDrawer = () => {
        navigation.openDrawer();
    };
    const onSearch = (keyword) => {
        setTextSearch(keyword);
    };
    const debouncedHandleSearch = useCallback(() => {
        debounce(onSearch);
    }, timeout);
    const onClearTextSearch = () => {
        setTextSearch("");
        refInput.current.clear();
    };
    useEffect(() => {
        onGetTextSearch(textSearch);
        setTextSearch(textSearch);
    }, [textSearch]);
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Text
                    style={{ display: Platform.OS === "android" ? "flex" : "none" }}
                ></Text>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Box>
                        <HStack alignItems="center" space="sm">
                            <Feather
                                name="menu"
                                size={35}
                                color="white"
                                onPress={onOpenDrawer}
                            />
                            <Input
                                style={styles.input}
                                variant="outline"
                                size="sm"
                                borderRadius={"$2xl"}
                            >
                                <InputField
                                    placeholder="Tìm kiếm"
                                    color="white"
                                    onChangeText={(val) => {
                                        debouncedHandleSearch(val);
                                    }}
                                    ref={refInput}
                                />
                                <InputSlot style={{ marginRight: 12 }}>
                                    <AntDesign
                                        name="close"
                                        size={15}
                                        color="gray"
                                        style={{ display: textSearch ? "flex" : "none" }}
                                        onPress={onClearTextSearch}
                                    />
                                </InputSlot>
                                <InputSlot>
                                    <AntDesign name="search1" size={18} color="white" />
                                </InputSlot>
                            </Input>
                        </HStack>
                    </Box>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </View>
    );
};

export default HeaderSearchCommon;

import { AntDesign, Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Avatar, AvatarImage, HStack, Text, View } from "@gluestack-ui/themed";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import { LayoutAnimation, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { useAuth } from "../hook";
import { color } from "../utils";

const handleTakeToken = () => {
    const useToken = useSelector((state) => state.auth.token);
    return {
        useToken,
    };
};
const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen((value) => !value);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };

    return (
        <>
            <TouchableOpacity
                onPress={toggleOpen}
                style={styles.heading}
                activeOpacity={0.6}
            >
                {title}
                <Ionicons
                    name={isOpen ? "chevron-up-outline" : "chevron-down-outline"}
                    size={18}
                    color="grey"
                />
            </TouchableOpacity>
            <View style={[styles.list, !isOpen ? styles.hidden : undefined]}>
                {children}
            </View>
        </>
    );
};

const MenuItemCollapse = ({ label, subLabel, onNavigate, activeScreen }) => {
    return (
        <View style={styles.safeArea}>
            <Accordion
                title={
                    <HStack>
                        {label == " Hàng xuất" ? (
                            <Entypo
                                style={styles.icon}
                                name="export"
                                size={24}
                                color="grey"
                            />
                        ) : (
                            <FontAwesome5
                                style={styles.icon2}
                                name="warehouse"
                                size={18}
                                color="grey"
                            />
                        )}
                        <Text style={styles.text}>{label}</Text>
                    </HStack>
                }
            >
                <DrawerItem
                    activeBackgroundColor="#dff5f1"
                    labelStyle={{ color: "grey" }}
                    focused={activeScreen === subLabel[0].screen}
                    label={subLabel[0].name}
                    onPress={() => onNavigate(subLabel[0].screen)}
                ></DrawerItem>
                <DrawerItem
                    activeBackgroundColor="#dff5f1"
                    labelStyle={{ color: "grey" }}
                    focused={activeScreen === subLabel[1].screen}
                    label={subLabel[1].name}
                    onPress={() => onNavigate(subLabel[1].screen)}
                ></DrawerItem>
            </Accordion>
        </View>
    );
};

export default function CustomeDrawer(props) {
    const { handleLogOut } = useAuth();
    const role = handleTakeToken();
    const { navigation } = props;
    const [activeScreen, setActiveScreen] = useState("");
    useEffect(() => {
        if (role.useToken.role === "admin" || role.useToken.role === "sale") {
            setActiveScreen("Product")
        } else {
            setActiveScreen("Warehouse")
        }
    }, [role.useToken.role])
    const onNavigate = (data) => {
        setActiveScreen(data)
        navigation.navigate(data);
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView>
                <View>
                    <TouchableOpacity style={{ flexDirection: "row" }}>
                        <View style={{ marginTop: 15, marginBottom: 10 }}>
                            <Avatar size="lg" style={{ marginLeft: 15 }}>
                                <AvatarImage
                                    alt="avatar"
                                    source={{
                                        uri: role.useToken.avatar,
                                    }}
                                />
                            </Avatar>
                        </View>
                        <View style={{ marginLeft: 10, marginTop: 22 }}>
                            <Text size="lg" color={"#0E6F64"} fontWeight={"bold"}>
                                {role.useToken.userName}
                            </Text>
                            <Text style={{ marginLeft: 2 }} size="xs" color={"grey"}>
                                {role.useToken.role + " - " + role.useToken.phoneNumber}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {role.useToken.role === "admin" ? (
                        <>
                            <MenuItemCollapse
                                onNavigate={onNavigate}
                                activeScreen={activeScreen}
                                label=" Hàng xuất"
                                navigation={navigation}
                                subLabel={[
                                    { name: "- Sản phẩm xuất", screen: "Product" },
                                    { name: "- Danh sách yêu cầu", screen: "ListOrder" },
                                ]}
                            />
                            <MenuItemCollapse
                                onNavigate={onNavigate}
                                activeScreen={activeScreen}
                                label="Quản lý kho"
                                navigation={navigation}
                                subLabel={[
                                    { name: "- Danh sách kho", screen: "Warehouse" },
                                    { name: "- Nhập kho", screen: "ImportWareHouse" },
                                ]}
                            />
                        </>
                    ) : role.useToken.role === "kho" ? (
                        <MenuItemCollapse
                            onNavigate={onNavigate}
                            activeScreen={activeScreen}
                            label="Quản lý kho"
                            navigation={navigation}
                            subLabel={[
                                { name: "- Danh sách kho", screen: "Warehouse" },
                                { name: "- Nhập kho", screen: "ImportWareHouse" },
                            ]}
                        />
                    ) : (
                        <MenuItemCollapse
                            onNavigate={onNavigate}
                            activeScreen={activeScreen}
                            label="Hàng xuất"
                            navigation={navigation}
                            subLabel={[
                                { name: "- Sản phẩm xuất", screen: "Product" },
                                { name: "- Danh sách yêu cầu", screen: "ListOrder" },
                            ]}
                        />
                    )}
                    <View style={styles.safeArea}>
                        <TouchableOpacity style={{ paddingTop: 15 }}>
                            <HStack>
                                <Ionicons
                                    style={styles.icon}
                                    name="notifications"
                                    size={24}
                                    color="grey"
                                />
                                <Text style={styles.text}> Thông báo</Text>
                            </HStack>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.safeArea}>
                        <TouchableOpacity style={{ paddingTop: 20 }}>
                            <HStack>
                                <Ionicons
                                    style={styles.icon}
                                    name="settings"
                                    size={24}
                                    color="grey"
                                />
                                <Text style={styles.text}> Cài đặt</Text>
                            </HStack>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.safeArea}>
                        <TouchableOpacity style={{ paddingTop: 20 }}>
                            <HStack>
                                <AntDesign
                                    style={styles.icon3}
                                    name="exclamationcircleo"
                                    size={20}
                                    color="grey"
                                />
                                <Text style={styles.text}> Điều khoản sử dụng</Text>
                            </HStack>
                            <Text style={{ marginLeft: 40 }} size={"xs"} color={"grey"}>
                                {" "}
                                Ngày cập nhật 20/02/2017
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.safeArea}>
                        <TouchableOpacity style={{ paddingTop: 15 }}>
                            <HStack>
                                <AntDesign
                                    style={styles.icon3}
                                    name="exclamationcircleo"
                                    size={20}
                                    color="grey"
                                />
                                <Text style={styles.text}> Thông tin chuyên ngành</Text>
                            </HStack>
                            <Text style={{ marginLeft: 40 }} size={"xs"} color={"grey"}>
                                {" "}
                                Thông tin về luật dược
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.safeArea}>
                        <TouchableOpacity style={{ paddingTop: 15 }}>
                            <HStack>
                                <AntDesign
                                    style={styles.icon3}
                                    name="exclamationcircleo"
                                    size={20}
                                    color="grey"
                                />
                                <Text style={styles.text}> Câu hỏi thường gặp</Text>
                            </HStack>
                            <Text style={{ marginLeft: 40 }} size={"xs"} color={"grey"}>
                                {" "}
                                Giải đáp một số câu hỏi thường gặp
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.safeArea}>
                        <TouchableOpacity
                            onPress={() => handleLogOut()}
                            style={{ paddingTop: 15 }}
                        >
                            <HStack>
                                <AntDesign
                                    style={styles.icon3}
                                    name="logout"
                                    size={20}
                                    color={color.plumRed}
                                />
                                <Text color={color.plumRed} fontWeight="$bold" style={styles.textLogout}> Đăng xuất</Text>
                            </HStack>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.safeArea}>
                        <View style={{ height: 150 }}></View>
                    </View>
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 30,
    },
    text: {
        fontSize: 15,
        color: "grey",
        fontWeight: "bold",
    },
    safeArea: {
        paddingLeft: 15,
        paddingTop: 15,
        paddingRight: 15,
    },
    heading: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    hidden: {
        height: 0,
    },
    list: {
        overflow: "hidden",
    },
    sectionTitle: {
        size: 16,
        height: 30,
        marginLeft: "5%",
    },
    sectionDescription: {
        size: 12,
        height: 30,
        marginLeft: "5%",
    },
    divider: {
        borderBottomColor: "grey",
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: "100%",
    },
    icon: {
        marginRight: 15,
    },
    icon2: {
        marginRight: 20,
    },
    icon3: {
        marginTop: 1,
        marginLeft: 2,
        marginRight: 18,
    },
});
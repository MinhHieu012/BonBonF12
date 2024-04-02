import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { LayoutAnimation, StyleSheet } from "react-native";
import { AntDesign, Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import {
  Avatar,
  AvatarImage,
  HStack,
  Text,
  View,
  useToken,
} from "@gluestack-ui/themed";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import TouchableOpacity from "react-native-gesture-handler";
import { useAuth } from "../hook/useAuth";
import * as colors from "../utils/color";
import { authAction } from "../actions";

const handleTakeToken = () => {
  const useToken = useSelector(state => state.auth.token);
  return useToken;
};

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };
  const MenuItemCollapse = ({ label, subLabel, onNavigate, activeScreen }) => {
    return (
      <View style={styles.safeArea}>
        <Accordion
          title={
            <HStack>
              {label === "Hàng xuất" ? (
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
            focused={subLabel[0].screen}
            onPress={() => onNavigate(subLabel[0].screen)}
            label={subLabel[0].name}
          ></DrawerItem>
          <DrawerItem
            activeBackgroundColor="#dff5f1"
            labelStyle={{ color: "grey" }}
            label={subLabel[1].screen}
            onPress={() => onNavigate(subLabel[1].screen)}
          ></DrawerItem>
        </Accordion>
      </View>
    );
  };
  return (
    <>
      <TouchableOpacity
        style={styles.heading}
        activeOpacity={0.6}
        onPress={toggleOpen}
      >
        {title}
        <Ionicons
          name={
            isOpen === true ? " chevron-up-outline " : " chevron-down-outline"
          }
          size={18}
          color="grey"
        />
      </TouchableOpacity>
      <View style={isOpen === false ? styles.hidden : styles.undefined}></View>
    </>
  );
};

const CustomeDrawer = (props) => {
  const [activeScreen, setActiveScreen] = useState("");
  const { navigation } = props;
  const onNavigate = (data) => {
    setActiveScreen(data);
    navigation.navigate(data);
    useEffect(() => {
      const role = handleTakeToken().role;
      if (role == "admin" || role == "sale") {
        setActiveScreen("Product");
      } else {
        setActiveScreen("Warehouse");
      }
    }, []);
    const handleLogOut = () => {
      useAuth(authAction.loginRequest);
    };
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView>
          <View>
            <TouchableOpacity style={{ flexDirection: "row" }}>
              <View style={{ marginTop: 15, marginBottom: 10 }}>
                <Avatar size="lg" style={{ marginLeft: 15 }}>
                  <AvatarImage source={{ uri: role.useToken }} alt="avatar" />{" "}
                  MDH - HTML - 1"
                </Avatar>
              </View>
              <View style={{ marginLeft: 10, marginTop: 22 }}>
                <Text size="lg" color={"#0E6F64"} fontWeight={"bold"}>
                  {useToken.userName}
                </Text>
                <Text style={{ marginLeft: 2 }} size="xs" color={"grey"}>
                  {`${useToken.role} - ${useToken.phoneNumber}`}
                </Text>
              </View>
            </TouchableOpacity>
            <>
              {useToken.role === "admin" ? (
                (
                  <MenuItemCollapse
                    label="Quản lý kho"
                    subLabel={[
                      { name: "- Danh sách kho", screen: "Warehouse" },
                      { name: "- Nhập kho", screen: "ImportWareHouse" },
                    ]}
                    onNavigate={onNavigate}
                    activeScreen={activeScreen}
                    navigation={{ navigation }}
                  />
                ) && (
                  <MenuItemCollapse
                    label=" Hàng xuất"
                    subLabel={[
                      { name: "- Sản phẩm xuất", screen: "Product" },
                      { name: "- Danh sách yêu cầu", screen: "ListOrder" },
                    ]}
                    onNavigate={onNavigate}
                    activeScreen={activeScreen}
                    navigation={{ navigation }}
                  />
                )
              ) : useToken.role === "kho" ? (
                <MenuItemCollapse
                  label="Quản lý kho"
                  subLabel={[
                    { name: "- Danh sách kho", screen: "Warehouse" },
                    { name: "- Nhập kho", screen: "ImportWareHouse" },
                  ]}
                  onNavigate={onNavigate}
                  activeScreen={activeScreen}
                  navigation={{ navigation }}
                />
              ) : (
                <MenuItemCollapse
                  label=" Hàng xuất"
                  subLabel={[
                    { name: "- Sản phẩm xuất", screen: "Product" },
                    { name: "- Danh sách yêu cầu", screen: "ListOrder" },
                  ]}
                  onNavigate={onNavigate}
                  activeScreen={activeScreen}
                  navigation={{ navigation }}
                />
              )}
            </>
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
                  Giải đáp một số câu hỏi thường gặp
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.safeArea}>
              <TouchableOpacity
                style={{ paddingTop: 15 }}
                onPress={handleLogOut}
              >
                <HStack>
                  <AntDesign
                    style={(styles.icon3, colors.color.plumRed)}
                    name="logout"
                    size={20}
                  />
                  <Text
                    fontWeight="$bold"
                    style={(styles.textLogout, colors.color.plumRed)}
                  >
                    Đăng xuất
                  </Text>
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
  };
};
const styles = StyleSheet.create({});
export default CustomeDrawer;
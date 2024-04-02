import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { Box, Button, HStack, Image, Input, InputField, InputSlot, Text, VStack } from "@gluestack-ui/themed";
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, TouchableWithoutFeedback } from "react-native";
import { LoadingCommon } from "../component";
import { color } from "../utils";
import { useState } from "react";
import { useAuth, useLocalStorage } from "../hook";
import { dataLogin } from "./config";
import { styles } from "./style";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const { handleLogin } = useAuth();
  const { setItemData } = useLocalStorage();

  const handleChangeLogin = () => {
    if (!username) {
      setError("Vui lòng nhập tài khoản để đăng nhập!!!");
    } else if (!password) {
      setError("Vui lòng nhập mật khẩu!!!");
    } else if (!username && !password) {
      setError("Vui lòng nhập tài khoản và mật khẩu để đăng nhập!!!");
    } else {
      const items = dataLogin.filter((element) => {
        if (element.phoneNumber === username && element.password === password) {
          return element;
        }
      });
      if (items.length !== 0) {
        setLoading(true);
        setTimeout(() => {
          handleLogin(items[0]);
          setItemData("role", items[0].role);
          setError("");
          setLoading(false);
        }, 2000);
      } else {
        setError("Tài khoản và mật khẩu không tồn tại!!!");
      }
    }
  };
  console.log("check")
  return (
    <>
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior={"position"} keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0} style={{ flex: 1 }}>
            <HStack justifyContent="center" h={"100%"} alignItems="flex-start">
              <VStack alignItems="center" w={"90%"} space="4xl">
                <Image source={require("../../assets/logo.jpg")} w={125} h={125} marginTop="30%" alt="" />
                <Box>
                  <VStack alignItems="center">
                    <Text color={color.darkGreen} fontWeight="$bold" size="2xl">
                      BONBON
                    </Text>
                    <Text marginTop="3%" size="xs">
                      Trao niềm tin, nhận giá trị
                    </Text>
                  </VStack>
                </Box>
                <Input variant="underlined" value={username}>
                  <InputSlot>
                    <EvilIcons name="user" size={30} color="gray" />
                  </InputSlot>
                  <InputField marginLeft={12} placeholder="0123456789" onChangeText={(e) => setUsername(e)} />
                </Input>
                <Input variant="underlined" value={password}>
                  <InputSlot>
                    <EvilIcons name="lock" size={30} color="gray" />
                  </InputSlot>
                  <InputField
                    marginLeft={12}
                    type={showPassword ? "text" : "password"}
                    placeholder="***********"
                    onChangeText={(e) => setPassword(e)}
                  />
                  <InputSlot>
                    <Ionicons
                      onPress={() => setShowPassword(!showPassword)}
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color="gray"
                    />
                  </InputSlot>
                </Input>
                {error.length && <Text color={color.plumRed}>{error}</Text>}
                <Button
                  borderRadius={100}
                  title="Đăng nhập"
                  style={styles.btnLogin}
                  bgColor={color.darkGreen}
                  onPress={() =>
                    handleChangeLogin({
                      username: username,
                      password: password,
                      role: password,
                    })
                  }
                >
                  <Text style={styles.bntLoginText}>Đăng Nhập</Text>
                </Button>
                <Text alignSelf="flex-start" textAlign="justify" color="gray" size="xs">
                  Lưu ý: Ứng dụng này chỉ dành cho các CBNV ngành y dược và mang tính tham khảo, bạn cần cân nhắc, tự hoàn thiện thủ tục
                  pháp lý trước khi đăng nhập. Xin cảm ơn!
                </Text>
              </VStack>
            </HStack>
            <LoadingCommon isOpen={isLoading} />
          </KeyboardAvoidingView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
    </>
  );
}
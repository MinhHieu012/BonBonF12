import { AntDesign, Entypo } from "@expo/vector-icons";
import {
    Box,
    FlatList,
    HStack,
    Pressable,
    Text,
    VStack,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { color, formatMoney, setColorWithStatus } from "../../utils";
const FlatListOrderCommon = ({ data }) => {
    const navigation = useNavigation();

    const onPressCard = (value) => {
        navigation.navigate("DetailOrder", value);
    };

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <>
                    <Pressable onPress={() => onPressCard(item)}>
                        <Box
                            height={120}
                            borderBottomWidth="$2"
                            borderColor="$trueGray100"
                            bgColor="white"
                            paddingRight={"2%"}
                        >
                            <HStack h={"100%"}>
                                <Box
                                    sx={{ bgColor: setColorWithStatus(item.status) }}
                                    width={"3%"}
                                ></Box>
                                <VStack
                                    paddingHorizontal={"2%"}
                                    paddingVertical={"1%"}
                                    justifyContent="space-around"
                                    width={"98%"}
                                >
                                    <HStack
                                        width={"100%"}
                                        space="md"
                                        justifyContent="space-between"
                                    >
                                        <Text
                                            bold
                                            size={"lg"}
                                            style={{ color: setColorWithStatus(item.status) }}
                                        >
                                            {item.orderCode}
                                        </Text>
                                        <Text bold size={"lg"}>
                                            {formatMoney(item.orderPrice)}
                                        </Text>
                                    </HStack>
                                    <HStack
                                        justifyContent="space-between"
                                        alignItems="center"
                                        height={60}
                                    >
                                        <VStack
                                            height={"80%"}
                                            justifyContent="space-around"
                                            flex={6}
                                        >
                                            <Text bold size={"md"} numberOfLines={1}>
                                                {item.customer.fullName}
                                            </Text>
                                            <HStack>
                                                <Entypo
                                                    name="location-pin"
                                                    size={22}
                                                    color={color.gray}
                                                    marginRight={"2%"}
                                                />
                                                <Text
                                                    color={color.gray}
                                                    size={"sm"}
                                                    lineHeight={25}
                                                    numberOfLines={1}
                                                >
                                                    {item.customer.address}
                                                </Text>
                                            </HStack>
                                        </VStack>
                                        <VStack flex={4} style={{ alignItems: "flex-end" }}>
                                            <Text bold size="md">
                                                ({item.listProduct.length})
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <HStack justifyContent="space-between" marginBottom={"1%"}>
                                        <HStack>
                                            <AntDesign
                                                name="calendar"
                                                size={22}
                                                color={color.gray}
                                                marginRight={"5%"}
                                            />
                                            <Text size="sm" color={color.gray}>
                                                {item.orderTime}
                                            </Text>
                                        </HStack>
                                        <Text
                                            style={{ color: setColorWithStatus(item.status) }}
                                            size="sm"
                                        >
                                            {item.status}
                                        </Text>
                                    </HStack>
                                </VStack>
                            </HStack>
                        </Box>
                    </Pressable>
                </>
            )}
        />
    );
};

export default FlatListOrderCommon;
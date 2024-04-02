import { AntDesign, Entypo } from '@expo/vector-icons';
import { Box, FlatList, HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";
import useNavigation from '@react-navigation/native'

const FlatListOrderCommon = ({ data }) => {
    const navigation = useNavigation()
    const onPressCard = ({ value }) => {
        navigation.navigate("DetailOrder", value)
    }
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <>
                    <Pressable onPress={() => { onPressCard(item) }}>
                        <Box height={120}
                            borderBottomWidth="$2"
                            borderColor="$trueGray100"
                            bgColor="white"
                            paddingRight={"2%"}>
                            <HStack h={"100%"}>
                                <Box width={"3%"}
                                    bgColor={() => { setColorWithStatus(item.status) }}>
                                </Box>
                                <VStack paddingHorizontal={"2%"}
                                    paddingVertical={"1%"}
                                    justifyContent="space-around"
                                    width={"98%"}>
                                    <HStack width={"100%"}
                                        space="md"
                                        justifyContent="space-between">
                                        <Text bold
                                            size={"lg"}
                                            bgColor={() => { setColorWithStatus(item.status) }}>
                                            {item.orderCode}
                                        </Text>
                                        <Text bold
                                            size={"lg"}>
                                            {formatMoney(item.oderPrice)}
                                        </Text>
                                    </HStack>
                                    <HStack
                                        justifyContent="space-between"
                                        alignItems="center" height={60}>
                                        <VStack height={"80%"}
                                            justifyContent="space-around"
                                            flex={6}>
                                            <Text bold
                                                size={"md"}
                                                numberOfLines={1}>
                                                {formatMoney(item.customer.fullname)}
                                            </Text>
                                            <HStack>
                                                <Entypo
                                                    name="location-pin"
                                                    size={22}
                                                    marginRight={"2%"} />
                                                <Text size={"sm"}
                                                    lineHeight={25}
                                                    numberOfLines={1}>
                                                    {formatMoney(item.customer.address)}
                                                </Text>
                                            </HStack>
                                        </VStack>
                                        <VStack flex={4}
                                            style={{ alignItems: "flex-end" }}>
                                            <Text bold
                                                size="md">
                                                {formatMoney(item.listProduct.length)}
                                            </Text>
                                        </VStack>
                                        <HStack>
                                            <AntDesign
                                                name="calendar"
                                                size={22}
                                                marginRight={"5%"} />
                                            <Text size="sm"
                                                color={color.gray} >
                                                {formatMoney(item.orderTime)}
                                            </Text>
                                        </HStack>
                                        <Text size="sm"
                                            bgColor={() => { setColorWithStatus(item.status) }}>
                                            {formatMoney(item.status)}
                                        </Text>
                                    </HStack>
                                </VStack>
                            </HStack>
                        </Box>
                    </Pressable>
                </>
            )}
        />
    )
}
export default FlatListOrderCommon

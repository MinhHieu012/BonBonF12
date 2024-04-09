import {
    Box,
    FlatList,
    HStack,
    Image,
    Text,
    VStack,
} from "@gluestack-ui/themed";
import { color, formatMoney } from "../../utils";
import { styleFlatlist } from "./styles";

export default FlatlistOrderCompleted = (props) => {
    console.log(props, "Check props")
    const data = props;
    return (
        <FlatList
            data={data}
            renderItem={(item) => {
                return (
                    <>
                        {console.log("Chạy chưa?")}
                        <HStack style={styleFlatlist.container}>
                            <Box style={styleFlatlist.boxImg}>
                                <Image
                                    alt="ảnh thuốc"
                                    style={styleFlatlist.img}
                                    source={{ uri: item.avatar }}
                                />
                            </Box>
                            <VStack
                                justifyContent="space-between"
                                style={styleFlatlist.contentCard}
                            >
                                <Text size="md" numberOfLines={1} style={color.blackName}>
                                    {item.name}
                                </Text>
                                <HStack
                                    justifyContent="space-between"
                                    style={{ verticalAlign: "bottom" }}
                                >
                                    <Text size="sm" style={color.blueSky}>
                                        {formatMoney(item.priceEdit)}
                                    </Text>
                                    <Text
                                        size="sm"
                                        style={{
                                            verticalAlign: "bottom",
                                            fontWeight: "bold",
                                            color: color.blueSky,
                                        }}
                                    >
                                        x{item.quantity}
                                    </Text>
                                </HStack>
                                <HStack justifyContent="space-between">
                                    <Text
                                        color="grey"
                                        size="sm"
                                        style={{ verticalAlign: "bottom" }}
                                    >
                                        {item.unit}
                                    </Text>
                                    <Text
                                        color="#CC0000"
                                        size="sm"
                                        style={{ verticalAlign: "bottom", fontWeight: "bold" }}
                                    >
                                        {formatMoney(item.totalProductPrice)}
                                    </Text>
                                </HStack>
                            </VStack>
                        </HStack>
                    </>
                );
            }}
        ></FlatList>
    );
};
import { FlatList, Pressable, HStack, Box, Image, VStack, Text } from "@gluestack-ui/themed";
import styles from "./style"
import { formatMoney } from "../../utils"

export default function CardProductCommon(props) {
    const { data } = props;
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => {
                <Pressable onPress={(item) => {
                    onShowModal
                }}>
                    (CPC - HTML -1)
                    <HStack
                        style={styles.container}>
                        <Box style={styles.boxImg}>
                            <Image source={item.avatar} alt="ảnh thuốc" />
                            (CPC - HTML -2)
                        </Box>
                    </HStack>
                    <HStack
                        justifyContent="space-between"
                        style={styles.contentCard} >
                        <VStack
                            justifyContent="space-between"
                            flex={3} >
                            <Text size="md"
                                fontWeight="bold"
                                numberOfLines={1} >
                                {item.name}
                            </Text>
                            <Text color="grey"
                                size="sm"
                                numberOfLines={1}>
                                {item.unit}
                            </Text>
                            <Text color="grey"
                                size="sm"
                                numberOfLines={1}>
                                {item.supply}
                            </Text>
                            <Text color="grey"
                                size="sm"
                                numberOfLines={1}>
                                {item.codeProduct}
                            </Text>

                        </VStack>
                        <VStack
                            justifyContent="space-between"
                            flex={2}>
                            <Text size="md"
                                fontWeight="bold"
                                color="#CC0000" textAlign="right">
                                {formatMoney(item.floorPrice)}
                            </Text>
                            <Text color="grey"
                                size="sm" textAlign="right" >
                                {item.expiry}
                            </Text>
                            <Text color="grey" size="sm"
                                textAlign="right">
                                (CPC - HTML -9)
                            </Text>
                        </VStack>
                    </HStack>
                </Pressable>

            }
            }>

        </FlatList>
    )
}
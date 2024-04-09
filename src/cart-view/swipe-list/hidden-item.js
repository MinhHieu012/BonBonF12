import { Dimensions } from 'react-native'
import { HStack, Pressable, VStack } from '@gluestack-ui/themed'
import { AntDesign } from '@expo/vector-icons'

export default function HiddenItem({ data, onOpenDeleteProductModal, _rowMap }) {
    return (
        <HStack
            flex={1}
            pl={2}
            justifyContent="flex-end">
            <Pressable
                onPress={() => {
                    onOpenDeleteProductModal(data, _rowMap);
                }}

                cursor="pointer"
                _pressed={{ opacity: 0.5 }}>
                <VStack
                    alignItems="center"
                    justifyContent={"center"}
                    space={2}
                    backgroundColor="red"
                    height="100%"
                    width={Dimensions.get("window").width * 0.3}
                >
                    <AntDesign
                        name="delete"
                        size={24}
                        color="#fff"
                    />
                </VStack>
            </Pressable>
        </HStack>
    )
}
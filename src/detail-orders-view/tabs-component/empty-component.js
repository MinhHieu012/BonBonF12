import { Text } from "@gluestack-ui/themed";
import { View } from "react-native";
import { textConst } from "../../utils";

export default EmptyComponent = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>{textConst.NO_DATA}</Text>
        </View>
    );
};
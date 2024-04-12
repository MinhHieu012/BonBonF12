import { Feather } from "@expo/vector-icons";
import { Animated, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import styles from "./style";

const Message = (props) => {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      props.onHide();
    });
  }, []);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
        top: 40,
        backgroundColor: "white",
        width: "90%",
        position: "absolute",
        borderRadius: 5,
        padding: 20,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        shadowColor: "#003049",
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
        zIndex: 999,
        left: "5%",
      }}
    >
      <Feather name="check-circle" size={30} color="#0E6F64" />
      <View style={{ width: "100%" }}>
        <Text style={styles.Info}>{props.message.Info}</Text>
        <Text style={styles.Description}>{props.message.Description}</Text>
      </View>
    </Animated.View>
  );
};

export default function ToastNotification(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      ...messages,
      { Info: props.Info, Description: props.Description },
    ]);
  }, [props.Info]);

  const DataMessage = messages.map((message, key) => (
    <Message
      key={key + 1}
      message={message}
      onHide={() => {
        setMessages((messages) =>
          messages.filter((currentMessage) => currentMessage !== message)
        );
      }}
    />
  ));
  return (
    <>
      <View
        style={{
          position: "absolute",
          top: 45,
          left: 0,
          right: 0,
          zIndex: 999,
        }}
      >
        {messages.length === 0 ? null : DataMessage}
      </View>
    </>
  );
}

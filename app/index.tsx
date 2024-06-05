import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Button from "@/components/Button";

const RootScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(users)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
    </View>
  );
};

export default RootScreen;

const styles = StyleSheet.create({});

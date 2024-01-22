import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Qualification from "../../../components/Qualification";
import Experience from "../../../components/Experience";
const MyProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Qualification />
      <Experience />
    </View>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
});

import { View, Text, StyleSheet, Button } from "react-native";
import React, { useContext } from "react";

import { Context } from "./context/Context";

const Home = () => {
  const { state, add, minus } = useContext(Context);
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Text>{state}</Text>
      <Button title="Add context" onPress={add} />
      <Button title="Minus context" onPress={minus} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Home;

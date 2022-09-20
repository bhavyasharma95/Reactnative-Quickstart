import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import Spacer from "./partials/Spacer";
import { Context as AuthContext } from "./context/AuthContext";

const Post = ({ navigation }) => {
  const { state, userpost } = useContext(AuthContext);
  const [usertitle, setUsertitle] = useState("");
  const [userContent, setUsercontent] = useState("");

  token = state.token;

  return (
    <View style={styles.container}>
      <Spacer>
        <Text h3>Write a Post</Text>
      </Spacer>
      <TextInput
        label="usertitle"
        value={usertitle}
        onChangeText={setUsertitle}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />
      <TextInput
        label="usercontent"
        value={userContent}
        onChangeText={setUsercontent}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Spacer>
        <Button
          title="Post"
          onPress={() => userpost({ usertitle, userContent, token })}
        />
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItem: "center",
    marginBottom: 250,
  },
});

export default Post;

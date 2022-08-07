import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import Spacer from "./partials/Spacer";
import { Context as AuthContext } from "./context/AuthContext";

const Signin = ({ navigation }) => {
  const { state, signin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Spacer>
        <Text h3>Sign In for Tracker</Text>
      </Spacer>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />
      <TextInput
        // secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {state.errorMessage ? <Text>{state.errorMessage}</Text> : null}
      <Spacer>
        <Button title="Sign Up" onPress={() => signin({ email, password })} />
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

export default Signin;

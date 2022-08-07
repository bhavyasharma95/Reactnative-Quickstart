import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Spacer from "./partials/Spacer";

import { Context as AuthContext } from "./context/AuthContext";

const Signup = ({ navigation }) => {
  const { state, signup } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Spacer>
        <Text h3>Sign Up for Tracker</Text>
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
        <Button title="Sign Up" onPress={() => signup({ email, password })} />
      </Spacer>
      <Spacer />
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text>Have an Account!! Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250,
  },
});

export default Signup;

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as AuthProvider } from "./src/context/AuthContext";

import Signup from "./src/signup";
import SignIn from "./src/signin";

import Home from "./src/home";

let isSignedIn = false;
const AuthStackNavigator = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen
        name="SignUp"
        component={Signup}
        options={{ headerShown: false }}
      />
      <AuthStackNavigator.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
    </AuthStackNavigator.Navigator>
  );
};

export const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        {isSignedIn ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthProvider>
  );
};

import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./src/partials/RootNavigation";
import {
  Provider as AuthProvider,
  Context as AuthContext,
} from "./src/context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

import Signup from "./src/signup";
import SignIn from "./src/signin";
import Post from "./src/post";

import Home from "./src/home";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const RootNavigation = () => {
  const { state } = useContext(AuthContext);

  return (
    <NavigationContainer ref={navigationRef}>
      {state.token != null ? (
        <Stack.Navigator initialRouteName="SignUp">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="SignUp">
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={Signup}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default () => {
  // const { state } = useContext(AuthContext);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootNavigation />
      </AuthProvider>
    </QueryClientProvider>
  );
};

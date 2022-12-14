import creatingContext from "./creatingContext";
import tracker from "../API/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import qs from "qs";
import { navigate } from "../partials/RootNavigation";
import * as RootNavigation from "../partials/RootNavigation";

const authReducer = (state, action) => {
  switch (action.type) {
    case "error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    default:
      return state;
  }
};

const signup =
  (dispatch) =>
  async ({ username, password }) => {
    try {
      const response = await tracker({
        method: "post",
        url: "/users",
        data: JSON.stringify({
          email: username,
          password: password,
        }),
        headers: { "content-type": "application/json" },
      });
      // await AsyncStorage.setItem("email", response.data.email);
      // dispatch({ type: "signin", payload: response.data.email });
      RootNavigation.navigate("SignIn");
    } catch (err) {
      dispatch({
        type: "error",
        payload: "debug",
      });
      console.log(err);
    }
  };

const signin =
  (dispatch) =>
  async ({ username, password }) => {
    try {
      const response = await tracker({
        method: "post",
        url: "/login",
        data: qs.stringify({
          username: username,
          password: password,
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      await AsyncStorage.setItem("token", response.data.access_token);
      dispatch({ type: "signin", payload: response.data.access_token });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "error",
        payload: "debug",
      });
    }
  };

const signout = (dispatch) => {
  return () => {};
};

const userpost =
  (dispatch) =>
  async ({ usertitle, userContent, token }) => {
    try {
      const response = await tracker({
        method: "post",
        url: "/posts",
        data: JSON.stringify({
          title: usertitle,
          content: userContent,
          published: true,
        }),
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // await AsyncStorage.setItem("email", response.data.email);
      // dispatch({ type: "signin", payload: response.data.email });
      RootNavigation.navigate("Home");
    } catch (err) {
      dispatch({
        type: "error",
        payload: "debug",
      });
      console.log(err);
    }
  };

export const { Provider, Context } = creatingContext(
  authReducer,
  { signin, signout, signup, userpost },
  { token: null, errorMessage: "" }
);

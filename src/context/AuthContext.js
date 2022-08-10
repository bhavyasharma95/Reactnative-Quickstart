import creatingContext from "./creatingContext";
import tracker from "../API/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import qs from "qs";
import { CommonActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

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
        url: "/user",
        data: JSON.stringify({
          email: username,
          password: password,
        }),
        headers: { "content-type": "application/json" },
      });
      // await AsyncStorage.setItem("email", response.data.email);
      // dispatch({ type: "signin", payload: response.data.email });
    } catch (err) {
      dispatch({
        type: "error",
        payload: "Something's not write, plz try again",
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
        payload: "Start debuggin",
      });
    }
  };

const signout = (dispatch) => {
  return () => {};
};

export const { Provider, Context } = creatingContext(
  authReducer,
  { signin, signout, signup },
  { token: null, errorMessage: "" }
);

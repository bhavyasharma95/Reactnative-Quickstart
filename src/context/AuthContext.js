import creatingContext from "./creatingContext";
import tracker from "../API/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { navigate } from "../partials/navigationRef";

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
  async ({ email, password }, callback) => {
    try {
      const response = await tracker.post("/login", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      //   navigate("Home");
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
  async ({ email, password }) => {
    try {
      const response = await tracker.post("/login/", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      console.log(response.data.token);
    } catch (err) {
      dispatch({
        type: "error",
        payload: "Something's not write, plz try again",
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

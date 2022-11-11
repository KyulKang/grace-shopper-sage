import axios from "axios";
import history from "../history";

const TOKEN = "token";

// Actions
const SET_AUTH = "SET_AUTH";

// Action Creators
const setAuth = (auth, token) => {
  return {
    type: SET_AUTH,
    authUser: auth,
    token,
  };
};

// Thunks
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data, token));
  } else {
    console.log("No token found");
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

// Initial State
const initialState = {};

// Reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return (state = {
        authUser: action.auth,
        token: action.token,
      });
    default:
      return state;
  }
}

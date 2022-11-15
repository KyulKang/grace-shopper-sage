import axios from "axios";

// Actions
const ADD_USER = "ADD_USER";
const UPDATE_USER = "UPDATE_USER";

// Action Creators
const _addUser = (user) => {
  return {
    type: ADD_USER,
    user: user,
  };
};

const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user: user,
  };
};

// Thunks
export const addUser = (userInfo) => {
  return async (dispatch) => {
    const { data } = await axios.post("/auth/signup", {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      password: userInfo.password,
    });
    window.localStorage.setItem("token", data.token);
    dispatch(_addUser(data.user));
  };
};

export const updateUser = (userInfo) => {
  const token = window.localStorage.getItem("token");
  return async (dispatch) => {
    const { data } = await axios.put(`/api/users/${userInfo.id}`, userInfo, {
      headers: {
        authorization: token,
      },
    });
    console.log(data);
    dispatch(_updateUser(data));
  };
};
// Initial State
const initialState = {
  user: {},
};

// Reducer

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      return (state = {
        ...state,
        user: action.user,
      });
    case UPDATE_USER: {
      return (state = {
        ...state,
        user: action.user,
      });
    }
    default:
      return state;
  }
}

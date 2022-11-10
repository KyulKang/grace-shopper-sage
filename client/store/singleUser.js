import axios from "axios";

// Actions
const ADD_USER = "ADD_USER";

// Action Creators
const _addUser = (user) => {
  return {
    type: ADD_USER,
    user: user,
  };
};

// Thunks
export const addUser = (user) => {
  return async (dispatch) => {
    const { data } = await axios.post();
    dispatch(_addUser(data));
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
    default:
      return state;
  }
}

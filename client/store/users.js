import axios from "axios";

// Actions
const GET_USER = "GET_USER";
const ADD_USER = "ADD_USER";

// Action Creators
const _getUser = (user) => {
  return {
    type: GET_USER,
    user: user,
  };
};

const _addUser = (user) => {
  return {
    type: ADD_USER,
    user: user,
  };
};

// Thunks
export const fetchUser = (id) => {
  return async (dispatch) => {
    // Need path for get user
    const { data } = await axios.get();
    dispatch(_getUser(data));
  };
};

export const addUser = (user) => {
  return async (dispatch) => {
    const { data } = await axios.post();
    dispatch(_addUser(data));
  };
};

// Initial State
const initialState = {
  users: [],
  user: {},
};

// Reducer

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return (state = {
        ...state,
        user: action.user,
      });
    case ADD_USER:
      return (state = {
        ...state,
        user: action.user,
      });
    default:
      return state;
  }
}

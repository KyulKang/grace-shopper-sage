import axios from "axios";

// Actions
const GET_USERS = "GET_USERS";

// Action Creators
const _getUsers = (users) => {
  return {
    type: GET_USERS,
    users: users,
  };
};

// Thunks
export const fetchUsers = () => {
  return async (dispatch) => {
    const { data } = await axios.get();
    dispatch(_getUsers(data));
  };
};

// Initial State
const initialState = {
  users: [],
};

// Reducer
export default function usersReducer(state = initialState, actions) {
  switch (actions.type) {
    case GET_USERS: {
      return (state = {
        ...state,
        users: actions.users,
      });
    }
    default:
      return state;
  }
}

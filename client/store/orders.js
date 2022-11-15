import axios from "axios";

// Actions
const GET_ORDERS = "GET_ORDERS";

// Action Creators
const _getOrders = (orders) => {
  return {
    type: GET_ORDERS,
    orders,
  };
};

// Thunks

export const fetchOrders = (userId) => {
  const token = window.localStorage.getItem("token");
  return async (dispatch) => {
    const { data } = await axios.get(`/api/admin/users/${userId}`, {
      headers: { authorization: token },
    });
    dispatch(_getOrders(data));
  };
};

// Initial State
const initialState = {
  orders: [],
};

// Reducer
export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS: {
      return (state = {
        ...state,
        orders: action.orders,
      });
    }
    default:
      return state;
  }
}

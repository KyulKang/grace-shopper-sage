import axios from "axios";
import {_getCart} from "./cart.js"

// Actions
const GET_CART = "GET_CART"
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

export const makeGuestOrder = (order) => {
  return async (dispatch) => {
    const { data } = await axios.post("/api/orders", order);
  };
};

export const makeUserOrder = (order, id) => {
  const token = window.localStorage.getItem("token");
  return async (dispatch) => {
    const { data } = await axios.post(`/api/users/${id}/orders`, order, {
      headers: {
        authorization: token,
      },
    })
    const {data: newCart} = await axios.get(`/api/users/${id}/cartItems`,{
      headers: {
        authorization: token,
      },
    } )
  dispatch(_getCart(newCart))
  }}

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

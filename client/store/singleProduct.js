import axios from "axios";

// Actions
const GET_PRODUCT = "GET_PRODUCT";

// Action Creators
export const _getProduct = (product) => {
  return {
    type: GET_PRODUCT,
    product,
  };
};

// Thunks
export const fetchProduct = (productId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/products/${productId}`);
    console.log("look at me", data);
    dispatch(_getProduct(data));
  };
};

// Initial State
const initialState = {};

// Reducer
export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT: {
      return action.product;
    }
    default:
      return state;
  }
}

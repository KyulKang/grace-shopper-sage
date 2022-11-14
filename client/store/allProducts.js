import axios from "axios";

// Actions
const GET_PRODUCTS = "GET_PRODUCTS";

// Action Creators
const _getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products: products,
  };
};

// Thunks
export const fetchProducts = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/products");
    dispatch(_getProducts(data));
  };
};

// Initial State
const initialState = {
  products: [],
};

// Reducer
export default function allProductsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS: {
      return (state = {
        ...state,
        products: action.products,
      });
    }
    default:
      return state;
  }
}

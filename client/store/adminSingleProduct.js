import axios from "axios";

// Action constant
const UPDATE_PRODUCT = "UPDATE_PRODUCT";

// Action creator
const _getProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product: product,
  };
};

// Thunks
export const updateProduct = (product) => {
  const token = window.localStorage.getItem("token");
  return async (dispatch) => {
    const { data } = await axios.put("/api/admin/products", product, {
      headers: { authorization: token },
    });
    dispatch(_getProduct(data));
  };
};

const initialState = {};

export default function adminSingleProduct(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PRODUCT: {
      return action.product;
    }
    default:
      return state;
  }
}

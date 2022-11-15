import axios from "axios";

// Action constant
const UPDATE_PRODUCT = "UPDATE_PRODUCT";

// Action creator
const _updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product: product,
  };
};

// Thunk
export const updateProduct = (product) => {
  const token = window.localStorage.getItem("token");
  return async (dispatch) => {
    const { data } = await axios.put(
      `/api/admin/products/${product.id}`,
      product,
      {
        headers: { authorization: token },
      }
    );
    dispatch(_updateProduct(data));
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

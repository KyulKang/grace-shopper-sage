import axios from "axios";

// Action constant
const GET_PRODUCT = "GET_PRODUCT";

// Action creator
const _getProduct = (product) => {
  return {
    type: GET_PRODUCT,
    product: product,
  };
};

// Thunks
export const getAdminProduct = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(_getProduct(data));
  };
};

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
    case GET_PRODUCT: {
      return { product: action.product };
    }
    default:
      return state;
  }
}

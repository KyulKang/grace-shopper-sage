import axios from "axios";

// Actions
const ADD_PRODUCT = "ADD_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const GET_PRODUCTS = "GET_PRODUCTS";
const GET_PRODUCT = "GET_PRODUCT";

// Action Creators
const _getProduct = (product) => {
  return {
    type: GET_PRODUCT,
    product: product,
  };
};

const _addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product: product,
  };
};

const _deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product: product,
  };
};

const _getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products: products,
  };
};

// Thunks
export const addProduct = (product) => {
  const token = window.localStorage.getItem("token");
  return async (dispatch) => {
    const { data } = await axios.post("/api/admin/products", product, {
      headers: { authorization: token },
    });
    dispatch(_addProduct(data));
  };
};

export const getProduct = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(_getProduct(data));
  };
};

export const deleteProduct = (id) => {
  const token = window.localStorage.getItem("token");
  return async (dispatch) => {
    const { data } = await axios.delete(`/api/admin/products/${id}`, {
      headers: { authorization: token },
    });
    dispatch(_deleteProduct(data));
  };
};

export const fetchAdminProducts = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/products");
    dispatch(_getProducts(data));
  };
};

// Initial State
const initialState = [];

// Reducer

export default function adminProduct(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS: {
      return action.products;
    }

    case ADD_PRODUCT: {
      return [...state, action.product];
    }

    case UPDATE_PRODUCT: {
      return (state = {
        ...state,
        product: action.product,
      });
    }
    case DELETE_PRODUCT: {
      return state.filter((product) => product.id !== action.product.id);
    }
    default:
      return state;
  }
}

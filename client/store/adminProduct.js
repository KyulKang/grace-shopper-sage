import axios from "axios";

// Actions
const ADD_PRODUCT = "ADD_PRODUCT";
const GET_PRODUCT = "GET_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT  ";
const DELETE_PRODUCT = "DELETE_PRODUCT";

// Action Creators
const _addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product: product,
  };
};
const _getProduct = (product) => {
  return {
    type: GET_PRODUCT,
    product: product,
  };
};


const _updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product: product,
  };
};

const _deleteProduct = () => {
  return {
    type: DELETE_PRODUCT,
  };
};

// Thunks
export const addProduct = () => {
  return async (dispatch) => {
    const { data } = await axios.post();
    dispatch(_addProduct(data));
  };
};
// export const getProduct = (id) => {
//   return async (dispatch) => {
//     const { data } = await axios.get(`/api/products/${id}`);
//     dispatch(_getProduct(data));
//   };
// };

export const updateProduct = () => {
  return async (dispatch) => {
    const { data } = await axios.put();
    dispatch(_updateProduct(data));
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    await axios.delete(id);
    dispatch(_deleteProduct());
  };
};

// Initial State
const initialState = []

// Reducer

export default function adminProduct(state = initialState, action) {
  switch (action.type) {
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
      return (state = {
        ...state,
        product: [],
      });
    }
    default:
      return state;
  }
}

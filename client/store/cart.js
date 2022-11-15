import axios from "axios";

// Actions
const GET_CART = "GET_CART";
const ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART";
const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";
const UPDATE_ITEM_IN_CART = "UPDATE_ITEM_IN_CART";
const CLEAR_CART = "CLEAR_CART"


// Action Creators]
export const _clearCart = ()=>{
    return {
        type: CLEAR_CART,
        cart:[]
    }
}

export const _getCart = (cart) => {
    return {
        type: GET_CART,
        cart
    };
};
const _addItemToCart = (item) => {
    return {
        type: GET_CART,
        item: item,
    };
};
const _removeItemFromCart = (item) => {
    return {
        type: REMOVE_ITEM_FROM_CART,
        item: item
    }
}
const _updateItemInCart = (item) => {
    return {
        type: UPDATE_ITEM_IN_CART,
        item: item
    }
}
// Thunks
export const fetchCart = (id) => {
    return async (dispatch) => {
        console.log("stepped into fetchcart")
        const token = window.localStorage.getItem("token")
        const {data: newCart} = await axios.get(`/api/users/${id}/cartItems`,{
            headers: {
              authorization: token,
            },
          } )
        dispatch(_getCart(newCart))
    };
};

export const updateCart = (item, id)=> {
    const token = window.localStorage.getItem("token")
    return async (dispatch) => {
        const {data} = await axios.post(`/api/users/${id}/cartItems`, item, {
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
    }
}


/* export const updateUser = (userInfo) => {
    const token = window.localStorage.getItem("token");
    return async (dispatch) => {
      const { data } = await axios.put(`/api/users/${userInfo.id}`, userInfo, {
        headers: {
          authorization: token,
        },
      });
      console.log(data);
      dispatch(_updateUser(data));
    };
  };
 */
// Initial State
const initialState = [];

// Reducer
export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CART: {
            return action.cart
        }
        case CLEAR_CART: {
            return action.cart
        }
        default:
            return state;
    }
}

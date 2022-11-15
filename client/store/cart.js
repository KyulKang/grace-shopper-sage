import axios from "axios";

// Actions
const GET_CART = "GET_CART";
const ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART";
const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";
const UPDATE_ITEM_IN_CART = "UPDATE_ITEM_IN_CART";


// Action Creators
const _getCart = (cart) => {
    return {
        type: GET_CART,
        cart: cart,
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
export const fetchCart = () => {
    return async (dispatch) => {
        // const { data } = await axios.get("/api/cart");
        // dispatch(_getCart(data));
        //placeholder data.
        const dummy = [{ id: 1, title: "shirt" }];
        dispatch(_getCart(dummy));
    };
};

// Initial State
const initialState = {
    cart: [],
};

// Reducer
export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CART: {
            return (state = {
                ...state,
                cart: action.cart,
            });
        }
        default:
            return state;
    }
}

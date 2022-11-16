import React, { useState, useEffect } from "react";
import { fetchProduct, updateCart, _getCart } from "../../../store";
import { connect } from "react-redux";

function CartItem(props) {
  const { item, getProduct, updateCart, guestUpdateCart, product, user } =
    props;

  const [quantity, setQuantity] = useState(item.quantity);

  const onChangeHandler = (event) => {
    setQuantity(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (user?.id) {
        updateCart(
          { quantity, productId: item.product.id, price: item.product.price },
          user.id
        );
      } else {
        let currentCart = {};
        if (localStorage.getItem("cart")) {
          currentCart = JSON.parse(localStorage.getItem("cart"));
        }
        currentCart = {
          ...currentCart,
          [item.product.id]: { quantity, product: item.product },
        };
        localStorage.setItem("cart", JSON.stringify(currentCart));
        guestUpdateCart(Object.values(currentCart));
      }
      alert("Updated Cart")
    } catch (err) {
      console.log(err);
    }
  };


  console.log("what is item", item);
  return (
    <div className="cart-item d-flex flex-row align-items-center">
      <img
        src={item.product.imageUrl}
        alt="images"
        className="cart-item-image"
      />
      <div className="item-description">
        <h4 className="no-margin">{item.product.title}</h4>
      </div>
      <input
        className="cart-input"
        type="number"
        value={+quantity}
        min="1"
        onChange={onChangeHandler}
      />
      <button onClick={onSubmitHandler} className="btn btn-secondary">Update Item</button>
      <h5>{item.product.price}</h5>
      <button className="btn btn-danger">Remove Item</button>
    </div>
  );
}

const mapDispatch = (dispatch) => {
  return {
    getProduct: (id) => dispatch(fetchProduct(id)),
    updateCart: (item, id) => dispatch(updateCart(item, id)),
    guestUpdateCart: (item) => dispatch(_getCart(item)),
  };
};
const mapState = (state) => {
  return {
    product: state.singleProduct,
    user: state.auth.authUser,
  };
};
export default connect(mapState, mapDispatch)(CartItem);
